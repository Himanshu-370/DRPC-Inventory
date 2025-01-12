import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Library from "./pages/Library";
import Product from "./pages/Product";
import Component from "./pages/Component";
import RawMaterials from "./pages/RawMaterials";
import NotFound from "./pages/NotFound";

const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/library-categories" element={<Library />} />
      <Route
        path="/library-categories/:categoryId/library-products"
        element={<Product />}
      />
      <Route
        path="/library-categories/:categoryId/library-products/:productId/product-components"
        element={<Component />}
      />
      <Route path="/raw-materials" element={<RawMaterials />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Router>
);

export default AppRouter;
