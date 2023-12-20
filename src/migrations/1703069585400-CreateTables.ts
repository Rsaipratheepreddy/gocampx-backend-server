import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1703069585400 implements MigrationInterface {
    name = 'CreateTables1703069585400'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "wallet" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" character varying NOT NULL, "available_coins" integer NOT NULL, "cashback_coins" integer NOT NULL, "redeemed_coins" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_bec464dd8d54c39c54fd32e2334" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "wallet_transaction" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "wallet_id" character varying NOT NULL, "user_id" character varying NOT NULL, "payment_id" character varying NOT NULL, "transaction_amount" integer NOT NULL, "transaction_type" character varying NOT NULL, "transaction_status" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_62a01b9c3a734b96a08c621b371" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" character varying NOT NULL, "service_id" character varying NOT NULL, "payment_id" character varying NOT NULL, "vendor_id" character varying NOT NULL, "order_status" character varying NOT NULL, "delivery_data" TIMESTAMP NOT NULL, "order_details" jsonb NOT NULL, "order_otp" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "college" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "college_name" character varying NOT NULL, "address" character varying NOT NULL, "location_Url" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ebef1972362002203cdf7a22e0c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "payment_transaction" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" character varying NOT NULL, "transaction_id" character varying NOT NULL, "data_of_transaction" TIMESTAMP NOT NULL DEFAULT now(), "payment_mode" character varying NOT NULL, "status" character varying NOT NULL, CONSTRAINT "PK_82c3470854cf4642dfb0d7150cd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "service" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "order_id" character varying NOT NULL, "title" character varying NOT NULL, "description" text NOT NULL, "status" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_85a21558c006647cd76fdce044b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "vendor" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "user_name" character varying NOT NULL, "password" character varying NOT NULL, "mobile_no" integer NOT NULL, "email" character varying NOT NULL, "auth_type" character varying NOT NULL, "shop_name" character varying NOT NULL, "shop_address" character varying NOT NULL, "services" jsonb NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_931a23f6231a57604f5a0e32780" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "referred_by" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "referred_by" SET NOT NULL`);
        await queryRunner.query(`DROP TABLE "vendor"`);
        await queryRunner.query(`DROP TABLE "service"`);
        await queryRunner.query(`DROP TABLE "payment_transaction"`);
        await queryRunner.query(`DROP TABLE "college"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`DROP TABLE "wallet_transaction"`);
        await queryRunner.query(`DROP TABLE "wallet"`);
    }

}
