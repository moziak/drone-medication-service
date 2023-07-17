import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Matches } from 'class-validator';
export class MedicationItemDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  @Matches(/^[a-zA-Z0-9\-_]+$/, {
    message: 'Only letters, numbers, "-", and "_" are allowed.',
  })
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  weight: number;

  @ApiProperty()
  @IsNotEmpty()
  @Matches(/^[A-Z0-9_]+$/, {
    message: 'Only upper case letters, underscore, and numbers are allowed.',
  })
  code: string;

  @ApiProperty()
  @IsNotEmpty()
  image: string;
}
