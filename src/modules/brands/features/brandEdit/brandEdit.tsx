import { FC, useState } from "react";
import Spinner from "@src/modules/shared/components/Spinner/Spinner";
import { useUpdateBrandMutation, useBrandQuery } from "../../service/brandApi";
import {
  Form,
  Button as ButtonAnt,
  Upload,
  Divider,
  Row,
  Col,
  Input,
  message,
} from "antd";
import Button from "@src/modules/shared/components/Button/Button";
import { useParams } from "react-router-dom";
import { handleFileChange } from "@src/modules/shared/utils/upload";

interface AddBrandFormProps {
  onFinish: (values: any) => void;
}

const EditBrandForm: FC<AddBrandFormProps> = () => {
  const [files, setFile] = useState<any>(null);
  console.log(files)
  const [selectedFileUrl, setSelectedFileUrl] = useState<string>();
  const [form] = Form.useForm();
  const [updateBrand] = useUpdateBrandMutation();
  const { id } = useParams<{ id: string }>(); // Assuming useParams returns an object with 'id' property

  const { data: fetchBrand, isLoading } = useBrandQuery(id);
  const brand = fetchBrand?.data?.docs[0];
  console.log(brand);
  if (isLoading) return <Spinner />;

  const initialValues = {
    name: fetchBrand?.data?.docs[0]?.name || "",
    images: [],
    isPublished: fetchBrand?.data?.docs[0]?.isPublished || false,
  };

  const handleFinish = async () => {
    try {
      const values = await form.validateFields();

      await updateBrand({
        id: id,
        data: {
          name: values.name,
          logo: selectedFileUrl,
        },
      });

      message.success(`Brand of id:${id} updated`);
      form.resetFields();
    } catch (error) {
      console.error("Error updating Brand:", error);
    }
  };


  const defaultFileList = [
    {
      uid: "-1",
      name: "Current Image",
      status: "done",
      url: selectedFileUrl,
      thumbUrl: brand.logo,
    } as any,
  ];

  return (
    <div className="add-new-Product">
      <h1 className="title">Edit Brand</h1>
      <div className="container-add-Product">
        <Form form={form} initialValues={initialValues}>
          <Row gutter={[16, 0]} className="name-Product">
            <Col span={22}>
              <Form.Item
                name="name"
                style={{ marginBottom: 0 }}
                rules={[{ required: true, message: "Please enter Brand name" }]}
              >
                <Input
                  size="large"
                  placeholder="Name"
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
                handleFileChange(e, setFile, setSelectedFileUrl)
              }
              beforeUpload={() => false}
            >
              <p className="ant-upload-text">Drag & drop Brand image here</p>
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
            <Button className="add-cat" onClick={handleFinish} type="submit">
              Save Brand
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default EditBrandForm;