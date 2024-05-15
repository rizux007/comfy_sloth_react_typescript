// import { useAuth0 } from "@auth0/auth0-react";
// import { PayloadAction, createSlice } from "@reduxjs/toolkit";
// import { useEffect, useState } from "react";

// export type User = {
//   username: string;
//   jwt: string;
// };

// type UserState = {
//   user: User | null;
// };

// const { user, isAuthenticated, isLoading } = useAuth0;

// const [myUser, setMyUser] = useState(null);
// useEffect(() => {
//   console.log(`user: ${user}`);
//   console.log(`isAuthenticated: ${isAuthenticated}`);
//   console.log(`isLoading: ${isLoading}`);
// }, [isAuthenticated]);

// const getUserFromLocalStorage = (): User | null => {
//   const user = localStorage.getItem("user");

//   if (!user) return null;
//   return JSON.parse(user);
// };

// const initialState: UserState = {
//   user: getUserFromLocalStorage(),
// };

// const userSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {
//     loginUser: (state, action: PayloadAction<User>) => {
//       const user = action.payload;
//       state.user = user;
//       localStorage.setItem("user", JSON.stringify(user));
//       if (user.username === "demo user") {
//         return;
//       }
//     },
//     logoutUser: (state) => {
//       state.user = null;
//       localStorage.removeItem("user");
//     },
//   },
// });

// export const { loginUser, logoutUser } = userSlice.actions;

// export default userSlice.reducer;

// // import { useEffect } from "react";
// import { useAuth0 } from "@auth0/auth0-react";
// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { useEffect, useState } from "react";

// export type User = {
//   username: string;
//   jwt: string;
// };

// type UserState = {
//   user: User | null;
// };

// const getUserFromLocalStorage = (): User | null => {
//   const user = localStorage.getItem("user");
//   return user ? JSON.parse(user) : null;
// };

// const initialState: UserState = {
//   user: getUserFromLocalStorage(),
// };
// // const [myUser, setMyUser] = useState(null);
// // const { isAuthenticated } = useAuth0();

// // useEffect(() => {
// //   if (isAuthenticated) {
// //     setMyUser(myUser);
// //   } else {
// //     setMyUse(false);
// //   }
// // }, [isAuthenticated]);

// const userSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {
//     loginUser: (state, action: PayloadAction<User>) => {
//       const user = action.payload;
//       state.user = user;
//       localStorage.setItem("user", JSON.stringify(user));
//     },
//     logoutUser: (state) => {
//       state.user = null;
//       localStorage.removeItem("user");
//     },
//   },
// });

// export const { loginUser, logoutUser } = userSlice.actions;

// export default userSlice.reducer;
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  username: string;
  jwt: string;
}

interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
