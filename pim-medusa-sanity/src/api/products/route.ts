import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";

import pimImport from "../../workflows/pim-import";

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const pimWorkflow = pimImport(req.scope);
  const manager = req.scope.resolve("manager");

  const products = await pimWorkflow.run({
    input: { productData: req.body },
    context: { manager },
  });

  res.send(products.result);
}
