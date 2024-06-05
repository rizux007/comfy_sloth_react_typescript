import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store.ts";
import { Auth0Provider } from "@auth0/auth0-react";

const redirectUri = window.location.origin + window.location.pathname;

console.log( window.location.origin)
console.log( window.location.pathname)
// const authDomain = import.meta.env.VITE_REACT_APP_AUTH_DOMAIN;
// const authClientId = import.meta.env.VITE_REACT_APP_AUTH_CLIENT_ID;

// if (!authDomain) {
//   throw new Error("Missing environment variable: REACT_APP_AUTH_DOMAIN");
// }

// if (!authClientId) {
//   throw new Error("Missing environment variable: REACT_APP_AUTH_CLIENT_ID");
// }

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Auth0Provider
    // domain={authDomain}
    // clientId={authClientId}
    domain="dev-yolp04snkh5i6lp8.us.auth0.com"
    clientId="q73Jrv6kSr9EiidnrZ1HLIaOkxRU333c"
    authorizationParams={{
      redirect_uri: redirectUri,
    }}
    cacheLocation="localstorage"
  >
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  </Auth0Provider>
);
