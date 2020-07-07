import {MigrationInterface, QueryRunner} from "typeorm";

export class Organization1594090608981 implements MigrationInterface {
    name = 'Organization1594090608981'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "organizations" ("organization_id" SERIAL NOT NULL, "name" character varying NOT NULL, "is_active" boolean NOT NULL, CONSTRAINT "PK_256856c7ab20081dd27937d43ed" PRIMARY KEY ("organization_id"))`);
        await queryRunner.query(`ALTER TABLE "users" ADD "organization_id" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_21a659804ed7bf61eb91688dea7" FOREIGN KEY ("organization_id") REFERENCES "organizations"("organization_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_21a659804ed7bf61eb91688dea7"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "organization_id"`);
        await queryRunner.query(`DROP TABLE "organizations"`);
    }

}
