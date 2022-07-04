import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortDown, faSortUp } from "@fortawesome/free-solid-svg-icons";

const TableHead = ({ columns, sortColumn, onSort }) => {
  const raiseSort = (path) => {
    const sortColumnIn = { ...sortColumn };
    if (sortColumnIn.path === path)
      sortColumnIn.order = sortColumnIn.order === "asc" ? "desc" : "asc";
    else {
      sortColumnIn.path = path;
      sortColumnIn.order = "asc";
    }

    onSort(sortColumnIn);
  };

  const renderSortIcon = (column) => {
    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === "asc") return <FontAwesomeIcon icon={faSortUp} />;
    return <FontAwesomeIcon icon={faSortDown} />;
  };

  return (
    <thead>
      <tr>
        {columns.map((column) => (
          <th
            className="clickable"
            key={column.path || column.key}
            onClick={() => raiseSort(column.path)}
          >
            {column.label}
            {renderSortIcon(column)}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHead;
