import notifyOnDiscountWorkflow from "../workflow/notify-on-dicsount";

import DiscountService from "../services/discount";

export default async function ({ data, container }) {
  const { id } = data;

  const discountService: DiscountService = container.resolve("discountService");

  const discount = await discountService.retrieve(id, {
    relations: ["rule.conditions.products"],
  });

  const products = discount.rule.conditions.flatMap((c) => c.products);

  if (products.length) {
    const workflow = notifyOnDiscountWorkflow(container);
    await workflow.run({
      input: {
        discountCode: discount.code,
        discountedProductIds: products.map((p) => p.id),
      },
    });
  }
}

export const config = {
  event: DiscountService.Events.CREATED,
};
