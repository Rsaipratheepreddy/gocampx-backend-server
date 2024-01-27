import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateVendorTables1705644130290 implements MigrationInterface {
    name = 'UpdateVendorTables1705644130290'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "vendor_id"`);
        await queryRunner.query(`ALTER TABLE "order" ADD "vendor_id" uuid`);
        await queryRunner.query(`ALTER TABLE "vendor" ADD CONSTRAINT "UQ_6844bfc15b7819f02ee4299ac47" UNIQUE ("user_name")`);
        await queryRunner.query(`ALTER TABLE "vendor" DROP COLUMN "mobile_no"`);
        await queryRunner.query(`ALTER TABLE "vendor" ADD "mobile_no" bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_2ba44105c81d165b7b0493b95d4" FOREIGN KEY ("vendor_id") REFERENCES "vendor"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_2ba44105c81d165b7b0493b95d4"`);
        await queryRunner.query(`ALTER TABLE "vendor" DROP COLUMN "mobile_no"`);
        await queryRunner.query(`ALTER TABLE "vendor" ADD "mobile_no" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vendor" DROP CONSTRAINT "UQ_6844bfc15b7819f02ee4299ac47"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "vendor_id"`);
        await queryRunner.query(`ALTER TABLE "order" ADD "vendor_id" character varying`);
    }

}
