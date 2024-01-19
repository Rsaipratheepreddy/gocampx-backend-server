import { Order } from "../../order/entities/order.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity()
export class Vendor {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: "first_name" })
    firstName: string;

    @Column({ name: "last_name" })
    lastName: string;

    @Column({ name: "user_name", unique:true })
    userName: string;

    @Column()
    password: string;

    @Column({ name: "mobile_no", type:'bigint' })
    mobileNo: number;

    @Column()
    email: string;

    @Column({ name: "auth_type" })
    authType: string;

    @Column({ name: "shop_name" })
    shopName: string;

    @Column({ name: "shop_address" })
    shopAddress: string

    @Column({ type: "jsonb" })
    services: string[];

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date;

    @OneToMany(type => Order, order => order.vendor)
    orders: Order[];


}
