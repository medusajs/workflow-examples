import { dataSource } from "@medusajs/medusa/dist/loaders/database";

import { CustomerProductCategory } from "../models";

export const CustomerProductCategoryRepository = dataSource.getRepository(
  CustomerProductCategory
);

export default CustomerProductCategoryRepository;
