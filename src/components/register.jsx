import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Joi from "joi-browser";
import { toast } from "react-toastify";

import Input from "./common/input";
import useError from "../hooks/useError";
import { register } from "../services/userServices";
import auth from "../services/authService";

const Register = () => {
  const [data, setData] = useState({ username: "", password: "", name: "" });

  const schema = {
    username: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required()
      .label("用户名"),
    password: Joi.string()
      .min(5)
      .max(16)
      .required()
      .label("密码"),
    name: Joi.string()
      .required()
      .label("昵称"),
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

    try {
      const res = await register(data);
      toast.success("注册成功，即将自动登录！");
      auth.registerLogin(res.headers["x-auth-token"]);
      window.location = "/";
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error("此用户已注册！");
      }
    }
  };

  if (auth.getCurrentUser()) return <Redirect to="/" />;

  return (
    <div>
      <h1>注册新用户</h1>
      <form onSubmit={handleSubmit}>
        <Input
          name="username"
          label="用户名"
          value={data.username}
          error={errors.username}
          onChange={handleChange}
          type="email"
        />
        <Input
          name="password"
          label="密码"
          value={data.password}
          error={errors.password}
          onChange={handleChange}
          type="password"
        />
        <Input
          name="name"
          label="昵称"
          value={data.name}
          error={errors.name}
          onChange={handleChange}
        />
        <button className="btn btn-primary" disabled={validate()}>
          注册
        </button>
      </form>
    </div>
  );
};

export default Register;
