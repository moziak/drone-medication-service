import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Drone } from './domain/entities/drone.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Drone])],
  controllers: [],
  providers: [],
})
export class DronesModule {}
