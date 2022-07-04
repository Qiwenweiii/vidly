import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import Joi from "joi-browser";
import Input from "./common/input";
import Select from "./common/select";
import useError from "../hooks/useError";
import { getGenres } from "../services/genreService";
import { getMovie, saveMovie } from "../services/movieService";

const MovieForm = () => {
  const params = useParams();
  const history = useHistory();

  const [data, setData] = useState({
    title: "",
    genreId: "",
    numberInStock: "",
    dailyRentalRate: "",
  });

  const [genres, setGenres] = useState([]);

  const mapToViewModel = (movie) => {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  };

  useEffect(() => {
    const getData = async () => {
      // 构建分类
      const { data: genres } = await getGenres();
      setGenres(genres);

      // 构建电影
      const movieId = params.id;
      // 如果是新建电影，则退出执行
      // 否则，获取电影数据并设置到 data，渲染到页面
      if (movieId === "new") return;

      try {
        const { data: movie } = await getMovie(movieId);
        setData(mapToViewModel(movie));
        // 错误的 id 无法获取到 movie，反馈 404 状态码
      } catch (error) {
        // 使用 push 的话可以通过回退按钮退回到之前错误 id 的页面
        // 然后页面又将重新转到 not-found 页面，无法真正回退
        // return 阻止继续执行后面的代码
        if (error.response && error.response.status === 404)
          history.replace("/not-found");
      }
    };

    getData();
  }, []);

  const schema = {
    // 新建的电影没有 _id 属性，所以是非必须
    _id: Joi.string(),
    title: Joi.string()
      .required()
      .label("Title"),
    genreId: Joi.string()
      .required()
      .label("Genre"),
    numberInStock: Joi.number()
      .min(0)
      .max(100)
      .required()
      .label("Stock"),
    dailyRentalRate: Joi.number()
      .min(0)
      .max(10)
      .required()
      .label("Rate"),
  };

  const { errors, handleError, handleErrorProperty, validate } = useError(
    data,
    schema
  );

  const handleChange = ({ currentTarget: input }) => {
    handleErrorProperty(input);

    const newData = { ...data };
    newData[input.name] = input.value;
    setData(newData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    handleError();
    if (Object.keys(errors).length !== 0) return;

    await saveMovie(data);

    history.push("/movies");
  };

  return (
    <div>
      <h1>电影详细信息</h1>
      <form onSubmit={handleSubmit}>
        <Input
          name="title"
          label="片名"
          value={data.title}
          error={errors.title}
          onChange={handleChange}
        />
        <Select
          name="genreId"
          label="类型"
          value={data.genreId}
          error={errors.genreId}
          onChange={handleChange}
          options={genres}
        />
        <Input
          name="numberInStock"
          label="库存"
          value={data.numberInStock}
          error={errors.numberInStock}
          onChange={handleChange}
        />
        <Input
          name="dailyRentalRate"
          label="租金"
          value={data.dailyRentalRate}
          error={errors.dailyRentalRate}
          onChange={handleChange}
        />
        <button className="btn btn-primary" disabled={validate()}>
          保存
        </button>
      </form>
    </div>
  );
};

export default MovieForm;
