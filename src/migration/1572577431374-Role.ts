import { MigrationInterface, QueryRunner } from 'typeorm';

export class Role1572577431374 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(
            `CREATE TABLE "roles" ("role_id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_09f4c8130b54f35925588a37b6a" PRIMARY KEY ("role_id"))`,
            undefined,
        );
        // await queryRunner.query(`INSERT INTO roles (name) VALUES ('User')`);
        // await queryRunner.query(`INSERT INTO roles (name) VALUES ('Admin')`);
        // await queryRunner.query(`INSERT INTO roles (name) VALUES ('Approved')`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "roles"`, undefined);
    }
}
