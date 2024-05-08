import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ProductsResponse } from "../utils/types";
export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://strapi-store-server.onrender.com/api/",
  }),
  endpoints: (builder) => ({
    getProductsByName: builder.query<ProductsResponse, void>({
      query: () => "/products",
    }),
  }),
});
export const { useGetProductsByNameQuery } = productsApi;