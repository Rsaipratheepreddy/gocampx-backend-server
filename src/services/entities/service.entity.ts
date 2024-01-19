import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { BindingPriceConfig } from "../dto/service-price-details";
import { Order } from "../../order/entities/order.entity";


@Entity()
export class Service {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({name : "type"})
    type: string;

    @Column({ type: 'jsonb' , name: 'price-config'})
    priceConfig: BindingPriceConfig;

    @Column()
    status: string;

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date;

    @OneToMany(type => Order, order => order.service)
    orders: Order[];

}
