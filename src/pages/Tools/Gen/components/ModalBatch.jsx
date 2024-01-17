import { Button, Form } from "antd";
import { Input } from "antd/lib";

const { Item, useForm } = Form;

export default function ModalBatch({ disclose, onOk }) {
  const [form] = useForm();

  const _onOk = async () => {
    const fdata = await form.validateFields();
    const str = fdata.str || "";
    const content = str.replaceAll(fdata.separator, "\n");
    form.setFieldsValue({
      str: content
    })

    onOk?.(content);
    disclose?.onClose();
  };

  const handldStr = () => {
    const str = form.getFieldValue("str") || "";
    let _str = str.replace(/[\r\t\n]/g, " ");
    _str = _str.replace(/\s+/g, " ")
    form.setFieldValue("str", _str.replaceAll(" ", "\n"))
  }

  return (
    <div className="py-2">
      <Form form={form}>
        <Item
          label="字符串"
          required
          name="str"
          extra={
            <div className="pt-2 flex justify-end">
              <Button size="small" onClick={handldStr}>处理特殊符号</Button>
            </div>
          }
        >
          <Input.TextArea rows={6} />
        </Item>
        <Item label="分隔符" name="separator" required>
          <Input />
        </Item>
      </Form>

      <div className="flex justify-end gap-2">
        <Button type="primary" onClick={_onOk}>
          处理
        </Button>
      </div>
    </div>
  );
}
