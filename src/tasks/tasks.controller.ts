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
import type { TaksStatus, Task } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTaskDTO } from './dto/filter-task.dto';

/*

    We will import task service for some reason will figure it out

*/

@Controller('tasks')
export class TasksController {
  //we are defining tasksService as a private member of the TasksController class
  constructor(private tasksService: TasksService) {}
  //controller for localhost3000/tasks/aksfalhsdjfhalskdf
  @Get()
  getTasks(@Query() filerTaskDTO: FilterTaskDTO): Task[] {
    //if there are filters defined, we would like to call tasksService.getTasksWithFilters
    console.log('filterTaskDto', filerTaskDTO);
    if (Object.keys(filerTaskDTO).length > 0) {
      return this.tasksService.getTasksWithFilters(filerTaskDTO);
    }
    //else return all tasks
    return this.tasksService.getAllTaks();
  }
  @Get('/:id')
  getTaskByID(@Param('id') id: string): Task | string {
    console.log('id', id);
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

  @Delete(':id')
  deleteTaskByID(@Param('id') id: string): void {
    return this.tasksService.deleteTaskByID(id);
  }
  /*
    for a patch request we refer to the resource and the the property to be patched
    task is refering to the resource
    http://localhost:3000/tasks/a64b7e48-5c12-4fdb-88e5-e10e163941ba/status
  */

  @Patch('/:id/status')
  updateTask(
    @Param('id') id: string,
    @Body('status') status: TaksStatus,
  ): Task | undefined {
    return this.tasksService.updateTask(id, status);
  }
}
