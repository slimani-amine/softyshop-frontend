import Product from '../components/Product';
import glasses from '../../../shared/assets/images/Home/Rayban.png';

function Home() {
  const name: string = 'Say Ban Black';
  const image: string = glasses;
  const rating: string = '3';
  const price: number = 180;

  return (
    <div className="home">
      <Product name={name} rating={rating} price={price} image={image} />
      <Product name={name} rating={rating} price={price} image={image} />
      <Product name={name} rating={rating} price={price} image={image} />
      <Product name={name} rating={rating} price={price} image={image} />
      <Product name={name} rating={rating} price={price} image={image} />
      <Product name={name} rating={rating} price={price} image={image} />
      <Product name={name} rating={rating} price={price} image={image} />
      <Product name={name} rating={rating} price={price} image={image} />
      <Product name={name} rating={rating} price={price} image={image} />
    </div>
  );
}

export default Home;
