import styled from "styled-components";
import { PageHero, StripeCheckout } from "../components";
import { useAppSelector } from "../hooks";
import { Link } from "react-router-dom";

const title: string = "checkout";
const CheckoutPage = () => {
  const { cartItems } = useAppSelector((state) => state.cart);
  return (
    <main>
      <PageHero title={title} />
      <Wrapper className="page">
        {cartItems.length < 1 ? (
          <div className="empty">
            <h2>your cart is empty</h2>
            <Link to="/products" className="btn">
              fill it
            </Link>
          </div>
        ) : (
          <StripeCheckout />
        )}
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  .empty {
    text-align: center;
  }
`;
export default CheckoutPage;
