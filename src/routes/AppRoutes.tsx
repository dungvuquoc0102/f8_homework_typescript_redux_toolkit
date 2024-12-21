import { useRoutes } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import HomeLayout from "../layouts/HomeLayout";
import LoginLayout from "../layouts/LoginLayout";
import NotFoundLayout from "../layouts/NotFoundLayout";
import RegisterLayout from "../layouts/RegisterLayout";
import AdminProductFormPage from "../pages/admin/AdminProductFormPage";
import AdminProductPage from "../pages/admin/AdminProductPage";
import HomePage from "../pages/HomePage";

const AppRoutes = () => {
  const routes = [
    {
      path: "/",
      element: <HomeLayout />,
      children: [{ index: true, element: <HomePage /> }],
    },

    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        { index: true, element: <AdminProductPage /> },
        { path: "product-add", element: <AdminProductFormPage /> },
        { path: "product-update/:id", element: <AdminProductFormPage /> },
      ],
    },

    { path: "/register", element: <RegisterLayout /> },
    { path: "/login", element: <LoginLayout /> },

    { path: "*", element: <NotFoundLayout /> },
  ];
  return useRoutes(routes);
};

export default AppRoutes;
