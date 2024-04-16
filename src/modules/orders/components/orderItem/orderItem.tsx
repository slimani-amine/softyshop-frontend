import React from 'react';
import { CloseCircleOutlined } from "@ant-design/icons";
import { InputNumber } from 'antd';

interface OrderItemProps {
  name: string;
  price: number;
  image: string;
  onRemove: () => void; // Function to handle product removal
}

const OrderItem: React.FC<OrderItemProps> = ({ name, price, image, onRemove }) => {
  const handleRemove = () => {
    onRemove(); // Call the onRemove function when the close icon is clicked
  };

  return (
    <div className="order-item">
      <img src={image} alt={name} />
      <div className="details">
        <h2>{name}</h2>
        <div className='price'>
          <p>${price.toFixed(2)} X</p>
          <InputNumber
            required
            min={0}
            defaultValue={1}
            name="stock"
            placeholder=""
            className="input-custom hhh"
            size="small"
            style={{ width: "50px" , height:"30px" }}
          />
        </div>
      </div>
      <div className='close-order' onClick={handleRemove}><CloseCircleOutlined/></div>
    </div>
  );
};

export default OrderItem;
