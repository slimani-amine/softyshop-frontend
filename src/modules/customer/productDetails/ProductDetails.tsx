import Button from '@src/modules/shared/components/Button/Button';
import { useAppDispatch, useAppSelector } from '@src/modules/shared/store';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { addToCart, getCart } from '@src/modules/customer/data/cartThunk';
import { ReactComponent as AddToCart } from '../../shared/assets/icons/home/add-product-details.svg';
import { ReactComponent as RemoveFromCart } from '../../shared/assets/icons/home/removeProductDetails.svg';
import { BASE_URL } from '@src/modules/auth/data/authThunk';

// import { addToCart } from '../data/cartSlice';

function ProductDetails() {
  const dispatch = useAppDispatch();
  // const FAKE_URL = 'http://localhost:3001/products';
  const { productId } = useParams();
  // const products = useAppSelector((state) => state.product.products);

  const [isInStock, setIsInStock] = useState(false);
  const [product, setProduct] = useState({
    id: 0,
    name: '',
    images: '',
    rating: '',
    price: 0,
    brand: { id: 0, name: '' },
    category: { id: 0, name: '' },
    store: { id: 0, name: '' },
    availability: false,
    stockNumber: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await fetch(`${fake_URL}`);
        const response = await fetch(
          `${BASE_URL}api/products/${productId}`
          // `${BASE_URL}api/products?id=${productId}`
        );

        const data = await response.json();
        console.log('🚀 ~ fetchData ~ data.data.docs:', data.data);
        setProduct(data.data);
        // console.log(data.data.docs);
      } catch (err: string | unknown) {
        console.log(err);
        return err;
      }
    };

    fetchData();
  }, [BASE_URL]);

  const images = product.images.length && JSON.parse(product?.images);
  console.log('🚀 ~ ProductDetails ~ product:', product);

  const [loading, setIsLoading] = useState(false);
  const cart = useAppSelector((state) => state.cart.cart);

  const [quantity, setQuantity] = useState<number>(0);

  useEffect(
    function () {
      setQuantity(
        cart?.find((item: any) => item.product.id == product.id)?.quantity || 0
      );
    },
    [setQuantity, cart]
  );

  async function handleAddToCart() {
    console.log(quantity);
    setIsLoading(true);
    Promise.all([
      await dispatch(
        addToCart({ quantity: quantity + 1, productId: product.id + '' })
      ),
      dispatch(getCart()),
    ]);
    setIsLoading(false);
  }

  async function handleRemoveFromCart() {
    console.log(quantity);
    if (quantity < 1) return;
    setIsLoading(true);
    Promise.all([
      await dispatch(
        addToCart({ quantity: quantity - 1, productId: product.id + '' })
      ),
      dispatch(getCart()),
    ]);
    setIsLoading(false);
  }

  useEffect(() => {
    setIsInStock(product?.availability && product?.stockNumber != 0);
  }, [isInStock, setIsInStock, product]);

  return (
    <div className="product-details" id="product-details">
      <div className="image-wrapper">
        <img width={400} height={400} className="" src={images} alt="" />
      </div>
      <div className="product-info">
        <h1 className="product-name">{product.name}</h1>
        <div className="brand-and-category">
          <p className="brand">
            <span className="brand-title">Publisher:</span>{' '}
            {product?.brand?.name}
          </p>
          <p className="brand">
            <span className="brand-title">category:</span>{' '}
            {product?.category?.name}
          </p>
        </div>

        {/* <p className='rate'>product.rate</p> */}

        <h2 className="price">${product.price}</h2>
        <p className="stock">
          {isInStock
            ? `Stock Available: (${product?.stockNumber} ${
                product?.stockNumber == 1 ? 'book' : 'books'
              }  remaining)`
            : 'Out of Stock'}
        </p>
        {/* 'primary' | 'info' | 'success' | 'danger' | 'warning' | 'dark' | 'secondary' | 'light' */}
        {quantity == 0 && (
          <Button
            style={
              isInStock
                ? { width: '160px' }
                : { width: '160px', cursor: 'not-allowed' }
            }
            size="lg"
            variant={isInStock ? 'primary' : 'secondary'}
            onClick={handleAddToCart}
            disabled={loading}
            label={'Add To Cart'}
          />
        )}
        {quantity > 0 && (
          <div className="buttons-product-details">
            <RemoveFromCart
              className="add-product-details"
              onClick={() => {
                handleRemoveFromCart();
              }}
            />
            <p className="quantity">
              {quantity <= 9 ? `0${quantity}` : quantity}
            </p>
            <AddToCart
              onClick={() => {
                handleAddToCart();
              }}
              className="add-product-details"
            />
          </div>
        )}

        <p className="store">
          <span className="store-title">Sold By:</span> {product?.store?.name}
        </p>
      </div>
    </div>
  );
}

export default ProductDetails;
