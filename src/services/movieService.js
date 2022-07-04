import http from './httpService';
import config from '../config.json';

const apiEndPoint = `${config.apiUrl}/movies`;

export function getMovies() {
  return http.get(apiEndPoint);
}

export function getMovie(movieId) {
  return http.get(`${apiEndPoint}/${movieId}`);
}

export function saveMovie(movie) {
  // 修改已存在的电影
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    // 发送给服务器的数据不能包含 id
    return http.put(`${apiEndPoint}/${movie._id}`, body);
  }
  // 保存新电影
  return http.post(apiEndPoint, movie);
}

export function deleteMovie(movieId) {
  return http.delete(`${apiEndPoint}/${movieId}`);
}
