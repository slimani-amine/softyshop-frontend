import { ReactComponent as ShoppingBagIcon1 } from '../../../assets/icons/customerLayout/Header/shoppingBag.svg';

import { ReactComponent as ProfileIcon1 } from '../../../assets/icons/customerLayout/Header/profileIcon.svg';
import { ReactComponent as MagnifyingGlass1 } from '../../../assets/icons/customerLayout/Header/MagnifyingGlass.svg';
import Logo from '../../../assets/icons/customerLayout/Header/logo-complete.svg';
function Header() {
  return (
    <div className="header">
      <div className="logo-wrapper">
        <img src={Logo} alt="" />
      </div>
      <MagnifyingGlass1 />
      <div className="icons">
        <div className="profile-icon-wrapper">
          <ProfileIcon1 className="profile-icon" />
        </div>
        <div className="shopping-bag-icon-wrapper">
          <ShoppingBagIcon1 className="shopping-bag-icon" />
        </div>

        <span className="cart-items-number">
          <p>3</p>
        </span>
      </div>
    </div>
  );
}

export default Header;
