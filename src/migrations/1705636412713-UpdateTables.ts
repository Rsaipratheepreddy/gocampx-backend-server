import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTables1705636412713 implements MigrationInterface {
    name = 'UpdateTables1705636412713'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "service" DROP COLUMN "order_id"`);
        await queryRunner.query(`ALTER TABLE "service" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "service" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "service" ADD "type" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "service" ADD "price-config" jsonb NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_3ce24ea034f2c96313a9fdb0cdc"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "mobile_no"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "mobile_no" bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_3ce24ea034f2c96313a9fdb0cdc" UNIQUE ("mobile_no")`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "order" ADD "user_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "service_id"`);
        await queryRunner.query(`ALTER TABLE "order" ADD "service_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "vendor_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "delivery_data" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_199e32a02ddc0f47cd93181d8fd" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_d33d62cc4f08f6bd10dd7a68f65" FOREIGN KEY ("service_id") REFERENCES "service"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_d33d62cc4f08f6bd10dd7a68f65"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_199e32a02ddc0f47cd93181d8fd"`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "delivery_data" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "vendor_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "service_id"`);
        await queryRunner.query(`ALTER TABLE "order" ADD "service_id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "order" ADD "user_id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_3ce24ea034f2c96313a9fdb0cdc"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "mobile_no"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "mobile_no" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_3ce24ea034f2c96313a9fdb0cdc" UNIQUE ("mobile_no")`);
        await queryRunner.query(`ALTER TABLE "service" DROP COLUMN "price-config"`);
        await queryRunner.query(`ALTER TABLE "service" DROP COLUMN "type"`);
        await queryRunner.query(`ALTER TABLE "service" ADD "description" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "service" ADD "title" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "service" ADD "order_id" character varying NOT NULL`);
    }

}
