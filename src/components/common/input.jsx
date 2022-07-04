import React from "react";

const Input = ({ name, label, value, error, onChange, type = "text" }) => {
  return (
    <div className="form-group mb-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input
        value={value}
        name={name}
        onChange={onChange}
        id={name}
        type={type}
        className="form-control"
      />

      {/* 访问不存在的属性返回 undefined，类假值 */}
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
