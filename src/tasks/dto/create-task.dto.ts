/*

 Data Transfer Object is an object that transfers data between processes
  Problem: need to call the properties of task multiple times
  there should be a single source of truth

  #it defines the shape of data for an operation and not an entity
  # DTO can be defined as classes or interfaces, the recommended approach is to use classes

*/

export class CreateTaskDto {
  title: string;
  description: string;
}
