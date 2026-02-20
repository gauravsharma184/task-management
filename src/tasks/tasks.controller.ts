import { Controller, Get } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';

/*

    We will import task service for some reason will figure it out

*/

@Controller('tasks')
export class TasksController {
  //we are defining tasksService as a private member of the TasksController class
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTaks();
  }
}
