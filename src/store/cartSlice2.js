import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { increase, decrease } from "../api/cart";

// cartCode 받아서 카운트 업데이트
export const increaseCount = createAsyncThunk(
  "cart/increaseCount",
  async (data) => {
    const response = await increase(data);
    console.log(response.data);
    return response.data;
  }
);
export const decreseCount = createAsyncThunk(
  "cart/decreseCount",
  async (data) => {
    const response = await decrease(data);
    console.log(response.data);
    return response.data;
  }
);

// 슬라이스를 써서 상태처리를 하려면 state.count를 action.payload로 동기화 해줘야한다
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    count: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(increaseCount.fulfilled, (state) => {
        console.log(state.count);
        state.count += 1;
      })
      .addCase(decreseCount.fulfilled, (state) => {
        state.count -= 1;
      });
  },
});

export default cartSlice;
