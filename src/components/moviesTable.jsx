import React from "react";
import { Link } from "react-router-dom";

import Like from "./common/like";
import Table from "./common/table";
import auth from "../services/authService";

const MovieTable = ({ newMovies, sortColumn, onLike, onDelete, onSort }) => {
  const user = auth.getCurrentUser();

  const columns = [
    {
      path: "title",
      label: "片名",
      content: (movie) => (
        <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
      ),
    },
    { path: "genre.name", label: "类型" },
    { path: "numberInStock", label: "库存" },
    { path: "dailyRentalRate", label: "租金" },
    {
      key: "like",
      content: (movie) => (
        <Like liked={movie.liked} onLike={() => onLike(movie)} />
      ),
    },
  ];

  // 如果用户已登录并且是管理员，则增加删除的一列
  if (user && user.isAdmin) {
    columns.push({
      key: "delete",
      content: (movie) => (
        <button
          type="button"
          className="btn btn-danger btn-sm"
          onClick={() => onDelete(movie._id)}
        >
          删 除
        </button>
      ),
    });
  }

  return (
    <Table
      data={newMovies}
      columns={columns}
      sortColumn={sortColumn}
      onSort={onSort}
    />
  );
};

export default MovieTable;
