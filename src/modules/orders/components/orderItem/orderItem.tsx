import React from "react";
import { CloseCircleOutlined } from "@ant-design/icons";
import { InputNumber } from "antd";

interface OrderItemProps {
  name: string;
  price: number;
  image: string;
  quantity: number;
  onRemove: () => void; // Function to handle product removal
  onQuantityChange: (quantity: number) => void; // Function to handle quantity change
}

const OrderItem: React.FC<OrderItemProps> = ({
  name,
  price,
  image,
  quantity,
  onRemove,
  onQuantityChange,
}) => {
  const handleRemove = () => {
    onRemove(); // Call the onRemove function when the close icon is clicked
  };

  const handleQuantityChange = (value: number | null) => {
    // Ensure value is not null
    if (value !== null) {
      // Call the onQuantityChange function with the new quantity
      onQuantityChange(value);
    }
  };

  return (
    <div className="order-item">
      <img src={image} alt={name} />
      <div className="details">
        <h2>{name}</h2>
        <div className="price">
          <p>${price} X</p>
          <InputNumber
            value={quantity}
            min={0}
            onChange={handleQuantityChange} // Pass the handleQuantityChange function directly
            className="input-custom hhh"
            size="small"
            style={{ width: "50px", height: "30px" }}
          />
        </div>
      </div>
      <div className="close-order" onClick={handleRemove}>
        <CloseCircleOutlined />
      </div>
    </div>
  );
};

export default OrderItem;
