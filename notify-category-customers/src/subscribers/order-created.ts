import { OrderService } from "@medusajs/medusa";
import CustomerProductCategory from "src/services/customer-product-category";

export default async function ({ data, container }) {
  const { id } = data;

  const customerProductCategory: CustomerProductCategory = container.resolve(
    "customerProductCategoryService"
  );

  const orderService: OrderService = container.resolve("orderService");

  const order = await orderService.retrieve(id, {
    relations: ["customer", "items.variant.product.categories"],
  });

  await Promise.all(
    order.items
      .flatMap((item) => item.variant.product.categories)
      .map((category) =>
        customerProductCategory.create({
          customer_id: order.customer_id,
          category_id: category.id,
        })
      )
  );
}

export const config = {
  event: OrderService.Events.PLACED,
};
