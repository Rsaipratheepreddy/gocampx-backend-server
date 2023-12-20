import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity()
export class Wallet {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: "user_id" })
    userId: string;

    @Column({ name: "available_coins" })
    availableCoins: number;

    @Column({ name: "cashback_coins" })
    cashbackCoins: number;

    @Column({ name: "redeemed_coins" })
    redeemedCoins: number;

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date;
}
