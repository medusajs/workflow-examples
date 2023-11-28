import { Product, ProductService, ProductStatus } from "@medusajs/medusa";
import { StepResponse, createStep } from "@medusajs/workflows";
import omit from "lodash/omit";
import { EntityManager } from "typeorm";
import { DuplicateProductWorkflowData } from "../types";

type CreateProductStepData = {
  product: Product;
  data: DuplicateProductWorkflowData;
};

export const createProductStep = createStep(
  "create-product-step",
  async function (input: CreateProductStepData, context) {
    const {
      product,
      data: { title, images, thumbnail, status, categories, collection },
    } = input;
    const {
      container,
      context: { manager },
    } = context;

    const productServiceTx = container
      .resolve<ProductService>("productService")
      .withTransaction(manager as EntityManager);

    const createInput = omit(product, [
      "id",
      "title",
      "handle",
      "variants",
      "options",
      "images",
      "collection",
      "categories",
      "sales_channels",
      "status",
      "thumbnail",
    ]);

    const created = await productServiceTx.create({
      title,
      images: images ? product.images.map((i) => i.url) : undefined,
      thumbnail: thumbnail && product.thumbnail ? product.thumbnail : undefined,
      options: product.options.map((o) => ({
        title: o.title,
      })),
      sales_channels: product.sales_channels.map((sc) => ({
        id: sc.id,
      })),
      status:
        status === "draft" ? ProductStatus.DRAFT : ProductStatus.PUBLISHED,
      collection_id: collection ? product.collection_id : undefined,
      categories: categories
        ? product.categories.map((cg) => ({
            id: cg.id,
          }))
        : undefined,
      ...createInput,
    });

    return new StepResponse(
      {
        product: created,
      },
      {
        id: created.id,
      }
    );
  },
  async function (input, context) {
    const { id } = input;
    const {
      container,
      context: { manager },
    } = context;

    const productServiceTx = container
      .resolve<ProductService>("productService")
      .withTransaction(manager as EntityManager);

    await productServiceTx.delete(id);
  }
);
