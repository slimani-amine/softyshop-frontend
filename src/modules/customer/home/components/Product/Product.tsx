import { useState } from 'react';
import { ReactComponent as AddToCart } from '../../../../shared/assets/icons/home/addToCart.svg';
import { ReactComponent as View } from '../../../../shared/assets/icons/home/view.svg';
import { ReactComponent as Wish } from '../../../../shared/assets/icons/home/wish.svg';
// import { useAppDispatch } from '@src/modules/shared/store';
// import { addToCart } from '@src/modules/customer/data/cartSlice';
import { Link } from 'react-router-dom';

function Product({
  id,
  name,
  // rating,
  price,
  images,
}: {
  id: number;
  name: string;
  // rating: string;
  price: number;
  images: string;
}) {
  // const dispatch = useAppDispatch();
  const [showIcons, setShowIcons] = useState(false);

  // function handleAddToCart() {
  //   dispatch(addToCart(name));
  // }
  const lastImage = images.length && JSON.parse(images)[2];
  return (
    <Link to={`${id}`}>
      <div
        onMouseEnter={() => setShowIcons(true)}
        onMouseLeave={() => setShowIcons(false)}
        className="card"
      >
        <div className="image-wrapper">
          <img
            width={336.75}
            height={336.75}
            src={lastImage}
            className="image"
          />
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
              {/* <img
              className="rating"
              src={`/src/modules/shared/assets/icons/customerLayout/Sidebar/${rating}-stars.png`}
            /> */}
            </div>
            <p className="price"> ${price}</p>
          </div>
          <div className="buttons">
            <AddToCart
              // onClick={() => {
              //   handleAddToCart();
              // }}
              className="add"
            />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Product;
