import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn({ name: 'reservation_id' })
  reservationId: number;
  @Column({ name: 'rv_id' })
  rvId: number;
  @Column({ name: 'user_id' })
  userId: number;
  @Column({ name: 'start_date' })
  startDate: Date;
  @Column({ name: 'end_date' })
  endDate: Date;
  @Column({ name: 'rv_bill_id' })
  rvBillId: number;
}
