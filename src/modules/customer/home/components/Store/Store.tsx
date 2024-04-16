// import { useState } from 'react';
// import { ReactComponent as AddToCart } from '../../../../shared/assets/icons/home/addToCart.svg';
// import { ReactComponent as View } from '../../../../shared/assets/icons/home/view.svg';
// import { ReactComponent as Wish } from '../../../../shared/assets/icons/home/wish.svg';
// import { ReactComponent as Facebook } from '../../../../shared/assets/icons/home/facebook.svg';
// import { ReactComponent as Instagram } from '../../../../shared/assets/icons/customerLayout/Footer/instagram.svg';
import { Link } from 'react-router-dom';

function Store({
  id,
  name,
  logo,
 
}: {
  id: number;
  name: string;
  logo: string;
  phoneNumber: number;
  isPublished: number;
  location: string;
  address: string;
  socialMediaLinks: string;
}) {
  // const [showIcons, setShowIcons] = useState(false);

  return (
    <div className="card">
      <Link to={`${id}`}>
        <div className="image-wrapper">
          <img width={336.75} height={336.75} src={logo} className="image" />
        </div>

        <div className="product-info-and-buttons">
          <div className="store-info">
            <p className="name"> {name}</p>
            <div className="contacts"></div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Store;
