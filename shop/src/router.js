import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Main from "./pages/Main";
import Login from "./pages/member/Login";
import Signup from "./pages/member/Signup";
import Detail from "./components/Detail";
import Error from "./pages/Error";
import Cart from "./pages/Cart";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [{ index: true, element: <Main /> }],
  },
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
    path: "/detail/:id",
    element: <Detail />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    errorElement: <Error />,
  },
]);

export default router;
