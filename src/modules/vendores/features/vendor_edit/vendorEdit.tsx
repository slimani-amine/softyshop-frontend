import { FC, useState, useEffect } from "react";
import {
  Form,
  Upload,
  Divider,
  Row,
  Col,
  Input,
  Button as ButtonAnt,
  message,
} from "antd";
import Button from "@src/modules/shared/components/Button/Button";
import {
  useVendorQuery,
  useUpdateVendorMutation,
} from "../../services/vendorApi";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "@src/modules/shared/components/Spinner/Spinner";
import { handleFileChange } from "@src/modules/shared/utils/upload";

const UpdateVendorForm: FC = () => {
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const { id } = useParams<{ id: string }>(); // Assuming useParams returns an object with 'id' property
  const [files, setFile] = useState<any>(null);
  console.log(files);
  const [uploading, setUploading] = useState(false);

  const [selectedFileUrl, setSelectedFileUrl] = useState<string>();
  const [updateVendor] = useUpdateVendorMutation();
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
      console.log(response);
      if ("data" in response) {
        // Display success message if data exists
        message.success("Vendor updated successfully!");
        form.resetFields();
        navigate("/vendors");
      } else if ("error" in response) {
        // Display error message if error exists
        message.error("Failed to update product. Please try again.");
        console.error("Error updating product", response.error);
      } else {
        message.error(
          "Unexpected response from server. Please try again later."
        );
      }
    } catch (error) {
      console.error("Error updating vendor", error);
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
              <label
                className="label-order"
                htmlFor="products-search"
                style={{ color: "#6195def5", fontWeight: "500" }}
              >
                Name:
              </label>
              <Form.Item
                name="name"
                style={{ marginBottom: 0 }}
                rules={[
                  {
                    required: true,
                    message: "Please enter vendor name",
                  },
                  {
                    pattern:
                      /^(?!\s)(?=(?:.*[a-zA-Z\u0600-\u06FF]){2})[a-zA-Z\u0600-\u06FF]{2,}$/,
                    message:
                      "Name must contain at least two alphabetical characters and no spaces",
                  },
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
              <label
                className="label-order"
                htmlFor="products-search"
                style={{ color: "#6195def5", fontWeight: "500" }}
              >
                Last Name:
              </label>
              <Form.Item
                name="lastName"
                style={{ marginBottom: 0 }}
                rules={[
                  {
                    required: true,
                    message: "Please enter vendor last name",
                  },
                  {
                    pattern:
                      /^(?!\s)(?=(?:.*[a-zA-Z\u0600-\u06FF]){2})[a-zA-Z\u0600-\u06FF]{2,}$/,
                    message:
                      "Name must contain at least two alphabetical characters and no spaces",
                  },
                ]}
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
              <label
                className="label-order"
                htmlFor="products-search"
                style={{ color: "#6195def5", fontWeight: "500" }}
              >
                Email:
              </label>
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
              <label
                className="label-order"
                htmlFor="products-search"
                style={{ color: "#6195def5", fontWeight: "500" }}
              >
                Phone Number:
              </label>
              <Form.Item
                name="phoneNumber"
                style={{ marginBottom: 0 }}
                rules={[
                  {
                    required: true,
                    message: "Please enter Shop phone",
                  },
                  {
                    pattern: /^[2-57-9]\d{7}$/,
                    message:
                      "Phone number must be 8 digits and start with 2, 4, 5, 7, or 9",
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
              maxCount={1}
              onChange={(e: any) =>
                handleFileChange(e, setFile, setSelectedFileUrl, setUploading)
              }
              beforeUpload={() => false}
            >
              {uploading ? (
                <div className="uploading-indicator">Uploading...</div>
              ) : (
                <>
                  <p className="ant-upload-text">
                    Drag & drop Category image here
                  </p>
                  <div className="icon-drag">
                    <Divider className="divider" />
                    <p className="or">OR</p>
                    <Divider className="divider" />
                  </div>
                  <ButtonAnt className="btn-select">Select Files</ButtonAnt>
                  <p className="size-img">Upload 280*280 image</p>
                </>
              )}
            </Upload.Dragger>
          </Form.Item>
          <Form.Item>
            <Button
              type="submit"
              className="add-cat"
              disabled={uploading}
              onClick={handleSaveClick}
            >
              Update Vendor
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default UpdateVendorForm;
