import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Drone } from '../../domain/entities/drone.entity';
import { DroneServiceImpl } from '../../services/drone.service';
import { droneStub } from '../stub/drone.stub';

describe('drones service', () => {
  let service: DroneServiceImpl;
  let droneRepositoryMock: Repository<Drone>;
  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        DroneServiceImpl,
        {
          provide: getRepositoryToken(Drone),
          useValue: {
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<DroneServiceImpl>(DroneServiceImpl);
    droneRepositoryMock = module.get<Repository<Drone>>(
      getRepositoryToken(Drone),
    );
  });

  it('drone service should be define', () => {
    expect(service).toBeDefined();
  });

  it('drone repository should be define', () => {
    expect(droneRepositoryMock).toBeDefined();
  });

  describe('create drone', () => {
    it('should create drone when supplied with valid parameters', async () => {
      jest
        .spyOn(droneRepositoryMock, 'save')
        .mockResolvedValueOnce(droneStub());
      expect(
        await service.create({
          serialNumber: droneStub().serialNumber,
          model: droneStub().model,
          weightLimit: droneStub().weightLimit,
          batteryCapacity: droneStub().batteryCapacity,
        }),
      ).toEqual(droneStub());
      expect(droneRepositoryMock.save).toBeCalled();
    });

    it('create drone should throw bad request when supplied with invalid parameters', (done) => {
      service
        .create({
          serialNumber: droneStub().serialNumber,
          model: droneStub().model,
          weightLimit: 600,
          batteryCapacity: droneStub().batteryCapacity,
        })
        .then(() => {
          done('should not get here');
        })
        .catch((error) => {
          expect(error).toBeInstanceOf(BadRequestException);
          expect(error.response.message).toEqual(
            `Weight should not exceed 500`,
          );
          done();
        });
    });
  });

  describe('getDroneBatteryLevel', () => {
    describe('when valid drone id is supply', () => {
      it('then it should return batter level of the drone', async () => {
        jest
          .spyOn(droneRepositoryMock, 'findOne')
          .mockResolvedValueOnce(droneStub());
        expect(await service.getDroneBatteryLevel(droneStub().id)).toEqual(
          droneStub().batteryCapacity,
        );
        expect(droneRepositoryMock.findOne).toBeCalled();
      });
    });

    describe('when invalid drone id is supply', () => {
      it('throws 404 error when drone is not found', (done) => {
        jest.spyOn(droneRepositoryMock, 'findOne').mockResolvedValueOnce(null);

        service
          .getDroneBatteryLevel(100)
          .then(() => {
            done('should not get here');
          })
          .catch((error) => {
            expect(error).toBeInstanceOf(NotFoundException);
            expect(error.response.message).toEqual(`drone not found`);
            done();
          });
        expect(droneRepositoryMock.findOne).toBeCalled();
      });
    });
  });

  describe('getAvailableDrones', () => {
    it('then it should return list of available drone', async () => {
      jest
        .spyOn(droneRepositoryMock, 'find')
        .mockResolvedValueOnce([droneStub()]);
      const drone = await service.getAvailableDrones();
      expect(drone).toEqual([droneStub()]);
      expect(drone[0].state).toEqual('IDLE');
      expect(droneRepositoryMock.find).toBeCalled();
    });
  });

  describe('loadDrone', () => {
    describe('when invalid drone id is supply', () => {
      it('throws 404 error when drone is not found', (done) => {
        jest.spyOn(droneRepositoryMock, 'findOne').mockResolvedValueOnce(null);
        service
          .loadDrone(droneStub().id, [])
          .then(() => {
            done('Should not get here');
          })
          .catch((error) => {
            expect(error).toBeInstanceOf(NotFoundException);
            expect(error.response.message).toEqual(
              `drone with id:${droneStub().id} is not found`,
            );
            done();
          });
        expect(droneRepositoryMock.findOne).toBeCalled();
      });
    });

    describe('when weight exceed the allowed max value', () => {
      it('throws 400 error', (done) => {
        jest
          .spyOn(droneRepositoryMock, 'findOne')
          .mockResolvedValueOnce(droneStub());
        service
          .loadDrone(droneStub().id, [
            {
              code: 1,
              image: 'image string',
              name: 'med 1',
              id: 1,
              weight: 600,
            },
          ])
          .then(() => {
            done('Should not get here');
          })
          .catch((error) => {
            expect(error).toBeInstanceOf(BadRequestException);
            expect(error.response.message).toEqual(`Exceeded weight limit`);
            done();
          });
        expect(droneRepositoryMock.findOne).toBeCalled();
      });
    });

    describe('when battery level is below 25%', () => {
      it('throws 400 error', (done) => {
        jest
          .spyOn(droneRepositoryMock, 'findOne')
          .mockResolvedValueOnce({ ...droneStub(), batteryCapacity: 20 });
        service
          .loadDrone(droneStub().id, [
            {
              code: 1,
              image: 'image string',
              name: 'med 1',
              id: 1,
              weight: 400,
            },
          ])
          .then(() => {
            done('Should not get here');
          })
          .catch((error) => {
            expect(error).toBeInstanceOf(BadRequestException);
            expect(error.response.message).toEqual(
              `Battery level is below 25%`,
            );
            done();
          });
        expect(droneRepositoryMock.findOne).toBeCalled();
      });
    });

    describe('when drone is not IDLE', () => {
      it('throws 400 error', (done) => {
        jest
          .spyOn(droneRepositoryMock, 'findOne')
          .mockResolvedValueOnce({ ...droneStub(), state: 'LOADED' });
        service
          .loadDrone(droneStub().id, [
            {
              code: 1,
              image: 'image string',
              name: 'med 1',
              id: 1,
              weight: 400,
            },
          ])
          .then(() => {
            done('Should not get here');
          })
          .catch((error) => {
            expect(error).toBeInstanceOf(BadRequestException);
            expect(error.response.message).toEqual(`Drone not available`);
            done();
          });
        expect(droneRepositoryMock.findOne).toBeCalled();
      });
    });
  });
});
