import { PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, Entity, OneToMany } from 'typeorm';


@Entity()
export class Otp {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: "user_id", unique: true })
    userId: string;

    @Column({ name: "otp" })
    otp: number;

}
