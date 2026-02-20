import { Injectable } from '@nestjs/common';
import { TaksStatus, Task } from './task.model';
import { v4 as uuid } from 'uuid';
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

  createTask(title: string, description: string): Task {
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaksStatus.OPEN,
    };

    this.tasks.push(task);

    return task;
  }
}
