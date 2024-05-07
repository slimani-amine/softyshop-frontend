import React, { useState } from 'react';
import { Drawer } from 'antd';
import { ReactComponent as AddToCart } from '../../../../shared/assets/icons/home/addToCartDrawer.svg';
import { ReactComponent as RemoveFromCart } from '../../../../shared/assets/icons/home/removeFromCartDrawer.svg';
import { ReactComponent as RemoveFromCartDisabled } from '../../../../shared/assets/icons/home/disabledTest.svg';
import { ReactComponent as DeleteFromCart } from '../../../../shared/assets/icons/home/deleteFromCart.svg';
import { ReactComponent as ShoppingBagIcon } from '../../../../shared/assets/icons/home/shoppingBagDrawer.svg';
import { useAppDispatch, useAppSelector } from '@src/modules/shared/store';
import { hideDrawer } from '@src/modules/customer/data/drawerSlice';
import {
  addToCart,
  deleteFromCart,
  getCart,
} from '@src/modules/customer/data/cartThunk';
import Button from '@src/modules/shared/components/Button/Button';
import { useNavigate } from 'react-router-dom';

const TheDrawer: React.FC = () => {
  const [Loading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector((state) => state.cart.token);
  const isDrawerShown = useAppSelector((state) => state.drawer.isDrawerShown);
  const myCartItemsNumber: any = useAppSelector(
    (state) => state.cart.cartItems
  );
  const totalPrice = useAppSelector((state) => state.cart.cartAmount);
  const cart = useAppSelector((state) => state.cart.cart);

  const onClose = () => {
    dispatch(hideDrawer());
  };
  return (
    <Drawer
      title={
        <>
          <ShoppingBagIcon
            style={{ marginRight: '6px', transform: 'translate(0,4px)' }}
          />
          {` ${myCartItemsNumber} ${myCartItemsNumber == 1 ? 'item' : 'items'}`}
        </>
      }
      onClose={onClose}
      open={isDrawerShown}
    >
      <section className="items-section">
        {cart.map((item, index) => {
          return (
            <div key={index} className="cart-item">
              <div className="buttons">
                <div
                  className="add-to-cart"
                  onClick={async () => {
                    if (Loading) return;
                    setIsLoading(true);
                    Promise.all([
                      await dispatch(
                        addToCart({
                          quantity: item?.quantity + 1,
                          productId: item?.product.id + '',
                        })
                      ),
                      dispatch(getCart(accessToken)),
                    ]);
                    setIsLoading(false);
                  }}
                >
                  <AddToCart></AddToCart>
                </div>
                <p className="quantity">{item?.quantity}</p>
                {item.quantity > 1 ? (
                  <div
                    className="remove-from-cart"
                    onClick={async () => {
                      if (Loading) return;
                      setIsLoading(true);
                      Promise.all([
                        await dispatch(
                          addToCart({
                            quantity: item?.quantity - 1,
                            productId: item?.product?.id + '',
                          })
                        ),
                        dispatch(getCart(accessToken)),
                      ]);
                      setIsLoading(false);
                    }}
                  >
                    <RemoveFromCart></RemoveFromCart>
                  </div>
                ) : (
                  <div className="remove-from-cart-disabled">
                    <RemoveFromCartDisabled></RemoveFromCartDisabled>
                  </div>
                )}
              </div>
              <img
                src={
                  item?.product.images.length &&
                  JSON.parse(item?.product?.images)
                }
                className="product-image-drawer"
              />
              <div className="cart-item-details">
                <p className="product-name-drawer" key={index}>
                  {item?.product.name}
                </p>
                <p className="pricing-details">{`$${item?.product?.price.toFixed(
                  2
                )} x ${item.quantity} `}</p>
                <p className="total-price">
                  ${(item?.product?.price * item.quantity).toFixed(2)}
                </p>
              </div>
              <div
                className="delete-from-cart"
                onClick={async () => {
                  Promise.all([
                    await dispatch(deleteFromCart(item?.product?.id)),
                    dispatch(getCart(accessToken)),
                  ]);
                }}
              >
                <DeleteFromCart></DeleteFromCart>
              </div>
            </div>
          );
        })}
      </section>
      <Button
        size="xl"
        style={{ maxWidth: '340px', width: '100%', marginTop: '48px' }}
        label={`Checkout Now ($${totalPrice.toFixed(2)})`}
        onClick={() => {
          dispatch(hideDrawer());
          navigate('/checkout');
        }}
      />
    </Drawer>
  );
};

export default TheDrawer;
