import { DroneModels, DroneStates } from '../constants';

export type DroneState = (typeof DroneStates)[number];
export type DroneModel = (typeof DroneModels)[number];
