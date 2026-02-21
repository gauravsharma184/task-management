import { IsEnum } from 'class-validator';
import { TaksStatus } from '../task-status.enum';

export class UpdateTaskDTO {
  @IsEnum(TaksStatus)
  status: TaksStatus;
}
