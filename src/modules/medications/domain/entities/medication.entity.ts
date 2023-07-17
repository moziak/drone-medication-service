import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Medication {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  weight: number;

  @Column()
  code: string;

  @Column()
  image: string;

  @Column()
  droneId: number;
}
