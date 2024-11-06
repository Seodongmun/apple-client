import { useContext, useEffect, useState } from "react";
import "../assets/App.css";
import Cart from "../pages/Cart";
import StyledButton from "./Button";
import Stack from "react-bootstrap/Stack";

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
              <div key={cart.cartCode}>
                <Stack gap={3}>
                  <div className="p-2">상품명 : {cart.product.title}</div>
                  <div className="p-2">상품정보 : {cart.product.content}</div>
                  <div className="p-2">
                    가격 : {cart.product.price.toLocaleString()}
                  </div>
                  <div className="p-2">수량 : {cart.count}</div>
                  <div>=================================</div>
                </Stack>
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
