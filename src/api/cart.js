import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/api/",
});

// 장바구니는 전부 private으로
const authorize = axios.create({
  baseURL: "http://localhost:8080/api/private/",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

// 로그인한 사람이 가진 카트품목
export const getCarts = async (id) => {
  return await authorize.get("select", {
    params: {
      id: id,
    },
  });
};

// 장바구니 추가
export const addCart = async (data) => {
  return await authorize.post("cart", data);
};

// 로그인한 사람의 카운트 조회
export const cartCount = async (cartCode, data) => {
  try {
    if (cartCode !== null || cartCode !== undefined) {
      return await authorize.post("cartCount", data);
    } else {
      console.log(cartCode);
    }
  } catch (error) {
    console.log(error);
  }
};

// cartCode 받아서 count + 1
export const increase = async (data) => {
  return await authorize.put("cart/increaseCount", data);
};

// cartCode 받아서 count - 1
export const decrease = async (data) => {
  return await authorize.put("cart/decreaseCount", data);
};

// 장바구니 삭제
export const removeCart = async (cartCode) => {
  return await authorize.delete(`cart/${cartCode}`);
};
