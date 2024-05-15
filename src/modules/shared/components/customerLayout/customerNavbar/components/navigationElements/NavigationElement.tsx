import { ReactComponent as ChevronDownGray } from '../../../../../assets/icons/customerLayout/Navbar/chevron-down-gray.svg';

function navigationElement({ children }: any) {
  return (
    <div className="nav-el">
      {children}
      <ChevronDownGray />
    </div>
  );
}

export default navigationElement;
