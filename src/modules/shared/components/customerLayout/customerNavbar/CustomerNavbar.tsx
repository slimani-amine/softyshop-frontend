import { Link } from 'react-router-dom';

function CustomerNavbar() {
  return (
    <div className="customer-navbar">
      <div className="navigation-elements">
        <Link to="/home">Home</Link>
        <Link to="/bookstores" className="all-customer-books">
          Bookstores
        </Link>
      </div>
    </div>
  );
}

export default CustomerNavbar;
