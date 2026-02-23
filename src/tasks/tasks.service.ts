import { Injectable, NotFoundException } from '@nestjs/common';
import { TaksStatus } from './task-status.enum';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTaskDTO } from './dto/filter-task.dto';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult } from 'typeorm';
import { UpdateTaskDTO } from './dto/update-task.dto';
/*
    TasksSevice owns the business logic

    in ts for a class when you define a method its access is public by default

    in classes, no function keyword is required

*/
@Injectable()
export class TasksService {
  constructor(private tasksRepository: TaskRepository) {}

  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto);
  }
  async getTasks(filterTaskDto: FilterTaskDTO): Promise<Task[]> {
    return this.tasksRepository.getTasks(filterTaskDto);
  }
  async getTaskByID(id: string): Promise<Task> {
    const found = await this.tasksRepository.findOne({ where: { id: id } });

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
  async updateTask(id: string, updateTaskDto: UpdateTaskDTO): Promise<Task> {
    const { status } = updateTaskDto;
    const task = await this.getTaskByID(id);
    console.log('task:', task);
    task.status = status;
    await this.tasksRepository.save(task);
    return task;
  }
}
