import { FC } from 'react';
import { Form, Select, Button, Upload, Divider, Row, Col ,Input } from 'antd';
import FormItem from 'antd/es/form/FormItem';
const {TextArea} = Input

interface AddProductFormProps {
  onFinish: (values: any) => void;
}

const AddProductForm: FC<AddProductFormProps> = ({ onFinish }) => {
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
    <div>

      <h1>Add Product</h1>
      <div className='container-add-product'>
        <Form form={form} onFinish={handleFinish}>
          {/* Other form fields */}
          <Row gutter={[16, 0]} className='name-category'>
            <Col span={11}>
              <Form.Item name="name"   style={{ marginBottom: 0 }}>
                <Input size='large'/>

                
              </Form.Item>
            </Col>
            <Col span={11}>
              <Form.Item name="category" className='category'  style={{ marginBottom: 0 }}>
              <Select size='large' options={[{ value: 'sample', label: <span>sample</span> }]} />

              </Form.Item>
            </Col>
          </Row>

          <Form.Item className='upload-images' name="images" >
            <Upload.Dragger
              className='drag-images'
              accept="image/*"
              multiple
              onChange={handleFileChange}
              beforeUpload={() => false} // Returning false to prevent default upload behavior
            >
              <p className="ant-upload-text">Drag & drop product image here</p>
              <div className='icon-drag'>
                <Divider className='divider'/>
                <p className='or'>OR</p> 
                <Divider className='divider'/>
              </div>
              <Button className='btn-select'>Select Files</Button>
              <p className='size-img'>Upload 280*280 image</p>
            </Upload.Dragger>
          </Form.Item>
          <FormItem>
          <TextArea
              placeholder="Controlled autosize"
              autoSize={{ minRows: 7, maxRows: 20 }}
            />
          </FormItem>
              <Row gutter={[16, 0]} className='name-category'>
            <Col span={11}>
              <Form.Item name="stock"   style={{ marginBottom: 0 }}>
                <Input size='large' name="stock"/>

                
              </Form.Item>
            </Col>
            <Col span={11}>
              <Form.Item name="tag" className='tag'  style={{ marginBottom: 0 }}>
              <Input  size='large' name='tag'/>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Button type="primary" htmlType="submit">Submit</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AddProductForm;
