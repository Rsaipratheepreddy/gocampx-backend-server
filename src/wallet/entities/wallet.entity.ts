import { WalletTransaction } from "../../wallet-transactions/entities/wallet-transaction.entity";
import { User } from "../../user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


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

    @OneToOne(() => User, (user) => user.wallet)
    @JoinColumn({ name: 'user_id' })
    user: User

    @OneToMany(() => WalletTransaction, (walletTransaction) => walletTransaction.wallet, { eager: true })
    walletTransactions: WalletTransaction[]
}
