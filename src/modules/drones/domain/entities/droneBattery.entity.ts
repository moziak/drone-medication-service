import { DroneState } from 'src/common';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class DroneBatteryLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  serialNumber: string;

  @Column()
  droneId: number;

  @Column()
  batteryLevel: number;

  @Column('varchar', { default: 'IDLE' })
  state: DroneState;

  @CreateDateColumn()
  createdAt: Date;
}
