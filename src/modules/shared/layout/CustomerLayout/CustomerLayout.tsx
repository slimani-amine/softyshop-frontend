import { useLocation } from "react-router-dom";
import Footer from "../../components/customer/customerFooter/Footer";
import Header from "../../components/customer/customerHeader/Header";
import Sidebar from "../../components/customer/customerSidebar/Sidebar";
import CustomerNavbar from "../../components/customer/customerNavbar/CustomerNavbar";

interface MainLayoutProps {
  children: React.ReactNode;
}

function CustomerLayout({ children }: MainLayoutProps) {
  const { pathname } = useLocation();
  return (
    <div className="customer-layout">
      <div className="header-and-nav">
        <div className="header-container">
          <Header />
        </div>
        <div className="nav-container">
          <CustomerNavbar />
        </div>
      </div>
      <div className="sidebar-and-outlet">
        {pathname === "/checkout" || pathname === "/my-profile" ? (
          <div></div>
        ) : (
          <div className="sidebar-container">
            <Sidebar />
          </div>
        )}
        <div className="outlet">{children}</div>
      </div>

      {pathname == "/checkout" ? (
        <div></div>
      ) : (
        <div className="footer-container">
          <Footer />
        </div>
      )}
    </div>
  );
}

export default CustomerLayout;
