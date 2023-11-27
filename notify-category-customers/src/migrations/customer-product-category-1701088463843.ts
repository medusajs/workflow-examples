import { MigrationInterface, QueryRunner } from "typeorm";

export class CustomerProductCategoryMigration1701088463843
  implements MigrationInterface
{
  name = "CustomerProductCategoryMigration1701088463843";

  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
      create table if not exists "customer_product_category" ("customer_id" character varying NOT NULL, "category_id" character varying NOT NULL, CONSTRAINT "customer_product_category_pk" PRIMARY KEY ("customer_id", "category_id"));
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        drop table if exists "customer_product_category";
    `);
  }
}
