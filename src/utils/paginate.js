import _ from "lodash";

// 实现分页的方法
// 参数：要分页的数据，当前页数，每一页项目的数量
export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  // 从 startIndex 开始获取 pageSize 个元素，组成数组
  return _(items)
    .slice(startIndex)
    .take(pageSize)
    .value();
}
