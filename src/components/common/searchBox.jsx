import React from 'react';

const SearchBox = ({ value, onChange }) => {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="form-control my-3"
      placeholder="查找..."
    />
  );
};

export default SearchBox;
