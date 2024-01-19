import { User } from "../../user/entities/user.entity";
import { Service } from "../../services/entities/service.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { BindingOrderDetailsDto } from "../dto/order-details.dto";
import { BindingOrderPriceDetails } from "../dto/create-order.dto";
import { Vendor } from "../../vendor/entities/vendor.entity";

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

    @Column({ name: "vendor_id", nullable: true })
    vendorId: string;

    @Column({ name: "order_status" })
    orderStatus: string;

    @Column({ name: "delivery_data", nullable:true })
    deliveryDate: Date;

    @Column({ name: "order_details", type: 'jsonb' })
    orderDetails: BindingOrderDetailsDto[];

    @Column({ name: "order_otp" })
    orderOtp: string;

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date;

    @ManyToOne(type => User, user => user.orders, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(type => Service, service => service.orders, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'service_id' })
    service: Service;

    @ManyToOne(type => Vendor, vendor => vendor.orders, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'vendor_id' })
    vendor: Vendor;
}
