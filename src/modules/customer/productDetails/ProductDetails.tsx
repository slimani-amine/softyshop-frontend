import Button from "@src/modules/shared/components/Button/Button";
import { useAppDispatch, useAppSelector } from "@src/modules/shared/store";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addToCart, getCart } from "@src/modules/customer/data/cartThunk";
import { ReactComponent as AddToCart } from "../../shared/assets/icons/home/add-product-details.svg";
import { ReactComponent as RemoveFromCart } from "../../shared/assets/icons/home/removeProductDetails.svg";
import { BASE_URL } from "@src/modules/auth/data/authThunk";

function ProductDetails() {
  const dispatch = useAppDispatch();
  const { productId } = useParams();
  const cart = useAppSelector((state) => state.cart.cart);
  const accessToken = useAppSelector((state) => state.cart.token);

  const [loading, setIsLoading] = useState(false);
  const [quantity, setQuantity] = useState<number>(0);
  const [isInStock, setIsInStock] = useState(false);
  const [product, setProduct] = useState({
    id: 0,
    name: "",
    images: "",
    rating: "",
    price: 0,
    brand: { id: 0, name: "" },
    category: { id: 0, name: "" },
    store: { id: 0, name: "" },
    availability: false,
    stockNumber: 0,
  });
  const images = product?.images?.length && JSON.parse(product?.images);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}api/products/${productId}`);
        const data = await response.json();
        setProduct(data.data);
      } catch (err: string | unknown) {
        console.error(err);
        return err;
      }
    };

    fetchData();
  }, [BASE_URL]);

  useEffect(
    function () {
      setQuantity(
        cart?.find((item: any) => item?.product?.id == product?.id)?.quantity ||
          0
      );
    },
    [setQuantity, cart]
  );

  async function handleAddToCart() {
    setIsLoading(true);
    Promise.all([
      await dispatch(
        addToCart({ quantity: quantity + 1, productId: product?.id + "" })
      ),
      dispatch(getCart(accessToken)),
    ]);
    setIsLoading(false);
  }

  async function handleRemoveFromCart() {
    if (quantity < 1) return;
    setIsLoading(true);
    Promise.all([
      await dispatch(
        addToCart({ quantity: quantity - 1, productId: product?.id + "" })
      ),
      dispatch(getCart(accessToken)),
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
            <span className="brand-title">Publisher:</span>{" "}
            {product?.brand?.name}
          </p>
          <p className="brand">
            <span className="brand-title">category:</span>{" "}
            {product?.category?.name}
          </p>
        </div>

        {/* <p className='rate'>product.rate</p> */}

        <h2 className="price">${product.price.toFixed(2)}</h2>
        <p className="stock">
          {isInStock ? (
            `Stock Available: (${product?.stockNumber} ${
              product?.stockNumber == 1 ? "book" : "books"
            }  remaining)`
          ) : (
            <strong className="out-of-stock">Out of Stock</strong>
          )}
        </p>
        {/* 'primary' | 'info' | 'success' | 'danger' | 'warning' | 'dark' | 'secondary' | 'light' */}
        {quantity == 0 && (
          <Button
            style={{ width: "160px" }}
            size="lg"
            variant={isInStock ? "primary" : "secondary"}
            onClick={handleAddToCart}
            disabled={loading || !isInStock}
            label={"Add To Cart"}
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
