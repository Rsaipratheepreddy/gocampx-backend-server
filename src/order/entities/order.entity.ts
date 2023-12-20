import { User } from "../../user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Order {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: "user_id" })
    userId: string;

    @Column({ name: "service_id" })
    serviceId: string;

    @Column({ name: "payment_id" })
    paymentId: string;

    @Column({ name: "vendor_id" })
    vendorId: string;

    @Column({ name: "order_status" })
    orderStatus: string;

    @Column({ name: "delivery_data" })
    deliveryDate: Date;

    @Column({ name: "order_details", type:"jsonb" })
    orderDetails: string;

    @Column({ name: "order_otp" })
    orderOtp: string;

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date;

    // @ManyToOne(type => User, user => user.orders) user: User;
}
