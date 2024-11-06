import { useEffect, useState } from "react";
import { getMember, getSeller } from "../../api/member";
import { useAuth } from "../../contexts/AuthContext";
import { getProductCode } from "../../api/product";
import { Navigate } from "react-router-dom";
import Product from "../Product";
import ProductList from "../product/ProductList";
import ProductEdit from "../product/ProductEdit";
import Accordion from "react-bootstrap/Accordion";

const Seller = () => {
  const { id: loginId } = useAuth();
  const [member, setMember] = useState(null);
  const [sellerProduct, setSellerProduct] = useState([]);
  const [loading, setLoading] = useState(true); // 로딩 상태
  // 1. 처음 들어온 시점
  const memberAPI = async () => {
    const result = await getMember(loginId);
    setMember(result.data);
    setLoading(false); // 2. 로딩 완료
  };
  useEffect(() => {
    memberAPI();
  }, []); // 3. api 호출

  // 5. sellerAPI 호출
  const sellerAPI = async () => {
    const result = await getProductCode(loginId);
    // result.data가 배열인지 확인후 배열이라면 result.data SET 아니면 빈배열
    setSellerProduct(Array.isArray(result.data) ? result.data : []);
  };

  useEffect(() => {
    if (member && member.type === "seller") {
      // 6. 멤버가 있는 상태고 멤버 타입이 판매자일경우 sellerAPI호출
      sellerAPI();
    }
  }, [member]); // 4. member가 set될 시점

  if (loading) return <p>Loading...</p>;
  if (!Array.isArray(sellerProduct))
    return <p>Error: 상품 데이터가 배열이 아닙니다.</p>;
  if (member.type !== "seller") {
    return <Navigate to="/error" />;
  } else {
    return (
      <>
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>상품 추가</Accordion.Header>
            <Accordion.Body>
              <Product />
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>내가 등록한 상품</Accordion.Header>
            <Accordion.Body>
              <ProductList sellerProduct={sellerProduct} />
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>내 상품 수정</Accordion.Header>
            <Accordion.Body>
              <ProductList sellerProduct={sellerProduct} />
              <ProductEdit
                sellerProduct={sellerProduct}
                setSellerProduct={setSellerProduct}
              />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </>
    );
  }
};

export default Seller;
