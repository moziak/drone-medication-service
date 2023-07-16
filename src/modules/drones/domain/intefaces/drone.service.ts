import { CreateDroneInput } from '../dtos/createDrone.dto';
import { DroneDto } from '../dtos/drone.dto';

export interface IDroneService {
  create(payload: CreateDroneInput): Promise<DroneDto>;
  getDroneBatteryLevel(droneId: number): Promise<number>;
  getAvailableDrones(): Promise<DroneDto[]>;
}
