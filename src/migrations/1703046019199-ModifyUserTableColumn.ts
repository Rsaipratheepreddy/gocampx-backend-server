import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifyUserTableColumn1703046019199 implements MigrationInterface {
    name = 'ModifyUserTableColumn1703046019199'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "referred_by" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "referred_by" SET NOT NULL`);
    }

}
