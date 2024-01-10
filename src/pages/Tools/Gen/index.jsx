import Page from "@/components/Page";
import { pickEmpty, uuid } from "@/utils/helper";
import { CopyOutlined, RedoOutlined } from "@ant-design/icons";
import { Checkbox } from "antd";
import { message } from "antd";
import { InputNumber } from "antd";
import { Button, Form } from "antd";
import { Input } from "antd";
import Card from "antd/lib/card/Card";
import copy from "copy-to-clipboard";
import { useCallback } from "react";

const { Item, useForm, useWatch } = Form;

export default function Index() {
  const [form] = useForm();

  const getFieldsArr = useCallback(() => {
    const fields = form.getFieldValue("fields");
    return spliceWarp(fields)?.map((str = "") => {
      const [field, value] = str?.split(":") || []
      return pickEmpty({ field, value })
    })?.filter(d => !!d.field) || [];
  }, [form]);

  // 增加新字段
  const onAddNomalField = (cks) => {
    const fieldArr = getFieldsArr();
    cks?.map((_field) => {
      if (fieldArr?.find(d => d.field === _field)) return;
      fieldArr?.push({ field: _field })
    })
    form.setFieldsValue({
      fields: fieldArr?.map((item) => Object.values(item).join(":")).join("\n")
    })
  };

  // 随机生成label内容
  const onRandomLen = () => {
    const len = form.getFieldValue("randomLen");
    const content = Array(len).fill(0).map(() => uuid()).join("\n");
    form.setFieldsValue({ content })
  }

  const onGen = async () => {
    const fdata = await form.validateFields();
    const labels = spliceWarp(fdata?.content) || [];

    // 其它字段
    const fieldArr = getFieldsArr();
    const otherAttr = {};
    fieldArr?.map(({ field, value }) => Object.assign(otherAttr, { [field]: value || "xxx" }));

    const fieldName = fdata.field;
    const copyData = labels?.map((str) => {
      return {
        [fieldName]: str,
        ...otherAttr
      }
    });

    const copyText = JSON.stringify(copyData, null, 2);
    console.log(copyText);
    copy(copyText);
    message.success("已复制到粘贴板")
  };

  const fieldWatchValue = useWatch("field", form);

  return (
    <Page>
      <Card title="生成 label" extra={<Button onClick={onGen} type="primary" icon={<CopyOutlined />}>复制</Button>}>
        <Form form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 16 }}>
          <Item label="字段名" name="field" initialValue={"label"} rules={[{ required: true }]}>
            <Input allowClear />
          </Item>

          <Item label={`${fieldWatchValue} 内容`}>
            <Item name="content" noStyle>
              <Input.TextArea rows={6} placeholder="每行代表一个内容" allowClear />
            </Item>

            <div className="flex justify-end gap-2 pt-2">
              <Item name={"randomLen"} initialValue={4} noStyle><InputNumber min={1} /></Item>
              <Button type="dashed" icon={<RedoOutlined />} onClick={onRandomLen} />
            </div>
          </Item>

          <Item label="其它字段">
            <Item name="fields" style={{ marginBottom: 4 }}>
              <Input.TextArea rows={3} />
            </Item>
            <Item style={{ marginBottom: 4 }}>
              <Checkbox.Group options={nomalFields} onChange={onAddNomalField} />
            </Item>
          </Item>
        </Form>
      </Card>
    </Page>
  );
}

const nomalFields = [
  {
    label: "value",
    value: "value"
  },
  {
    label: "dataIndex",
    value: "dataIndex"
  },
]

function spliceWarp(str = "") {
  if (!str?.trim()) return [];
  return str?.split("\n") || []
}
