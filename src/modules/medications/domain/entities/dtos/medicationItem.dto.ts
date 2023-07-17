import { ApiProperty } from '@nestjs/swagger';
export class MedicationItemDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  weight: number;

  @ApiProperty()
  code: number;

  @ApiProperty()
  image: string;
}
