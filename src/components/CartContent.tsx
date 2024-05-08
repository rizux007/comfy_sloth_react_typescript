import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../hooks";
import CartColumns from "./CartColumns";
import { Link } from "react-router-dom";
import CartTotal from "./CartTotal";
import { clearCart } from "../slices/cartSlice";
import CartItem from "./cartItem";

const CartContent = () => {
  const { cartItems } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  return (
    <Wrapper className="section section-center">
      <CartColumns />
      {cartItems.map((item) => {
        return <CartItem key={item.cartID} {...item} />;
      })}
      <hr />
      <div className="link-container">
        <Link to={"/products"} className="link-btn">
          continue shopping
        </Link>
        <button
          type="button"
          className="link-btn clear-btn"
          onClick={() => dispatch(clearCart())}
        >
          clear shopping cart
        </button>
      </div>
      <CartTotal />
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .link-container {
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
  }
  .link-btn {
    background: transparent;
    border-color: transparent;
    text-transform: capitalize;
    padding: 0.25rem 0.5rem;
    background: var(--clr-primary-5);
    color: var(--clr-white);
    border-radius: var(--radius);
    letter-spacing: var(--spacing);
    font-weight: 400;
    cursor: pointer;
  }
  .clear-btn {
    background: var(--clr-black);
  }
`;

export default CartContent;
