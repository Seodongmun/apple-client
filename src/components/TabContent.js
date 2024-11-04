import { useContext, useEffect, useState } from "react";
import "../assets/App.css";
import Cart from "../pages/Cart";
import StyledButton from "./Button";

const TabContent = ({ tab, cartList, selectedProduct }) => {
  const [fade, setFade] = useState("");

  useEffect(() => {
    // 애니메이션 기능 넣으려면 타이머 넣어야함
    const timer = setTimeout(() => {
      setFade("end");
    }, 100);

    return () => {
      clearTimeout(timer);
      setFade("");
    };
  }, [tab]);

  return (
    <div className={"start " + fade}>
      {tab == 0 ? <div>상품 명 : {selectedProduct.title}</div> : null}
      {tab == 1 ? <div>상세정보 : {selectedProduct.content}</div> : null}
      {tab == 2 ? (
        <div>가격 : {selectedProduct.price.toLocaleString()}</div>
      ) : null}
      {tab == 3 ? (
        <>
          <div>
            {cartList.map((cart, i) => (
              <div>
                <div key={cart.cartCode}>
                  <h1>상품명 : {cart.product.title}</h1>
                  <h1>상품정보 : {cart.product.content}</h1>
                  <h1>가격 : {cart.product.price.toLocaleString()}</h1>
                  <h1>개수 : {cart.count}</h1>
                  <h1>============================</h1>
                </div>
              </div>
            ))}
            <StyledButton ButtonName={"결제"}></StyledButton>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default TabContent;
