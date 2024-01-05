import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateCollegeTable1704436650940 implements MigrationInterface {
    name = 'UpdateCollegeTable1704436650940'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "college" DROP COLUMN "location_Url"`);
        await queryRunner.query(`ALTER TABLE "college" ADD "college_code" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "college" ADD CONSTRAINT "UQ_de710b916134f9e0ddf092208b7" UNIQUE ("college_code")`);
        await queryRunner.query(`ALTER TABLE "college" ADD "location_url" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "college" ADD CONSTRAINT "UQ_f7a4e458fb9cda17d3b0867f4b8" UNIQUE ("college_name")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "college" DROP CONSTRAINT "UQ_f7a4e458fb9cda17d3b0867f4b8"`);
        await queryRunner.query(`ALTER TABLE "college" DROP COLUMN "location_url"`);
        await queryRunner.query(`ALTER TABLE "college" DROP CONSTRAINT "UQ_de710b916134f9e0ddf092208b7"`);
        await queryRunner.query(`ALTER TABLE "college" DROP COLUMN "college_code"`);
        await queryRunner.query(`ALTER TABLE "college" ADD "location_Url" character varying NOT NULL`);
    }

}
