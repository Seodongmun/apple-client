import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addCount, decreseCount, removeItem } from "./../store/cartSlice.js";

const Cart = () => {
  // store에서 가져올때 (useSelector)
  // store.js 로 요청보내는 함수 (dispatch)
  let cart = useSelector((state) => state.cart);
  let dispatch = useDispatch();

  return (
    <Table>
      <thead>
        <tr>
          <th>#</th>
          <th>상품명</th>
          <th>수량</th>
          <th>상품정보</th>
          <th>변경하기</th>
          <th>삭제</th>
        </tr>
      </thead>

      <tbody>
        {cart.map((a, i) => (
          <tr key={i}>
            <td>{cart[i].id}</td>
            <td>{cart[i].name}</td>
            <td>{cart[i].count}</td>
            <td>{cart[i].content}</td>
            <td>
              <button
                onClick={() => {
                  dispatch(addCount(cart[i].id));
                }}
              >
                +
              </button>
              <button
                onClick={() => {
                  dispatch(decreseCount(cart[i].id));
                }}
              >
                -
              </button>
            </td>
            <td>
              <button
                onClick={() => {
                  dispatch(removeItem(cart[i].id));
                }}
              >
                삭제
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default Cart;
