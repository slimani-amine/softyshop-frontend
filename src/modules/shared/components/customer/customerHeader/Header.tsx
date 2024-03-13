import ShoppingBagIcon from '../../../assets/icons/customerLayout/shoppingBag.svg';
import ProfileIcon from '../../../assets/icons/customerLayout/profileIcon.svg';
import MagnifyingGlass from '../../../assets/icons/customerLayout/MagnifyingGlass.svg';

function Header() {
  return (
    <div className="header">
      <img src={ShoppingBagIcon} alt="" />
      <img src={ProfileIcon} alt="" />
      <img src={MagnifyingGlass} alt="" />
      {/* <ShoppingBagIcon />
      <ProfileIcon />
      <MagnifyingGlass /> */}
    </div>
  );
}

export default Header;
