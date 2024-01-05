import { User } from "../../user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { BindingOrderDetailsDto } from "../dto/order-details.dto";
import { BindingOrderPriceDetails } from "../dto/create-order.dto";

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
    vendorId: string | number | object;

    @Column({ name: "order_status" })
    orderStatus: string;

    @Column({ name: "delivery_data" })
    deliveryDate: Date;

    @Column({ name: "order_details", type: 'jsonb', nullable: true })
    orderDetails: BindingOrderDetailsDto[];

    @Column({ name: "order-price-details", type: 'jsonb', nullable: true })
    orderPriceDetails: any;

    @Column({ name: "order_otp" })
    orderOtp: string;

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date;
}
