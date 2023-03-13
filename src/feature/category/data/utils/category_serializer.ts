import { Category } from "../../domain/models/category";

export const categoryFromPG = (item: any): Category => {
  return {
    id: item.id,
    title: item.title,
  };
};
