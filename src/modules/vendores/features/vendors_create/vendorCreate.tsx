import { FC, useState } from "react";
import { Form, Upload, Divider, Row, Col, Input, message } from "antd";
import Button from "@src/modules/shared/components/Button/Button";
import { useCreateVendorMutation } from "../../services/vendorApi";
import { handleFileChange } from "@src/modules/shared/utils/upload";
import { useNavigate } from "react-router-dom";
const AddVendorForm: FC = () => { // Removed AddCategoryFormProps
  const [form] = Form.useForm();
  const [createVendor] = useCreateVendorMutation();
  const [, setGeneratedPassword] = useState<string>('');
  const [files, setFile] = useState<any>(null);
  console.log(files)
  const [selectedFileUrl, setSelectedFileUrl] = useState<string>();

  const navigate = useNavigate()

  const handleSaveClick = async () => {
    try {
      const values = await form.validateFields();
      const objectPost = { ...values };
      console.log(objectPost,'object post')
      const response = await createVendor({
        "firstName": objectPost.name,
        "lastName": objectPost.lastName,
        "email": objectPost.email,
        "picture": selectedFileUrl,
        "role": 'vendor',
        "phoneNumber": objectPost.phoneNumber,
        "password": objectPost.password,
        "verifyPassword": objectPost.password,
      });
      if ('data' in response) {
        // Display success message if data exists
        message.success("Product saved successfully!");
        console.log(response.data);
        navigate("/vendors")
        
    } else if ('error' in response) {
        // Display error message if error exists
        message.error("Failed to save product. Please try again.");
        console.error('Error saving product', response.error);
    } else {
        // Handle unexpected response format
        message.error("Unexpected response from server. Please try again later.");
    }
    } catch (error) {
      console.error('Error saving vendor', error);
      message.error('Error saving vendor');
    }
  };

  const handleGeneratePassword = () => {
    const generatedPassword = generatePassword();
    console.log(generatePassword)
    form.setFieldsValue({ password: generatedPassword });
    setGeneratedPassword(generatedPassword);
  };



  const generatePassword = () => {
    return Math.random().toString(36).slice(-10);
  };

  return (
    <div className="add-new-Product">
      <h1 className="title">Add New Vendor</h1>
      <div className="container-add-Product">
        <Form form={form}>
          <Row gutter={[16, 0]} className="name-Product">
            <Col span={22}>
              <Form.Item
                name="name"
                style={{ marginBottom: 0 }}
                rules={[{ required: true, message: "Please enter Vendor name" }]}
              >
                <Input size="large" placeholder="Name" className="input-custom" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 0]} className="name-Product">
            <Col span={22}>
              <Form.Item
                name="lastName"
                style={{ marginBottom: 0 }}
                rules={[{ required: true, message: "Please enter Last Name" }]}
              >
                <Input size="large" placeholder="Last Name" className="input-custom" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 0]} className="name-Product">
            <Col span={22}>
              <Form.Item
                name="email"
                style={{ marginBottom: 0 }}
                rules={[
                  { required: true, message: "Please enter email" },
                  { type: 'email', message: 'Please enter a valid email' }
                ]}
              >
                <Input size="large" placeholder="Email" className="input-custom" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 0]} className="name-Product">
            <Col span={22}>
              <Form.Item
                name="phoneNumber"
                style={{ marginBottom: 0 }}
                rules={[
                  { required: true, message: "Please enter phone number" },
                  { min: 8, message: "Phone number must be at least 8 characters long" },
                  { pattern: /^\d+$/, message: "Phone number must contain only numbers" }
                ]}              >
                <Input size="large" placeholder="Phone Number" className="input-custom" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 0]} className="name-Product">
            <Col span={22}>
              <Form.Item
                name="password"
                style={{ marginBottom: 0 }}
                rules={[{ required: true, message: "Please enter password" }]}
              >
                <Input.Password size="large" placeholder="Password" className="input-custom" />
              </Form.Item>
            </Col>
            <Col span={22}>
              <Form.Item>
                <Button type="button" className="generate-password" onClick={handleGeneratePassword}>Generate Password</Button>
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
          <Form.Item>
            <Button type="submit" className="add-cat" onClick={handleSaveClick}>Save Category</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AddVendorForm;
