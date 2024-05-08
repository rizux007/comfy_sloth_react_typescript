import styled from "styled-components";
import SingleProduct from "./SingleProduct";
import { Product } from "../utils/types";

interface GridViewProps {
  products: Product[];
}
const GridView = ({ products }: GridViewProps) => {
  return (
    <Wrapper>
      <div className="products-container">
        {products?.map((product) => {
          return (
            <SingleProduct
              key={product.id}
              id={product.id}
              attributes={product.attributes}
            />
          );
        })}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  img {
    height: 175px;
  }

  .products-container {
    display: grid;
    gap: 2rem 1.5rem;
  }

  @media (min-width: 992px) {
    .products-container {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media (min-width: 1170px) {
    .products-container {
      grid-template-columns: repeat(3, 1fr);
    }
  }
`;

export default GridView;
