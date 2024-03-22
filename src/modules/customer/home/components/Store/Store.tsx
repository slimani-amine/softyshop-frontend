import { useState } from 'react';
import { ReactComponent as AddToCart } from '../../../../shared/assets/icons/home/addToCart.svg';
import { ReactComponent as View } from '../../../../shared/assets/icons/home/view.svg';
import { ReactComponent as Wish } from '../../../../shared/assets/icons/home/wish.svg';
import { ReactComponent as Facebook } from '../../../../shared/assets/icons/home/facebook.svg';
import { ReactComponent as Instagram } from '../../../../shared/assets/icons/customerLayout/Footer/instagram.svg';
import { Link } from 'react-router-dom';

function Store({
  id,
  name,
  logo,
  phoneNumber,
  isPublished,
  location,
  address,
  socialMediaLinks,
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
  const [showIcons, setShowIcons] = useState(false);

  return (
    <Link to={`${id}`}>
      <div
        onMouseEnter={() => setShowIcons(true)}
        onMouseLeave={() => setShowIcons(false)}
        className="card"
      >
        <img width={336.75} height={336.75} src={logo} className="image" />
        {/* {showIcons && (
          <>
            <View className="icons view" />
            <Wish className="icons wish" />
          </>
        )} */}
        <div className="product-info-and-buttons">
          <div className="store-info">
            <p className="name"> {name}</p>
            {/* <div className="address">
            <p className="address-title">Location:</p> {address}
          </div> */}
            <div className="contacts">
              <p className="phone-number">Phone Number: {phoneNumber}</p>
              {/* <Facebook /> */}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Store;
