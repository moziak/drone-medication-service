import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { CreateDroneInput } from '../domain/dtos/createDrone.dto';
import { DroneDto } from '../domain/dtos/drone.dto';
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
}
