import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { BindingPriceConfig } from "../dto/service-price-details";


@Entity()
export class Service {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({name : "type"})
    type: string;

    @Column()
    title: string;

    @Column({ type: 'jsonb' , name: 'price-config'})
    priceConfig: BindingPriceConfig;

    @Column()
    status: string;

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date;

}
