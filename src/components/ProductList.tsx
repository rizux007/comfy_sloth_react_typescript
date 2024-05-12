import { useEffect } from "react";
import GridView from "./GridView";
// import { useGetProductsByNameQuery } from "../services/products";
import { FilterState, loadProducts } from "../slices/filterSlice";
import ListView from "./ListView";
import { useAppDispatch, useAppSelector } from "../hooks";
import Loading from "./Loading";
// import { PRODUCTS } from "../data";
import { useGetProductsByNameQuery } from "../services/products";
const ProductList = () => {
  const { gridView } = useAppSelector(
    (state: { filters: FilterState }) => state.filters
  );
  const filteredProducts = useAppSelector(
    (state) => state.filters.filteredProducts
  );
  const { data, isLoading, isSuccess } = useGetProductsByNameQuery();
  // const productFromLocal = PRODUCTS;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isSuccess) {
      dispatch(loadProducts(data.data));
    }

    // dispatch(loadProducts(productFromLocal.data));
  }, [isSuccess, isLoading, data, dispatch]);
  // }, [productFromLocal]);

  if (isLoading) {
    return <Loading />;
  }
  // if (products.length < 1) {
  if (filteredProducts.length < 1) {
    return (
      <h5 style={{ textTransform: "none" }}>
        Sorry, no products matched your search...
      </h5>
    );
  }

  if (gridView === false) {
    // return <ListView products={products} />;
    return <ListView products={filteredProducts} />;
  }

  // return <GridView products={products} />;
  return <GridView products={filteredProducts} />;
};

export default ProductList;
