import { useState } from "react";
import Joi from "joi-browser";

const useError = (data, schema) => {
  const [errors, setErrors] = useState({});

  // 输入表单验证函数，整个表单的验证
  const validate = () => {
    // 默认验证遇到一个错误时就立即终止验证
    // 第三个参数用于设置验证是否提前终止
    const options = { abortEarly: false };
    const result = Joi.validate(data, schema, options);

    // 没有错误时，result.error 为 null
    if (!result.error) return null;

    const errors = {};
    for (let item of result.error.details) {
      errors[item.path[0]] = item.message;
    }

    return errors;
  };

  // 单个输入框验证函数，输入框输入过程中验证
  const validateProperty = (input) => {
    // 由输入框的 name 和 value 组成的对象
    const obj = { [input.name]: input.value };

    // 复用主要的 schema
    const schemaProperty = { [input.name]: schema[input.name] };

    // 单个输入框的验证需要提前终止，不需要同时输出多种错误信息
    const result = Joi.validate(obj, schemaProperty);
    return result.error ? result.error.details[0].message : null;
  };

  // 处理表单提交时的验证
  const handleError = () => {
    const errors = validate();

    // errors 为 null 时设置 errors state 为空对象
    // 解决返回值为 null 时点击按钮会报错的情况
    setErrors(errors || {});
  };

  const handleErrorProperty = (input) => {
    const newErrors = { ...errors };
    const errorMessage = validateProperty(input);

    // 验证返回错误信息，则设置到 errors state
    if (errorMessage) newErrors[input.name] = errorMessage;
    // 否则，删除对应的 error 信息
    // 如果不删除，第一次出现的 error 将被一直保存在对象中，页面会一直显示错误信息
    else delete newErrors[input.name];

    setErrors(newErrors);
  };

  return { errors, handleError, handleErrorProperty, validate };
};

export default useError;
