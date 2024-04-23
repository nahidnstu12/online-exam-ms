import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1713544270522 implements MigrationInterface {
  name = 'Migration1713544270522';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "exams" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "subject" character varying NOT NULL, "duration" character varying NOT NULL, "examStartDate" character varying NOT NULL, "publishedDate" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT '1', CONSTRAINT "PK_b43159ee3efa440952794b4f53e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "questionsets" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "isNegetive" character varying NOT NULL, "isNegetiveNumber" character varying, "publish" boolean NOT NULL DEFAULT '1', "questionBankId" integer, CONSTRAINT "PK_105a23c0f105016bd87141df9aa" PRIMARY KEY ("id")); COMMENT ON COLUMN "questionsets"."questionBankId" IS 'The bank unique identifier'`,
    );
    await queryRunner.query(
      `CREATE TABLE "questionBank" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "teacherId" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT '1', CONSTRAINT "PK_3e63b8925a2907b3b22005bcadd" PRIMARY KEY ("id")); COMMENT ON COLUMN "questionBank"."id" IS 'The bank unique identifier'`,
    );
    await queryRunner.query(
      `CREATE TABLE "questions" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "questionType" character varying NOT NULL, "mark" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT '1', "questionBankId" integer, CONSTRAINT "PK_08a6d4b0f49ff300bf3a0ca60ac" PRIMARY KEY ("id")); COMMENT ON COLUMN "questions"."questionBankId" IS 'The bank unique identifier'`,
    );
    await queryRunner.query(
      `CREATE TABLE "options" ("id" SERIAL NOT NULL, "text" character varying NOT NULL, "isCorrect" boolean NOT NULL, "questionId" integer, CONSTRAINT "PK_d232045bdb5c14d932fba18d957" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "questionset-question" ("id" SERIAL NOT NULL, CONSTRAINT "PK_b988fa0ae747bb2e505f62f89ba" PRIMARY KEY ("id"))`,
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
      `CREATE INDEX "IDX_da402da67f7fa2ad515700ea4d" ON "questionset-question" ("questionsId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_658b1abcfc5410cd29ec47d6b5" ON "questionset-question" ("questionsetsId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "questionsets" ADD CONSTRAINT "FK_b5a2edf51df9c6677d2ecf8bff6" FOREIGN KEY ("questionBankId") REFERENCES "questionBank"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "questions" ADD CONSTRAINT "FK_0c56111da07ecafa1fc0330ad84" FOREIGN KEY ("questionBankId") REFERENCES "questionBank"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "options" ADD CONSTRAINT "FK_46b668c49a6c4154d4643d875a5" FOREIGN KEY ("questionId") REFERENCES "questions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
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
      `ALTER TABLE "options" DROP CONSTRAINT "FK_46b668c49a6c4154d4643d875a5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "questions" DROP CONSTRAINT "FK_0c56111da07ecafa1fc0330ad84"`,
    );
    await queryRunner.query(
      `ALTER TABLE "questionsets" DROP CONSTRAINT "FK_b5a2edf51df9c6677d2ecf8bff6"`,
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
      `ALTER TABLE "questionset-question" ADD CONSTRAINT "PK_b988fa0ae747bb2e505f62f89ba" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(`DROP TABLE "questionset-question"`);
    await queryRunner.query(`DROP TABLE "options"`);
    await queryRunner.query(`DROP TABLE "questions"`);
    await queryRunner.query(`DROP TABLE "questionBank"`);
    await queryRunner.query(`DROP TABLE "questionsets"`);
    await queryRunner.query(`DROP TABLE "exams"`);
  }
}
