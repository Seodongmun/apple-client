import { createSlice } from "@reduxjs/toolkit";

let cart = createSlice({
  name: "cart",
  initialState: [
    { id: 1, name: "White and Black", count: 0, content: "0번 상품임" },
    { id: 2, name: "Grey Yordan", count: 0, content: "1번 상품임" },
    { id: 3, name: "blue", count: 0, content: "2번 상품임" },
    { id: 4, name: "yellow", count: 0, content: "3번 상품임" },
    { id: 5, name: "red", count: 0, content: "4번 상품임" },
    { id: 6, name: "pink", count: 0, content: "5번 상품임" },
  ],
  reducers: {
    // 위의 state , 파라미터
    // action.payload는 함수가 사용된 위치에서 온 값
    // ex) 아래는 cart.map에서 온 cart.id의 값이다
    addCount(state, action) {
      state[action.payload].count++;
      // state.findIndex((a) => {
      //   return a.id == action.payload;
      // });
      console.log(action.payload + "번째 상품의 아이디");
    },
    decreseCount(state, action) {
      state[action.payload].count--;
      console.log(action.payload);
    },
    addItem(state, action) {
      state.push(action.payload);
    },
    test(state, action) {
      state[action.payload].name = "test";
      console.log(action.payload);
    },
  },
});

export let { addCount, decreseCount, addItem, test } = cart.actions;

export default cart;
