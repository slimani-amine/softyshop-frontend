import { useEffect, useState } from 'react';
import { ReactComponent as AddToCart } from '../../../../shared/assets/icons/home/addToCart.svg';
import { ReactComponent as RemoveFromCart } from '../../../../shared/assets/icons/home/removeFromCart.svg';
import { ReactComponent as View } from '../../../../shared/assets/icons/home/view.svg';
import { ReactComponent as Wish } from '../../../../shared/assets/icons/home/wish.svg';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
// import { addToCart } from '@src/modules/customer/data/cartSlice';
import { useAppDispatch, useAppSelector } from '@src/modules/shared/store';
import { BASE_URL } from '@src/modules/auth/data/authThunk';
import { addToCart, getCart } from '@src/modules/customer/data/cartThunk';

function Product({
  id,
  name,
  price,
  images,
}: {
  id: number;
  name: string;
  price: number;
  images: string;
}) {
  const dispatch = useAppDispatch();
  const [showIcons, setShowIcons] = useState(false);
  const [loading, setIsLoading] = useState(false);

  const lastImage = images.length && JSON.parse(images)[0];

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
  const cart = useAppSelector((state) => state.cart.cart);
  // const cartId = useAppSelector((state) => state.cart.cartId);
  // console.log(`cartId: ${cartId}`);

  // console.log(cart);
  async function handleAddToCart() {
    const quantity: any =
      cart?.find((item: any) => item.product.id == id)?.quantity || 0;
    console.log(quantity);
    setIsLoading(true);
    Promise.all([
      await dispatch(addToCart({ quantity: quantity + 1, productId: id + '' })),
      dispatch(getCart()),
    ]);
    setIsLoading(false);
    toast.success('Product successfully added to cart.');
  }

  async function handleRemoveFromCart() {
    const quantity: any = cart?.find((item: any) => item.product.id == id)
      ?.quantity;
    console.log(quantity);
    if (quantity < 1) return;
    setIsLoading(true);
    Promise.all([
      await dispatch(addToCart({ quantity: quantity - 1, productId: id + '' })),
      dispatch(getCart()),
    ]);
    setIsLoading(false);
  }

  // console.log(myCart);

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
        <button className="buttons" disabled={loading}>
          {/* <RemoveFromCart
            className="add"
            onClick={() => {
              handleRemoveFromCart();
            }}
          /> */}
          <AddToCart
            onClick={() => {
              handleAddToCart();
            }}
            className="add"
          />
        </button>
      </div>
    </div>
  );
}

export default Product;
