import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpException,
  HttpStatus,
  Query,
  HttpService,
} from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { catchError, switchMap } from 'rxjs';

@Controller('rv-reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() createReservationDto: CreateReservationDto) {
    let res;
    try {
      res = await this.reservationService.create(createReservationDto);
    } catch (error) {
      throw new HttpException(
        'Adding reservation unsuccessful',
        HttpStatus.BAD_REQUEST,
      );
    }
    return res;
  }

  @Get()
  async findAll() {
    let res;
    try {
      res = await this.reservationService.findAll();
    } catch (error) {
      throw new HttpException(
        'Retrieving reservations unsuccessful',
        HttpStatus.BAD_REQUEST,
      );
    }
    return res;
  }

  @Get('rvs')
  async findAllUserRvs(@Query('userId') userId: number) {
    let res;
    try {
      res = await this.reservationService.findRvsByUserId(userId);
    } catch (error) {
      throw new HttpException(
        'Retrieving rv reservations for user unsuccessful',
        HttpStatus.BAD_REQUEST,
      );
    }
    return res;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    let res;
    try {
      res = await this.reservationService.findOne(+id);
    } catch (error) {
      throw new HttpException(
        'Retrieving reservation unsuccessful',
        HttpStatus.BAD_REQUEST,
      );
    }
    return res;
  }

  /* @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateReservationDto: UpdateReservationDto,
  ) {
    return this.reservationService.update(+id, updateReservationDto);
  } */

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    const deleted = await this.reservationService.remove(+id);

    if (deleted.affected > 0) {
      return;
    } else {
      throw new HttpException('Delete unsuccessful', HttpStatus.BAD_REQUEST);
    }
  }
}
