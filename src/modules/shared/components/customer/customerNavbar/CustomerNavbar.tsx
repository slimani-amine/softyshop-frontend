import chevronDownGray from '../../../assets/icons/customerLayout/Navbar/chevron-down-gray.svg';
import chevronDownBlack from '../../../assets/icons/customerLayout/Navbar/chevron-down-black.svg';
import chevronRightBlack from '../../../assets/icons/customerLayout/Navbar/chevron-right-black.svg';
import categoriesIcon from '../../../assets/icons/customerLayout/Navbar/categories-icon.svg';

function CustomerNavbar() {
  return (
    <div className="customer-navbar">
      {/* <img src={chevronDownBlack} alt="" /> */}
      <img src={categoriesIcon} alt="" />
      <img src={chevronRightBlack} alt="" />
      <img src={chevronDownGray} height="20px" alt="" />
    </div>
  );
}

export default CustomerNavbar;
