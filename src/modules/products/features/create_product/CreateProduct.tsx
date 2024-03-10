import { FC } from "react";
import { RootState } from "@src/modules/shared/store";


import {
  Form,
  Select,
  Button as ButtonAnt,
  Upload,
  Divider,
  Row,
  Col,
  Input,
  InputNumber,
} from "antd";
import Button from "@src/modules/shared/components/Button/Button";
const { TextArea } = Input;
import { useCategoriesQuery } from "@src/modules/categories/service/categoryApi";

interface AddProductFormProps {
  onFinish: (values: any) => void;
}

const AddProductForm: FC<AddProductFormProps> = ({ onFinish }) => {
  const {data :fetchedCatgeories,isLoading } = useCategoriesQuery()
  const categories = fetchedCatgeories?.data.docs || []
  const selectOptions =categories.map((cat:any)=>({label : cat.name , value : cat.id}))
  
  const [form] = Form.useForm();
  const handleFinish = (values: any) => {
    console.log(values)
    onFinish(values);
    console.log(values)
    form.resetFields();
  };

  const handleFileChange = (info: any) => {
    const fileList = [...info.fileList];
    console.log(fileList)
    const imageUrlList = fileList.map((file: any) => file.response?.imageUrl);
    form.setFieldsValue({ images: imageUrlList });
  };
  

  return (
    <div className="add-new-Product">
      <h1 className="title">Add New Product</h1>
      <div className="container-add-Product">
        <Form form={form} onFinish={handleFinish}>
          <Row gutter={[16, 0]} className="name-Product">
            <Col span={11}>
              <Form.Item
                name="name"
                style={{ marginBottom: 0 }}
                rules={[
                  { required: true, message: "Please enter Product name" },
                ]}
              >
                <Input
                  size="large"
                  placeholder="Name"
                  className="input-custom"
                />
              </Form.Item>
            </Col>
            <Col span={11}>
              <Form.Item
                name="Product"
                className="Product"
                style={{ marginBottom: 0 }}
                rules={[
                  {
                    required: true,
                    message: "Product field must have at least 1 items",
                  },
                ]}
              >
                <Select
                  size="large"
                  placeholder="Category"
                  className="input-custom"
                  options={selectOptions}

                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            className="upload-images"
            name="images"
            rules={[{ required: true, message: "Description is required!" }]}
          >
            <Upload.Dragger
              className="drag-images"
              listType="picture"
              accept="image/*"
              multiple
              maxCount={1}
              onChange={handleFileChange}
              beforeUpload={() => false}
            >
              <p className="ant-upload-text">Drag & drop Product image here</p>
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
            <TextArea
              placeholder="Description"
              autoSize={{ minRows: 7, maxRows: 20 }}
              name="description"
            />
          </Form.Item>
          <Row gutter={[16, 0]} className="name-Product">
            <Col span={11}>
              <Form.Item
                name="stock"
                style={{ marginBottom: 0 }}
                rules={[{ required: true, message: "Stock is required!" }]}
              >
                <Input
                  size="large"
                  placeholder="Stock"
                  name="stock"
                  className="input-custom"
                />
              </Form.Item>
            </Col>
            <Col span={11}>
              <Form.Item
                name="tag"
                className="tag"
                style={{ marginBottom: 0 }}
                rules={[{ required: true, message: "Tags is required!" }]}
              >
                <Input
                  className="input-custom"
                  size="large"
                  name="tag"
                  placeholder="Tag"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 0]} className="name-Product">
            <Col span={11}>
              <Form.Item
                name="RegularPrice"
                style={{ marginBottom: 0 }}
                rules={[{ required: true, message: "Price is required!  " }]}
              >
                <InputNumber
                  name="RegularPrice"
                  placeholder="Regular Price"
                  className="input-custom"
                  size="large"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
            <Col span={11}>
              <Form.Item
                name="SalePrice"
                className="SalePrice"
                style={{ marginBottom: 0 }}
                rules={[{ required: true, message: "Please enter sale price" }]}
              >
                <InputNumber
                  placeholder="Sale Price"
                  className="input-custom"
                  size="large"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Button type="submit">Save Product</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AddProductForm;
