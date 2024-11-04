import Header from "./Header";
import { Outlet } from "react-router-dom";
import { getProducts } from "../api/product";
import { getMembers } from "../api/member";
import { useEffect, useState } from "react";
import { Suspense } from "react";

const Layout = () => {
  const [products, setProducts] = useState([]);
  const [members, setMembers] = useState([]);
  const productsAPI = async () => {
    const result = await getProducts();
    setProducts(result.data);
  };
  const memberAPI = async () => {
    const result = await getMembers();
    setMembers(result.data);
  };
  useEffect(() => {
    productsAPI();
  }, []);
  useEffect(() => {
    memberAPI();
  }, []);

  return (
    <>
      <Suspense fallback={<div>로딩중임 ㄱㄷ</div>}>
        <Header members={members} setMembers={setMembers} />
        <Outlet
          context={{
            members,
            setMembers,
            products,
            setProducts,
          }}
        />
      </Suspense>
    </>
  );
};

export default Layout;
