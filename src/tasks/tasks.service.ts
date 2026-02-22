import { Injectable, NotFoundException } from '@nestjs/common';
import { TaksStatus } from './task-status.enum';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTaskDTO } from './dto/filter-task.dto';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';
import { InjectRepository } from '@nestjs/typeorm';
/*
    TasksSevice owns the business logic

    in ts for a class when you define a method its access is public by default

*/
@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: TaskRepository,
  ) {}
  // getAllTaks(): Task[] {
  //   return this.tasks;
  // }
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;
    //first we create an object based on the repository the task is not being saved in the database
    const task = this.tasksRepository.create({
      title,
      description,
      status: TaksStatus.OPEN,
    });

    //now we will save the task into the database
    await this.tasksRepository.save(task);
    return task;
  }
  // createTask(createTaskDto: CreateTaskDto): Task {
  //   const { title, description } = createTaskDto;
  //   const task: Task = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: TaksStatus.OPEN,
  //   };
  //   this.tasks.push(task);
  //   return task;
  // }
  async getTaskByID(id: string): Promise<Task> {
    const found = await this.tasksRepository.findOne({ where: { id: id } });

    if (!found) {
      throw new NotFoundException(`Task with ${id} not found`);
    }

    return found;
  }
  // getTaskByID(id: string): Task {
  //   const found = this.tasks.find((task) => task.id === id);
  //   if (!found) {
  //     throw new NotFoundException(`Task with ${id} not found`);
  //   }
  //   return found;
  // }
  // deleteTaskByID(id: string): void {
  //   const found = this.getTaskByID(id);
  //   this.tasks = this.tasks.filter((task) => task.id !== found.id);
  // }
  // updateTask(id: string, status: TaksStatus): Task {
  //   const task = this.getTaskByID(id);
  //   task.status = status;
  //   return task;
  // }
  // getTasksWithFilters(filterTaskDTO: FilterTaskDTO): Task[] {
  //   const { status, search } = filterTaskDTO;
  //   let tasks = this.getAllTaks();
  //   if (status) {
  //     tasks = tasks.filter((task) => task.status === status);
  //   }
  //   if (search) {
  //     tasks = tasks.filter((task) => {
  //       if (task.description.includes(search) || task.title.includes(search))
  //         return true;
  //       return false;
  //     });
  //   }
  //   return tasks;
  // }
}
