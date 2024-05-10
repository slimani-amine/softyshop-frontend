import { FC, useState } from "react";
import { Form, Input, Button, Space } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

interface DynamicFormProps {
  onFinish: (values: any) => void;
  onFormSubmit: (values: any) => void;
}

const DynamicForm: FC<DynamicFormProps> = ({ onFinish, onFormSubmit }) => {
  const [form] = Form.useForm();
  const [fields, setFields] = useState<string[]>([""]);

  const handleFinish = (values: any) => {
    onFinish(values);
    onFormSubmit(values);
    form.resetFields();
  };

  const addField = () => {
    setFields([...fields, ""]);
  };

  const removeField = (index: number) => {
    const newFields = [...fields];
    newFields.splice(index, 1);
    setFields(newFields);
  };

  return (
    <Form form={form} onFinish={handleFinish}>
      {fields.map((_, index) => (
        <Space
          key={index}
          style={{ display: "flex", marginBottom: 8 }}
          align="baseline"
        >
          <Form.Item
            name={["data", index]}
            rules={[{ required: true, message: "Missing data" }]}
          >
            <Input className="dynamic-input" placeholder="Link" />
          </Form.Item>
          <MinusCircleOutlined onClick={() => removeField(index)} />
        </Space>
      ))}
      <Form.Item>
        <Button
          className="btn-select"
          onClick={addField}
          icon={<PlusOutlined />}
        >
          Add Link
        </Button>
      </Form.Item>
    </Form>
  );
};

export default DynamicForm;
