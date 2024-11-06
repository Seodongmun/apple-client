import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import "../assets/detail.css";
import { useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import TabContent from "./TabContent";
import "../assets/App.css";
import { getProducts } from "../api/product";
import { addCount, decreseCount, addItem } from "../store/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLike } from "../hooks/like";
import StyledButton from "./Button";
import { useAuth } from "../contexts/AuthContext";
import Input from "./Input";
import { addCart, getCarts } from "../api/cart";
import { getMember } from "../api/member";

const Detail = () => {
  const { id: loginId } = useAuth();
  const { products, setProducts } = useOutletContext();
  const { productCode } = useParams();
  // parseInt(productCode, 10)는 productCode를 10진수로 변환하여 문자열을 숫자로 바꿉니다.
  // 파라미터로 받은 상품코드와 products에서 같은 코드를 가진 상품 find
  // 이렇게 안하면 배열 [0,1,2,3] 이런식으로 찾음
  const selectedProduct = products.find(
    (product) => product.productCode === parseInt(productCode, 10)
  );

  const Product = () => {
    navigate(`/product/${loginId}/${productCode}`);
  };
  const navigate = useNavigate();
  const [like, addLike] = useLike();
  // 장바구니 추가할때 보낼것들
  const [cart, setCart] = useState({
    id: loginId,
    productCode: productCode,
    count: 0,
  });
  // 회원이 가진 카트 리스트
  const [cartList, setCartList] = useState([]);
  const [member, setMember] = useState();
  // async 시작
  const memberAPI = async (loginId) => {
    const result = await getMember(loginId);
    setMember(result.data);
  };
  const productAPI = async () => {
    const result = await getProducts();
    setProducts(result.data);
  };
  const cartAPI = async (loginId) => {
    const result = await getCarts(loginId);
    setCartList(result.data);
  };
  console.log(
    "현재 카트페이지에 들어온 회원의 등급 = " + (member?.type || "정보 없음")
  );

  const submit = async () => {
    const result = await addCart(cart);
    alert("상품이 장바구니에 추가되었습니다");
  };

  useEffect(() => {
    cartAPI(loginId);
  }, []);

  useEffect(() => {
    memberAPI(loginId);
    productAPI();
  }, []);

  let [boolean, setBoolean] = useState(false);
  let [tab, setTab] = useState(0);
  let [fade, setFade] = useState("");
  let dispatch = useDispatch();

  // 타이머 유즈 이팩트
  useEffect(() => {
    // console.log("유즈 이펙트 실행");
    let timer = setTimeout(() => {
      boolean = true;
      setBoolean(boolean);
      // console.log("4초뒤 불리언 변경 ", boolean);
    }, 4000);
    return () => {
      // useEffect 동작전 실행되는 곳
      // ex) 타이머 clean up 할때
      clearTimeout(timer);
    };
  }, []);

  // 탭 유즈 이팩트
  useEffect(() => {
    let timer = setTimeout(() => {
      setFade("end");
    }, 100);

    return () => {
      clearTimeout(timer);
      setFade("");
    };
  }, [tab]);

  if (productCode >= products.length) {
    // 이 상태가 에러페이지
    return (
      <div>
        <h1>에러용</h1>
      </div>
    );
  } else {
    // 이 상태가 정상리턴
    return (
      <>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <img
                src={`https://codingapple1.github.io/shop/shoes${selectedProduct.productCode}.jpg`}
                width="100%"
              />
            </div>
            <div className={"col-md-6 start " + fade}>
              <h4 className="pt-5">{selectedProduct.title}</h4>
              <p>{selectedProduct.content}</p>
              <p>{selectedProduct.price.toLocaleString()}원</p>
              <p>❤ {like}</p>
              <div>
                <Input
                  type="number"
                  tag="수량"
                  value={cart.count}
                  change={(e) => setCart({ ...cart, count: e.target.value })}
                />
                <div className="button-group">
                  <StyledButton
                    ButtonName={"장바구니 추가"}
                    onClick={submit}
                  ></StyledButton>
                  <StyledButton
                    ButtonName={"좋아요"}
                    onClick={addLike}
                  ></StyledButton>
                </div>
              </div>
            </div>
          </div>
          <Nav variant="tabs" defaultActiveKey="link0">
            <Nav.Item>
              <Nav.Link
                eventKey="link0"
                onClick={() => {
                  setTab(0);
                }}
              >
                이름
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="link1"
                onClick={() => {
                  setTab(1);
                }}
              >
                상세정보
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="link2"
                onClick={() => {
                  setTab(2);
                }}
              >
                가격
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="link3"
                onClick={() => {
                  setTab(3);
                }}
              >
                장바구니
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <TabContent
            tab={tab}
            setTab={setTab}
            products={products}
            setProducts={setProducts}
            productCode={productCode}
            cartList={cartList}
            setCartList={setCartList}
            selectedProduct={selectedProduct}
          />
        </div>
      </>
    );
  }
};

export default Detail;
