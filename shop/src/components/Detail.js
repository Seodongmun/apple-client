import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import TabContent from "./TabContent";
import "../assets/App.css";
import { getProducts } from "../api/product";
import { addCount, decreseCount, addItem } from "../store/cartSlice";
import { useDispatch, useSelector } from "react-redux";

// let StyledBtn = styled.button`
//   background-color: ${(props) => props.bg};
//   color: ${(props) => (props.bg == "blue" ? "white" : "black")};
//   padding: ${(props) => (props.bg == "blue" ? "20px" : "10px")};
// `;
// let Box = styled.div`
//   background-color: grey;
//   padding: 20px;
// `;

function Detail() {
  const [products, setProducts] = useState([]);
  const productAPI = async () => {
    const result = await getProducts();
    setProducts(result.data);
  };
  useEffect(() => {
    productAPI();
  }, []);
  const { id } = useParams(); // 접속 url로 받은 상품 아이디
  let [boolean, setBoolean] = useState(false);
  let [tab, setTab] = useState(0);
  let [fade, setFade] = useState("");
  let cart = useSelector((state) => state.cart);
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

  if (id >= products.length) {
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
                src={`https://codingapple1.github.io/shop/shoes${
                  products[id].id - 1
                }.jpg`}
                width="100%"
              />
            </div>
            <div className={"col-md-6 start " + fade}>
              <h4 className="pt-5">{products[id].title}</h4>
              <p>{products[id].content}</p>
              <p>{products[id].price.toLocaleString()}원</p>
              <div>
                {console.log(cart[id - 1].id)}
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    dispatch(
                      addItem(
                        cart[id - 1].id,
                        cart[id - 1].name,
                        cart[id - 1].count,
                        cart[id - 1].content
                      )
                    );
                  }}
                >
                  {" "}
                  주문하기
                </button>

                <button disabled={boolean}>4초안에 누르면 50% 할인</button>
              </div>
              <div>
                입력란 : <input type="text" />
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
            id={id}
          />
        </div>
      </>
    );
  }
}

export default Detail;
