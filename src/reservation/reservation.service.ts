import { HttpModule, HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { firstValueFrom, from, map, switchMap, tap } from 'rxjs';
import { Repository } from 'typeorm/repository/Repository';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { Reservation } from './entities/reservation.entity';

@Injectable()
export class ReservationService {
  private rvsServiceBasePath = `http://rv-catalog:8082/v1`;
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
    private httpService: HttpService,
  ) {}
  create(createReservationDto: CreateReservationDto) {
    return this.reservationRepository.save(createReservationDto);
  }

  findAll() {
    return this.reservationRepository.find();
  }

  findOne(id: number) {
    return this.reservationRepository.findOne(id);
  }

  /* update(id: number, updateReservationDto: UpdateReservationDto) {
    return `This action updates a #${id} reservation`;
  } */

  remove(id: number) {
    return this.reservationRepository.delete(id);
  }

  findByUserId(userId: number) {
    return from(this.reservationRepository.find({ where: { userId: userId } }));
  }

  findRvsByUserId(userId: number): Promise<any> {
    return firstValueFrom(
      this.findByUserId(userId).pipe(
        switchMap((reservations) => {
          const rvIds = reservations.map((reservation) => reservation.rvId);
          return this.httpService.get(
            `${this.rvsServiceBasePath}/rvs?filter=rv_id:IN:[${rvIds}]`,
          );
        }),
        map((res) => {
          return res.data;
        }),
      ),
    );
  }
}
