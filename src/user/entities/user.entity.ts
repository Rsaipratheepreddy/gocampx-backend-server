import { Order } from '../../order/entities/order.entity';
import { Payment } from '../../payments/entities/payment.entity';
import { PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, Entity, OneToMany } from 'typeorm';


@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: "first_name" })
    firstName: string;

    @Column({ name: "last_name" })
    lastName: string;

    @Column({ name: "user_name" })
    userName: string;

    @Column()
    password: string;

    @Column({ name: "mobile_no" })
    mobileNo: number;

    @Column()
    email: string;

    @Column({ name: "auth_type" })
    authType: string;

    @Column({ name: "college_id" })
    collegeId: string;

    @Column({ name: "referral_id" })
    referralId: string

    @Column({ name: "referred_by", nullable: true })
    referredBy: string

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date;

    // @OneToMany(type => Payment, payment => payment.user) payments: Payment[];

    // @OneToMany(type => Order, order => order.user) orders: Order[];

}
