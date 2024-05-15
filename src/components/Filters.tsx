import styled from "styled-components";
import {
  FilterState,
  clearFilters,
  updateFilters,
} from "../slices/filterSlice";
import { formatPrice, getUniqueValues } from "../utils/helpers";
import { FaCheck } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../hooks";
import { useState } from "react";
// import { useState } from "react";

const Filters = () => {
  const [selectedCompany, setSelectedCompany] = useState<string>("all");
  // const [selectedColor setSelectedColor] = useState<string>("all");
  const dispatch = useAppDispatch();
  const {
    allProducts,
    filteredProducts,
    filters: { text, category, color, minPrice, maxPrice, price, shipping },
  } = useAppSelector((state: { filters: FilterState }) => state.filters);

  const categories = getUniqueValues(allProducts, "category");
  const companies = getUniqueValues(allProducts, "company");
  const colors = getUniqueValues(allProducts, "colors");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = e.target.value;
    const searchProducts = allProducts.filter((product) =>
      product.attributes.title.toLowerCase().includes(searchText.toLowerCase())
    );
    dispatch(
      updateFilters({
        name: "text",
        value: searchText,
        filtered: searchProducts,
      })
    );
  };

  const handleCategoryClick = (clickedCategory: string) => () => {
    let selectedCategoryProducts = filteredProducts;

    if (clickedCategory !== "all") {
      selectedCategoryProducts = allProducts.filter(
        (product) => product.attributes.category === clickedCategory
      );
      dispatch(
        updateFilters({
          name: "category",
          value: clickedCategory,
          filtered: selectedCategoryProducts,
        })
      );
    } else {
      dispatch(
        updateFilters({
          name: "category",
          value: "all",
          filtered: allProducts,
        })
      );
    }
  };

  const handleCompanyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCompany = e.target.value;
    setSelectedCompany(selectedCompany);
    let searchProducts = filteredProducts;
    if (selectedCompany !== "all") {
      searchProducts = allProducts.filter(
        (product) => product.attributes.company === selectedCompany
      );
    }
    dispatch(
      updateFilters({
        name: "filteredProducts",
        value: selectedCompany,
        filtered: searchProducts,
      })
    );
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const priceValue = parseFloat(e.target.value);
    const filteredProducts = allProducts.filter(
      (product) => product.attributes.price >= priceValue
    );
    dispatch(
      updateFilters({
        name: "filteredProducts",
        value: priceValue.toString(),
        filtered: filteredProducts,
      })
    );
  };

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const shippingValue = e.target.checked ? "true" : "false";
    let filteredProducts = allProducts;
    if (e.target.checked) {
      filteredProducts = allProducts.filter(
        (product) => product.attributes.shipping
      );
    }
    dispatch(
      updateFilters({
        name: "filteredProducts",
        value: shippingValue,
        filtered: filteredProducts,
      })
    );
  };
  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  const handleColorClick = (clickedColor: string) => {
    let filteredProducts = allProducts;
    // setSelectedColor(clickedColor);
    if (clickedColor !== "all") {
      filteredProducts = allProducts.filter((product) =>
        product.attributes.colors.includes(clickedColor)
      );
    }
    dispatch(
      updateFilters({
        name: "filteredProducts",
        value: clickedColor,
        filtered: filteredProducts,
      })
    );
  };

  return (
    <Wrapper>
      <div className="content">
        <form onSubmit={(e) => e.preventDefault()}>
          {/* search input */}
          <div className="form-control">
            <input
              type="text"
              name="text"
              placeholder="search"
              className="search-input"
              value={text}
              onChange={handleInputChange}
            />
          </div>
          {/* end search input */}

          {/* start categories */}
          <div className="form-control">
            <h5>category</h5>
            {categories.map((cat, index) => {
              return (
                <button
                  key={index}
                  onClick={handleCategoryClick(cat)}
                  type="button"
                  name="category"
                  value={cat}
                  id="category"
                  className={`${category === cat ? "active" : ""}`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          <div className="form-control">
            <h5>company</h5>
            <select
              name="company"
              // value={company}
              value={selectedCompany}
              id="company"
              onChange={handleCompanyChange}
              className="company"
            >
              {companies.map((c, index) => {
                return (
                  <option key={index} value={c}>
                    {c}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="form-control">
            <h5>colors</h5>
            <div className="colors">
              {colors.map((c, index) => {
                if (c === "all") {
                  return (
                    <button
                      key={index}
                      name="color"
                      onClick={() => handleColorClick(c)}
                      data-color="all"
                      className={`${
                        color === "all" ? "all-btn active" : "all-btn"
                      }`}
                    >
                      all
                    </button>
                  );
                }
                return (
                  <button
                    key={index}
                    name="color"
                    style={{ background: c }}
                    className={`${
                      color === c ? "color-btn active" : "color-btn"
                    }`}
                    data-color={c}
                    onClick={() => handleColorClick(c)}
                  >
                    {color === c ? <FaCheck /> : null}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="form-control">
            <h5>price</h5>
            <p className="price">{formatPrice(price)}</p>
            <input
              type="range"
              name="price"
              min={minPrice}
              max={maxPrice}
              value={price}
              onChange={handlePriceChange}
            />
          </div>

          <div className="form-control shipping">
            <label htmlFor="shipping">free shipping</label>
            <input
              type="checkbox"
              name="shipping"
              id="shipping"
              onChange={handleShippingChange}
              checked={shipping}
            />
          </div>
          <button
            type="button"
            className="clear-btn"
            onClick={handleClearFilters}
          >
            clear filters
          </button>
        </form>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
    max-width: 200px;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`;

export default Filters;
