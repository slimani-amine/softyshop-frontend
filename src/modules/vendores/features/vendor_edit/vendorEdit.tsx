import { FC, useState, useEffect } from "react";
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
import {
  useVendorQuery,
  useUpdateVendorMutation,
} from "../../services/vendorApi";
import { useParams } from "react-router-dom";
import Spinner from "@src/modules/shared/components/Spinner/Spinner";
import { handleFileChange } from "@src/modules/shared/utils/upload";

const UpdateVendorForm: FC = () => {
  const [form] = Form.useForm();
  const { id } = useParams<{ id: string }>(); // Assuming useParams returns an object with 'id' property
  const [files, setFile] = useState<any>(null);
  const [selectedFileUrl, setSelectedFileUrl] = useState<string>();
  const [updateVendor, isError] = useUpdateVendorMutation();
  const { data: fetchVendor, isLoading } = useVendorQuery(id);
  const [isVerified, setIsVerified] = useState(false);
  const vendor = fetchVendor?.data?.docs[0];
  useEffect(() => {
    if (fetchVendor) {
      // Set form fields with fetched vendor data here
      form.setFieldsValue({
        name: vendor.firstName,
        lastName: vendor.lastName,
        email: vendor.email,
        phoneNumber: vendor.phoneNumber,
        // Set other fields accordingly
      });
      setSelectedFileUrl(vendor.picture);
      setIsVerified(fetchVendor.isVerified);
    }
  }, [fetchVendor, form]);

  const handleSaveClick = async () => {
    try {
      const values = await form.validateFields();
      const objectPost = { ...values, isVerified };
      console.log(objectPost, "object post");
      const response = await updateVendor({
        id,
        data: {
          firstName: objectPost.name,
          lastName: objectPost.lastName,
          email: objectPost.email,
          phoneNumber: objectPost.phoneNumber,
          picture: selectedFileUrl,
        },
      });
      if (isError) {
        // Handle error if isError is true
        console.log(isError);
        console.error("Error updating vendor");
        message.error("Error updating vendor");
        return;
      }

      form.resetFields();
      message.success("Vendor updated successfully");
    } catch (error) {
      console.error("Error saving vendor", error);
    }
  };

  if (isLoading) {
    return <Spinner />;
  }
  const defaultFileList = [
    {
      uid: "-1",
      name: "Current Image",
      status: "done",
      url: selectedFileUrl,
      thumbUrl: vendor.picture,
    } as any,
  ];
  return (
    <div className="add-new-Product">
      <h1 className="title">Update Vendor</h1>
      <div className="container-add-Product">
        <Form form={form}>
          <Row gutter={[16, 0]} className="name-Product">
            <Col span={22}>
              <Form.Item
                name="name"
                style={{ marginBottom: 0 }}
                rules={[
                  { required: true, message: "Please enter Vendor name" },
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
          <Row gutter={[16, 0]} className="name-Product">
            <Col span={22}>
              <Form.Item
                name="lastName"
                style={{ marginBottom: 0 }}
                rules={[{ required: true, message: "Please enter Last Name" }]}
              >
                <Input
                  size="large"
                  placeholder="Last Name"
                  className="input-custom"
                />
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
                  { type: "email", message: "Please enter a valid email" },
                ]}
              >
                <Input
                  size="large"
                  placeholder="Email"
                  className="input-custom"
                />
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
                  {
                    min: 8,
                    message: "Phone number must be at least 8 characters long",
                  },
                  {
                    pattern: /^\d+$/,
                    message: "Phone number must contain only numbers",
                  },
                ]}
              >
                <Input
                  size="large"
                  placeholder="Phone Number"
                  className="input-custom"
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item className="upload-images" name="images">
            <Upload.Dragger
              defaultFileList={defaultFileList}
              className="drag-images"
              listType="picture"
              accept="image/*"
              maxCount={1} // set maxCount to 1 for single image
              onChange={(e: any) =>
                handleFileChange(e, setFile, setSelectedFileUrl)
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
            <Button type="submit" className="add-cat" onClick={handleSaveClick}>
              Update Vendor
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default UpdateVendorForm;
