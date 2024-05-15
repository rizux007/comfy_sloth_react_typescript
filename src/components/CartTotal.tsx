import styled from "styled-components";
import { formatPrice } from "../utils/helpers";
import { Link } from "react-router-dom";
import { useAppSelector } from "../hooks";
import { useAuth0 } from "@auth0/auth0-react";
const CartTotal = () => {
  const { cartTotal, shipping } = useAppSelector((state) => state.cart);
  const { user, loginWithRedirect } = useAuth0();

  // const handleLoginRedirect = () => {
  //   loginWithRedirect({
  //     appState: { returnTo: window.location.origin },
  //     // appState: { returnTo: window.location.pathname },
  //   });
  // };
  const handleLoginRedirect = () => {
    loginWithRedirect({
      appState: { returnTo: "/checkout" },
    });
  };
  return (
    <Wrapper>
      <div>
        <article>
          <h5>
            subtotal : <span>{formatPrice(cartTotal)}</span>
          </h5>
          <p>
            shipping fee : <span>{formatPrice(shipping)}</span>
          </p>
          <hr />
          <h4>
            order total :<span>{formatPrice(cartTotal + shipping)}</span>
          </h4>
        </article>
        {user ? (
          <Link to="/checkout" className="btn">
            proceed to checkout
          </Link>
        ) : (
          <button type="button" className="btn" onClick={handleLoginRedirect}>
            login to checkout
          </button>
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin-top: 3rem;
  display: flex;
  justify-content: center;
  article {
    border: 1px solid var(--clr-grey-8);
    border-radius: var(--radius);
    padding: 1.5rem 3rem;
  }
  h4,
  h5,
  p {
    display: grid;
    grid-template-columns: 200px 1fr;
  }
  p {
    text-transform: capitalize;
  }
  h4 {
    margin-top: 2rem;
  }
  @media (min-width: 776px) {
    justify-content: flex-end;
  }
  .btn {
    width: 100%;
    margin-top: 1rem;
    text-align: center;
    font-weight: 700;
  }
`;

export default CartTotal;
