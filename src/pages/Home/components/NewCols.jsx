import { uuid } from "@/utils/helper";
import { Input } from "antd";
import { Button, Form, Table } from "antd";
import { useForm } from "antd/es/form/Form";
import { useMemo, useState } from "react";
import { ProTable } from "@ant-design/pro-components";

import { DndContext } from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortRow, { TableDndCtx } from "./SortRow";
import TCard from "@/components/TCard";
import CodeView from "./CodeView";
import { PlusCircleFilled, RedoOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import { Switch } from "antd";
import { formatColsToProTable, genRows, newRow } from "../utils";
import { FCCenter, ReverseSwitch } from "./widget";

const { Item, useWatch } = Form;

const defaultCols = () => genRows(6);

export default function NewCols() {
  const [dataSource, setDataSource] = useState(defaultCols());

  const [form] = useForm();

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
        return <div className="text-center">{index}</div>;
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
      title: "可搜索",
      width: 80,
      dataIndex: "hideInSearch",
      render(_, rd, index) {
        return (
          <FCCenter>
            <Item
              name={["cols", index, "hideInSearch"]}
              initialValue={true}
              noStyle
            >
              <ReverseSwitch />
            </Item>
          </FCCenter>
        );
      },
    },
    {
      title: "自定义（render）",
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
  ];

  const addRow = () => setDataSource((v) => [...v, newRow()]);

  const onClear = () => {
    Modal.confirm({
      title: "清空",
      content: "确认清空？",
      onOk() {
        setDataSource(defaultCols);
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

  // 将要展示与复制的值
  const proTableCols = useMemo(() => {
    return formatColsToProTable(colsWatchValue);
  }, [colsWatchValue]);

  return (
    <div className="flex gap-2 h-full">
      <CodeView value={proTableCols} />

      <div className="flex-1 flex flex-col gap-2">
        <div className=" flex justify-between gap-2">
          <Button type="primary" icon={<PlusCircleFilled />} onClick={addRow}>
            新增
          </Button>
          <Button type="dashed" icon={<RedoOutlined />} onClick={onClear}>
            重置
          </Button>
        </div>

        <TCard rootClassName="flex-1 overflow-auto">
          <Form form={form}>
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
              />
            </TableDndCtx>
          </Form>
        </TCard>

        <TCard rootClassName="h-[300px] overflow-auto">
          <ProTable columns={proTableCols} dataSource={[{ key: "0" }]} />
        </TCard>
      </div>
    </div>
  );
}
