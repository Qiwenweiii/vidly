import axios from "axios";
import { toast } from "react-toastify";

// 拦截反馈，处理出错的状态
axios.interceptors.response.use(null, (error) => {
  // 如果产生可预期错误，就返回一个拒绝的 Promise，将控制权交给 catch
  if (
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500
  )
    return Promise.reject(error);

  // 记录不可预期的错误
  console.log("Logging the error", error);

  toast.error("一个不可预期的错误产生了。");

  // 返回 reject 状态的 Promise，将控制权交给 catch
  return Promise.reject(error);
});

// 不从 authService 获取 jwt，避免双向引用问题
function setJwt(jwt) {
  // 配置默认头部信息，请求受保护的路由，使用用户登录时返回的 jwt
  // headers 后面的属性可以是 common 和 post ，分别用于所有的请求和仅 post 请求
  axios.defaults.headers.common["x-auth-token"] = jwt;
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt,
};
