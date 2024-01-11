import { PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, Entity } from 'typeorm';


@Entity()
export class College {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: "college_name", unique: true })
    collegeName: string;

    @Column()
    address: string;

    @Column({ name: "college_code", unique: true })
    collegeCode: string;

    @Column({ name: "location_url" })
    locationUrl: string;

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date;
}
