import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { DroneModel, DroneState } from 'src/common';

@Entity()
export class Drone {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  serialNumber: string;

  @Column('varchar', { default: 'Lightweight' })
  model: DroneModel;

  @Column()
  weightLimit: number;

  @Column()
  batteryCapacity: number;

  @Column('varchar', { default: 'IDLE' })
  state: DroneState;
}
