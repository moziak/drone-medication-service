import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { datasourceOptions } from 'data/data-source';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configuration } from './config/configuration';
import { DronesModule } from './modules/drones/drones.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    DronesModule,
    TypeOrmModule.forRoot(datasourceOptions),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
