import { FC, useState } from 'react';
import {
  Form,
  Upload,
  Divider,
  Row,
  Col,
  Input,
  Checkbox,
  message,
  Button as ButtonAnt,
} from 'antd';
import Button from '@src/modules/shared/components/Button/Button';
import { useCreateCategoryMutation } from '../../service/categoryApi';
import { handleFileChange } from '@src/modules/shared/utils/upload';
import { useNavigate } from 'react-router-dom';
interface AddCategoryFormProps {
  onFinish: (values: any) => void;
}


const AddCategoryForm: FC<AddCategoryFormProps> = () => {
  const navigate = useNavigate()
  const [uploading, setUploading] = useState(false);
  const [files, setFile] = useState<any>(null);
  console.log(files)
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
        isPublished: objectPost.isPublished === 'on' ? true : false,
      });
      if ('data' in response) {
        // Display success message if data exists
        message.success("Product saved successfully!");
        form.resetFields();

        navigate("/categories")

        
    } else if ('error' in response) {
        // Display error message if error exists
        message.error("Failed to save product. Please try again.");
        console.error('Error saving product', response.error);
    } else {
        message.error("Unexpected response from server. Please try again later.");
    }

      // Reset form fields and validation status
     
    } catch (error) {
      console.error('Error saving category', error);
      message.error('Error saving category');
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
            <label
              className="label-order"
              htmlFor="products-search"
              style={{color:"#6195def5" , fontWeight:'500'}}
               >
                 Category Name :
              </label>
              <Form.Item
                name="name"
                style={{ marginBottom: 0 }}
                rules={[
                  { 
                      required: true, 
                      message: 'Please enter Category name' 
                  },
                  {
                      pattern: /^(?!\s)(?=(?:.*[a-zA-Z\u0600-\u06FF]){2})[a-zA-Z\u0600-\u06FF\s]{2,}$/,
                      message: 'Name must contain at least two alphabetical characters and no leading spaces'
                  }
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
            rules={[{ required: true, message: 'Picture of Category!' }]}
          >
            <Upload.Dragger
              className="drag-images"
              listType="picture"
              accept="image/*"
              maxCount={1}
              onChange={(e: any) =>
                handleFileChange(
                  e,
                  setFile,
                  setSelectedFileUrl,
                  setUploading
                )
              }
              beforeUpload={() => false}
            >
              {uploading ? (
                <div className="uploading-indicator">Uploading...</div>
              ) : (
                <>
                  <p className="ant-upload-text">Drag & drop Category image here</p>
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
          <Form.Item name="isPublished">
            <div className="feutured">
              <Checkbox /> <span>Publish category</span>
            </div>
          </Form.Item>
          <Form.Item>
            <Button type="submit" className="add-cat" disabled={uploading} onClick={handleSaveClick}>
              Save Category
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AddCategoryForm;
