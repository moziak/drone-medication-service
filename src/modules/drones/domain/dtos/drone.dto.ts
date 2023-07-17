import { DroneModel, DroneState } from 'src/common';
import { ApiProperty } from '@nestjs/swagger';
import { MedicationItemDto } from 'src/modules/medications/domain/entities/dtos/medicationItem.dto';
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

export class DroneMedicationDto extends DroneDto {
  medications: MedicationItemDto[];
}
