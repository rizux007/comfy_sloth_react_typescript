export type ProductsResponse = {
  data: Product[];
  meta: ProductsMeta;
};

export interface ProductAttributes {
  category: string;
  company: string;
  createdAt: string;
  description: string;
  featured: boolean;
  image: string;
  // price: string;
  price: number;
  publishedAt: string;
  shipping: boolean;
  title: string;
  updatedAt: string;
  colors: string[];
}

export interface FilterUpdate {
  name: string;
  value: string;
  filtered: Product[];
}

export type Product = {
  id: number;
  attributes: ProductAttributes;
};

export type ProductsMeta = {
  categories: string[];
  companies: string[];
  pagination: Pagination;
};

export type Pagination = {
  page: number;
  pageCount: number;
  pageSize: number;
  total: number;
};

export type SingleProductResponse = {
  data: Product;
  meta: ProductsMeta;
};

export type CartItemType = {
  cartID: string;
  productID: number;
  image: string;
  title: string;
  price: string;
  amount: number;
  productColor: string;
  company: string;
};

export type CartState = {
  cartItems: CartItemType[];
  numItemsInCart: number;
  cartTotal: number;
  shipping: number;
};

export type Checkout = {
  name: string;
  address: string;
  chargeTotal: number;
  orderTotal: string;
  cartItems: CartItemType[];
  numItemsInCart: number;
};

export type Order = {
  id: number;
  attributes: {
    address: string;
    cartItems: CartItemType[];
    createdAt: string;
    name: string;
    numItemsInCart: number;
    orderTotal: string;
    publishedAt: string;
    updatedAt: string;
  };
};

export interface ToggleAmountType {
  id: number;
  value: string;
}
