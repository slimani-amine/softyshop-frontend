import { BASE_URL } from '@src/modules/auth/data/authThunk';
import Button from '@src/modules/shared/components/Button/Button';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState([
    {
      id: 0,
      name: '',
      image: '',
      rating: '',
      price: 0,
      brand_id: 0,
      category_id: 0,
      availability: 0,
      store_id: 0,
      stockNumber: 0,
    },
  ]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await fetch(`${fake_URL}`);
        const response = await fetch(
          `${BASE_URL}api/products?search=id:${productId}`
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
  console.log(theProduct);

  return (
    <>
      <div className="product-details">
        <div className="image-wrapper">
          <img
            width={400}
            height={400}
            className=""
            src={theProduct.image}
            alt=""
          />
        </div>
        <div className="product-info">
          <h1 className="product-name">{theProduct.name}</h1>
          <div className="brand-and-category">
            <p className="brand">
              <span className="brand-title">Brand:</span> {theProduct.brand_id}
            </p>
            <p className="brand">
              <span className="brand-title">category:</span>{' '}
              {theProduct.category_id}
            </p>
          </div>

          {/* <p className='rate'>theProduct.rate</p> */}

          <h2 className="price">${theProduct.price}</h2>
          <p className="stock">
            Stock {theProduct.availability === 1 ? 'Available' : 'Unavailable'}:{' '}
            {theProduct.availability === 1 &&
              `${theProduct.stockNumber} Books Remaining`}
          </p>
          <Button label={'Add To Cart'} />
          <p className="store">
            <span className="store-title">Sold By:</span> {theProduct.store_id}{' '}
          </p>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;
