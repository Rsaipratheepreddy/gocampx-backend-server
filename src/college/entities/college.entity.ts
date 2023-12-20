import { PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, Entity } from 'typeorm';


@Entity()
export class College {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: "college_name" })
    collegeName: string;

    @Column({})
    address: string;

    @Column({ name: "location_Url" })
    locationUrl: string;

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date;
}
