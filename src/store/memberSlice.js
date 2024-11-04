import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { resignMember, updateMember } from "../api/member";

export const deleteMember = createAsyncThunk(
  "member/deleteMember",
  async (id) => {
    const response = await resignMember(id);
    return response.data;
  }
);

export const modifyMember = createAsyncThunk(
  "member/modifyMember",
  async (data) => {
    const response = await updateMember(data);
    return response.data;
  }
);

const memberSlice = createSlice({
  name: "member",
  initialState: {
    password: "",
    email: "",
    phone: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(modifyMember.fulfilled, (state, action) => {
      state.password = action.payload;
      state.email = action.payload;
      state.phone = action.email;
    });
  },
});
export default memberSlice;
