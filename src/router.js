import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Detail from "./components/Detail";
import LoginSuccess from "./components/LoginSuccess";
import Main from "./pages/Main";
import Login from "./pages/member/Login";
import Signup from "./pages/member/Signup";
import Error from "./pages/Error";
import Cart from "./pages/Cart";
import Mypage from "./pages/member/Mypage";
import Resign from "./pages/member/Resign";
import Product from "./pages/Product";
import Seller from "./pages/member/Seller";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Main /> },
      {
        path: "*",
        element: <Error />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/mypage/:id",
        element: <Mypage />,
      },
      {
        path: "/seller/:id",
        element: <Seller />,
      },
      {
        path: "/resign",
        element: <Resign />,
      },
      {
        path: "/product/:id/:productCode",
        element: <Product />,
      },
      {
        path: "/detail/:productCode",
        element: <Detail />,
      },
      {
        path: "/cart/:id",
        element: <Cart />,
      },
    ],
  },
  {
    path: "/login-success",
    element: <LoginSuccess />,
  },
]);

export default router;
