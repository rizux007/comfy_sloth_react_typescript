import React from "react";
import styled from "styled-components";
import {
  FilterState,
  setGridView,
  setListView,
  updateSort,
} from "../slices/filterSlice";
import { BsFillGridFill, BsList } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "../hooks";

const Sort = () => {
  const {
    allProducts: products,
    gridView,
    sort,
  } = useAppSelector((state: { filters: FilterState }) => state.filters);
  const dispatch = useAppDispatch();
  const handleGridViewClick = () => {
    dispatch(setGridView());
  };

  const handleListViewClick = () => {
    dispatch(setListView());
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(updateSort(e.target.value));
  };

  return (
    <Wrapper>
      <div className="btn-container">
        <button
          type="button"
          data-test="grid"
          className={gridView ? "active" : ""}
          onClick={handleGridViewClick}
        >
          <BsFillGridFill />
        </button>

        <button
          type="button"
          data-test="list"
          className={!gridView ? "active" : ""}
          onClick={handleListViewClick}
        >
          <BsList />
        </button>
      </div>
      <p>{products.length} products found</p>
      <hr />
      <form action="">
        <label htmlFor="sort">sort by</label>
        <select
          name="sort"
          id="sort"
          data-test="priceName"
          className="sort-input"
          value={sort}
          onChange={handleSortChange}
        >
          <option data-test="price-lowest" value="price-lowest">
            price (lowest)
          </option>
          <option data-test="price-highest" value="price-highest">
            price(highest)
          </option>
          <option data-test="name-a" value="name-a">
            name (a-z)
          </option>
          <option data-test="name-z" value="name-z">
            name (z-a)
          </option>
        </select>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: auto auto 1fr auto;
  align-items: center;
  margin-bottom: 2rem;
  column-gap: 2rem;
  @media (max-width: 576px) {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 0.75rem;
    .btn-container {
      width: 50px;
    }
    label {
      display: inline-block;
      margin-right: 0.5rem;
    }
  }
  @media (min-width: 768px) {
    column-gap: 2rem;
  }
  p {
    text-transform: capitalize;
    margin-bottom: 0;
  }

  .btn-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 0.5rem;
    button {
      background: transparent;
      border: 1px solid var(--clr-black);
      color: var(--clr-black);
      width: 1.5rem;
      border-radius: var(--radius);
      height: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      svg {
        font-size: 1rem;
      }
    }
    .active {
      background: var(--clr-black);
      color: var(--clr-white);
    }
  }

  .sort-input {
    border-color: transparent;
    font-size: 1rem;
    text-transform: capitalize;
    padding: 0.25rem 0.5rem;
  }
  label {
    font-size: 1rem;
    text-transform: capitalize;
  }
`;

export default Sort;
