import styled from "styled-components";
import { useAppSelector } from "../hooks";
import { CartContent, PageHero } from "../components";
import { Link } from "react-router-dom";
const CartPage: React.FC = () => {
  const { numItemsInCart } = useAppSelector((state) => state.cart);

  if (numItemsInCart === 0) {
    return (
      <Wrapper className="page-100">
        <div className="empty">
          <h2>Your cart is empty</h2>
          <Link to="/products" className="btn">
            fill it
          </Link>
        </div>
      </Wrapper>
    );
  }
  return (
    <main>
      <PageHero title="cart" />
      <Wrapper className="page">
        <CartContent />
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.main`
  .empty {
    text-align: center;
    h2 {
      margin-bottom: 1rem;
      text-transform: none;
    }
  }
`;

export default CartPage;
