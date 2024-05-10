import { Product, ProductAttributes } from "./types";

export const formatPrice = (price: string): string => {
  const numericPrice = parseFloat(price);
  if (isNaN(numericPrice)) {
    return "Invalid Price";
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(numericPrice / 100);
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
