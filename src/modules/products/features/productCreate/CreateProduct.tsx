import { FC, useState } from 'react';
import { RootState } from '@src/modules/shared/store';
import { handleFileChange } from '@src/modules/shared/utils/uploadsMany';

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
  message,
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
import {  useNavigate } from 'react-router-dom';
interface AddProductFormProps {
  onFinish: (values: any) => void;
}

const AddProductForm: FC<AddProductFormProps> = () => {
  const [uploading, setUploading] = useState(false);

  const navigate = useNavigate()
  const { data: fetchedCatgeories} = useAllCategoriesQuery();
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
  const [selectedFileUrl  , setSelectedFileUrl] = useState<string[]>([]);
  console.log(files)
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
      console.log(selectedFileUrl , 'selected files');

      const values = await form.validateFields();

      console.log(values.description , "desssss")
      const product = {
        name: values.name,
        initialPrice: values.price,
        category_id: values.category,
        discount: values.discount,
        stockNumber: values.stock,
        creator_id: values.creator,
        brand_id: values.brand,
        images: selectedFileUrl,
        description : values.description
      };
      const response = await createProduct({
        id: values.store,
        newProduct: product,
      });
      if ('data' in response) {
        // Display success message if data exists
        message.success("Product saved successfully!");
        console.log(response.data);
        navigate("/products")
        
    } else if ('error' in response) {
        // Display error message if error exists
        message.error("Failed to save product. Please try again.");
        console.error('Error saving product', response.error);
    } else {
        // Handle unexpected response format
        message.error("Unexpected response from server. Please try again later.");
    }

      console.log(response)
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
                  { 
                      required: true, 
                      message: 'Please enter Product name' 
                  },
                  {
                    pattern: /^(?!\s)(?=.*[a-zA-Z'À-ÖØ-öø-ÿ\s])[a-zA-Z'À-ÖØ-öø-ÿ\s]{2,}$/,
                    message: 'Name must contain at least two alphabetical characters and no leading spaces'
                  }
              ]}
              >
                <Input
                  size="large"
                  placeholder="Name"
                  className="input-custom"
                  style={{ }} // Change color based on user role
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
              multiple={true}
              maxCount={3}
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
          <Form.Item    
            name="description"
            >
            <TextArea
              placeholder="Description"
              autoSize={{ minRows: 7, maxRows: 20 }}

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
                rules={[
                  { 
                    required: true, 
                    message: 'Please enter a sale price' 
                  },
                  { 
                    type: 'number',
                    max: 100, 
                    message: 'Discount must be less than or equal to 100' 
                  }
                ]}              >
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
                rules={[
                  { 
                    required: true, 
                    message: 'Stock number is required!' 
                  },
                  { 
                    type: 'number',
                    message: 'Stock number must be a valid number' 
                  }
                ]}              >
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
