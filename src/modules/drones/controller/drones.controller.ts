import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { MedicationItemDto } from 'src/modules/medications/domain/entities/dtos/medicationItem.dto';
import { CreateDroneInput } from '../domain/dtos/createDrone.dto';
import { DroneDto, DroneMedicationDto } from '../domain/dtos/drone.dto';
import { LoadDroneDto } from '../domain/dtos/loadDrone.dto';
import { IDroneService } from '../domain/intefaces/drone.service';
import { TYPES } from '../domain/intefaces/types';

@Controller('drones')
@ApiTags('drones')
export class DronesController {
  constructor(
    @Inject(TYPES.services.DRONE_SERVICE)
    private readonly droneService: IDroneService,
  ) {}

  @ApiCreatedResponse({
    description: 'It creates a new drone',
    type: DroneDto,
  })
  @Post()
  async Create(@Body() payload: CreateDroneInput): Promise<DroneDto> {
    return await this.droneService.create(payload);
  }

  @Get(':id/battery')
  async getDroneBatteryLevel(@Param('id') droneId: number): Promise<number> {
    return this.droneService.getDroneBatteryLevel(droneId);
  }

  @ApiOkResponse({
    description: 'It fetch a available drones',
    type: [DroneDto],
  })
  @Get('available')
  async getAvailableDrones(): Promise<DroneDto[]> {
    return this.droneService.getAvailableDrones();
  }

  @Post(':id/load')
  async loadMedication(
    @Param('id') id: number,
    @Body() payload: LoadDroneDto,
  ): Promise<void> {
    return this.droneService.loadDrone(id, payload.items);
  }

  @Get(':id/loaded-items')
  async loadedMedication(@Param('id') id: number): Promise<DroneMedicationDto> {
    return this.droneService.getLoadedDrone(id);
  }
}
