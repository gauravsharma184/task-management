import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';
import { AuthModule } from '../auth/auth.module';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/auth/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), AuthModule],
  controllers: [TasksController],
  providers: [TasksService, TaskRepository, JwtService, UserRepository],
})
export class TasksModule {}
