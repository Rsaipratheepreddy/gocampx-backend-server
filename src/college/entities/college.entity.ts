import { PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, Entity } from 'typeorm';


@Entity()
export class College {
   @PrimaryGeneratedColumn('uuid')
   id: string;
   
   @Column({})
   collegeName: string;

   @Column({})
    address: string;

   @Column({})
    locationUrl: string;

    @Column({})
    createdAt: string;

    @Column({})
    updatedAt: string;
}
