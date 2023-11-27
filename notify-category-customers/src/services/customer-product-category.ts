import { TransactionBaseService } from "@medusajs/medusa";

import CustomerProductCategoryRepository from "../repositories/customer-product-category";
import { In } from "typeorm";

class CustomerProductCategoryService extends TransactionBaseService {
  protected customerProductCategoryRepository: typeof CustomerProductCategoryRepository;

  constructor({ customerProductCategoryRepository }) {
    super(arguments[0]);

    this.customerProductCategoryRepository = customerProductCategoryRepository;
  }

  async create(data: { category_id: string; customer_id: string }) {
    const repo = await this.manager_.withRepository(
      this.customerProductCategoryRepository
    );
    return await repo.save(data);
  }

  async retrieve(filter: {
    category_id?: string | string[];
    customer_id?: string | string[];
  }) {
    const repo = await this.manager_.withRepository(
      this.customerProductCategoryRepository
    );

    return await repo.find({
      where: {
        category_id: Array.isArray(filter.category_id)
          ? In(filter.category_id)
          : filter.category_id,
      },
    });
  }
}

export default CustomerProductCategoryService;
