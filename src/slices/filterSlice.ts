import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { FilterUpdate, Product } from "../utils/types";

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
      state.filteredProducts = action.payload;
    },
    setGridView(state) {
      state.gridView = true;
    },
    setListView(state) {
      state.gridView = false;
    },
    updateSort(state, action: PayloadAction<string>) {
      state.sort = action.payload;
      state.filteredProducts = [...state.filteredProducts];
      state.filteredProducts.sort((a, b) => {
        switch (state.sort) {
          case "price-lowest":
            return a.attributes.price - b.attributes.price;
          case "price-highest":
            return b.attributes.price - a.attributes.price;
          case "name-a":
            return a.attributes.title.localeCompare(b.attributes.title);
          case "name-z":
            return b.attributes.title.localeCompare(a.attributes.title);
          default:
            return 0;
        }
      });
    },

    updateFilters(state, action: PayloadAction<FilterUpdate>) {
      const { name, value, filtered } = action.payload;

      const updatedFilters = {
        ...state.filters,
        [name]: value,
      };
      const updatedFilteredProducts = filtered ?? state.allProducts;
      return {
        ...state,
        filters: updatedFilters,
        filteredProducts: updatedFilteredProducts,
      };
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
