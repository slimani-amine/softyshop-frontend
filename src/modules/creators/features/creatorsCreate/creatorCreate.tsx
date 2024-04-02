import { FC } from "react";
import { Form, Row, Col, Input, message } from "antd";
import Button from "@src/modules/shared/components/Button/Button";
import { useCreateCreatorMutation } from "../../service/creatorApi";

interface AddCreatorFormProps {
  onFinish: (values: any) => void;
}

const AddCreatorForm: FC<AddCreatorFormProps> = () => {
  const [form] = Form.useForm();
  const [createCreator] = useCreateCreatorMutation()
  const handleSaveClick = async () => {
    try {
      const values = await form.validateFields(); // Validate form fields
      const objectPost = { ...values };
      
      // Create category
        await createCreator({
        name: objectPost.name,
        icon: 'hhhhh',
        isPublished: objectPost.isPublished === "on" ? true : false,
      });
  
      // Reset form fields and validation status
      form.resetFields();
      message.success('Creator saved successfully');
    } catch (error) {
      console.error('Error saving category', error);
      message.error('Error saving category');
    }
  };
  
  



  return (
    <div className="add-new-Product">
      <h1 className="title">Add New Creator</h1>
      <div className="container-add-Product">
        <Form form={form} >
          <Row gutter={[16, 0]} className="name-Product">
            <Col span={22}>
              <Form.Item
                name="name"
                style={{ marginBottom: 0 }}
                rules={[{ required: true, message: "Please enter Category name" }]}
              >
                <Input size="large" placeholder="Name" className="input-custom" />
              </Form.Item>
            </Col>
          </Row>
      
        
          <Form.Item>
            <Button type="submit" className="add-cat" onClick={handleSaveClick}>Save Creator</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AddCreatorForm;
