import styled from "styled-components";
import { useGetProductByNameQuery } from "../services/product";
import {
  AddToCart,
  Error,
  Loading,
  PageHero,
  ProductImages,
  Stars,
} from "../components";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { SingleProductResponse } from "../utils/types";
import { formatPrice } from "../utils/helpers";
// import { PRODUCTS } from "../data";

const SingleProductPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const productId = parseInt(id || "");

  const { data, isError, isLoading, isSuccess } =
    useGetProductByNameQuery(productId);

  // const [singleProduct, setSingleProduct] = useState<Product>();
  const [singleProduct, setSingleProduct] = useState<SingleProductResponse>();
  useEffect(() => {
    if (isSuccess) {
      setSingleProduct(data);
    }
    if (isError) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }

    // setSingleProduct(
    //   PRODUCTS.data.find((data) =>
    //     productId ? data.id === productId : data.id === 12
    //   )
    // );
  }, [data, isError, isSuccess, productId, navigate]);
  // }, [productId]);

  if (isError) {
    return <Error />;
  }
  if (isLoading) {
    return <Loading />;
  }

  // if (isSuccess && singleProduct) {
  //   const product = singleProduct.data;
  if (singleProduct) {
    const product = singleProduct;

    const { attributes, id: SKU } = product.data;
    const { title, price, description, image, category } = attributes;
    return (
      <Wrapper>
        <PageHero title={title} product />
        <div className="section section-center page">
          <Link to="/products" className="btn">
            back to products
          </Link>
          <div className="product-center">
            <ProductImages image={image} />
            <section className="content">
              <h2>{title}</h2>
              <Stars />
              <h5 className="price">{formatPrice(price)}</h5>
              <p className="desc">{description}</p>
              <p className="info">
                <span>Available : </span>
                {SKU > 0 ? "In stock" : "Out of Stock"}
              </p>

              <p className="info">
                <span>Qty : </span>
                {SKU}
              </p>

              <p className="info">
                <span>Category : </span>
                {category}
              </p>
              <hr />
              {SKU > 0 && <AddToCart product={product.data} />}
            </section>
          </div>
        </div>
      </Wrapper>
    );
  }
};

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`;

export default SingleProductPage;
