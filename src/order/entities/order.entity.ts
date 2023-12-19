import { User } from "../../user/entities/user.entity";
import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Order {
    
    // @ManyToOne(type => User, user => user.orders) user: User;
}
