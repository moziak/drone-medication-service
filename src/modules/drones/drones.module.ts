import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DronesController } from './controller/drones.controller';
import { Drone } from './domain/entities/drone.entity';
import { TYPES } from './domain/intefaces/types';
import { DroneServiceImpl } from './services/drone.service';
@Module({
  imports: [TypeOrmModule.forFeature([Drone])],
  controllers: [DronesController],
  providers: [
    {
      provide: TYPES.services.DRONE_SERVICE,
      useClass: DroneServiceImpl,
    },
  ],
})
export class DronesModule {}
