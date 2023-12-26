import { MigrationInterface, QueryRunner } from "typeorm";

export class AddWalletRelations1703586686026 implements MigrationInterface {
    name = 'AddWalletRelations1703586686026'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "otp" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" character varying NOT NULL, "otp" integer NOT NULL, CONSTRAINT "PK_32556d9d7b22031d7d0e1fd6723" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "wallet_transaction" DROP COLUMN "wallet_id"`);
        await queryRunner.query(`ALTER TABLE "wallet_transaction" ADD "wallet_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "wallet" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "wallet" ADD "user_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "wallet" ADD CONSTRAINT "UQ_72548a47ac4a996cd254b082522" UNIQUE ("user_id")`);
        await queryRunner.query(`ALTER TABLE "wallet_transaction" ADD CONSTRAINT "FK_3694dd13a5c66114b4474c86904" FOREIGN KEY ("wallet_id") REFERENCES "wallet"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "wallet" ADD CONSTRAINT "FK_72548a47ac4a996cd254b082522" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "wallet" DROP CONSTRAINT "FK_72548a47ac4a996cd254b082522"`);
        await queryRunner.query(`ALTER TABLE "wallet_transaction" DROP CONSTRAINT "FK_3694dd13a5c66114b4474c86904"`);
        await queryRunner.query(`ALTER TABLE "wallet" DROP CONSTRAINT "UQ_72548a47ac4a996cd254b082522"`);
        await queryRunner.query(`ALTER TABLE "wallet" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "wallet" ADD "user_id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "wallet_transaction" DROP COLUMN "wallet_id"`);
        await queryRunner.query(`ALTER TABLE "wallet_transaction" ADD "wallet_id" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "otp"`);
    }

}
