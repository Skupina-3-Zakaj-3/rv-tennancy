import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from 'src/reservation/entities/reservation.entity';
import { ReservationModule } from 'src/reservation/reservation.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('datasources.connection-url'),
        synchronize: true,
        logging: false,
        entities: [Reservation],
      }),
    }),
    ReservationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  static port: string | number;

  constructor(private readonly config: ConfigService) {
    AppModule.port = 3000;
  }
}
