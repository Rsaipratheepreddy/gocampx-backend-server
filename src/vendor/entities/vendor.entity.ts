import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity()
export class Vendor {

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

    @Column({ name: "shop_name" })
    shopName: string;

    @Column({ name: "shop_address" })
    shopAddress: string

    @Column({ type: "jsonb" })
    services: string;

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date;

}
