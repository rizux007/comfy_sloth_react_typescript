import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SingleProductResponse } from "../utils/types";
export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://strapi-store-server.onrender.com/api/",
  }),
  endpoints: (builder) => ({
    getProductByName: builder.query<SingleProductResponse, number>({
      query: (id) => `/products/${id}`,
    }),
  }),
});
export const { useGetProductByNameQuery } = productApi;
