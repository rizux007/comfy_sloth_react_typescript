import { Handler } from "@netlify/functions";
import dotenv from "dotenv";
import Stripe from "stripe";

dotenv.config();

const stripe = new Stripe(process.env.VITE_STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-04-10",
});

const handler: Handler = async (event) => {
  if (event.body) {
    const { cartTotal, shipping } = JSON.parse(event.body);
    const calculateOrderAmount = (): number => {
      return shipping + cartTotal;
    };
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(),
        currency: "usd",
      });

      return {
        statusCode: 200,
        body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: error }),
      };
    }
  }

  return {
    statusCode: 200,
    body: "Create Payment Intent",
  };
};

export { handler };
