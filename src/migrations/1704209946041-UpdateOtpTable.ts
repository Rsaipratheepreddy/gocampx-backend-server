import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateOtpTable1704209946041 implements MigrationInterface {
    name = 'UpdateOtpTable1704209946041'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "is_mobile_verified" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "otp" ADD CONSTRAINT "UQ_258d028d322ea3b856bf9f12f25" UNIQUE ("user_id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "otp" DROP CONSTRAINT "UQ_258d028d322ea3b856bf9f12f25"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "is_mobile_verified"`);
    }

}
