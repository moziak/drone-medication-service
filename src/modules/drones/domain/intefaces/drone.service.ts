import { MedicationItemDto } from 'src/modules/medications/domain/entities/dtos/medicationItem.dto';
import { CreateDroneInput } from '../dtos/createDrone.dto';
import { DroneDto, DroneMedicationDto } from '../dtos/drone.dto';

export interface IDroneService {
  create(payload: CreateDroneInput): Promise<DroneDto>;
  getDroneBatteryLevel(droneId: number): Promise<number>;
  getAvailableDrones(): Promise<DroneDto[]>;
  loadDrone(droneId: number, items: MedicationItemDto[]): Promise<void>;
  getLoadedDrone(droneId: number): Promise<DroneMedicationDto>;
}
