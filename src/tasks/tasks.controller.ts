import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import type { Task } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';

/*

    We will import task service for some reason will figure it out

*/

@Controller('tasks')
export class TasksController {
  //we are defining tasksService as a private member of the TasksController class
  constructor(private tasksService: TasksService) {}
  //controller for localhost3000/tasks/aksfalhsdjfhalskdf
  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTaks();
  }
  @Get(':id')
  getTaskByID(@Param('id') id: string): Task | string {
    console.log(id);
    const task: Task | undefined = this.tasksService.getTaskByID(id);
    if (task) return task;
    return 'task does not exist';
  }
  /*
    entire request body goes to the parameter after the @Body decorator
  */
  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(createTaskDto);
  }
}
