import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1713413230524 implements MigrationInterface {
  name = 'Migration1713413230524';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "questionset-question" DROP CONSTRAINT "FK_da402da67f7fa2ad515700ea4d6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "questionset-question" DROP CONSTRAINT "FK_658b1abcfc5410cd29ec47d6b5b"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_658b1abcfc5410cd29ec47d6b5"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_da402da67f7fa2ad515700ea4d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "questionset-question" DROP CONSTRAINT "PK_632c70dae377c6270b7f718730f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "questionset-question" ADD CONSTRAINT "PK_658b1abcfc5410cd29ec47d6b5b" PRIMARY KEY ("questionsetsId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "questionset-question" DROP COLUMN "questionsId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "questionset-question" DROP CONSTRAINT "PK_658b1abcfc5410cd29ec47d6b5b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "questionset-question" DROP COLUMN "questionsetsId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "questionset-question" DROP COLUMN "id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "questionset-question" ADD "id" SERIAL NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "questionset-question" ADD CONSTRAINT "PK_b988fa0ae747bb2e505f62f89ba" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "questionset-question" ADD "questionsId" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "questionset-question" DROP CONSTRAINT "PK_b988fa0ae747bb2e505f62f89ba"`,
    );
    await queryRunner.query(
      `ALTER TABLE "questionset-question" ADD CONSTRAINT "PK_6acc5a2ec1d75413c0cca5bce30" PRIMARY KEY ("id", "questionsId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "questionset-question" ADD "questionsetsId" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "questionset-question" DROP CONSTRAINT "PK_6acc5a2ec1d75413c0cca5bce30"`,
    );
    await queryRunner.query(
      `ALTER TABLE "questionset-question" ADD CONSTRAINT "PK_6ace6ad8a5647f955cc65351a14" PRIMARY KEY ("id", "questionsId", "questionsetsId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "questionset-question" DROP CONSTRAINT "PK_6ace6ad8a5647f955cc65351a14"`,
    );
    await queryRunner.query(
      `ALTER TABLE "questionset-question" ADD CONSTRAINT "PK_632c70dae377c6270b7f718730f" PRIMARY KEY ("questionsId", "questionsetsId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "questionsets" ALTER COLUMN "publish" SET DEFAULT '1'`,
    );
    await queryRunner.query(
      `ALTER TABLE "questionBank" ALTER COLUMN "isActive" SET DEFAULT '1'`,
    );
    await queryRunner.query(
      `ALTER TABLE "questions" ALTER COLUMN "isActive" SET DEFAULT '1'`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_da402da67f7fa2ad515700ea4d" ON "questionset-question" ("questionsId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_658b1abcfc5410cd29ec47d6b5" ON "questionset-question" ("questionsetsId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "questionset-question" ADD CONSTRAINT "FK_da402da67f7fa2ad515700ea4d6" FOREIGN KEY ("questionsId") REFERENCES "questions"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "questionset-question" ADD CONSTRAINT "FK_658b1abcfc5410cd29ec47d6b5b" FOREIGN KEY ("questionsetsId") REFERENCES "questionsets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "questionset-question" DROP CONSTRAINT "FK_658b1abcfc5410cd29ec47d6b5b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "questionset-question" DROP CONSTRAINT "FK_da402da67f7fa2ad515700ea4d6"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_658b1abcfc5410cd29ec47d6b5"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_da402da67f7fa2ad515700ea4d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "questions" ALTER COLUMN "isActive" SET DEFAULT true`,
    );
    await queryRunner.query(
      `ALTER TABLE "questionBank" ALTER COLUMN "isActive" SET DEFAULT true`,
    );
    await queryRunner.query(
      `ALTER TABLE "questionsets" ALTER COLUMN "publish" SET DEFAULT true`,
    );
    await queryRunner.query(
      `ALTER TABLE "questionset-question" DROP CONSTRAINT "PK_632c70dae377c6270b7f718730f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "questionset-question" ADD CONSTRAINT "PK_6ace6ad8a5647f955cc65351a14" PRIMARY KEY ("id", "questionsId", "questionsetsId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "questionset-question" DROP CONSTRAINT "PK_6ace6ad8a5647f955cc65351a14"`,
    );
    await queryRunner.query(
      `ALTER TABLE "questionset-question" ADD CONSTRAINT "PK_6acc5a2ec1d75413c0cca5bce30" PRIMARY KEY ("id", "questionsId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "questionset-question" DROP COLUMN "questionsetsId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "questionset-question" DROP CONSTRAINT "PK_6acc5a2ec1d75413c0cca5bce30"`,
    );
    await queryRunner.query(
      `ALTER TABLE "questionset-question" ADD CONSTRAINT "PK_b988fa0ae747bb2e505f62f89ba" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "questionset-question" DROP COLUMN "questionsId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "questionset-question" DROP CONSTRAINT "PK_b988fa0ae747bb2e505f62f89ba"`,
    );
    await queryRunner.query(
      `ALTER TABLE "questionset-question" DROP COLUMN "id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "questionset-question" ADD "id" SERIAL NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "questionset-question" ADD "questionsetsId" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "questionset-question" ADD CONSTRAINT "PK_658b1abcfc5410cd29ec47d6b5b" PRIMARY KEY ("questionsetsId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "questionset-question" ADD "questionsId" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "questionset-question" DROP CONSTRAINT "PK_658b1abcfc5410cd29ec47d6b5b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "questionset-question" ADD CONSTRAINT "PK_632c70dae377c6270b7f718730f" PRIMARY KEY ("questionsId", "questionsetsId")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_da402da67f7fa2ad515700ea4d" ON "questionset-question" ("questionsId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_658b1abcfc5410cd29ec47d6b5" ON "questionset-question" ("questionsetsId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "questionset-question" ADD CONSTRAINT "FK_658b1abcfc5410cd29ec47d6b5b" FOREIGN KEY ("questionsetsId") REFERENCES "questionsets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "questionset-question" ADD CONSTRAINT "FK_da402da67f7fa2ad515700ea4d6" FOREIGN KEY ("questionsId") REFERENCES "questions"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }
}
