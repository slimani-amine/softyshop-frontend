import { FC, useState } from "react";
import {
  Form,
  Upload,
  Divider,
  Row,
  Col,
  Input,
  message,
} from "antd";
import Button from "@src/modules/shared/components/Button/Button";
import { useCreateBrandMutation } from "../../service/brandApi";
import { handleFileChange } from "@src/modules/shared/utils/upload";
import { useNavigate } from "react-router-dom";
interface AddBrandFormProps {
  onFinish: (values: any) => void;
}

const AddBrandForm: FC<AddBrandFormProps> = () => {
  const navigate = useNavigate()

  const [files, setFile] = useState<any>(null);
  console.log(files)
  const [selectedFileUrl, setSelectedFileUrl] = useState<string>();
  const [form] = Form.useForm();
  const [createBrand] = useCreateBrandMutation();
  const handleSaveClick = async () => {
    try {
      console.log(selectedFileUrl);
      
      const values = await form.validateFields(); // Validate form fields
      const objectPost = { ...values };
      // Create Brand
      const response = await createBrand({
        name: objectPost.name,
        logo: selectedFileUrl,
      });
      if ('data' in response) {
        // Display success message if data exists
        message.success("Store updated successfully!");
        console.log(response.data);
        navigate("/stores")
        
    } else if ('error' in response) {
        // Display error message if error exists
        message.error("Failed to save Store. Please try again.");
        console.error('Error saving Store', response.error);
    } else {
        // Handle unexpected response format
        message.error("Unexpected response from server. Please try again later.");
    }
      console.log(response)
      console.log(response)

      // Reset form fields and validation status
      form.resetFields();
      message.success("Brand saved successfully");
    } catch (error) {
      console.error("Error saving Brand", error);
      message.error("Error saving Brand");
    }
  };

  // const handleFileChange = (info: any) => {
  //   const fileList = [...info.fileList];
  //   const imageUrlList = fileList.map((file: any) => file.response?.imageUrl);
  //   form.setFieldsValue({ images: imageUrlList });
  // };

  return (
    <div className="add-new-Product">
      <h1 className="title">Add New Brand</h1>
      <div className="container-add-Product">
        <Form form={form}>
          <Row gutter={[16, 0]} className="name-Product">
            <Col span={22}>
              <Form.Item
                name="name"
                style={{ marginBottom: 0 }}
                rules={[
                  { required: true, message: "Please enter Brand name" },
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
            rules={[{ required: true, message: "Picture of Brand!" }]}
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
              <p className="ant-upload-text">Drag & drop Brand image here</p>
              <div className="icon-drag">
                <Divider className="divider" />
                <p className="or">OR</p>
                <Divider className="divider" />
              </div>
              <Button className="btn-select">Select Files</Button>
              <p className="size-img">Upload 280*280 image</p>
            </Upload.Dragger>
          </Form.Item>
      
          <Form.Item>
            <Button type="submit" className="add-cat" onClick={handleSaveClick}>
              Save Brand
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AddBrandForm;
