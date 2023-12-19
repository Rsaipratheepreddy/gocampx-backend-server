import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1702995246694 implements MigrationInterface {
    name = 'CreateUserTable1702995246694'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "user_name" character varying NOT NULL, "password" character varying NOT NULL, "mobile_no" integer NOT NULL, "email" character varying NOT NULL, "auth_type" character varying NOT NULL, "college_id" character varying NOT NULL, "referral_id" character varying NOT NULL, "referred_by" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
