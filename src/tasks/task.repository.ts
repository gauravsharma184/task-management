import { Repository, DataSource } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaksStatus } from './task-status.enum';
import { Injectable } from '@nestjs/common';
import { FilterTaskDTO } from './dto/filter-task.dto';
import { User } from 'src/auth/user.entity';

/*
    //able to maintain more readable code using Data Mapper
    In Data Mapper approach we define the logic of interacting with a database using respository

    In active record we define the database logic in the entity declaration itself 
    :used for simple application


    Repository is also just a class which extends the class repository from typeORM

    to make this repository available over the entire task module we will use dependency injection



*/
@Injectable()
export class TaskRepository extends Repository<Task> {
  constructor(private dataSource: DataSource) {
    //we are calling the constructor of the parent class here passing the task entity and another function
    super(Task, dataSource.createEntityManager());
  }
  async getTasks(filterTaskDto: FilterTaskDTO, user: User): Promise<Task[]> {
    const { status, search } = filterTaskDto;
    const query = this.createQueryBuilder('task');
    // console.log('query:', query);
    console.log('user task repo', user);
    query.where({user});
    console.log('query for getting all tasks:', query);
    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        'LOWER(task.title) like LOWER(:search) OR LOWER(task.description) like LOWER(:search)',
        { search: `%${search}%` },
      );
    }

    const tasks = await query.getMany();

    return tasks;
  }
  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;
    //first we create an object based on the repository the task is not being saved in the database
    const task = this.create({
      title,
      description,
      status: TaksStatus.OPEN,
      user,
    });

    //now we will save the task into the database
    await this.save(task);
    return task;
  }
}
