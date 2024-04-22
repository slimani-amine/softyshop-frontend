import { FC, useState} from "react";
import {
  Form,
  Row,
  Col,
  Input,
  message,
} from "antd";
import OrderItem from "../../components/orderItem/orderItem";
import Button from "@src/modules/shared/components/Button/Button";
import SearchSpecific from "@src/modules/shared/components/SearchSpecific/SearchSpecific";
import FormItem from "antd/es/form/FormItem";
import { useAllProductsQuery } from "@src/modules/products/service/productApi";
import { useUsersQuery } from "@src/modules/vendores/services/vendorApi";
import { useAdressesOfUserQuery } from "@src/modules/vendores/services/vendorApi";

interface OrderFormProps {
  onFinish: (values: any) => void;
}

interface Product {
  productId: string;
  quantity: number;
  images: string;
  price: string;
  name: string;
}

const OrderForm: FC<OrderFormProps> = () => {
  const [form] = Form.useForm();
  const [pageSize] = useState(5);
  const [currentPage] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string>("");

  const { data: fetchedUsers } = useUsersQuery({
    perPage: pageSize,
    page: currentPage,
  });

  const allUsers = fetchedUsers?.data?.docs;
  const users_option = allUsers?.map((user: any) => ({
    label: user.email,
    value: user.id,
  }));

  const { data: fetchedProducts } = useAllProductsQuery();
  const allProducts = fetchedProducts?.data?.docs;
  const getProductById = (productId: any) => {
    return allProducts.find((product: any) => product.id === productId);
  };
  const products_option = fetchedProducts?.data?.docs.map((product: any) => ({
    label: product.name,
    value: product.id,
  }));

 const {data: fetchedAddresses} = useAdressesOfUserQuery(selectedUserId)
 console.log(fetchedAddresses?.data)
 const addrress_option = fetchedAddresses?.data?.map((address: any) => ({
  label: address.address,
  value: address.id,
}));
console.log(addrress_option)
 console.log(selectedUserId)
 console.log(fetchedAddresses)

  const handleSaveClick = async () => {
    try {
      const values = await form.validateFields();
      console.log(values);
      console.log(products, "iiiciiciciicicicicici");

      form.resetFields();

      message.success("Shop saved successfully");
    } catch (error) {
      console.error("Error saving shop", error);
      message.error("Error saving shop");
    }
  };

  const handleProductSelection = (value: string) => {
    const quantity = 1;
    const product = getProductById(value);

    if (!products.find((prod: Product) => prod.productId === product.id)) {
      setProducts([
        ...products,
        {
          productId: product.id,
          name: product.name,
          quantity: quantity,
          images: product.images,
          price: product.price,
        },
      ]);
    }
  };

  const handleQuantityChange = (productId: string, quantity: number) => {
    setProducts(
      products.map((prod: Product) => {
        if (prod.productId === productId) {
          return { ...prod, quantity: quantity };
        }
        return prod;
      })
    );
  };

  return (
    <div className="">
      <div className="parent-container-order">
        <h1 className="title">Create Order</h1>
        <div className="create-order-container">
          <Form form={form} className="form-shop">
            <div className="form-content">
              <div className="part-1">
                <FormItem name="products-search">
                  <Row gutter={[3, 0]} className="name-Shop">
                    <Col span={3}>
                     
                      <FormItem name="products-search">
                        <Row gutter={[3, 0]} className="name-Shop">
                          <Col span={3}>
                            <label
                              className="label-order"
                              htmlFor="products-search"
                            >
                              Product:
                            </label>
                            <SearchSpecific
                              options={products_option}
                              onChange={handleProductSelection}
                            />
                          </Col>
                        </Row>
                      </FormItem>
                    </Col>
                  </Row>
                </FormItem>

                <Form.Item className="product-selected">
                  {products.map((product: any, index) => {
                    const imagesArray = product.images;
                    const image = JSON.parse(imagesArray);
                    return (
                      <OrderItem
                        key={product.productId}
                        name={product.name}
                        price={product.price}
                        image={image}
                        quantity={product.quantity}
                        onQuantityChange={(quantity) =>
                          handleQuantityChange(product.productId, quantity)
                        }
                        onRemove={() => {
                          const newProducts = [...products];
                          newProducts.splice(index, 1);
                          setProducts(newProducts);
                        }}
                      />
                    );
                  })}
                </Form.Item>
              </div>
              <div className="part-2">
                <Form.Item>
                  <Row gutter={[4, 0]} className="name-Shop">
                    <Col span={3}>
                      <label className="label-order" htmlFor="products-search">
                        Email:
                      </label>
                      <SearchSpecific
                        options={users_option}
                        onChange={(value: string) => setSelectedUserId(value)}
                      />
                    </Col>
                  </Row>
                </Form.Item>
                <Form.Item>
                  <Row gutter={[4, 0]} className="name-Shop">
                    <Col span={3}>
                      <label
                        className="label-order"
                        htmlFor="products-search"
                      >
                        phoneNumber:
                      </label>
                      <Form.Item
                        name="phoneNumber"
                        style={{ marginBottom: 0, width: "280px" }}
                        rules={[
                          {
                            required: true,
                            message: "Please enter phone number",
                          },
                          {
                            min: 2,
                            message:
                              "Phone number must be at least 8 characters long",
                          },
                          {
                            pattern: /^\d+$/,
                            message: "Phone number must contain only numbers",
                          },
                        ]}
                      >
                        <Input
                          size="small"
                          placeholder="Phone Number"
                          className="input-custom"
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Form.Item>
                <Form.Item>
                  <Row gutter={[4, 0]} className="name-Shop">
                    <Col span={3}>
                      <label
                        className="label-order"
                        htmlFor="products-search"
                      >
                        Address:
                      </label>
                      <Form.Item
                        name="address"
                        style={{ marginBottom: 0, width: "280px" }}
                        rules={[
                          {
                            required: true,
                            message: "Please enter address",
                          },
                          {
                            min: 8,
                            message:
                              "Address must be at least 8 characters long",
                          },
                        ]}
                      >
                        <SearchSpecific
                              options={addrress_option}
                              onChange={handleProductSelection}
                            />
                            <Button style={{marginTop:"30px"}}>Add new Address</Button>

                      </Form.Item>

                    </Col>
                  </Row>
                </Form.Item>
              </div>
              <div className="part-3">{/* Other content */}</div>
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
