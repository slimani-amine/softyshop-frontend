import  { FC, useState } from "react";
import { Form, Button as ButtonAnt, Upload, Divider, Row, Col, Input, message, Space } from "antd";
import Button from "@src/modules/shared/components/Button/Button";
import { MinusCircleOutlined} from '@ant-design/icons';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useCreateStoreMutation } from "../../service/storeApi";

interface AddShopFormProps {
  onFinish: (values: any) => void;
}

const AddShopForm: FC<AddShopFormProps> = ({ onFinish }) => {
  const [form] = Form.useForm();
  const [fields, setFields] = useState<string[]>(['']);
  const initialPosition = [33.892166, 9.561555499999997]; // New York coordinates
  const [position, setPosition] = useState(initialPosition);
  const [createStore, isLoading] = useCreateStoreMutation(); // Destructure and use the hook


  const [showPopup, setShowPopup] = useState(false);
  const  MapObject= {
    center: position,
    zoom: 6,
    style: { height: '400px', width: '100%' },
    attribution: '&copy; OpenStreetMap contributors'
  };
  const ChoosePlaceOnClick = ({ handleClick }:any) => {
    useMapEvents({
      click: handleClick,
    });
  
    return null;
  };

  const handleClick = async (event:any) => {
    const { lat, lng } = event.latlng;
    const placeName  = await ( getPlaceName(lat,lng))
    console.log(placeName)
    setPosition([lat, lng , placeName]);
    setShowPopup(true);
   
  };



  const addField = () => {
    setFields([...fields, '']);
  };

  const removeField = (index: number) => {
    const newFields = [...fields];
    newFields.splice(index, 1);
    setFields(newFields);
  };


  const handleSaveClick = async () => {
    
    try {
      const values = await form.validateFields();
      const objectPost = {...values,positionOfShop:position}
      console.log(objectPost,'ed')
      form.resetFields();
      const response = createStore({
        "storeName": objectPost.name,
        "storePhone": objectPost.phone,
        "logo": "eufig.png",
        "position": ["1","2","ezdce"],
        "socialMediaLinks": ['regerg'] ,
        
      })
      message.success('Shop saved successfully');
    } catch (error) {
      console.log(error)        
      console.error('Error saving shop', error);
      message.error('Error saving shop');
    }
  };

  const handleFileChange = (info: any) => {
    const fileList = [...info.fileList];
    console.log(fileList)
  };
  async function getPlaceName(latitude:string, longitude:string) {
    const apiUrl = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
  
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
  
      if (response.ok) {
        const placeName = data.display_name;
        console.log(`The place is: ${placeName}`);
        setPosition([latitude, longitude , placeName]  )
        return placeName;
      } else {
        console.error(`Error fetching data: ${response.statusText}`);
        return null;
      }
    } catch (error) {
      console.error(`Error fetching data: `);
      return null;
    }
  }



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
                  rules={[{ required: true, message: "Please enter Shop name" }]}
                >
                  <Input
                    size="large"
                    placeholder="Name"
                    className="input-custom-small"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[16, 0]} className="number-Shop">
              <Col span={24}>
                <Form.Item
                  name="phone"
                  style={{ marginBottom: 0 }}
                  rules={[{ required: true, message: "Please enter Shop name" }]}
                >
                  <Input
                    size="large"
                    name='phone'
                    placeholder="Shope Phone"
                    className="input-custom-small"
                  />
                </Form.Item>
              </Col>
            </Row>
            <MapContainer className='map' {...MapObject}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
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
                <Space key={index} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                  <Form.Item
                    name={['data', index]}
                    rules={[{ required: true, message: 'Missing data' }]}
                  >
                    <Input className='dynamic-input' placeholder="Link" />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => removeField(index)} />
                </Space>
            ))}
      <Form.Item>
        <Button className="add-btn"  onClick={addField} >
          <span>Add Link</span>
        </Button>
      </Form.Item>           
       </Form.Item>
            <Form.Item>
              <Button type="button" onClick={handleSaveClick}>Save Shop</Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AddShopForm;
