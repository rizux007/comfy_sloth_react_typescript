import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Loading from "./Loading";
import Error from "./Error";
// import { useDispatch } from "react-redux";
import { useGetProductsByNameQuery } from "../services/products";
import { Product } from "../utils/types";
import SingleProduct from "./SingleProduct";
import { Link } from "react-router-dom";

const FeaturedProducts: React.FC = () => {
  const [featured, setFeatured] = useState<Product[]>();

  const { data, isError, isLoading, isSuccess } = useGetProductsByNameQuery();

  useEffect(() => {
    if (isSuccess) {
      setFeatured(data.data);
    }
  }, [data, isSuccess]);

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <Error />;
  }

  return (
    <Wrapper className="section">
      <div className="title">
        <h2>featured products</h2>
        <div className="underline"></div>
      </div>
      <div className="section-center featured">
        {featured?.slice(0, 3).map((product) => {
          return (
            <SingleProduct
              key={product.id}
              id={product.id}
              attributes={product.attributes}
              {...product.attributes}
            />
          );
        })}
      </div>
      <Link to="/products" className="btn">
        all products
      </Link>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  background: var(--clr-grey-10);
  .featured {
    margin: 4rem auto;
    display: grid;
    gap: 2.5rem;
    img {
      height: 225px;
    }
  }
  .btn {
    display: block;
    width: 148px;
    margin: 0 auto;
    text-align: center;
  }
  @media (min-width: 576px) {
    .featured {
      grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
    }
  }
`;

export default FeaturedProducts;
