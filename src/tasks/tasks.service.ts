import { Injectable, NotFoundException } from '@nestjs/common';
import { TaksStatus, Task } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTaskDTO } from './dto/filter-task.dto';
/*
    TasksSevice owns the business logic

    in ts for a class when you define a method its access is public by default

*/
@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTaks(): Task[] {
    return this.tasks;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaksStatus.OPEN,
    };

    this.tasks.push(task);

    return task;
  }

  getTaskByID(id: string): Task {
    const found = this.tasks.find((task) => task.id === id);

    if (!found) {
      throw new NotFoundException(`Task with ${id} not found`);
    }

    return found;
  }

  deleteTaskByID(id: string): void {
    const index = this.tasks.findIndex((task) => task.id === id);
    this.tasks.splice(index, 1);
  }

  updateTask(id: string, status: TaksStatus): Task | undefined {
    const task = this.getTaskByID(id);
    if (task) task.status = status;
    return task;
  }

  getTasksWithFilters(filterTaskDTO: FilterTaskDTO): Task[] {
    const { status, search } = filterTaskDTO;
    let tasks = this.getAllTaks();

    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    if (search) {
      tasks = tasks.filter((task) => {
        if (task.description.includes(search) || task.title.includes(search))
          return true;
        return false;
      });
    }

    return tasks;
  }
}
