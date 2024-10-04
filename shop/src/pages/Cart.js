import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addCount, decreseCount, test } from "./../store/cartSlice.js";

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
        </tr>
      </thead>

      <tbody>
        {cart.map((cart, i) => (
          <tr key={cart.id} data-code={cart.id}>
            <td>{cart.id}</td>
            <td>{cart.name}</td>
            <td>{cart.count}</td>
            <td>{cart.content}</td>
            <td>
              {/* cart의 array의 cart.id 랑 같은 상품의 버튼을 payload로 보낸다 */}
              <button
                onClick={() => {
                  dispatch(addCount(cart.id));
                }}
              >
                +
              </button>
              <button
                onClick={() => {
                  dispatch(decreseCount(cart.id));
                }}
              >
                -
              </button>
              <button
                onClick={() => {
                  dispatch(test(cart.id));
                }}
              >
                test
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default Cart;
