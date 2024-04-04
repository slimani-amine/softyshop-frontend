import { useEffect, useState } from 'react';
import { ReactComponent as AddToCart } from '../../../../shared/assets/icons/home/addToCart.svg';
import { ReactComponent as View } from '../../../../shared/assets/icons/home/view.svg';
import { ReactComponent as Wish } from '../../../../shared/assets/icons/home/wish.svg';
// import { useAppDispatch } from '@src/modules/shared/store';
// import { addToCart } from '@src/modules/customer/data/cartSlice';
import { Link } from 'react-router-dom';
// import { addToCart } from '@src/modules/customer/data/cartSlice';
// import { useAppDispatch } from '@src/modules/shared/store';
// import { BASE_URL } from '@src/modules/auth/data/authThunk';

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
  // const [product, setProduct] = useState([]);
  const [showIcons, setShowIcons] = useState(false);

  const lastImage = images.length && JSON.parse(images)[0];

  function handleAddToCart() {
    // useEffect(() => {
    //   console.log('hola');
    //   const fetchData = async () => {
    //     try {
    //       // const response = await fetch(`${fake_URL}`);
    //       const response = await fetch(
    //         // `${BASE_URL}api/products?search=id:${productId}`
    //         `${BASE_URL}api/products?id=${id}`
    //       );
    //       const data = await response.json();
    //       setProduct(data.data.docs);
    //     } catch (err: string | unknown) {
    //       console.log(err);
    //       return err;
    //     }
    //   };

    //   fetchData();
    // }, [BASE_URL]);
    // const theProduct = product[0];

    // dispatch(addToCart(theProduct));
    console.log('hola');
  }

  return (
    <div
      onMouseEnter={() => setShowIcons(true)}
      onMouseLeave={() => setShowIcons(false)}
      className="card"
    >
      <Link to={`${id}`}>
        <div className="image-wrapper">
          <img
            width={336.75}
            height={336.75}
            src={lastImage}
            className="image"
          />
        </div>
      </Link>
      {showIcons && (
        <>
          <View className="icons view" />
          <Wish className="icons wish" />
        </>
      )}
      <div className="product-info-and-buttons">
        <Link to={`${id}`}>
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
        </Link>
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
