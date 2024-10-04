import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/api/",
});

export const getProducts = async () => {
  return await instance.get("product");
};
