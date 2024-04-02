import { FC, useState } from "react";
import {
  Form,
  Upload,
  Divider,
  Row,
  Col,
  Input,
  Checkbox,
  message,
} from "antd";
import Button from "@src/modules/shared/components/Button/Button";
import { useCreateCategoryMutation } from "../../service/categoryApi";
import { handleFileChange } from "@src/modules/shared/utils/upload";
interface AddCategoryFormProps {
  onFinish: (values: any) => void;
}

const AddCategoryForm: FC<AddCategoryFormProps> = () => {
  const [files, setFile] = useState<any>(null);
  const [selectedFileUrl, setSelectedFileUrl] = useState<string>();
  const [form] = Form.useForm();
  const [createCategory] = useCreateCategoryMutation();
  const handleSaveClick = async () => {
    try {
      console.log(selectedFileUrl);
      
      const values = await form.validateFields(); // Validate form fields
      const objectPost = { ...values };
      // Create category
      const response = await createCategory({
        name: objectPost.name,
        icon: selectedFileUrl,
        isPublished: objectPost.isPublished === "on" ? true : false,
      });

      // Reset form fields and validation status
      form.resetFields();
      message.success("Category saved successfully");
    } catch (error) {
      console.error("Error saving category", error);
      message.error("Error saving category");
    }
  };

  // const handleFileChange = (info: any) => {
  //   const fileList = [...info.fileList];
  //   const imageUrlList = fileList.map((file: any) => file.response?.imageUrl);
  //   form.setFieldsValue({ images: imageUrlList });
  // };

  return (
    <div className="add-new-Product">
      <h1 className="title">Add New Category</h1>
      <div className="container-add-Product">
        <Form form={form}>
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
              onChange={(e: any) =>
                handleFileChange(
                  e,
                  setFile,
                  setSelectedFileUrl,
                )
              }
              beforeUpload={() => false}
            >
              <p className="ant-upload-text">Drag & drop Category image here</p>
              <div className="icon-drag">
                <Divider className="divider" />
                <p className="or">OR</p>
                <Divider className="divider" />
              </div>
              <Button className="btn-select">Select Files</Button>
              <p className="size-img">Upload 280*280 image</p>
            </Upload.Dragger>
          </Form.Item>
          <Form.Item name="isPublished">
            <div className="feutured">
              <Checkbox /> <span>Featured category</span>
            </div>
          </Form.Item>
          <Form.Item>
            <Button type="submit" className="add-cat" onClick={handleSaveClick}>
              Save Category
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AddCategoryForm;
