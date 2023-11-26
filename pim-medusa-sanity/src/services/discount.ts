import { DiscountService as MedusaDiscountService } from "@medusajs/medusa";
import { CreateDiscountInput } from "@medusajs/medusa/dist/types/discount";

class DiscountService extends MedusaDiscountService {
  static readonly Events = {
    CREATED: "discount.created",
  };

  async create(discountInput: CreateDiscountInput) {
    const discount = await super.create(discountInput);

    await this.eventBus_
      .withTransaction(this.manager_)
      .emit(DiscountService.Events.CREATED, {
        id: discount.id,
      });

    return discount;
  }
}

export default DiscountService;
