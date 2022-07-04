import jwtDecode from "jwt-decode";
import http from "./httpService";
import config from "../config.json";

const apiEndPoint = `${config.apiUrl}/auth`;
const TOKEN = "token";

// 解决双向引用问题
http.setJwt(localStorage.getItem(TOKEN));

export async function login(email, password) {
  const { data: jwt } = await http.post(apiEndPoint, { email, password });
  localStorage.setItem(TOKEN, jwt);
}

export function registerLogin(jwt) {
  localStorage.setItem(TOKEN, jwt);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(TOKEN);
    return jwtDecode(jwt);
  } catch (error) {
    // 没有存储 jwt 时返回 null
    return null;
  }
}

export function logout() {
  localStorage.removeItem(TOKEN);
}

export default { login, registerLogin, logout, getCurrentUser };
