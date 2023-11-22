import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import { duplicateProductWorkflow } from "../../../../../workflows/duplicate-product";

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  const {
    body: { title, images, thumbnail, status, collection, categories },
    params: { id },
  } = req;

  const manager = req.scope.resolve("manager");

  const product = await duplicateProductWorkflow(req.scope)
    .run({
      input: {
        id: id,
        title: title,
        images: images,
        status: status,
        thumbnail: thumbnail,
        collection: collection,
        categories: categories,
      },
      context: {
        manager: manager,
      },
    })
    .then(({ result }) => {
      return result.product;
    });

  if (!product) {
    throw new Error("Something went wrong");
  }

  res.status(200).json({ product });
};
