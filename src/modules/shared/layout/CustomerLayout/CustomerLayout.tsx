import { useLocation } from "react-router-dom";
import Header from "../../components/customerLayout/customerHeader/Header";
import CustomerNavbar from "../../components/customerLayout/customerNavbar/CustomerNavbar";
import Sidebar from "../../components/customerLayout/customerSidebar/Sidebar";
import Footer from "../../components/customerLayout/customerFooter/Footer";



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
