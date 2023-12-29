import { arrayMove } from "@dnd-kit/sortable";
import copy from "copy-to-clipboard";
import { useMemo, useState } from "react";
import { opts } from "@/components/ServiceTable";
import TCard from "@/components/TCard";
import useDisclose from "@/hooks/useDisclose";
import {
  CopyOutlined,
  EyeOutlined,
  PlusCircleFilled,
  RedoOutlined,
} from "@ant-design/icons";
import { ProTable } from "@ant-design/pro-components";
import { Input } from "antd";
import { Button, Form, Table } from "antd";
import { Modal } from "antd";
import { Switch } from "antd";
import { ConfigProvider } from "antd";
import { message } from "antd";
import { Select } from "antd";
import { useForm } from "antd/es/form/Form";
import {
  fmColsStrToCodeView,
  formatColsToProTable,
  genRows,
  newRow,
} from "../utils";
import { valueTypeOpts } from "../utils/types";
import CodeView from "./CodeView";
import NewColsActions from "./NewColsActions";
import SortRow, { TableDndCtx } from "./SortRow";
import { ColsStatis, FCCenter, ReverseSwitch } from "./widget";

const { Item, useWatch } = Form;

const defaultCols = () => genRows(6);

const _defaultColsArr = defaultCols();
export default function NewCols() {
  const [form] = useForm();
  const [dataSource, setDataSource] = useState(_defaultColsArr);
  const [selectedRows, setSelectedRows] = useState(_defaultColsArr);

  const codeViewDisclose = useDisclose();
  const proTableViewDisclose = useDisclose();

  const colsWatchValue = useWatch("cols", form);

  const columns = [
    {
      key: "sort",
      width: 50,
    },
    {
      title: "序号",
      width: 50,
      render(_, rd, index) {
        return <div className="text-center">{index + 1}</div>;
      },
    },
    {
      title: "列名（title）",
      dataIndex: "title",
      width: 200,
      render(_, rd, index) {
        return (
          <Item name={["cols", index, "title"]} initialValue={""} noStyle>
            <Input allowClear />
          </Item>
        );
      },
    },
    {
      title: "对应字段（dataIndex）",
      dataIndex: "dataIndex",
      width: 200,
      render(_, rd, index) {
        return (
          <Item name={["cols", index, "dataIndex"]} initialValue={""} noStyle>
            <Input allowClear />
          </Item>
        );
      },
    },
    {
      title: "搜索",
      width: 200,
      dataIndex: "hideInSearch",
      render(_, rd, index) {
        return (
          <FCCenter className=" !justify-start gap-2">
            <Item
              name={["cols", index, "hideInSearch"]}
              initialValue={true}
              noStyle
            >
              <ReverseSwitch />
            </Item>

            {/* 搜索类型 */}
            <Item shouldUpdate noStyle>
              {({ getFieldValue }) => {
                if (!getFieldValue(["cols", index, "hideInSearch"])) {
                  return (
                    <>
                      <Item name={["cols", index, "valueType"]} noStyle>
                        <Select
                          placeholder="默认文本框"
                          options={valueTypeOpts}
                          className=" w-[120px]"
                          allowClear
                        />
                      </Item>
                    </>
                  );
                }
              }}
            </Item>

            {/* <Item shouldUpdate noStyle>
              {({ getFieldValue }) => {
                if (!getFieldValue(["cols", index, "hideInSearch"])) {
                  return (
                    <Item
                      name={["cols", index, "formItemProps", "name"]}
                      noStyle
                    >
                      <Input
                        placeholder="搜索form字段"
                        allowClear
                        className=" w-[120px]"
                      />
                    </Item>
                  );
                }
              }}
            </Item> */}

            <Item shouldUpdate noStyle>
              {({ getFieldValue }) => {
                // 下拉类型
                if (getFieldValue(["cols", index, "valueType"]) == "select") {
                  return (
                    <Item
                      hidden
                      name={["cols", index, "fieldProps"]}
                      initialValue={{ options: [] }}
                      noStyle
                    ></Item>
                  );
                }
              }}
            </Item>
          </FCCenter>
        );
      },
    },
    {
      title: "需要自定义（render）",
      dataIndex: "render",
      render(_, rd, index) {
        return (
          <>
            <Item name={["cols", index, "render"]} noStyle>
              <Switch />
            </Item>
          </>
        );
      },
    },
    {
      title: "操作",
      dataIndex: "opts",
      render(_, rd, index) {
        return opts([
          {
            label: "删除",
            danger: true,
            onClick() {
              deleteRow(index);
            },
          },
        ]);
      },
    },
  ];

  const addRow = () => setDataSource((v) => [...v, newRow()]);

  const deleteRow = (index) => {
    const pickIndex = (arr) => arr?.filter((_, i) => i !== index);
    setDataSource(pickIndex(dataSource));
    form.setFieldValue("cols", pickIndex(colsWatchValue));
  };

  const onClear = () => {
    Modal.confirm({
      title: "清空",
      content: "确认清空？",
      onOk() {
        const newCols = defaultCols();
        setDataSource(newCols);
        setSelectedRows(newCols);
        form.resetFields();
      },
    });
  };

  const onDragEnd = ({ activeIndex, overIndex }) => {
    setDataSource(arrayMove(dataSource, activeIndex, overIndex));
    form.setFieldValue(
      "cols",
      arrayMove(colsWatchValue, activeIndex, overIndex)
    );
  };

  // 选择的keys
  const selectedRowsKeys = useMemo(() => {
    return selectedRows?.map((item) => item?.key) || [];
  }, [selectedRows]);

  // 将要展示与复制的值
  const proTableCols = useMemo(() => {
    const selectedIndexs = []; // 已勾选的下标
    dataSource?.map?.((item, index) => {
      selectedRowsKeys?.includes(item?.key) && selectedIndexs.push(index);
    });
    return formatColsToProTable(colsWatchValue, selectedIndexs);
  }, [dataSource, selectedRowsKeys, colsWatchValue, selectedRows]);

  const leftActions = [
    {
      type: "dashed",
      icon: <EyeOutlined />,
      onClick: codeViewDisclose?.toggle,
    },
    {
      label: "新增",
      icon: <PlusCircleFilled />,
      onClick: addRow,
    },
  ];

  const rightActions = [
    {
      label: `复制cols [${proTableCols?.length}]`,
      icon: <CopyOutlined />,
      onClick: () => {
        copy(fmColsStrToCodeView(proTableCols));
        message.success("已复制");
        console.log(fmColsStrToCodeView(proTableCols));
      },
    },
    {
      type: "dashed",
      label: "预览",
      icon: <EyeOutlined />,
      onClick: proTableViewDisclose.toggle,
    },
    {
      type: "dashed",
      label: "重置",
      icon: <RedoOutlined />,
      onClick: onClear,
    },
  ];

  // const tableActions = [
  //   {
  //     label: "整理",
  //   },
  // ];

  // 将没有勾选的排在最后
  const onAutoSort = () => {
    const enableArr = [];
    const disableArr = [];
    dataSource?.map((item, index) => {
      selectedRowsKeys?.includes(item?.key)
        ? enableArr.push(index)
        : disableArr.push(index);
    });
    const newSortArr = [...enableArr, ...disableArr]; // 排序好下标
    // 根据下标排序
    const sortByIndex = (targetArr) =>
      newSortArr?.map((index) => targetArr[index]);
    setDataSource(sortByIndex(dataSource));
    form.setFieldValue("cols", sortByIndex(colsWatchValue));
  };

  return (
    <div className="flex gap-2 h-full">
      {codeViewDisclose?.open && <CodeView value={proTableCols} />}

      <div className="flex-1 flex flex-col gap-2">
        <NewColsActions left={leftActions} right={rightActions} />

        <TCard rootClassName="flex-1 overflow-auto">
          <Form form={form}>
            <div className="flex justify-between items-center pb-2">
              <ColsStatis
                total={colsWatchValue?.length}
                cks={selectedRows?.length}
              />

              <div className="flex items-center gap-2">
                <Button onClick={onAutoSort}>排序整理</Button>
                {/* <Dropdown menu={{ items: tableActions }} placement="bottomLeft">
                  <Button>
                    更多
                    <DownOutlined />
                  </Button>
                </Dropdown> */}
              </div>
            </div>

            <ConfigProvider
              theme={{
                components: {
                  Table: {
                    rowSelectedBg: "#fff",
                    rowSelectedHoverBg: "#fff",
                  },
                },
              }}
            >
              <TableDndCtx dataSource={dataSource} onDragEnd={onDragEnd}>
                <Table
                  components={{
                    body: { row: SortRow },
                  }}
                  bordered
                  columns={columns}
                  dataSource={dataSource}
                  size="small"
                  rowKey={"key"}
                  pagination={false}
                  rowSelection={{
                    selectedRowKeys: selectedRowsKeys,
                    onChange(selectedRowKeys, selectedRows) {
                      setSelectedRows(selectedRows);
                    },
                  }}
                />
              </TableDndCtx>
            </ConfigProvider>
          </Form>
        </TCard>

        <TCard
          title={"proTable 预览"}
          hidden={!proTableViewDisclose?.open}
          rootClassName="h-[300px] overflow-auto"
        >
          <ProTable columns={proTableCols} dataSource={[{ key: "0" }]} />
        </TCard>
      </div>
    </div>
  );
}
