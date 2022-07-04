import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import _ from "lodash";
import { toast } from "react-toastify";

import MovieTable from "./moviesTable";

import { getMovies, deleteMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";

import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";

import { paginate } from "../utils/paginate";
import SearchBox from "./common/searchBox";

const Movies = ({ user }) => {
  const [movies, setMovies] = useState([]);
  const [pageSize] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [sortColumn, setSortColumn] = useState({
    path: "title",
    order: "asc",
  });
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const getData = async () => {
      const { data } = await getGenres();
      const genres = [{ _id: "", name: "所有类型" }, ...data];

      const { data: movies } = await getMovies();
      setMovies(movies);
      setGenres(genres);
    };
    getData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteMovie(id);
      const newMovies = movies.filter((movie) => movie._id !== id);
      setMovies(newMovies);
    } catch (error) {
      if (error.response && error.response.status === 404)
        toast.error("这个电影不存在。");
      // setMovies(originalMovies);
    }
  };

  const handleLike = (movie) => {
    const newMovies = [...movies];
    const index = newMovies.indexOf(movie);
    newMovies[index] = { ...movie };
    newMovies[index].liked = !newMovies[index].liked;
    setMovies(newMovies);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleGenreSelect = (genre) => {
    setSearchQuery("");
    setSelectedGenre(genre);
    // 解决在第二页点击分类时，页面不显示的问题
    setCurrentPage(1);
  };

  const handleSearch = (query) => {
    setSelectedGenre(null);
    setCurrentPage(1);
    setSearchQuery(query);
  };

  const handleSort = (newSortColumn) => {
    setSortColumn(newSortColumn);
  };

  const getPageData = () => {
    // 默认显示全部数据
    let filterMovies = movies;

    // 基于搜索框筛选，空字符串是类假值
    if (searchQuery) {
      filterMovies = movies.filter(
        (movie) =>
          // 判断是否包含查找字符串
          movie.title.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1
        // 判断是否以查找字符串开头
        // movie.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    }
    // 基于 genre 筛选
    // 当 selectedGenre 为类真值并且 _id 属性也为类真值时，进行筛选
    else if (selectedGenre && selectedGenre._id)
      filterMovies = movies.filter(
        (movie) => movie.genre._id === selectedGenre._id
      );

    const sortMovies = _.orderBy(
      filterMovies,
      [sortColumn.path],
      [sortColumn.order]
    );

    // 计算出当前页需要渲染的 movie
    const newMovies = paginate(sortMovies, currentPage, pageSize);

    return { totalCount: filterMovies.length, data: newMovies };
  };

  if (movies.length === 0) return <p>正在加载...</p>;

  const { totalCount, data: newMovies } = getPageData();

  return (
    <div className="row">
      <div className="col-2">
        <ListGroup
          items={genres}
          selectedItem={selectedGenre}
          onItemSelect={handleGenreSelect}
        />
      </div>

      <div className="col">
        {user && (
          <Link to="/movies/new" className="btn btn-primary mb-2">
            新电影
          </Link>
        )}
        <p>数据库里面现在还有 {totalCount} 部电影！</p>
        <SearchBox value={searchQuery} onChange={handleSearch} />
        <MovieTable
          newMovies={newMovies}
          sortColumn={sortColumn}
          onLike={handleLike}
          onDelete={handleDelete}
          onSort={handleSort}
        />

        <Pagination
          itemsCount={totalCount}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          onPrevPage={handlePrevPage}
          onNextPage={handleNextPage}
        />
      </div>
    </div>
  );
};

export default Movies;
