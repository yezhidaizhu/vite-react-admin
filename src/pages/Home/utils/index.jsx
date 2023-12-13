import { uuid } from "@/utils/helper";

export function genRows(num = 3) {
  return [...new Array(num)].map(() => newRow());
}

export function newRow() {
  return {
    title: "",
    dataIndex: "",
    key: uuid(),
  };
}

// 格式化要复制的数据
export function formatColsToProTable(colsWatchValue = []) {
  return colsWatchValue?.map((item) => {
    return {
      ...item,
      render: item?.render
        ? (val, rd) => {
            return val;
          }
        : undefined,
    };
  });
}
