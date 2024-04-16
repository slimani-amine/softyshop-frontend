import { FC, useState } from "react";
import {
  Form,
  Button as ButtonAnt,

  Row,
  Col,
  Input,
  message,

} from "antd";
import OrderItem from "../../components/orderItem/orderItem";

import Button from "@src/modules/shared/components/Button/Button";
import SearchSpecific from "@src/modules/shared/components/SearchSpecific/SearchSpecific";

import FormItem from "antd/es/form/FormItem";

import { useProductsQuery } from "@src/modules/products/service/productApi";
import {useUsersQuery} from "@src/modules/vendores/services/vendorApi"


interface OrderFormProps {
  onFinish: (values: any) => void;
}

const OrderForm: FC<OrderFormProps> = () => {
  const [form] = Form.useForm();
  const [fields, setFields] = useState<string[]>([""]);

  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState<string[]>([]);

 
  const { data: fetchedUsers } = useUsersQuery({
    perPage: pageSize,
    page: currentPage,
  });
  const allUsers = fetchedUsers?.data?.docs 
  const users_option = allUsers?.map((user:any)=>({label : user.email , value:user.id}))

  console.log(fetchedUsers)
  const { data: fetchedProducts, error, isLoading } = useProductsQuery({
    perPage: pageSize,
    page: currentPage,
  });
  const allProducts = fetchedProducts?.data?.docs
  const getProductById = (productId:any) => {
    return allProducts.find((product:any) => product.id === productId);
  };
  console.log(allProducts)
  const products_option = fetchedProducts?.data?.docs.map((product:any)=>({label : product.name , value : product.id}))
  console.log(products_option)

 

  const removeField = (index: number) => {
    const newFields = [...fields];
    newFields.splice(index, 1);
    setFields(newFields);
  };

  const handleSaveClick = async () => {
    try {
      const values = await form.validateFields();
     
      form.resetFields();
     
      //const response = createStore({
      // name: objectPost.name,
       // phoneNumber: objectPost.phone,
       // logo: selectedFileUrl,
        //location: objectPost.positionOfShop.splice(0, 2),
       // address: plc,
        //socialMediaLinks: objectPost.data,
        //vendor_id: "a0986058-3833-4a2a-b898-6a4f582d379e",
      //});
      //console.log(response);
      message.success("Shop saved successfully");
    } catch (error) {
      console.log(error);
      console.error("Error saving shop", error);
      message.error("Error saving shop");
    }
  };

  
 
  const Onchange = (value: string) => {
    const product = getProductById(value);
    // Check if the product already exists in the list
    if (!products.find((prod) => prod.id === product.id)) {
      setProducts([...products, product]);
    }
  };
interface Product {
  imageUrl: string;
  name : String,
  price : Number,
  images : string
}

  return (
    <div className="">
      <div className="parent-container-order">
        <h1 className="title">Add New Order</h1>
        <div className="create-order-container">
            
          <Form form={form} className="form-shop">
            <div className="form-content">
              <div className="part-1">
              <FormItem name='products-search'>
              <Row gutter={[3, 0]} className="name-Shop">
                <Col span={3}>
                  <label htmlFor="products-search" >Product:</label>
                  <SearchSpecific options={products_option}  onChange={ Onchange}  />
                </Col>
              </Row>
              </FormItem>
            
                <Form.Item className="product-selected">
                {products.map((product,index) => {
                      const imagesArray = JSON.parse(product.images);

                      console.log(imagesArray)

                      const image = imagesArray[0] // Get the first image or set a default value
                      console.log(image)
                      return (
                    <OrderItem
                        key={product.id}
                        name={product.name}
                        price={product.price}
                        image={image}
                        onRemove={() => {
                          const newProducts = [...products];
                          newProducts.splice(index, 1); // Remove the product at the specified index
                          setProducts(newProducts); // Update the products array
                        }}
                      />                    );
  })}
                </Form.Item>
            
              </div>
            <div className="part-2">
              <Form.Item>
              <Row gutter={[4, 0]} className="name-Shop">
                <Col span={3}>
              <label htmlFor="products-search" >Email: </label>

              <SearchSpecific options={users_option} onChange={function (value: string): void {
                    throw new Error("Function not implemented.");
                  } }  />
                  </Col>
                  <Col span={3}>
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
              </Form.Item>
              

            </div>
            <div className="part-3">
            <Form.Item>
              <Row gutter={[3, 0]} className="name-Shop">
              
                  </Row>
              </Form.Item>



            </div>
            </div>
            <Form.Item>
            



              <Button
                type="button"
                className="add-cat"
                onClick={handleSaveClick}
              >
                Save Shop
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default OrderForm;
