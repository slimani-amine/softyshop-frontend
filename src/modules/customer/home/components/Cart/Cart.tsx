import React, { useState } from 'react';
import { Drawer } from 'antd';
import { ReactComponent as AddToCart } from '../../../../shared/assets/icons/home/addToCartDrawer.svg';
import { ReactComponent as RemoveFromCart } from '../../../../shared/assets/icons/home/removeFromCartDrawer.svg';
import { ReactComponent as RemoveFromCartDisabled } from '../../../../shared/assets/icons/home/disabledTest.svg';
import { ReactComponent as DeleteFromCart } from '../../../../shared/assets/icons/home/deleteFromCart.svg';
import { ReactComponent as ShoppingBagIcon } from '../../../../shared/assets/icons/home/shoppingBagDrawer.svg';
import { useAppDispatch, useAppSelector } from '@src/modules/shared/store';
import { hideDrawer } from '@src/modules/customer/data/drawerSlice';
import { addToCart, getCart } from '@src/modules/customer/data/cartThunk';

const TheDrawer: React.FC = () => {
  const [Loading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const isDrawerShown = useAppSelector((state) => state.drawer.isDrawerShown);
  const myCartItemsNumber: any = useAppSelector(
    (state) => state.cart.cartItems
  );
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
      {cart.map((item, index) => (
        <div key={index} className="cart-item">
          <div aria-disabled={!Loading} className="buttons">
            <div
              className="add-to-cart"
              onClick={async () => {
                setIsLoading(true);
                Promise.all([
                  await dispatch(
                    addToCart({
                      quantity: item.quantity + 1,
                      productId: item.product.id + '',
                    })
                  ),
                  dispatch(getCart()),
                ]);
                setIsLoading(false);
              }}
            >
              <AddToCart></AddToCart>
            </div>
            <p className="quantity">{item.quantity}</p>
            {item.quantity > 1 ? (
              <div
                className="remove-from-cart"
                onClick={async () => {
                  setIsLoading(true);
                  Promise.all([
                    await dispatch(
                      addToCart({
                        quantity: item.quantity - 1,
                        productId: item.product.id + '',
                      })
                    ),
                    dispatch(getCart()),
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
            src={item.product.images.length && JSON.parse(item.product.images)}
            className="product-image-drawer"
          />
          <div className="cart-item-details">
            <p className="product-name-drawer" key={index}>
              {item.product.name}
            </p>
            <p className="pricing-details">{`$${item.product.price.toFixed(
              2
            )} x ${item.quantity} `}</p>
            <p className="total-price">
              ${(item.product.price * item.quantity).toFixed(2)}
            </p>
          </div>
          <div className="delete-from-cart">
            <DeleteFromCart></DeleteFromCart>
          </div>
        </div>
      ))}
    </Drawer>
  );
};

export default TheDrawer;
