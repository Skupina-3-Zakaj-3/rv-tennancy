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
} from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';

@Controller('rvs')
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
  async findAll(@Query('userId') userId: number) {
    let res;
    try {
      if (userId) {
        res = await this.reservationService.findByUserId(userId);
      } else res = await this.reservationService.findAll();
    } catch (error) {
      throw new HttpException(
        'Retrieving reservations unsuccessful',
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
