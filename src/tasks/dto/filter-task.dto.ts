import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { TaksStatus } from '../task-status.enum';

export class FilterTaskDTO {
  @IsOptional()
  @IsEnum(TaksStatus)
  status?: TaksStatus;
  @IsOptional()
  @IsNotEmpty()
  search?: string;
}
