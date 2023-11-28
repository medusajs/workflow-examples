import { ProductDetailsWidgetProps } from "@medusajs/admin";
import { Product } from "@medusajs/medusa";
import {
  Button,
  Checkbox,
  Drawer,
  Heading,
  Input,
  Label,
  RadioGroup,
  Text,
} from "@medusajs/ui";
import {
  adminProductKeys,
  useAdminCustomPost,
  useAdminStore,
} from "medusa-react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Toolbar } from "./toolbar";

interface DuplicateProductToolProps extends ProductDetailsWidgetProps {}

type DuplicateProductForm = {
  title: string;
  status: "draft" | "published";
  thumbnail: boolean;
  images: boolean;
  collection: boolean;
  categories: boolean;
};

type DuplicateProductPayload = {
  title: string;
  status: "draft" | "published";
  thumbnail: boolean;
  images: boolean;
  collection: boolean;
  categories: boolean;
};

type DuplicateProductResponse = {
  product: Product;
};

export const DuplicateProductTool = ({
  product,
  notify,
}: DuplicateProductToolProps) => {
  const navigate = useNavigate();
  const { store } = useAdminStore();

  const isCategoriesEnabled = store
    ? !!store.feature_flags?.find((ff) => ff.key === "product_categories")
        ?.value
    : false;

  const suggestedTitle = `Copy of ${product.title}`;

  const { register, control, handleSubmit } = useForm<DuplicateProductForm>({
    defaultValues: {
      title: suggestedTitle,
      images: false,
      thumbnail: false,
      categories: true,
      collection: true,
      status: "draft",
    },
  });

  const { mutateAsync } = useAdminCustomPost<
    DuplicateProductPayload,
    DuplicateProductResponse
  >(`/products/${product.id}/duplicate`, [...adminProductKeys.list()]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const payload: DuplicateProductPayload = {
        ...data,
        categories: isCategoriesEnabled && data.categories,
      };

      const { product } = await mutateAsync(payload);

      notify.success("Product duplicated", "Successfully duplicated product");
      navigate(`/a/products/${product.id}`);
    } catch (error) {
      notify.error(
        "Something went wrong",
        "An error occurred while duplicating the product"
      );
    }
  });

  return (
    <Drawer onOpenChange={(state) => console.log(`changing ${state}`)}>
      <Drawer.Trigger asChild>
        <Toolbar.Button>Duplicate</Toolbar.Button>
      </Drawer.Trigger>
      <Drawer.Content>
        <Drawer.Header>
          <Heading>Duplicate Product</Heading>
        </Drawer.Header>
        <Drawer.Body className="flex-1 overflow-y-auto">
          <div className="flex flex-col gap-y-2">
            <Label weight="plus" htmlFor="title">
              Title
            </Label>
            <Input
              id="title"
              size="small"
              placeholder="New title"
              {...register("title")}
            />
          </div>
          <div className="w-[calc(100%+64px)] h-px bg-ui-border-base my-8 -mx-8" />
          <div className="flex flex-col gap-y-3">
            <Text className="text-ui-fg-subtle">
              Select which details to copy. All other details of the original
              product and its variants will be copied.
            </Text>
            <div className="flex flex-col gap-y-2">
              <Controller
                control={control}
                name="collection"
                render={({ field: { value, onChange, ...rest } }) => {
                  return (
                    <div className="flex items-center gap-x-2">
                      <Checkbox
                        id="collection"
                        checked={value}
                        onCheckedChange={onChange}
                        {...rest}
                      />
                      <Label htmlFor="detail_collection">Collection</Label>
                    </div>
                  );
                }}
              />
              {isCategoriesEnabled && (
                <Controller
                  control={control}
                  name="categories"
                  render={({ field: { value, onChange, ...rest } }) => {
                    return (
                      <div className="flex items-center gap-x-2">
                        <Checkbox
                          id="detail_categories"
                          checked={value}
                          onCheckedChange={onChange}
                          {...rest}
                        />
                        <Label htmlFor="detail_categories">Categories</Label>
                      </div>
                    );
                  }}
                />
              )}
              <Controller
                control={control}
                name="thumbnail"
                render={({ field: { value, onChange, ...rest } }) => {
                  return (
                    <div className="flex items-center gap-x-2">
                      <Checkbox
                        id="detail_thumbnail"
                        checked={value}
                        onCheckedChange={onChange}
                        {...rest}
                      />
                      <Label htmlFor="detail_thumbnail">Thumbnail</Label>
                    </div>
                  );
                }}
              />
              <Controller
                control={control}
                name="images"
                render={({ field: { value, onChange, ...rest } }) => {
                  return (
                    <div className="flex items-center gap-x-2">
                      <Checkbox
                        id="detail_images"
                        checked={value}
                        onCheckedChange={onChange}
                        {...rest}
                      />
                      <Label htmlFor="detail_images">Images</Label>
                    </div>
                  );
                }}
              />
            </div>
          </div>
          <div className="w-[calc(100%+64px)] h-px bg-ui-border-base my-8 -mx-8" />
          <div className="flex flex-col gap-y-3">
            <Label weight="plus">Product status</Label>
            <Controller
              control={control}
              name="status"
              render={({ field: { value, onChange, ...rest } }) => {
                return (
                  <RadioGroup
                    className="flex flex-col gap-y-2"
                    value={value}
                    onValueChange={onChange}
                    {...rest}
                  >
                    <div className="flex items-center gap-x-2">
                      <RadioGroup.Item value="draft" id="status_draft" />
                      <Label htmlFor="status_draft">Draft</Label>
                    </div>
                    <div className="flex items-center gap-x-2">
                      <RadioGroup.Item
                        value="published"
                        id="status_published"
                      />
                      <Label htmlFor="status_published">Published</Label>
                    </div>
                  </RadioGroup>
                );
              }}
            />
          </div>
        </Drawer.Body>
        <Drawer.Footer className="flex items-center justify-end gap-x-2">
          <Drawer.Close asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </Drawer.Close>
          <Button onClick={onSubmit}>Duplicate product</Button>
        </Drawer.Footer>
      </Drawer.Content>
    </Drawer>
  );
};
