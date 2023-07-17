import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsThrowableException } from '../../../common/exceptions/IsThrowableException';
import { Repository } from 'typeorm';
import { CreateDroneInput } from '../domain/dtos/createDrone.dto';
import { DroneDto } from '../domain/dtos/drone.dto';
import { Drone } from '../domain/entities/drone.entity';
import { IDroneService } from '../domain/intefaces/drone.service';
import { Medication } from 'src/modules/medications/domain/entities/medication.entity';
import { MedicationItemDto } from 'src/modules/medications/domain/entities/dtos/medicationItem.dto';

@Injectable()
export class DroneServiceImpl implements IDroneService {
  constructor(
    @InjectRepository(Drone) private dronesRepository: Repository<Drone>,
    @InjectRepository(Drone)
    private medicationsRepository: Repository<Medication>,
  ) {}

  public async create(payload: CreateDroneInput): Promise<DroneDto> {
    try {
      if (payload.weightLimit > 500) {
        throw new BadRequestException('Weight should not exceed 500');
      }
      return await this.dronesRepository.save({ ...payload });
    } catch (error) {
      IsThrowableException(error);
    }
  }

  public async getDroneBatteryLevel(droneId: number): Promise<number> {
    try {
      const drone = await this.dronesRepository.findOne({
        where: { id: droneId },
        select: ['batteryCapacity'],
      });
      if (!drone) throw new NotFoundException('drone not found');
      return drone.batteryCapacity;
    } catch (error) {
      IsThrowableException(error);
    }
  }

  public async getAvailableDrones(): Promise<DroneDto[]> {
    try {
      return await this.dronesRepository.find({ where: { state: 'IDLE' } });
    } catch (error) {
      IsThrowableException(error);
    }
  }

  public async getById(id: number): Promise<DroneDto> {
    try {
      const drone = await this.dronesRepository.findOne({ where: { id } });
      if (!drone)
        throw new NotFoundException(`drone with id:${id} is not found`);
      return drone;
    } catch (error) {
      throw new IsThrowableException(error);
    }
  }
  public async loadDrone(
    droneId: number,
    items: MedicationItemDto[],
  ): Promise<void> {
    try {
      const drone = await this.getById(droneId);

      if (drone.state !== 'IDLE') {
        throw new BadRequestException('Drone not available');
      }

      // Check weight limit
      const totalWeight = items.reduce((sum, med) => sum + med.weight, 0);
      if (totalWeight > drone.weightLimit) {
        throw new BadRequestException('Exceeded weight limit');
      }

      // Check battery level
      if (drone.batteryCapacity < 25) {
        throw new BadRequestException('Battery level is below 25%');
      }

      // Load medication
      drone.state = 'LOADING';
      await this.updateDrone(droneId, { state: 'LOADING' });

      const medications: Medication[] = items.map((item) => {
        return {
          droneId,
          ...item,
        };
      });

      await this.medicationsRepository.save(medications);

      drone.state = 'LOADED';
      await this.updateDrone(droneId, { state: 'LOADED' });
    } catch (error) {
      throw new IsThrowableException(error);
    }
  }
  async updateDrone(id: number, drone: Partial<Drone>) {
    await this.dronesRepository.update(id, { ...drone });
  }
}
