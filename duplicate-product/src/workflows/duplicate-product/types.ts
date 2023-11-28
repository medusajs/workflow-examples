export type DuplicateProductWorkflowData = {
  id: string;
  title: string;
  status: "draft" | "published";
  thumbnail: boolean;
  images: boolean;
  collection: boolean;
  categories: boolean;
};
