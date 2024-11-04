import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/api/",
});

const authorize = axios.create({
  baseURL: "http://localhost:8080/api/private/",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

// 전체 회원 조회
export const getMembers = async () => {
  return await instance.get("member");
};

// 회원 한명 조회(id)
export const getMember = async (id) => {
  return await instance.get(`member/${id}`);
};

// 회원 정보 수정
export const updateMember = async (data) => {
  return await authorize.put("member", data);
};

// 회원 탈퇴(id)
export const resignMember = async (id) => {
  return await authorize.delete(`member/${id}`);
};

// 비밀번호 체크
export const passwordCheck = async (data) => {
  return await authorize.post("member", data);
};

// 회원가입
export const signup = async (data) => {
  return await instance.post("signup", data);
};

// 로그인
export const login = async (data) => {
  try {
    return await instance.post("login", data);
  } catch {
    new Error("LOGIN FAIL");
  }
};
