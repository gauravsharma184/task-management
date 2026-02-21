import { IsEnum } from 'class-validator';
import { TaksStatus } from '../task.model';

export class UpdateTaskDTO {
  @IsEnum(TaksStatus)
  status: TaksStatus;
}
