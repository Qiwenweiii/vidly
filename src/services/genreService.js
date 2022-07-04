import http from './httpService';
import config from '../config.json';

export function getGenres() {
  // 从服务器请求数据并返回，返回的是一个 Promise，使用时需要处理
  // 要给使用到这个服务的地方添加 async...await...
  return http.get(`${config.apiUrl}/genres`);
}
