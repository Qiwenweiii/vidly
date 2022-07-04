import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Redirect } from "react-router-dom";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import Input from "./common/input";
import useError from "../hooks/useError";
import auth from "../services/authService";

const LoginForm = () => {
  // location 会保存页面的来源信息等，包含上一个页面的 to
  const location = useLocation();

  const [account, setAccount] = useState({ username: "", password: "" });

  // 新建一个 Joi 验证 schema
  // label() 中的参数将会传递给下面的 item.path[0]，在控制台输出 result 查看细节
  const schema = {
    username: Joi.string()
      .email()
      .required()
      .label("用户名"),
    password: Joi.string()
      .min(5)
      .required()
      .label("密码"),
  };

  const { errors, handleError, handleErrorProperty, validate } = useError(
    account,
    schema
  );

  const handleChange = ({ currentTarget: input }) => {
    // 处理单个输入框的错误
    handleErrorProperty(input);

    const newAccount = { ...account };

    // 动态设置 state
    newAccount[input.name] = input.value;

    setAccount(newAccount);
  };

  const handleSubmit = async (e) => {
    // 阻止表单默认刷新页面的行为
    e.preventDefault();

    // 处理整个表单的错误
    handleError();

    // 有错误时 return，不再继续向后执行
    if (Object.keys(errors).length !== 0) return;

    try {
      await auth.login(account.username, account.password);

      const { state } = location;
      // 强制刷新整个网页，如果有 state，就回到之前的页面，否则回到首页
      window.location = state ? state.from : "/";
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error("用户名或密码错误，请重新输入...");
      }
    }
  };

  // 如果用户已登录，则跳转到首页
  if (auth.getCurrentUser()) return <Redirect to="/" />;

  return (
    <div>
      <h1>登录</h1>
      <form onSubmit={handleSubmit}>
        <Input
          name="username"
          label="用户名"
          value={account.username}
          error={errors.username}
          onChange={handleChange}
        />
        <Input
          name="password"
          label="密码"
          value={account.password}
          error={errors.password}
          onChange={handleChange}
          type="password"
        />

        {/* 使用表单验证方法判断是否禁用提交按钮，此方法返回一个 errors 对象或者 null */}
        <button className="btn btn-primary" disabled={validate()}>
          登录
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
