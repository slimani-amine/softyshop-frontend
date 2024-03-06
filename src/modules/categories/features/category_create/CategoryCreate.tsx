import { FC } from "react";
import {
  Form,
  Button as ButtonAnt,
  Upload,
  Divider,
  Row,
  Col,
  Input,
 Checkbox 


} from "antd";
import Button from "@src/modules/shared/components/Button/Button";


interface AddCategoryFormProps {
  onFinish: (values: any) => void;
}

const AddCategoryForm: FC<AddCategoryFormProps> = ({ onFinish }) => {
  const [form] = Form.useForm();

  const handleFinish = (values: any) => {
    onFinish(values);
    form.resetFields();
  };

  const handleFileChange = (info: any) => {
    const fileList = [...info.fileList];
    const imageUrlList = fileList.map((file: any) => file.response?.imageUrl);
    form.setFieldsValue({ images: imageUrlList });
  };

  return (
    <div className="add-new-Product">
      <h1 className="title">Add New Category</h1>
      <div className="container-add-Product">
        <Form form={form} onFinish={handleFinish}>
          <Row gutter={[16, 0]} className="name-Product">
            <Col span={22}>
              <Form.Item
                name="name"
                style={{ marginBottom: 0 }}
                rules={[
                  { required: true, message: "Please enter Category name" },
                ]}
              >
                <Input
                  size="large"
                  placeholder="Name"
                  className="input-custom"
                />
              </Form.Item>
            </Col>
         
          </Row>
          <Form.Item
            className="upload-images"
            name="images"
            rules={[{ required: true, message: "Picture of Category!" }]}
          >
            <Upload.Dragger
              className="drag-images"
              listType="picture"
              accept="image/*"
              maxCount={1} // set maxCount to 1 for single image

              onChange={handleFileChange}
              beforeUpload={() => false}
            >
              <p className="ant-upload-text">Drag & drop Category image here</p>
              <div className="icon-drag">
                <Divider className="divider" />
                <p className="or">OR</p>
                <Divider className="divider" />
              </div>
              <ButtonAnt className="btn-select">Select Files</ButtonAnt>
              <p className="size-img">Upload 280*280 image</p>
            </Upload.Dragger>
          </Form.Item>
          <Form.Item>
            <div className="feutured"><Checkbox  /> <span>Featured category</span></div>

          </Form.Item>
        
          <Form.Item>
            <Button type="submit">Save Category</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AddCategoryForm;
