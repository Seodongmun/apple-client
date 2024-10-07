import { createSlice } from "@reduxjs/toolkit";

let cart = createSlice({
  name: "cart",
  initialState: [
    { id: 0, name: "White and Black", count: 0, content: "1번 상품임" },
    { id: 2, name: "Red Knit", count: 0, content: "2번 상품임" },
    { id: 5, name: "Grey Yordan", count: 0, content: "3번 상품임" },
  ],
  reducers: {
    // 위의 state , 파라미터
    // action.payload는 함수가 사용된 위치에서 온 값
    // ex) 아래는 cart.map에서 온 i의 id 값이다
    addCount(state, action) {
      let num = state.findIndex((a) => {
        console.log("받아온 id값" + action.payload);
        console.log("state의 id값" + a.id);
        // 두 아이디값이 일치하는 인덱스
        return a.id === action.payload;
      });
      state[num].count++;
    },
    decreseCount(state, action) {
      let num = state.findIndex((a) => {
        return a.id === action.payload;
      });
      state[num].count--;
    },
    addItem(state, action) {
      state.push({
        id: action.payload.id,
        name: action.payload.name,
        content: action.payload.content,
      });
    },
    removeItem(state, action) {
      // for (let i = 0; i < state[1].id.length; i++) {
      //   if (num === action.payload) {
      //     state.splice(i, 1);
      //   }
      // }
    },
  },
});

export let { addCount, decreseCount, addItem, removeItem } = cart.actions;

export default cart;
