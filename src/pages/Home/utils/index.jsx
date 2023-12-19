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

// 格式化ProTable的数据，selectedIndexs 有效的下标
export function formatColsToProTable(colsWatchValue = [], selectedIndexs = []) {
  const enableCols = colsWatchValue.filter((_, index) =>
    selectedIndexs?.includes(index)
  );

  return enableCols?.map((item, index) => {
    const { dataIndex, render } = item;
    return pickObjUndefined({
      ...item,
      dataIndex: dataIndex ? dataIndex : `dataIndex_${index}`, // 如果 dataIndex 为空，则使用 dataIndex 占位
      render: render
        ? (val, rd) => {
            return val;
          }
        : undefined,
    });
  });
}

// 格式化 ProTable的数据 可以复制
export const fmColsStrToCodeView = (valueObj) => {
  let str = stringify(valueObj);
  str = str?.replaceAll(/"##|##"/g, "");

  return str;

  function stringify(obj) {
    return JSON.stringify(
      obj,
      (k, v) => {
        if (typeof v === "function") {
          // 处理函数
          return `##${v}##`.replace(/\\r|\\n|(\s){2,}/g, "");
        } else {
          return v;
        }
      },
      2
    );
  }
};

function pickObjUndefined(obj) {
  const newObj = {};
  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      const val = obj[key];
      if (val !== undefined) {
        newObj[key] = val;
      }
    }
  }

  return newObj;
}
