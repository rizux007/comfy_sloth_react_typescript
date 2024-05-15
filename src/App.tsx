import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar, Sidebar, Footer } from "./components";

import {
  Home,
  Products,
  SingleProduct,
  About,
  Cart,
  Error,
  Checkout,
  PrivateRoute,
  AuthWrapper,
} from "./pages";
// import { PRODUCTS } from "./data";

function App() {
  // window.localStorage.setItem("products", JSON.stringify(PRODUCTS));
  return (
    <AuthWrapper>
      <Router basename="/comfy_sloth_react_typescript">
        <Navbar />
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<SingleProduct />} />
          <Route
            path="/checkout"
            element={
              <PrivateRoute>
                <Checkout />
              </PrivateRoute>
            }
          ></Route>
          <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
      </Router>
    </AuthWrapper>
  );
}

export default App;
