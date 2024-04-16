import { FC, useState } from 'react';
import { RootState } from '@src/modules/shared/store';
import { handleFileChange } from '@src/modules/shared/utils/upload';

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
} from 'antd';
import Button from '@src/modules/shared/components/Button/Button';
const { TextArea } = Input;
import {
  useAllStoresQuery,
  useMyStoresQuery,
} from '@src/modules/bookStores/service/storeApi';
import { useAllCategoriesQuery } from '@src/modules/categories/service/categoryApi';
import { useAllBrandsQuery } from '@src/modules/brands/service/brandApi';
import { useCreateProductMutation } from '../../service/productApi';
import { useAllCreatorsQuery } from '@src/modules/creators/service/creatorApi';
import { useSelector } from 'react-redux';
interface AddProductFormProps {
  onFinish: (values: any) => void;
}

const AddProductForm: FC<AddProductFormProps> = ({ onFinish }) => {
  const { data: fetchedCatgeories, isLoading } = useAllCategoriesQuery();
  const categories = fetchedCatgeories?.data.docs || [];
  const selectOptionsCategories = categories.map((cat: any) => ({
    label: cat.name,
    value: cat.id,
  }));

  const { data: fetchedBrands } = useAllBrandsQuery();
  const brands = fetchedBrands?.data.docs || [];
  const selectOptionsBrands = brands.map((brand: any) => ({
    label: brand.name,
    value: brand.id,
  }));

  const { data: fetchedCreators } = useAllCreatorsQuery();
  const creators = fetchedCreators?.data.docs || [];
  const selectOptionsCreators = creators.map((creator: any) => ({
    label: creator.name,
    value: creator.id,
  }));

  const [files, setFile] = useState<any>(null);
  const [selectedFileUrl, setSelectedFileUrl] = useState<string>();

  const Current_User = useSelector(
    (state: RootState) => state.auth.user?.role.toLocaleUpperCase()
  );
  console.log(Current_User);
  let stores = [];
  if (Current_User === 'ADMIN') {
    const { data: fetechedAllStores } = useAllStoresQuery();
    stores = fetechedAllStores?.data.docs;
  } else {
    const { data: fetechedAllStores } = useMyStoresQuery();
    stores = fetechedAllStores?.data.docs;
  }
  console.log(stores);
  const selectStores = stores?.map((store: any) => ({
    label: store.name,
    value: store.id,
  }));
  console.log(selectStores);
  const [form] = Form.useForm();
  const handleFinish = (values: any) => {
    console.log(values);
    console.log(values);
    form.resetFields();
  };

  const [createProduct] = useCreateProductMutation();

  const handleSaveClick = async () => {
    try {
      console.log(selectedFileUrl);
      const values = await form.validateFields();

      console.log(values, 'vallllllluuuuuuuueeeeeeeeesà');
      const product = {
        name: values.name,
        price: values.price,
        category_id: values.category,
        discount: values.discount,
        stockNumber: values.stock,
        creator_id: values.creator,
        brand_id: values.brand,
        images: selectedFileUrl,
      };
      const response = await createProduct({
        id: values.store,
        newProduct: product,
      });
      form.resetFields();
    } catch (error) {
      console.error('Error saving product', error);
    }
  };

  return (
    <div className="add-new-Product">
      <h1 className="title">Add New Product</h1>
      <div className="container-add-Product">
        <Form form={form} onFinish={handleFinish}>
          <Row gutter={[16, 0]} className="name-Product-new">
            <Col span={24}>
              <Form.Item
                name="name"
                style={{ marginBottom: 20 }}
                rules={[
                  { required: true, message: 'Please enter Product name' },
                ]}
              >
                <Input
                  size="large"
                  placeholder="Name"
                  className="input-custom"
                  style={{ color: 'blue' }} // Change color based on user role
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item
                name="store"
                className="Product"
                style={{ marginBottom: 20 }}
                rules={[
                  {
                    required: true,
                    message: 'Product field must have at least 1 items',
                  },
                ]}
              >
                <Select
                  size="large"
                  placeholder="Store"
                  className="input-custom"
                  options={selectStores}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item
                name="category"
                className="Product"
                style={{ marginBottom: 20 }}
                rules={[
                  {
                    required: true,
                    message: 'Product field must have at least 1 items',
                  },
                ]}
              >
                <Select
                  size="large"
                  placeholder="Category"
                  className="input-custom"
                  options={selectOptionsCategories}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item
                name="brand"
                className="Product"
                style={{ marginBottom: 20 }}
                rules={[
                  {
                    required: true,
                    message: 'Product field must have at least 1 items',
                  },
                ]}
              >
                <Select
                  size="large"
                  placeholder="Brand"
                  className="input-custom"
                  options={selectOptionsBrands}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item
                name="creator"
                className="Product"
                style={{ marginBottom: 20 }}
                rules={[
                  {
                    required: true,
                    message: 'Product field must have at least 1 items',
                  },
                ]}
              >
                <Select
                  size="large"
                  placeholder="Creator"
                  className="input-custom"
                  options={selectOptionsCreators}
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            className="upload-images"
            name="images"
            rules={[{ required: true, message: 'Description is required!' }]}
          >
            <Upload.Dragger
              className="drag-images"
              listType="picture"
              accept="image/*"
              multiple
              maxCount={3}
              onChange={(e: any) =>
                handleFileChange(e, setFile, setSelectedFileUrl)
              }
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
                name="price"
                style={{ marginBottom: 0 }}
                rules={[{ required: true, message: 'Price is required!  ' }]}
              >
                <InputNumber
                  name="price"
                  placeholder="Regular Price"
                  className="input-custom"
                  size="large"
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>
            <Col span={11}>
              <Form.Item
                name="discount"
                className="SalePrice"
                style={{ marginBottom: 0 }}
                rules={[{ required: true, message: 'Please enter sale price' }]}
              >
                <InputNumber
                  placeholder="Discount"
                  className="input-custom"
                  size="large"
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 0]} className="name-Product">
            <Col span={22}>
              <Form.Item
                name="stock"
                style={{ marginBottom: 0 }}
                rules={[{ required: true, message: 'Price is required!  ' }]}
              >
                <InputNumber
                  name="stock"
                  placeholder="Stock Number"
                  className="input-custom"
                  size="large"
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Button className="add-cat" onClick={handleSaveClick} type="submit">
              Save Product
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AddProductForm;
