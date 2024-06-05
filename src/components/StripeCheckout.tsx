import styled from "styled-components";
import { loadStripe } from "@stripe/stripe-js";
import {
  useStripe,
  Elements,
  CardElement,
  useElements,
} from "@stripe/react-stripe-js";
// import axios from "axios";
import { useAppDispatch, useAppSelector } from "../hooks";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { formatPrice } from "../utils/helpers";
import { clearCart } from "../slices/cartSlice";
import Stripe from "stripe";

const stripeSecretKey =
  "sk_test_51PM7I8H3XXImQry6de9Xk4hfqW1wXNTEk2YkjJpHrHfCHJKLJjdLUxITOy0o2thRY6BxIoeon5DHpkyy6jvoq0tH00brIbDR8R";

// const publicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
const publicKey =
  "pk_test_51PM7I8H3XXImQry6lR1tlmmALIJhmCPhFshHE2oEXqJcS3qb0O1OXo4sxQjFCAir7UEibrr4jdhkYFe8hKyvnXxJ00HtCsqa2j";

const promise = loadStripe(publicKey);

const CheckoutForm = () => {
  const { cartItems, cartTotal, shipping } = useAppSelector(
    (state) => state.cart
  );
  const navigate = useNavigate();
  const { user } = useAuth0();
  const dispatch = useAppDispatch();

  const [succeeded, setSucceeded] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(true);
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  const stripeObject = new Stripe(stripeSecretKey, {
    apiVersion: "2024-04-10",
  });

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFammy: "Arial, sans serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  const createPaymentIntent = useCallback(async () => {
    try {
      // const { data } = await axios.post(
      //   "/.netlify/functions/create-payment-intent",
      //   JSON.stringify({ cartItems, shipping, cartTotal })
      // );


      const paymentIntent = await stripeObject.paymentIntents.create({
        amount: shipping + cartTotal,
        currency: "usd",
      });
      console.log("Affichage du data", paymentIntent);


     
      setClientSecret(paymentIntent.client_secret ?? "" );
    } catch (error) {
      console.error(error);
    }
  }, [cartItems, shipping, cartTotal]);

  useEffect(() => {
    createPaymentIntent();
  }, [createPaymentIntent]);

  const handleChange = async (event: {
    empty: boolean;
    error: { message: string } | undefined;
  }) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : null);
  };

  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) {
      setProcessing(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setProcessing(false);
      return;
    }

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
      },
    });

    if (payload.error) {
      setError(`Payment failed: ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
      setTimeout(() => {
        dispatch(clearCart());
        navigate("/");
      }, 3000);
    }
  };

  return (
    <div>
      {succeeded ? (
        <article>
          <h4>Thank</h4>
          <h4>Your payment was successfull !</h4>
          <h4>Redirecting to home page shortly</h4>
        </article>
      ) : (
        <article>
          <h4>Hello, {user && user.name}</h4>
          <p>Your total is {formatPrice(shipping + cartTotal)}</p>
          <p>Test Card Number : 4242 4242 4242 4242 </p>
        </article>
      )}

      <form id="payment-form" onSubmit={handleSubmit}>
        <CardElement
          id="card-element"
          options={cardStyle}
          onChange={handleChange}
        />
        <button id="submit" disabled={processing || disabled || succeeded}>
          <span id="button-text">
            {processing ? <div className="spinner" id="spinner"></div> : "Pay"}
          </span>
        </button>
        {/* Show any error that happen when processing the payment */}
        {error && <div className="card-error" role="alert"></div>}
        {/* Show a success message upon completion */}
        <p className={succeeded ? "result-message" : "result-message hidden"}>
          Payment succedded, see the result in your{" "}
          <a
            target="_blank"
            href={`https://dashboard.stripe.com/test/payments`}
          >
            Stripe dashboard.
          </a>
          Refresh the page to pay again
        </p>
      </form>
    </div>
  );
};
const StripeCheckout = () => {
  return (
    <Wrapper>
      <Elements stripe={promise}>
        <CheckoutForm />
      </Elements>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  form {
    width: 30vw;
    min-width: 500px;
    align-self: center;
    box-shadow: 0px 0px 0px 0.5px rgba(50, 50, 93, 0.1),
      0px 2px 5px 0px rgba(50, 50, 93, 0.1),
      0px 1px 1.5px 0px rgba(0, 0, 0, 0.07);
    border-radius: 7px;
    padding: 40px;
  }

  .result-message {
    line-height: 22px;
    font-size: 16px;
  }
  .result-message a {
    color: rgb(89, 111, 214);
    font-weight: 600;
    text-decoration: none;
  }

  input {
    border-radius: 6px;
    margin-bottom: 6px;
    padding: 12px;
    border: 1px solid rgba(50, 50, 93, 0.1);
    max-height: 44px;
    font-size: 16px;
    width: 100%;
    background: white;
    box-sizing: border-box;
  }

  .hidden {
    display: none;
  }

  #payment-message {
    color: rgb(105, 115, 134);
    font-size: 16px;
    line-height: 20px;
    padding-top: 12px;
    text-align: center;
  }
  #card-element {
    border-radius: 4px 4px 0 0;
    padding: 12px;
    border: 1px solid rgba(50, 50, 93, 0.1);
    max-height: 44px;
    width: 100%;
    background: white;
    box-sizing: border-box;
  }

  #payment-element {
    margin-bottom: 24px;
  }

  #payment-request-button {
    margin-bottom: 32px;
  }
  /* Buttons and links */
  button {
    background: #5469d4;
    font-family: Arial, sans-serif;
    color: #ffffff;
    border-radius: 4px;
    border: 0;
    padding: 12px 16px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    display: block;
    transition: all 0.2s ease;
    box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
    width: 100%;
  }

  button:hover {
    filter: contrast(115%);
  }

  button:disabled {
    opacity: 0.5;
    cursor: default;
  }

  #card-error {
    color: rgb(105, 115, 134);
    font-size: 16px;
    line-height: 20px;
    margin-top: 12px;
    text-align: center;
  }

  /* spinner/processing state, errors */
  .spinner,
  .spinner:before,
  .spinner:after {
    border-radius: 50%;
  }

  .spinner {
    color: #ffffff;
    font-size: 22px;
    text-indent: -99999px;
    margin: 0px auto;
    position: relative;
    width: 20px;
    height: 20px;
    box-shadow: inset 0 0 0 2px;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
  }

  .spinner:before,
  .spinner:after {
    position: absolute;
    content: "";
  }

  .spinner:before {
    width: 10.4px;
    height: 20.4px;
    background: #5469d4;
    border-radius: 20.4px 0 0 20.4px;
    top: -0.2px;
    left: -0.2px;
    -webkit-transform-origin: 10.4px 10.2px;
    transform-origin: 10.4px 10.2px;
    -webkit-animation: loading 2s infinite ease 1.5s;
    animation: loading 2s infinite ease 1.5s;
  }

  .spinner:after {
    width: 10.4px;
    height: 10.2px;
    background: #5469d4;
    border-radius: 0 10.2px 10.2px 0;
    top: -0.1px;
    left: 10.2px;
    -webkit-transform-origin: 0px 10.2px;
    transform-origin: 0px 10.2px;
    -webkit-animation: loading 2s infinite ease;
    animation: loading 2s infinite ease;
  }

  @keyframes loading {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  @media only screen and (max-width: 600px) {
    form {
      width: 80vw;
      min-width: initial;
    }
  }
`;

export default StripeCheckout;
