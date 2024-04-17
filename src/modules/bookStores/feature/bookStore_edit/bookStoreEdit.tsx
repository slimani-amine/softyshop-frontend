import { FC, useState, useEffect } from "react";
import { Form, Button as ButtonAnt, Upload, Divider, Row, Col, Input, message, Select, Space } from "antd";
import Button from "@src/modules/shared/components/Button/Button";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useStoreQuery, useUpdateStoreMutation } from "../../service/storeApi";
import { useParams } from "react-router-dom";
import Spinner from "@src/modules/shared/components/Spinner/Spinner";
import { useSelector } from "react-redux";
import { RootState } from "@src/modules/shared/store";
import {useAllvendorsQuery } from "@src/modules/vendores/services/vendorApi";
import { MinusCircleOutlined } from "@ant-design/icons";
import { handleFileChange } from "@src/modules/shared/utils/upload";



interface EditShopFormProps {
  onFinish: () => void;
  initialValues: any;
}

const EditShopForm: FC<EditShopFormProps> = ({ onFinish, initialValues }) => {
  const [files, setFile] = useState<any>(null);
  console.log(files)
  const [selectedFileUrl, setSelectedFileUrl] = useState<string>();
  const { id } = useParams<{ id: string }>();
  const [form] = Form.useForm();
  const [showPopup, setShowPopup] = useState(true);
  const [fields, setFields] = useState<string[]>([]);
  const { data: fetchedStore, isLoading } = useStoreQuery(id?.toString());
  const store = fetchedStore?.data
  
  useEffect(() => {
    if (fetchedStore?.data) {
      const { name, phoneNumber, user, location, socialMediaLinks } = fetchedStore.data;
      const pos = JSON.parse(location);
      const links = JSON.parse(socialMediaLinks);
      setFields(links);
      setPosition([pos[0], pos[1], ""]);
      form.setFieldsValue({ name, phone: phoneNumber, vendor: user?.email || "a" });
    }
  }, [initialValues, form, fetchedStore]);


  const [position, setPosition] = useState<[number, number, string]>([35, 10, ""]);
  const MapObject = {
    center: position,
    zoom: 6,
    style: { height: "400px", width: "100%" },
    attribution: "&copy; OpenStreetMap contributors",
  };
  const ChoosePlaceOnClick: FC<{ handleClick: (lat: number, lng: number) => void }> = ({ handleClick }) => {
    const map = useMapEvents({
      click: (event:any) => {
        const { lat, lng } = event.latlng;
        handleClick(lat, lng);
      }
    });
    console.log(map)
    return null;
  };

  const [updateStore] = useUpdateStoreMutation()
  const handleSaveClick = async () => {
    try {
      const values = await form.validateFields();
      const objectPost = { ...values, positionOfShop: position ,fields};
      console.log(objectPost ,"object Post")
      const address = await getPlaceName(objectPost.positionOfShop[0],objectPost.positionOfShop[1])
      const name = objectPost.name
      const data = {
         name ,
         phoneNumber : objectPost.phone,
         logo: selectedFileUrl ,
         location : [objectPost.positionOfShop[0] , objectPost.positionOfShop[1]] , 
         address,
         socialMediaLinks : objectPost.data
      }
    
      const response = await updateStore({ id: fetchedStore.data.id, data});
      message.success("Shop updated successfully");
      console.log(response)
      onFinish();
    } catch (error) {
      console.error("Error updating shop", error);
      message.error("Error updating shop");
    }
  };

  async function getPlaceName(latitude: any, longitude: any) {
    const apiUrl = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (response.ok) {
        const placeName = data.display_name;
        console.log(`The place is: ${placeName}`);
        setPosition([latitude, longitude, placeName]);
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
  const handleClick = async (lat: number, lng: number) => {
    setPosition([lat, lng, ""]);
    setShowPopup(true);
  };
  const Current_User = useSelector((state: RootState) => state?.auth?.user?.role.toUpperCase());

    let vendors: any[] = []; 
    if (Current_User === "ADMIN") {
      const { data: fetchedVendors } = useAllvendorsQuery();

      vendors = fetchedVendors?.data?.docs || [];
    }
    const selectOptions = vendors.map((vendor: any) => ({
      label: vendor.email,
      value: vendor.id,
    }));
    const Email_user = useSelector((state: RootState) => state.auth.user?.email);

    if (isLoading) return <Spinner />;
  const addField = () => {
    setFields([...fields, ""]);
  };

  const removeField = (index: number) => {
    const newFields = [...fields];
    newFields.splice(index, 1);
    setFields(newFields);
  };
  console.log(store)
  const defaultFileList = [
    {
      uid: "-1",
      name: "Current Image",
      status: "done",
      url: selectedFileUrl,
      thumbUrl: store.logo,
    } as any,
  ];
  return (
    <div className="">
      <div className="parent-container">
        <h1 className="title">Edit Shop</h1>
        <div className="create-shop-container">
          <Form form={form} className="form-shop">
            <Row gutter={[22, 0]} className="name-Shop">
              <Col span={24}>
                <Form.Item
                  name="name"
                  style={{ marginBottom: 0 }}
                  rules={[{ required: true, message: "Please enter Shop name" }]}
                >
                  <Input size="large" placeholder="Name" className="input-custom-small" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[16, 0]} className="number-Shop">
              <Col span={24}>
                <Form.Item
                  name="phone"
                  style={{ marginBottom: 0 }}
                  rules={[{ required: true, message: "Please enter Shop phone" }]}
                >
                  <Input size="large" placeholder="Shop Phone" className="input-custom-small" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[22, 0]} className="name-shop">
              <Col span={24}>
                <Form.Item
                  name="vendor"
                  className="select-vendor"
                  style={{ marginBottom: "20px" }}
                  rules={[{ required: true, message: "Please select a vendor" }]}
                >
                  <Select
                    size="middle"
                    placeholder="Select vendor"
                    className="input-custom"
                    options={Current_User === "ADMIN" ? selectOptions : []}
                    defaultValue={Current_User === "ADMIN" ? undefined : Email_user}
                    disabled={Current_User !== "ADMIN"}
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
            >
              <Upload.Dragger
                defaultFileList={defaultFileList}
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
              {fields.map((field, index) => (
                <Space key={index} style={{ display: "flex", marginBottom: 8 }} align="baseline">
                  <Form.Item
                    name={["data", index]}
                    rules={[{ required: true, message: "Missing data" }]}
                    initialValue={field}
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
            <Form.Item>
              <Button type="button" className="add-cat" onClick={handleSaveClick}>
                Save Shop
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default EditShopForm;

