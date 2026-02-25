import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTaskDTO } from './dto/filter-task.dto';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';
import { DeleteResult } from 'typeorm';
import { UpdateTaskDTO } from './dto/update-task.dto';
import { User } from 'src/auth/user.entity';
/*
    TasksSevice owns the business logic

    in ts for a class when you define a method its access is public by default

    in classes, no function keyword is required

*/
@Injectable()
export class TasksService {
  constructor(private tasksRepository: TaskRepository) {}

  createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto, user);
  }
  async getTasks(filterTaskDto: FilterTaskDTO, user: User): Promise<Task[]> {
    return this.tasksRepository.getTasks(filterTaskDto, user);
  }
  async getTaskByID(id: string, user: User): Promise<Task> {
    const found = await this.tasksRepository.findOne({ where: { id: id, user: user } });
    console.log(found);

    if (!found) {
      throw new NotFoundException(`Task with ${id} not found`);
    }

    return found;
  }
  async deleteTaskByID(id: string): Promise<DeleteResult> {
    const result = await this.tasksRepository.delete(id);
    console.log(result);
    if (result.affected === 0)
      throw new NotFoundException(`Taks with ${id} not found`);
    return result;
    //.delete method does not check wether the entity exists or not
    // in the remove method you can not pass a null object , so need to fetch the task from the db, one more call
  }
  async updateTask(id: string, updateTaskDto: UpdateTaskDTO, user: User): Promise<Task> {
    const { status } = updateTaskDto;
    const task = await this.getTaskByID(id, user);
    console.log('task:', task);
    task.status = status;
    await this.tasksRepository.save(task);
    return task;
  }
}
