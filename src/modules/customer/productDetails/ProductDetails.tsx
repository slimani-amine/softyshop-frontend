import { BASE_URL } from '@src/modules/auth/data/authThunk';
import Button from '@src/modules/shared/components/Button/Button';
import { useAppDispatch, useAppSelector } from '@src/modules/shared/store';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { addToCart, getCart } from '@src/modules/customer/data/cartThunk';

// import { addToCart } from '../data/cartSlice';

function ProductDetails() {
  const dispatch = useAppDispatch();
  const { productId } = useParams();

  const [product, setProduct] = useState([
    {
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
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await fetch(`${fake_URL}`);
        const response = await fetch(
          // `${BASE_URL}api/products?search=id:${productId}`
          `${BASE_URL}api/products?id=${productId}`
        );
        const data = await response.json();
        setProduct(data.data.docs);
        // console.log(data.data.docs);
      } catch (err: string | unknown) {
        console.log(err);
        return err;
      }
    };

    fetchData();
  }, [BASE_URL]);
  const theProduct = product[0];

  const images = theProduct.images.length && JSON.parse(theProduct?.images);

  const [loading, setIsLoading] = useState(false);
  const cart = useAppSelector((state) => state.cart.cart);

  async function handleAddToCart() {
    const quantity: any = cart?.find(
      (item: any) => item.product.id == theProduct.id
    )?.quantity;
    console.log(quantity);
    setIsLoading(true);
    Promise.all([
      await dispatch(
        addToCart({ quantity: quantity + 1, productId: theProduct.id + '' })
      ),
      dispatch(getCart()),
    ]);
    setIsLoading(false);
  }

  return (
    <>
      <div className="product-details">
        <div className="image-wrapper">
          <img width={400} height={400} className="" src={images[0]} alt="" />
        </div>
        <div className="product-info">
          <h1 className="product-name">{theProduct.name}</h1>
          <div className="brand-and-category">
            <p className="brand">
              <span className="brand-title">Brand:</span>{' '}
              {theProduct?.brand?.name}
            </p>
            <p className="brand">
              <span className="brand-title">category:</span>{' '}
              {theProduct?.category?.name}
            </p>
          </div>

          {/* <p className='rate'>theProduct.rate</p> */}

          <h2 className="price">${theProduct.price}</h2>
          <p className="stock">
            Stock{' '}
            {theProduct?.availability
              ? `Available: (${theProduct?.stockNumber} ${
                  theProduct?.stockNumber == 1 ? 'book' : 'books'
                }  remaining)`
              : 'Unavailable'}
          </p>
          <Button
            onClick={handleAddToCart}
            disabled={loading}
            label={'Add To Cart'}
          />
          <p className="store">
            <span className="store-title">Sold By:</span>{' '}
            {theProduct?.store?.name}
          </p>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;
