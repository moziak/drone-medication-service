import { DroneModel, DroneState } from 'src/common';
import { ApiProperty } from '@nestjs/swagger';
export class DroneDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  serialNumber: string;

  @ApiProperty()
  model: DroneModel;

  @ApiProperty()
  weightLimit: number;

  @ApiProperty()
  batteryCapacity: number;

  @ApiProperty()
  state: DroneState;
}
