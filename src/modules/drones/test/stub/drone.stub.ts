import { Drone } from '../../domain/entities/drone.entity';

export const droneStub = (): Drone => {
  return {
    id: 1,
    serialNumber: '5464gghfh',
    model: 'Cruiserweight',
    weightLimit: 500,
    batteryCapacity: 100,
    state: 'IDLE',
  } as Drone;
};
