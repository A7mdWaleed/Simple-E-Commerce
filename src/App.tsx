import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import OrdersPage from "./components/OrdersPage";
import ProductDetails from "./components/ProductDetails";
import routes from "tempo-routes";
import { StoreProvider } from "./context/StoreContext";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <StoreProvider>
        <Suspense fallback={<p>Loading...</p>}>
          <>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/product/:id" element={<ProductDetails />} />
            </Routes>
            {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
          </>
        </Suspense>
      </StoreProvider>
    </AuthProvider>
  );
}

export default App;
