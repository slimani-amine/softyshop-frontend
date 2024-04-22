// ModalAddress.tsx
import  { FC } from "react";
import { Modal, Form, Input } from "antd";

interface ModalAddressProps {
  visible: boolean;
  onCancel: () => void;
  onAddAddress: (values: any) => void; // Callback function to receive form values
}

const ModalAddress: FC<ModalAddressProps> = ({ visible, onCancel, onAddAddress }) => {
  const [form] = Form.useForm();

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      onAddAddress(values); // Pass form values to the parent component
    } catch (error) {
      console.error("Error adding new address", error);
    }
  };

  return (
    <Modal
      title="Add New Address"
      visible={visible}
      onCancel={onCancel}
      onOk={handleOk}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="address"
          label="Address"
          rules={[ 
            { 
                required: true, 
                message: 'Please enter Address' 
            },
            {
                pattern: /^(?!\s)(?=(?:.*[a-zA-Z\u0600-\u06FF]){2})[a-zA-Z\u0600-\u06FF\s]{2,}$/,
                message: 'Adress must contain at least two alphabetical characters and no leading spaces'
            }
        ]}            
        >
          <Input placeholder="Address" />
        </Form.Item>

        <Form.Item
          name="city"
          label="City"
          rules={[ 
            { 
                required: true, 
                message: 'Please enter City' 
            },
            {
                pattern: /^(?!\s)(?=(?:.*[a-zA-Z\u0600-\u06FF]){2})[a-zA-Z\u0600-\u06FF\s]{2,}$/,
                message: 'City must contain at least two alphabetical characters and no leading spaces'
            }
        ]}                    >
          <Input placeholder="City" />
        </Form.Item>
        <Form.Item
          name="zipCode"
          label="Zip Code"
          rules={[
            {
                required: true,
                message: 'Please enter exactly 4 digits',
            },
            {
                pattern: /^\d{4}$/,
                message: 'Input must be exactly 4 digits',
            },
        ]}        >
          <Input placeholder="Zip code" />
        </Form.Item>
        <Form.Item
          name="phoneNumber"
          label="Phone Number"
          rules={[
            { 
                required: true, 
                message: 'Please enter Shop phone' 
            },
            {
                pattern: /^[2-57-9]\d{7}$/,
                message: 'Phone number must be 8 digits and start with 2, 4, 5, 7, or 9'
            }
        ]}              >
          <Input placeholder="Phone Number" />
        </Form.Item>
        {/* Add more form fields for city, state, zip code, etc. */}
      </Form>
    </Modal>
  );
};

export default ModalAddress;
