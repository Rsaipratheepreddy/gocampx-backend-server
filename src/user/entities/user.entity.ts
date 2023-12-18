import { PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, Entity } from 'typeorm';


@Entity()
export abstract class User {
   @PrimaryGeneratedColumn('uuid')
   id: string;
   
   @Column({})
   firstName: string;

   @Column({})
   lastName: string;

   @Column({})
    userName: string;

   @Column({})
    password: string;

    @Column({})
    email: string;

    @Column({})
    authType: string;

    @Column({})
    collegeName: string;

    @Column({})
    referralId: string

    @Column({})
    referredBy: string

    @Column({})
    createdAt: string;

    @Column({})
    updatedAt: string;

}
