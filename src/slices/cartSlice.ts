import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CartItemType, CartState, ToggleAmountType } from "../utils/types";
const defaultState: CartState = {
  cartItems: [],
  numItemsInCart: 0,
  cartTotal: 0,
  shipping: 500,
};

const getCartFromLocalStorage = (): CartState => {
  const cart = localStorage.getItem("cart");
  const parsedCart = cart ? JSON.parse(cart) : defaultState;
  return {
    ...defaultState,
    ...parsedCart,
    cartItems: parsedCart.cartItems || [],
  };
};

const cartSlice = createSlice({
  name: "cart",
  initialState: getCartFromLocalStorage(),
  reducers: {
    addToCart: (state, action: PayloadAction<CartItemType>) => {
      const newCartItem = action.payload;
      const existingItem = state.cartItems.find(
        (item) =>
          item.cartID === newCartItem.cartID &&
          item.productColor === newCartItem.productColor
      );

      if (existingItem) {
        existingItem.amount += newCartItem.amount;
      } else {
        state.cartItems.push(newCartItem);
      }

      state.numItemsInCart += newCartItem.amount;
      state.cartTotal += Number(newCartItem.price) * newCartItem.amount;

      localStorage.setItem(
        "cart",
        JSON.stringify({
          cartItems: state.cartItems,
          numItemsInCart: state.numItemsInCart,
          cartTotal: state.cartTotal,
        })
      );
    },
    clearCart: () => {
      localStorage.setItem("cart", JSON.stringify(defaultState));
      return defaultState;
    },
    removeItem: (state, action: PayloadAction<string>) => {
      const cartItemId = action.payload;
      const cartItem = state.cartItems.find((i) => i.cartID === cartItemId);
      if (!cartItem) return;
      state.cartItems = state.cartItems.filter((i) => i.cartID !== cartItemId);
      state.numItemsInCart -= cartItem.amount;
      state.cartTotal -= Number(cartItem.price) * cartItem.amount;
      localStorage.setItem("cart", JSON.stringify(state));
    },
    toggleAmount: (state, action: PayloadAction<ToggleAmountType>) => {
      const { id, value } = action.payload;
      state.cartItems = state.cartItems.map((item) => {
        if (item.productID === id) {
          if (value === "inc") {
            let newAmount = item.amount + 1;
            if (newAmount > id) {
              newAmount = id;
            }
            return { ...item, amount: newAmount };
          }
          if (value === "dec") {
            let newAmount = item.amount - 1;
            // const newAmount = Math.max(item.amount - 1, 1);
            if (newAmount < 1) {
              newAmount = 1;
            }
            return { ...item, amount: newAmount };
          }
        }
        return item;
      });

      // Mise à jour du total du panier dans le state
      state.cartTotal = state.cartItems.reduce((total, item) => {
        return total + Number(item.price) * item.amount;
      }, 0);

      // Mise à jour du nombre total d'articles dans le panier
      state.numItemsInCart = state.cartItems.reduce((total, item) => {
        return total + item.amount;
      }, 0);

      // Mise à jour du localStorage
      localStorage.setItem(
        "cart",
        JSON.stringify({
          cartItems: state.cartItems,
          numItemsInCart: state.numItemsInCart,
          cartTotal: state.cartTotal,
        })
      );
    },
  },
});

export const { addToCart, clearCart, removeItem, toggleAmount } =
  cartSlice.actions;

export default cartSlice.reducer;
