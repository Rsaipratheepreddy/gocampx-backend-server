import { Wallet } from "../../wallet/entities/wallet.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "wallet_transaction" })
export class WalletTransaction {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: "wallet_id" })
    walletId: string;

    @Column({ name: "user_id" })
    userId: string;

    @Column({ name: "payment_id" })
    paymentId: string;

    @Column({ name: "transaction_amount" })
    transactionAmount: number;

    @Column({ name: "transaction_type" })
    transactionType: string;

    @Column({ name: "transaction_status" })
    transactionStatus: string;

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date;

    @ManyToOne(type => Wallet, wallet => wallet.walletTransactions, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'wallet_id' })
    wallet: Wallet;

}
