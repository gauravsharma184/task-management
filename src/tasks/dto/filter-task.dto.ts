import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { TaksStatus } from '../task.model';

export class FilterTaskDTO {
  @IsOptional()
  @IsEnum(TaksStatus)
  status?: TaksStatus;
  @IsOptional()
  @IsNotEmpty()
  search?: string;
}
