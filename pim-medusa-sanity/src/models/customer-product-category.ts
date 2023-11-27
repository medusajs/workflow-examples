import { Entity, PrimaryColumn } from "typeorm";

@Entity()
export class CustomerProductCategory {
  @PrimaryColumn({ type: "varchar", nullable: false })
  customer_id: string;

  @PrimaryColumn({ type: "varchar", nullable: false })
  category_id: string;
}
