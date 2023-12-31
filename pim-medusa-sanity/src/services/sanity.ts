import { SanityClient, createClient } from "@sanity/client";

import { ProductDTO } from "@medusajs/types";
import { BaseService } from "medusa-interfaces";

class SanityService extends BaseService {
  protected client: SanityClient;

  constructor() {
    // @ts-ignore
    super(...arguments[0]);

    this.client = createClient({
      projectId: "w484o9iy",
      dataset: "production",
      useCdn: true, // set to `false` to bypass the edge cache
      apiVersion: "2023-11-27", // use current date (YYYY-MM-DD) to target the latest API version
      resultSourceMap: true, // tells the API to start sending source maps, if available
      token: process.env.SANITY_SECRET_TOKEN,
    });
  }

  async createProducts(products: ProductDTO[]) {
    const client = this.client.transaction();
    const promises = products.map((p) =>
      this.client.create({
        _type: "product",
        title: p.title,
        description: p.description,
        category_id: p.categories?.[0]?.id,
      })
    );

    const res = await client.commit();
    // TODO: check this -> returns empty array
    // return res.documentIds;

    return (await Promise.all(promises)).map((record) => record._id);
  }

  async deleteProducts(ids: string[]) {
    const client = this.client.transaction();

    ids.forEach((id) => client.delete(id));
    return await client.commit();
  }
}

export default SanityService;
