import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import type { TaksStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTaskDTO } from './dto/filter-task.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';
import { Task } from './task.entity';
import { DeleteResult } from 'typeorm';

/*

    We will import task service for some reason will figure it out

*/
/*
  ##Nest JS pipes
    pipes operate on the arguments which are to be processed by the handler
    pipes can perform data transformation or validation
    pipes return data either modified or unmodified and pass it to the route handler
    pipes can throw exceptions
  
  TYPES OF PIPES
    1>Parameter level pipes
    2>Handler-level pipes

*/

@Controller('tasks')
export class TasksController {
  //we are defining tasksService as a private member of the TasksController class
  constructor(private tasksService: TasksService) {}
  //controller for localhost3000/tasks/aksfalhsdjfhalskdf
  @Get()
  getTasks(@Query() filterTaskDto: FilterTaskDTO): Promise<Task[]> {
    console.log('filterTaskDto:', filterTaskDto);
    return this.tasksService.getTasks(filterTaskDto);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string) {
    console.log('id', id);
    return this.tasksService.getTaskByID(id);
  }

  // /*
  //   entire request body goes to the parameter after the @Body decorator
  // */
  @Post()
  async createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.createTask(createTaskDto);
  }

  @Delete('/:id')
  deleteTaskByID(@Param('id') id: string): Promise<DeleteResult> {
    return this.tasksService.deleteTaskByID(id);
  }

  // /*
  //   for a patch request we refer to the resource and the the property to be patched
  //   task is refering to the resource
  //   http://localhost:3000/tasks/a64b7e48-5c12-4fdb-88e5-e10e163941ba/status
  // */
  @Patch('/:id/status')
  updateTask(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDTO,
  ): Promise<Task> {
    console.log('id:', id);
    return this.tasksService.updateTask(id, updateTaskDto);
  }
}
