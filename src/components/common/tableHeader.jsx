import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortAsc, faSortDesc } from "@fortawesome/free-solid-svg-icons";

const TableHeader = ({ columns, sortColumn, onSort }) => {
  // 将排序的逻辑移到tableHeader内部
  const raiseSort = (column) => {
    // 复制一份当前的排序状态
    const newSortColumn = { ...sortColumn };
    // 如果点击label的是之前点击的，则转换排序方向
    if (newSortColumn.path === column) {
      newSortColumn.order = newSortColumn.order === "asc" ? "desc" : "asc";
      // 否则就按正序排序
    } else {
      newSortColumn.path = column;
      newSortColumn.order = "asc";
    }
    onSort(newSortColumn);
  };

  const renderSortIcon = (column) => {
    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === "asc") return <FontAwesomeIcon icon={faSortAsc} />;
    return <FontAwesomeIcon icon={faSortDesc} />;
  };

  return (
    <thead>
      <tr>
        {columns.map((column) => (
          <th
            key={column.path || column.key}
            onClick={() => raiseSort(column.path)}
            className={column.label && "clickable"}
          >
            {column.label}
            {renderSortIcon(column)}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
