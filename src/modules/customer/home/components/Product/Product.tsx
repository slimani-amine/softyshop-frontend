import { HashLink } from 'react-router-hash-link';
import { useState } from 'react';
import { ReactComponent as AddToCart } from '../../../../shared/assets/icons/home/addToCart.svg';
import { ReactComponent as RemoveFromCart } from '../../../../shared/assets/icons/home/removeFromCart.svg';
import { ReactComponent as View } from '../../../../shared/assets/icons/home/view.svg';
import { ReactComponent as Wish } from '../../../../shared/assets/icons/home/wish.svg';
import { useAppDispatch, useAppSelector } from '@src/modules/shared/store';
import { addToCart, getCart } from '@src/modules/customer/data/cartThunk';
import Button from '@src/modules/shared/components/Button/Button';

function Product({
  availability,
  id,
  images,
  name,
  price,
  stockNumber,
  quantity,
}: {
  availability: boolean;
  id: number;
  name: string;
  images: string;
  price: number;
  stockNumber: number;
  quantity: number;
}) {
  const dispatch = useAppDispatch();
  const [showIcons, setShowIcons] = useState(false);
  const [loading, setIsLoading] = useState(false);

  const theImage = images.length && JSON.parse(images);
  const cart = useAppSelector((state) => state.cart.cart);

  async function handleAddToCart() {
    const quantity: any =
      cart?.find((item: any) => item.product.id == id)?.quantity || 0;
    setIsLoading(true);
    Promise.all([
      await dispatch(addToCart({ quantity: quantity + 1, productId: id + '' })),
      dispatch(getCart()),
    ]);
    setIsLoading(false);
  }

  async function handleRemoveFromCart() {
    const quantity: any = cart?.find((item: any) => item.product.id == id)
      ?.quantity;
    if (quantity < 1) return;
    setIsLoading(true);
    Promise.all([
      await dispatch(addToCart({ quantity: quantity - 1, productId: id + '' })),
      dispatch(getCart()),
    ]);
    setIsLoading(false);
  }

  return (
    <div
      onMouseEnter={() => setShowIcons(true)}
      onMouseLeave={() => setShowIcons(false)}
      className="card"
    >
      <HashLink to={`${id}#`}>
        <div className="image-wrapper">
          <img
            width={336.75}
            height={336.75}
            src={theImage}
            className="image"
          />
        </div>
      </HashLink>
      {showIcons && (
        <>
          <View className="icons view" />
          <Wish className="icons wish" />
        </>
      )}
      <div className="product-info-and-buttons">
        <HashLink to={`${id}#`}>
          {quantity == 0 ? (
            <div className="product-info">
              <p className="name"> {name}</p>
              <div></div>
              <p className="price"> ${price.toFixed(2)}</p>
            </div>
          ) : (
            <div className="product-info" style={{ gap: '17px' }}>
              <p className="name"> {name}</p>
              <div></div>
              <p className="price"> ${price.toFixed(2)}</p>
            </div>
          )}
        </HashLink>
        <button className="buttons" disabled={loading}>
          {quantity != 0 && (
            <RemoveFromCart
              className="add"
              onClick={() => {
                handleRemoveFromCart();
              }}
            />
          )}
          {quantity == 0 ? (
            <p></p>
          ) : quantity < 10 ? (
            <p
              style={{
                transform: 'translate(-9px, 0)',
              }}
              className="quantity"
            >
              {quantity}
            </p>
          ) : (
            <p
              style={{
                transform: 'translate(-6px, 0)',
              }}
              className="quantity"
            >
              {quantity}
            </p>
          )}
          {!availability || !stockNumber ? (
            <Button
              style={{ transform: 'translate(0,8px)' }}
              variant="secondary"
              // size="lg"
              disabled={true}
              label={'Out of Stock'}
            />
          ) : (
            <AddToCart
              onClick={() => {
                handleAddToCart();
              }}
              className="add"
            />
          )}
        </button>
      </div>
    </div>
  );
}

export default Product;
