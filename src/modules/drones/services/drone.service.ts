import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsThrowableException } from '../../../common/exceptions/IsThrowableException';
import { Repository } from 'typeorm';
import { CreateDroneInput } from '../domain/dtos/createDrone.dto';
import { DroneDto } from '../domain/dtos/drone.dto';
import { Drone } from '../domain/entities/drone.entity';
import { IDroneService } from '../domain/intefaces/drone.service';

@Injectable()
export class DroneServiceImpl implements IDroneService {
  constructor(
    @InjectRepository(Drone) private dronesRepository: Repository<Drone>,
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
}