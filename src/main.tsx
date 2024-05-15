import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store.ts";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Auth0Provider
    domain="dev-yolp04snkh5i6lp8.us.auth0.com"
    clientId="q73Jrv6kSr9EiidnrZ1HLIaOkxRU333c"
    authorizationParams={{
      redirect_uri: window.location.origin,
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

// domain : dev-yolp04snkh5i6lp8.us.auth0.com
// clientID : q73Jrv6kSr9EiidnrZ1HLIaOkxRU333c
// client Secret : KxQrfA3-qVBnfd58idixidVZN4dYIXFEZ3fGbWbF549NXfKKBOXPnqSoX9nMGPRX

// {
//   "sub": "google-oauth2|104268704349598262668",
//   "given_name": "Eric",
//   "family_name": "Aguigah",
//   "nickname": "eriksheney",
//   "name": "Eric Aguigah",
//   "picture": "https://lh3.googleusercontent.com/a/ACg8ocIEzYlLA57L2Ulm9FbAnPAWqiGDd36jP70eZEOzDcVHuQHSfjx5=s96-c",
//   "locale": "fr",
//   "updated_at": "2024-05-14T15:37:57.371Z"
// }
