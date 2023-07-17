import { Drone } from 'src/modules/drones/domain/entities/drone.entity';
import dataSource from './data-source';

async function seed() {
  const drones = await dataSource.manager.find(Drone);
  console.log(drones);

  //   // Seed data
  //   const medicationsData = [
  //     { name: 'Medication 1', weight: 100, code: 'MED001' },
  //     { name: 'Medication 2', weight: 200, code: 'MED002' },
  //     // Add more medication data as needed
  //   ];
  //   const medications = medicationRepository.create(medicationsData);
  //   await medicationRepository.save(medications);

  //   console.log('Data seeded successfully');

  //   await connection.close();
}

seed().catch((error) => console.error(error));
