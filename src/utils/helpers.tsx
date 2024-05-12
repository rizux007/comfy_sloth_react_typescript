import { Product, ProductAttributes } from "./types";
export const formatPrice = (price: number): string => {
  if (isNaN(price)) {
    return "Invalid Price";
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price / 100);
};

export const getUniqueValues = (
  data: Product[],
  type: keyof ProductAttributes,
  includeAll: boolean = true
): string[] => {
  let uniqueValues: string[] = [];
  data.forEach((product) => {
    const value = product.attributes[type];
    if (Array.isArray(value)) {
      uniqueValues = uniqueValues.concat(value);
    } else if (typeof value === "string" && !uniqueValues.includes(value)) {
      uniqueValues.push(value);
    }
  });
  if (includeAll) {
    uniqueValues.unshift("all");
  }
  return uniqueValues;
};
