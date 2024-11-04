import { addProduct, getProducts, test } from "../api/product";
import StyledButton from "../components/Button";
import Input from "../components/Input";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Navigate, useParams } from "react-router-dom";

const Product = () => {
  const { id: loginId } = useAuth();
  const { id: paramsId } = useParams();
  const { productCode } = useParams();
  const [modal, setModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({
    member: {
      id: loginId,
    },
    title: "",
    content: "",
    price: 0,
    stock: 0,
    url: "",
  });
  const productsAPI = async () => {
    const result = await getProducts();
    setProducts(result.data);
  };
  useEffect(() => {
    productsAPI();
  }, []);
  const submit = async () => {
    await addProduct(product);
    alert("추가되었습니다");
  };
  if (loginId === null || paramsId !== loginId) {
    return <Navigate to="/error" />;
  } else {
    return (
      <>
        <div>
          {modal ? (
            <>
              <h1>요기 토글</h1>
            </>
          ) : null}
        </div>
        <Input
          tag={"상품 이름"}
          type="text"
          placeholder="상품이름을 입력해주세요"
          value={product.title}
          change={(e) => setProduct({ ...product, title: e.target.value })}
        />
        <Input
          tag={"상세정보"}
          type="text"
          placeholder="상품 정보를 입력해주세요"
          value={product.content}
          change={(e) => setProduct({ ...product, content: e.target.value })}
        />
        <Input
          tag={"상품 가격"}
          type="text"
          value={product.price}
          change={(e) => setProduct({ ...product, price: e.target.value })}
        />
        <Input
          tag={"상품 수량"}
          type="number"
          value={product.stock}
          change={(e) => setProduct({ ...product, stock: e.target.value })}
        />
        <StyledButton ButtonName={"추가"} onClick={submit}></StyledButton>
      </>
    );
  }
};

export default Product;
