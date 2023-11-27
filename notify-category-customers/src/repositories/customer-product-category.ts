import { FindOperator, FindOptionsWhere, ILike, In } from "typeorm";
import { promiseAll } from "@medusajs/utils";
import { dataSource } from "@medusajs/medusa/dist/loaders/database";

import { CustomerProductCategory } from "../models";

export const CustomerProductCategoryRepository = dataSource.getRepository(
  CustomerProductCategory
);
//   .extend({
//     async add () {},
//   });

export default CustomerProductCategoryRepository;
