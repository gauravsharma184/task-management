import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
/*

  A module is a class that is annotated with the @Module decorator

  Providers are plain JS classes declared as providers in a nest js module

  @Injectable is a decoratot that is used to annotate a service , using this we handle to control to nestjs IoC container

  A dependecy is an object, value, function or service that a class needs to work but does not create itself

  An angular service is a typescript class decorated with @Injectable which makes an instance of the class available to be injected as a dependency

  #TypeORM
  .forRoot used to connect to the databse


*/
@Module({
  imports: [TasksModule, 
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'task_management',
      autoLoadEntities: true,
      synchronize: true,
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
