import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { Reservation } from './entities/reservation.entity';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
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
    return this.reservationRepository.find({ where: { userId: userId } });
  }
}
