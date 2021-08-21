import { MigrationInterface, QueryRunner } from 'typeorm';

export class initTable1629493085152 implements MigrationInterface {
  name = 'initTable1629493085152';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "sessions" ("id" SERIAL NOT NULL, "token" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP DEFAULT now(), "updated" TIMESTAMP DEFAULT now(), "deleted" TIMESTAMP, "userId" integer, CONSTRAINT "UQ_e9f62f5dcb8a54b84234c9e7a06" UNIQUE ("token"), CONSTRAINT "PK_3238ef96f18b355b671619111bc" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "role" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "alias" character varying, "description" character varying, "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_ae4578dcaed5adff96595e61660" UNIQUE ("name"), CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "user_interfaces" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying, "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_09998f67f87d75e107dfc26f817" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "user_role_interface" ("id" SERIAL NOT NULL, "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "roleId" integer, "userId" integer, "interfacesId" integer, CONSTRAINT "REL_26a3cb47abcc8aa62ad80de6e5" UNIQUE ("userId"), CONSTRAINT "PK_9344feed2ce718502a0d19eb1b8" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "login" character varying DEFAULT '', "password" character varying DEFAULT '', "isDelete" boolean NOT NULL DEFAULT false, "isActiv" boolean NOT NULL DEFAULT false, "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "profileId" integer, CONSTRAINT "UQ_a62473490b3e4578fd683235c5e" UNIQUE ("login"), CONSTRAINT "REL_9466682df91534dd95e4dbaa61" UNIQUE ("profileId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "image" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "src" character varying NOT NULL, "created" TIMESTAMP DEFAULT now(), "updated" TIMESTAMP DEFAULT now(), "profileId" integer, CONSTRAINT "PK_d6db1ab4ee9ad9dbe86c64e4cc3" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "profiles" ("id" SERIAL NOT NULL, "lastName" character varying NOT NULL, "firstName" character varying NOT NULL, "middleName" character varying DEFAULT '', "dateBirth" character varying DEFAULT '', "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8e520eb4da7dc01d0e190447c8e" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "contact" ("id" SERIAL NOT NULL, "type" character varying NOT NULL, "value" character varying NOT NULL, "isLogin" boolean NOT NULL DEFAULT false, "isDelete" boolean NOT NULL DEFAULT false, "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "profileId" integer, CONSTRAINT "UQ_f28bc5869e07fcaf4743eb103c0" UNIQUE ("value", "profileId"), CONSTRAINT "PK_2cbbe00f59ab6b3bb5b8d19f989" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "map_marker_education" ("id" SERIAL NOT NULL, "ageFrom" integer, "ageTo" integer, "url" character varying, "partner" character varying, "educationForm" character varying, "countGroup" character varying, "teachers" character varying, "significantProject" character varying, "mapMarkerId" integer, CONSTRAINT "REL_e2de827e35577b399ae4771671" UNIQUE ("mapMarkerId"), CONSTRAINT "PK_bc7690a773046a2345b70002cc1" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "map_marker" ("id" SERIAL NOT NULL, "lat" double precision NOT NULL, "long" double precision NOT NULL, "s2_path" character varying NOT NULL, "name" character varying NOT NULL, "description" character varying,"shortDescription" character varying,
        "documents" character varying,"informants" character varying, "houseNumber" character varying, "road" character varying, "city" character varying, "state" character varying, "postcode" character varying, "site" character varying, "email" character varying, "phone" character varying, "logo" character varying, "created" TIMESTAMP DEFAULT now(), "updated" TIMESTAMP DEFAULT now(), "mapId" integer, CONSTRAINT "PK_c60cf8d2d96efa4b2a114ca1412" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE INDEX "mapId-idx" ON "map_marker" ("mapId") `
    );
    await queryRunner.query(
      `CREATE TABLE "map_category_map_marker" ("skills" character varying DEFAULT '', "mapCategoryId" integer NOT NULL, "mapMarkerId" integer NOT NULL, CONSTRAINT "PK_a056d16dbdb89374cc9407d2e3b" PRIMARY KEY ("mapCategoryId", "mapMarkerId"))`
    );
    await queryRunner.query(
      `CREATE TABLE "map_category" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "innerName" character varying NOT NULL, "index" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_d3ba9d17348e35197879d981c10" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "map" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_3b08de72489b3d4471b74516819" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "region" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying DEFAULT '', CONSTRAINT "UQ_80a5847a87050957d5fd6f5e4f6" UNIQUE ("title"), CONSTRAINT "PK_5f48ffc3af96bc486f5f3f3a6da" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "map_map_category" ("mapId" integer NOT NULL, "mapCategoryId" integer NOT NULL, CONSTRAINT "PK_7af023430596f6c5a0db364a0c3" PRIMARY KEY ("mapId", "mapCategoryId"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b7e5c101e5e69a010752c47dce" ON "map_map_category" ("mapId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_74c9a367456323e065a84e2c59" ON "map_map_category" ("mapCategoryId") `
    );
    await queryRunner.query(
      `ALTER TABLE "sessions" ADD CONSTRAINT "FK_57de40bc620f456c7311aa3a1e6" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "user_role_interface" ADD CONSTRAINT "FK_f7e38783d801b6c759bf742ab2c" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "user_role_interface" ADD CONSTRAINT "FK_26a3cb47abcc8aa62ad80de6e5f" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "user_role_interface" ADD CONSTRAINT "FK_e7b5d20af13fe39f385de9a95df" FOREIGN KEY ("interfacesId") REFERENCES "user_interfaces"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_9466682df91534dd95e4dbaa616" FOREIGN KEY ("profileId") REFERENCES "profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "image" ADD CONSTRAINT "FK_84c49a601f5eb4fe00bca0bdfca" FOREIGN KEY ("profileId") REFERENCES "profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "contact" ADD CONSTRAINT "FK_4f6cb2839eaa6453371c22e3809" FOREIGN KEY ("profileId") REFERENCES "profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "map_marker_education" ADD CONSTRAINT "FK_e2de827e35577b399ae47716712" FOREIGN KEY ("mapMarkerId") REFERENCES "map_marker"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "map_marker" ADD CONSTRAINT "FK_824c85ccc631ec02064e9fdea1c" FOREIGN KEY ("mapId") REFERENCES "map"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "map_category_map_marker" ADD CONSTRAINT "FK_525c04916a9a1d1b09c17f60d86" FOREIGN KEY ("mapCategoryId") REFERENCES "map_category"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "map_category_map_marker" ADD CONSTRAINT "FK_68a7d5aad20a0d3582ab157080c" FOREIGN KEY ("mapMarkerId") REFERENCES "map_marker"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "map_map_category" ADD CONSTRAINT "FK_b7e5c101e5e69a010752c47dce7" FOREIGN KEY ("mapId") REFERENCES "map"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "map_map_category" ADD CONSTRAINT "FK_74c9a367456323e065a84e2c597" FOREIGN KEY ("mapCategoryId") REFERENCES "map_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "map_map_category" DROP CONSTRAINT "FK_74c9a367456323e065a84e2c597"`
    );
    await queryRunner.query(
      `ALTER TABLE "map_map_category" DROP CONSTRAINT "FK_b7e5c101e5e69a010752c47dce7"`
    );
    await queryRunner.query(
      `ALTER TABLE "map_category_map_marker" DROP CONSTRAINT "FK_68a7d5aad20a0d3582ab157080c"`
    );
    await queryRunner.query(
      `ALTER TABLE "map_category_map_marker" DROP CONSTRAINT "FK_525c04916a9a1d1b09c17f60d86"`
    );
    await queryRunner.query(
      `ALTER TABLE "map_marker" DROP CONSTRAINT "FK_824c85ccc631ec02064e9fdea1c"`
    );
    await queryRunner.query(
      `ALTER TABLE "map_marker_education" DROP CONSTRAINT "FK_e2de827e35577b399ae47716712"`
    );
    await queryRunner.query(
      `ALTER TABLE "contact" DROP CONSTRAINT "FK_4f6cb2839eaa6453371c22e3809"`
    );
    await queryRunner.query(
      `ALTER TABLE "image" DROP CONSTRAINT "FK_84c49a601f5eb4fe00bca0bdfca"`
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_9466682df91534dd95e4dbaa616"`
    );
    await queryRunner.query(
      `ALTER TABLE "user_role_interface" DROP CONSTRAINT "FK_e7b5d20af13fe39f385de9a95df"`
    );
    await queryRunner.query(
      `ALTER TABLE "user_role_interface" DROP CONSTRAINT "FK_26a3cb47abcc8aa62ad80de6e5f"`
    );
    await queryRunner.query(
      `ALTER TABLE "user_role_interface" DROP CONSTRAINT "FK_f7e38783d801b6c759bf742ab2c"`
    );
    await queryRunner.query(
      `ALTER TABLE "sessions" DROP CONSTRAINT "FK_57de40bc620f456c7311aa3a1e6"`
    );
    await queryRunner.query(`DROP INDEX "IDX_74c9a367456323e065a84e2c59"`);
    await queryRunner.query(`DROP INDEX "IDX_b7e5c101e5e69a010752c47dce"`);
    await queryRunner.query(`DROP TABLE "map_map_category"`);
    await queryRunner.query(`DROP TABLE "region"`);
    await queryRunner.query(`DROP TABLE "map"`);
    await queryRunner.query(`DROP TABLE "map_category"`);
    await queryRunner.query(`DROP TABLE "map_category_map_marker"`);
    await queryRunner.query(`DROP INDEX "mapId-idx"`);
    await queryRunner.query(`DROP TABLE "map_marker"`);
    await queryRunner.query(`DROP TABLE "map_marker_education"`);
    await queryRunner.query(`DROP TABLE "contact"`);
    await queryRunner.query(`DROP TABLE "profiles"`);
    await queryRunner.query(`DROP TABLE "image"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "user_role_interface"`);
    await queryRunner.query(`DROP TABLE "user_interfaces"`);
    await queryRunner.query(`DROP TABLE "role"`);
    await queryRunner.query(`DROP TABLE "sessions"`);
  }
}
