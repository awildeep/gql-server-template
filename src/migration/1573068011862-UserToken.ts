import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserToken1573068011862 implements MigrationInterface {
    name = 'UserToken1573068011862';

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(
            `CREATE TABLE "user_token" ("user_token_id" SERIAL NOT NULL, "expiry" TIMESTAMP NOT NULL DEFAULT '"2019-11-06T19:20:13.392Z"', "token" character varying NOT NULL, "user_id" integer, CONSTRAINT "UQ_9b8c6eac80e52d95241b573877f" UNIQUE ("token"), CONSTRAINT "REL_79ac751931054ef450a2ee4777" UNIQUE ("user_id"), CONSTRAINT "PK_76505e49c0b6e026282f4b46161" PRIMARY KEY ("user_token_id"))`,
            undefined,
        );
        await queryRunner.query(`ALTER TABLE "users" ADD "confirmed" boolean NOT NULL DEFAULT false`, undefined);
        await queryRunner.query(
            `ALTER TABLE "user_token" ADD CONSTRAINT "FK_79ac751931054ef450a2ee47778" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
            undefined,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user_token" DROP CONSTRAINT "FK_79ac751931054ef450a2ee47778"`, undefined);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "confirmed"`, undefined);
        await queryRunner.query(`DROP TABLE "user_token"`, undefined);
    }
}
