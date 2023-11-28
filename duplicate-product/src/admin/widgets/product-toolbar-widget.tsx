import { ProductDetailsWidgetProps, WidgetConfig } from "@medusajs/admin";
import { DuplicateProductTool, Toolbar } from "../components/product-tools";

const ProductToolbarWidget = ({
  product,
  notify,
}: ProductDetailsWidgetProps) => {
  return (
    <Toolbar>
      <DuplicateProductTool notify={notify} product={product} />
    </Toolbar>
  );
};

export const config: WidgetConfig = {
  zone: "product.details.before",
};

export default ProductToolbarWidget;
