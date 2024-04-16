import { FC, useState } from 'react';
import Spinner from '@src/modules/shared/components/Spinner/Spinner';
import {
  useUpdateCatgoryMutation,
  useCategoryQuery,
} from '../../service/categoryApi';
import {
  Form,
  Button as ButtonAnt,
  Upload,
  Divider,
  Row,
  Col,
  Input,
  Checkbox,
  message,
} from 'antd';
import Button from '@src/modules/shared/components/Button/Button';
import { useParams } from 'react-router-dom';
import { handleFileChange } from '@src/modules/shared/utils/upload';

interface AddCategoryFormProps {
  onFinish: (values: any) => void;
}

const EditCategoryForm: FC<AddCategoryFormProps> = () => {
  const [files, setFile] = useState<any>(null);
  console.log(files)
  const [selectedFileUrl, setSelectedFileUrl] = useState<string>();
  const [form] = Form.useForm();
  const [updateCategory] = useUpdateCatgoryMutation();
  const { id } = useParams<{ id: string }>(); // Assuming useParams returns an object with 'id' property

  const { data: fetchCategory, isLoading } = useCategoryQuery(id);
  const category = fetchCategory?.data?.docs[0];
  console.log(category, 11);

  if (isLoading) return <Spinner />;

  const initialValues = {
    name: fetchCategory?.data?.docs[0]?.name || '',
    images: [],
    isPublished: fetchCategory?.data?.docs[0]?.isPublished || false,
  };

  const handleFinish = async () => {
    try {
      const values = await form.validateFields();
      console.log(values, 'fg');
      console.log(
        {
          name: values.name,
          icon: '',
          isPublished: values.isPublished === 'on' ? true : false,
        },
        '0000000000000000000000000'
      );
      await updateCategory({
        id: id,
        data: {
          name: values.name,
          icon: selectedFileUrl,
          isPublished: values.isPublished === 'on' ? true : false,
        },
      });

      message.success(`Category of id:${id} updated`);
      form.resetFields();
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  console.log(category, 'iufhgui');
  const defaultFileList = [
    {
      uid: '-1',
      name: 'Current Image',
      status: 'done',
      url: category.icon,
    } as any,
  ];

  return (
    <div className="add-new-Product">
      <h1 className="title">Edit Category</h1>
      <div className="container-add-Product">
        <Form form={form} initialValues={initialValues}>
          <Row gutter={[16, 0]} className="name-Product">
            <Col span={22}>
              <Form.Item
                name="name"
                style={{ marginBottom: 0 }}
                rules={[
                  { required: true, message: 'Please enter Category name' },
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

          <Form.Item name="isPublished">
            <div className="feutured">
              <Checkbox defaultChecked={initialValues.isPublished} />{' '}
              <span>Publish category</span>
            </div>
          </Form.Item>
          <Form.Item>
            <Button className="add-cat" onClick={handleFinish} type="submit">
              Save Category
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default EditCategoryForm;
