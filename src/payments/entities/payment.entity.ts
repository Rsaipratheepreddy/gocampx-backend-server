import { User } from "../../user/entities/user.entity";
import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Payment {

    // @ManyToOne(type => User, user => user.payments) user: User;
}
