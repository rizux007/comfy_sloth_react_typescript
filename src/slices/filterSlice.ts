import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Product } from "../utils/types";

export interface FilterState {
  filteredProducts: Product[];
  allProducts: Product[];
  gridView: boolean;
  sort: string;
  filters: {
    text: string;
    company: string;
    category: string;
    color: string;
    minPrice: number;
    maxPrice: number;
    price: number;
    shipping: boolean;
  };
}
const initialState: FilterState = {
  filteredProducts: [],
  allProducts: [],
  gridView: true,
  sort: "price-lowest",
  filters: {
    text: "",
    company: "all",
    category: "all",
    color: "all",
    minPrice: 0,
    maxPrice: 0,
    price: 0,
    shipping: false,
  },
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    loadProducts(state, action: PayloadAction<Product[]>) {
      state.allProducts = action.payload;
    },
    setGridView(state) {
      state.gridView = true;
    },
    setListView(state) {
      state.gridView = false;
    },
    updateSort(state, action: PayloadAction<string>) {
      state.sort = action.payload;
      if (state.allProducts.length > 0) {
        state.allProducts.sort((a, b) => {
          switch (state.sort) {
            case "price-lowest":
              return (
                parseFloat(a.attributes.price) - parseFloat(b.attributes.price)
              );
            case "price-highest":
              return (
                parseFloat(b.attributes.price) - parseFloat(a.attributes.price)
              );
            case "name-a":
              return a.attributes.title.localeCompare(b.attributes.title);
            case "name-z":
              return b.attributes.title.localeCompare(a.attributes.title);
            default:
              return 0;
          }
        });
      }
    },

    updateFilters(
      state,
      action: PayloadAction<{ name: string; value: string }>
    ) {
      const { name, value } = action.payload;
      console.log(action.payload);
      if (name === "category") {
        state.filters.category = value;
      } else if (name === "color") {
        state.filters.color = value;
      } else if (name === "price") {
        state.filters.price = Number(value);
      } else if (name === "shipping") {
        state.filters.shipping = value === "true";
      } else if (name === "text") {
        state.filters.text = value.toLowerCase();
      }
    },

    clearFilters(state) {
      state.filters = initialState.filters;
      state.filteredProducts = state.allProducts;
    },
  },
});

export const {
  loadProducts,
  setGridView,
  setListView,
  updateSort,
  updateFilters,
  clearFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
