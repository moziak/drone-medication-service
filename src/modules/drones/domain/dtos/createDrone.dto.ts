import { DroneModel, DroneModels } from 'src/common';
import { ApiProperty } from '@nestjs/swagger';

import { IsIn, IsNotEmpty } from 'class-validator';
export class CreateDroneInput {
  @ApiProperty()
  @IsNotEmpty()
  serialNumber: string;

  @IsIn(DroneModels, { message: 'Invalid drone model' })
  @ApiProperty({})
  model: DroneModel;

  @ApiProperty()
  @IsNotEmpty()
  weightLimit: number;

  @ApiProperty()
  @IsNotEmpty()
  batteryCapacity: number;
}
