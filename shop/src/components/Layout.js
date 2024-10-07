import Header from "./Header";
import { Outlet } from "react-router-dom";
import { getProducts } from "../api/product";
import { useEffect, useState } from "react";
import { Suspense } from "react";

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
      <Suspense fallback={<div>로딩중임 ㄱㄷ</div>}>
        <Header />
        <Outlet context={{ products, setProducts }} />
      </Suspense>
    </>
  );
};

export default Layout;
