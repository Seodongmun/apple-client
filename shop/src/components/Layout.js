import Header from "./Header";
import { Outlet } from "react-router-dom";
import { getProducts } from "../api/product";
import { useEffect, useState } from "react";

const Layout = () => {
  const [products, setProducts] = useState([]);
  const productAPI = async () => {
    const result = await getProducts();
    setProducts(result.data);
  };

  useEffect(() => {
    productAPI();
  }, []);

  return (
    <>
      <Header />
      <Outlet context={{ products, setProducts }} />
    </>
  );
};

export default Layout;
