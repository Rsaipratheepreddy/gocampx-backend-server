import { User } from "../../user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:"payment_transaction"})
export class Payment {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: "user_id" })
    userId: string;

    @Column({ name: "transaction_id" })
    transactionId: string;

    @CreateDateColumn({ name: "data_of_transaction" })
    dateOfTransaction: Date;

    @Column({ name: "payment_mode" })
    paymentMode: string;

    @Column({ name: "status" })
    status: string;

    // @ManyToOne(type => User, user => user.payments) user: User;

}
