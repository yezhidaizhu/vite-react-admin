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
import ModalBatch from "./components/ModalBatch";
import useDisclose from "@/hooks/useDisclose";
import { Modal } from "antd/lib";
import { Switch } from "antd";

const { Item, useForm, useWatch } = Form;

const defaultValue = "xxx";

export default function Index() {
  const [form] = useForm();
  const batchDisclose = useDisclose()

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
    fieldArr?.map(({ field, value }) => Object.assign(otherAttr, { [field]: value || defaultValue }));

    const fieldName = fdata.field;
    let copyData = labels?.map((str) => {
      return {
        [fieldName]: str,
        ...otherAttr
      }
    });

    // 随机值
    if (fdata?.isRandValue) {
      copyData = copyData?.map((item) => {
        const newItem = { ...item };
        for (const key in item) {
          if (Object.hasOwnProperty.call(item, key)) {
            const value = item[key];
            if (key !== fieldName && value === defaultValue) {
              newItem[key] = uuid(4);
            }
          }
        }
        return newItem;
      })
    }

    copyData = copyData?.filter(d => !!d.label)
    const copyText = JSON.stringify(copyData, null, 2);
    console.log(copyText);
    copy(copyText);
    message.success("已复制到粘贴板")
  };

  const fieldWatchValue = useWatch("field", form);

  // 设置 fields
  const setFormFields = (content) => {
    form.setFieldsValue({ content })
  }

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
              <Item name={"randomLen"} initialValue={4} noStyle><InputNumber size="small" min={1} /></Item>
              <Button size="small" type="dashed" icon={<RedoOutlined />} onClick={onRandomLen} />
              <Button size="small" onClick={batchDisclose.onOpen}>批量处理</Button>
            </div>
          </Item>

          <Item label="其它字段">
            <Item name="isRandValue" valuePropName="checked" style={{ marginBottom: 4 }}>
              <Switch checkedChildren="随机值" unCheckedChildren={`固定值${defaultValue}`} />
            </Item>
            <Item name="fields" style={{ marginBottom: 4 }}>
              <Input.TextArea rows={3} />
            </Item>
            <Item style={{ marginBottom: 4 }}>
              <Checkbox.Group options={nomalFields} onChange={onAddNomalField} />
            </Item>
          </Item>
        </Form>
      </Card>

      <Modal {...batchDisclose} title="批量处理字符串" width={600} footer={false}>
        <ModalBatch onOk={setFormFields} disclose={batchDisclose} />
      </Modal>
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
