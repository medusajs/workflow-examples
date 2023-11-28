import { CustomerService } from "@medusajs/medusa";
import { createStep, StepResponse } from "@medusajs/workflows";

import CustomerProductCategoryService from "../../services/customer-product-category";

/**
 * Fetch customers who bought from the category
 */
export const retrieveCustomersForProductCategory = createStep(
  "retrieveCustomersForProductCategory",
  async (categoryIds: string[], { container, context }) => {
    const customerProductCategoryService: CustomerProductCategoryService =
      container.resolve("customerProductCategoryService");

    const customerService: CustomerService =
      container.resolve("customerService");

    const customerProductCategories =
      await customerProductCategoryService.retrieve({
        category_id: categoryIds,
      });

    const customers = await customerService.list({
      id: customerProductCategories.map((cc) => cc.customer_id),
    });

    return new StepResponse(customers);
  }
);
