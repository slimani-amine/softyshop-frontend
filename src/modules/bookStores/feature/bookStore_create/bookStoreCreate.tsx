import { FC, useState } from "react";
import getPlaceName from "@src/modules/shared/utils/getPlace";
import {
  Form,
  Button as ButtonAnt,
  Upload,
  Divider,
  Row,
  Col,
  Input,
  message,
  Space,
  Select,
} from "antd";
import Button from "@src/modules/shared/components/Button/Button";
import { MinusCircleOutlined } from "@ant-design/icons";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useCreateStoreMutation } from "../../service/storeApi";
import { useAllvendorsQuery } from "../../../vendores/services/vendorApi";
import { useSelector } from "react-redux";
import { RootState } from "@src/modules/shared/store";
import { handleFileChange } from "@src/modules/shared/utils/upload";
import { useNavigate } from "react-router-dom";

interface AddShopFormProps {
  onFinish: (values: any) => void;
}

const AddShopForm: FC<AddShopFormProps> = () => {
  const navigate = useNavigate()
  const [uploading, setUploading] = useState(false);

  const [form] = Form.useForm();
  const [fields, setFields] = useState<string[]>([""]);
  const [files, setFile] = useState<any>(null);
  const [selectedFileUrl, setSelectedFileUrl] = useState<string>();
  const [cover , setCover] = useState<any>(null)
  const [selectedCoverUrl, setSelectedCoverUrl] = useState<string>();

  console.log(selectedCoverUrl)
  console.log(files)
  console.log(cover)
  console.log(uploading)
  const initialPosition = [33.892166, 9.561555499999997]; // New York coordinates
  const [position, setPosition] = useState(initialPosition);
  const [createStore] = useCreateStoreMutation(); // Destructure and use the hook
  
  const Current_User= useSelector((state: RootState) => state.auth.user?.role.toLocaleUpperCase()) 
  const Id_user = useSelector((state: RootState) => state?.auth?.user?.id)
  console.log(Id_user)
  console.log(Current_User)
  let vendors = []; // Initialize vendors outside the condition to avoid undefined errors

  if (Current_User === "ADMIN") {
      const { data: fetchedVendors } = useAllvendorsQuery();
      vendors = fetchedVendors?.data.docs;
  }
  console.log(Current_User === "ADMIN")
  console.log(vendors)
  
  const selectOptions = vendors?.map((cat: any) => ({
      label: cat.email,
      value: cat.id,
  }));
  const [showPopup, setShowPopup] = useState(false);
  const MapObject = {
    center: position,
    zoom: 6,
    style: { height: "400px", width: "100%" },
    attribution: "&copy; OpenStreetMap contributors",
  };
  const ChoosePlaceOnClick = ({ handleClick }: any) => {
    useMapEvents({
      click: handleClick,
    });

    return null;
  };

  const handleClick = async (event: any) => {
    const { lat, lng } = event.latlng;
    const placeName = await getPlaceName(lat, lng);
    console.log(placeName);
    setPosition([lat, lng, placeName]);
    setShowPopup(true);
  };

  const addField = () => {
    setFields([...fields, ""]);
  };

  const removeField = (index: number) => {
    const newFields = [...fields];
    newFields.splice(index, 1);
    setFields(newFields);
  };

  const handleSaveClick = async () => {
    try {
      const values = await form.validateFields();
      const objectPost = { ...values, positionOfShop: position };
      console.log(objectPost, "ooookkkkkkkpppp");
      console.log(objectPost.positionOfShop[2]);
      const plc = objectPost.positionOfShop[2]
      console.log(plc)
      const response =await createStore({
        name: objectPost.name,
        phoneNumber: objectPost.phone,
        logo: selectedFileUrl,
        location: objectPost.positionOfShop.splice(0, 2),
        address: plc,
        socialMediaLinks: objectPost.data,
        vendor_id: objectPost.vendor,
        cover : selectedCoverUrl
      });

      console.log(response , "data of response")

      if ('data' in response) {
        // Display success message if data exists
        message.success("Product saved successfully!");
        form.resetFields();
        navigate("/stores")

        
    } else if ('error' in response) {
        // Display error message if error exists
        message.error("Failed to save product. Please try again.");
        console.error('Error saving product', response.error);
    } else {
        message.error("Unexpected response from server. Please try again later.");
    }
    } catch (error) {
      console.log(error);
      console.error("Error saving shop", error);
      message.error("Error saving shop");
    }
  };

 
 

  const Email_user = useSelector((state: RootState) => state.auth.user?.email);
  console.log(Email_user)

  return (
    <div className="">
      <div className="parent-container">
        <h1 className="title">Add New Shop</h1>
        <div className="create-shop-container">
          <Form form={form} className="form-shop">
            <Row gutter={[22, 0]} className="name-Shop">
              <Col span={24}>
                <Form.Item
                  name="name"
                  style={{ marginBottom: 0 }}
                  rules={[ 
                    { 
                        required: true, 
                        message: 'Please enter Store name' 
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
                    className="input-custom-small"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[22, 0]} className="name-shop">
              <Col span={24}>
                <Form.Item
                  name="vendor"
                  className="select-vendor"
                  style={{ marginBottom: "20px" }}
                
                >
                  <Select
                    size="middle"
                    placeholder="select-vendor"
                    className="input-custom"
                    options={Current_User === "ADMIN" ? selectOptions : []}
                    defaultValue={
                      Current_User === "ADMIN" ? undefined: Email_user
                    }
                    disabled={Current_User !== "ADMIN" ? true : false}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[16, 0]} className="number-Shop">
              <Col span={24}>
                <Form.Item
                  name="phone"  
                  style={{ marginBottom: 0 }}
                  rules={[
                    { 
                        required: true, 
                        message: 'Please enter Shop phone' 
                    },
                    {
                        pattern: /^[2-57-9]\d{7}$/,
                        message: 'Phone number must be 8 digits and start with 2, 4, 5, 7, or 9'
                    }
                ]}      
                >
                  <Input
                    size="large"
                    name="phone"
                    placeholder="Shope Phone"
                    className="input-custom-small"
                  />
                </Form.Item>
              </Col>
            </Row>
            <MapContainer className="map" {...MapObject}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {showPopup && (
                <Marker position={position}>
                  <Popup>
                    <div>Latitude: {position[0]}</div>
                    <div>Longitude: {position[1]}</div>
                  </Popup>
                </Marker>
              )}
              <ChoosePlaceOnClick handleClick={handleClick} />
            </MapContainer>
            <Form.Item
              className="upload-images"
              name="images"
              rules={[{ required: true, message: "Image is required!" }]}
            >
              <Upload.Dragger
                className="drag-images"
                listType="picture"
                accept="image/*"
                multiple
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
                <p className="ant-upload-text">Drag & drop Shop image here</p>
                <div className="icon-drag">
                  <Divider className="divider" />
                  <p className="or">OR</p>
                  <Divider className="divider" />
                </div>
                <ButtonAnt className="btn-select">Select Files</ButtonAnt>
                <p className="size-img">Upload 280*280 image</p>
              </Upload.Dragger>
            </Form.Item>
            <Form.Item name="dynamicInputs">
              {fields.map((_, index) => (
                <Space
                  key={index}
                  style={{ display: "flex", marginBottom: 8 }}
                  align="baseline"
                >
                  <Form.Item
                    name={["data", index]}
                    rules={[{ required: true, message: "Missing data" }]}
                  >
                    <Input className="dynamic-input" placeholder="Link" />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => removeField(index)} />
                </Space>
              ))}
              <Form.Item>
                <Button className="add-btn" onClick={addField}>
                  <span>Add Link</span>
                </Button>
              </Form.Item>
            </Form.Item>

            <Form.Item
              className="upload-images"
              name="images"
              rules={[{ required: true, message: "Cover is required!" }]}
            >
              <Upload.Dragger
                className="drag-images"
                listType="picture"
                accept="image/*"
                multiple
                maxCount={1}
                onChange={(e: any) =>
                  handleFileChange(
                    e,
                    setCover,
                    setSelectedCoverUrl,
                    setUploading
                  )
                }
                beforeUpload={() => false}
              >
                <p className="ant-upload-text">Drag & drop Shop Cover here</p>
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

export default AddShopForm;
