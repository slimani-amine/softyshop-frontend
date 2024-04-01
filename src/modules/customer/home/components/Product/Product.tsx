import { useState } from 'react';
import { ReactComponent as AddToCart } from '../../../../shared/assets/icons/home/addToCart.svg';
import { ReactComponent as View } from '../../../../shared/assets/icons/home/view.svg';
import { ReactComponent as Wish } from '../../../../shared/assets/icons/home/wish.svg';
import { useAppDispatch } from '@src/modules/shared/store';
import { addToCart } from '@src/modules/customer/data/cartSlice';

function Product({
  name,
  rating,
  price,
  image,
}: {
  name: string;
  rating: string;
  price: number;
  image: string;
}) {
  const dispatch = useAppDispatch();
  const [showIcons, setShowIcons] = useState(false);

  function handleAddToCart() {
    dispatch(addToCart(name));
  }

  return (
    <div
      onMouseEnter={() => setShowIcons(true)}
      onMouseLeave={() => setShowIcons(false)}
      className="card"
    >
      <div className="image-wrapper">
        <img width={336.75} height={336.75} src={image} className="image" />
      </div>
      {showIcons && (
        <>
          <View className="icons view" />
          <Wish className="icons wish" />
        </>
      )}
      <div className="product-info-and-buttons">
        <div className="product-info">
          <p className="name"> {name}</p>
          <div>
            <img
              className="rating"
              src={`/src/modules/shared/assets/icons/customerLayout/Sidebar/${rating}-stars.png`}
            />
          </div>
          <p className="price"> ${price}.00</p>
        </div>
        <div className="buttons">
          <AddToCart
            onClick={() => {
              handleAddToCart();
            }}
            className="add"
          />
        </div>
      </div>
    </div>
  );
}

export default Product;
