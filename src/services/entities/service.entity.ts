import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity()
export class Service {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: "order_id" })
    orderId: string;

    @Column()
    title: string;

    @Column({ type: "text" })
    description: string;

    @Column()
    status: string;

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date;

}
