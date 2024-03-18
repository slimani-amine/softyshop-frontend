import { ReactComponent as AddToCart } from '../../../shared/assets/icons/addToCart.svg';

function Product({
  name,
  rating,
  price,
  image,
}: {
  name: string;
  rating: string;
  price: number;
  image: string;
}) {
  return (
    <div className="card">
      <img width={336.75} height={336.75} src={image} className="image" />
      <div className="product-info-and-buttons">
        <div className="product-info">
          <p className="name"> {name}</p>
          <div>
            <img
              className="rating"
              src={`/src/modules/shared/assets/icons/customerLayout/Sidebar/${rating}-stars.png`}
            />
          </div>
          <p className="price"> ${price}.00</p>
        </div>
        <div className="buttons">
          <AddToCart className="add" />
        </div>
      </div>
    </div>
  );
}

export default Product;
