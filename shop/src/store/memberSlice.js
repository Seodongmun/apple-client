import { createSlice } from "@reduxjs/toolkit";

let member = createSlice({
  name: "member",
  initialState: [
    { id: 1, password: 1234, email: "sss@naver.com", phone: "010-1111-1212" },
  ],
});
