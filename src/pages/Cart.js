import { Table } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext.js";
import { useEffect, useState } from "react";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import {
  getCarts,
  cartCount,
  increase,
  decrease,
  removeCart,
} from "../api/cart";
import "../assets/cart.css";
import StyledButton from "../components/Button.js";
import { useDispatch, useSelector } from "react-redux";
import { increaseCount, decreseCount } from "../store/cartSlice2.js";

const Cart = () => {
  const { id: loginId } = useAuth();
  const { id: paramsId } = useParams();
  const [toggle, setToggle] = useState(false);
  const dispatch = useDispatch();
  const [cartList, setCartList] = useState([]);
  const [count, setCount] = useState([]);
  const navigate = useNavigate();

  const cartAPI = async (loginId) => {
    try {
      const result = await getCarts(loginId);
      setCartList(result.data);
    } catch (error) {
      throw error;
    }
  };

  // 카운트 + 1
  const addCount = async (data) => {
    await increase(data);
    cartAPI(loginId); // DB에 +1 한뒤 카트 리스트 재호출
  };
  // 카운트 - 1
  const removeCount = async (data) => {
    await decrease(data);
    cartAPI(loginId);
  };
  // 상바구니 상품 삭제
  const deleteCart = async (cartCode) => {
    await removeCart(cartCode);
    cartAPI(loginId);
  };

  useEffect(() => {
    cartAPI(loginId);
  }, []);

  const checkout = () => {
    navigate(`/cart/${loginId}/checkout`);
  };

  if (loginId === null || paramsId !== loginId) {
    // 1. 시큐리티로 받은 id가 없을경우
    // 2. 로그인한 아이디와 파라미터로 받은 아이디 같지 않을경우
    // 이떄 에러 페이지
    return <Navigate to="/error" />;
  } else {
    // 정상 리턴
    return (
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>상품정보</th>
            <th className="cart-count-th">수량</th>
            <th>가격</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {cartList.map((cart, i) => (
            <tr key={i}>
              <td>{cart.product.productCode}</td>
              <td>{cart.product.title}</td>
              <td>{cart.product.content}</td>
              <td className="cart-count-td">
                {" "}
                <button
                  className="count-button"
                  onClick={() => addCount({ cartCode: cart.cartCode })}
                >
                  +
                </button>
                {cart.count}
                <button
                  className="count-button"
                  onClick={() => removeCount({ cartCode: cart.cartCode })}
                >
                  -
                </button>
              </td>
              <td>{(cart.product.price * cart.count).toLocaleString()}원</td>
              <td>
                <StyledButton
                  ButtonName={"삭제"}
                  onClick={() => deleteCart(cart.cartCode)}
                ></StyledButton>
              </td>
            </tr>
          ))}
        </tbody>
        <StyledButton ButtonName={"결제"} onClick={checkout}></StyledButton>
      </Table>
    );
  }
};

export default Cart;
