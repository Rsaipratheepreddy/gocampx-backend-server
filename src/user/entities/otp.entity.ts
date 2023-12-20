import { Order } from '../../order/entities/order.entity';
import { Payment } from '../../payments/entities/payment.entity';
import { PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, Entity, OneToMany } from 'typeorm';


@Entity()
export class Otp {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: "user_id" })
    userId: string;

    @Column({ name: "otp" })
    otp: number;

}
