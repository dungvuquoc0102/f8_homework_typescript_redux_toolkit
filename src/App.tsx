import { Route, Routes } from "react-router-dom";
import "./App.css";
import AdminLayout from "./layouts/AdminLayout";
import HomeLayout from "./layouts/HomeLayout";
import AdminProductFormPage from "./pages/admin/AdminProductFormPage";
import AdminProductPage from "./pages/admin/AdminProductPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomeLayout />}></Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminProductPage />} />
          <Route path="product-add" element={<AdminProductFormPage />} />
          <Route path="product-update/:id" element={<AdminProductFormPage />} />
        </Route>

        <Route path="/register" element={<HomeLayout />}></Route>
        <Route path="/login" element={<HomeLayout />}></Route>
      </Routes>
    </>
  );
}

export default App;
