import { Link } from "react-router-dom";

function CustomerNavbar() {
  return (
    <div className="customer-navbar">
      <div className="navigation-elements">
        <Link to="/home">Home</Link>
        <Link to="/bookstores">Stores</Link>
        <Link to="/dashboard">Workspace</Link>
      </div>
    </div>
  );
}

export default CustomerNavbar;
