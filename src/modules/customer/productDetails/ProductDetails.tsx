import { BASE_URL } from '@src/modules/auth/data/authThunk';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState({
    id: 0,
    name: '',
    image: '',
    rating: '',
    price: '',
  });
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

  return <div>{product[0]?.name}</div>;
}

export default ProductDetails;
