import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/api/",
});

// 전체 조회
export const getProducts = async () => {
  return await instance.get("product");
};

const authorize = axios.create({
  baseURL: "http://localhost:8080/api/private/",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

// 판매자가 가진 상품리스트 조회
export const getProductCode = async (id) => {
  return await authorize.get(`product/seller/${id}`);
};

// 상품 한개조회
export const getProduct = async (productCode) => {
  console.log("상품코드 옴? = ", productCode);
  return await authorize.get(`product/${productCode}`);
};

// 상품 추가
export const addProduct = async (data) => {
  try {
    console.log("보낼 data 값 = " + data);
    return await authorize.post("product", data);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// 상품 업데이트
export const updateProduct = async (data) => {
  return await authorize.put("product", data);
};

// 상품 제거
export const removeProduct = async (productCode) => {
  return await authorize.delete(`product/${productCode}`);
};
