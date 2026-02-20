import { TaksStatus } from '../task.model';

export class FilterTaskDTO {
  status?: TaksStatus;
  search?: string;
}
