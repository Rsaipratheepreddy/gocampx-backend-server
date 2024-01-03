import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUserTable1704292288653 implements MigrationInterface {
    name = 'UpdateUserTable1704292288653'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_d34106f8ec1ebaf66f4f8609dd6" UNIQUE ("user_name")`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_3ce24ea034f2c96313a9fdb0cdc" UNIQUE ("mobile_no")`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_3ce24ea034f2c96313a9fdb0cdc"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_d34106f8ec1ebaf66f4f8609dd6"`);
    }

}
