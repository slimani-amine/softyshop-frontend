import Header from "../../components/customer/customerHeader/Header";
import Sidebar from "../../components/customer/customerSidebar/Sidebar";
import Footer from "../../components/customer/customerFooter/Footer";
import { useLocation } from "react-router-dom";

interface MainLayoutProps {
  children: React.ReactNode;
}

function CustomerLayout({ children }: MainLayoutProps) {
  const { pathname } = useLocation();
  const hideSidebar = pathname === "/checkout";
  const hideFooter = pathname === "/checkout";

  return (
    <div className="customer-layout">
      <div className="header-and-nav">
        <div className="header-container">
          <Header />
        </div>
      </div>
      <div className="sidebar-and-outlet">
        {(
          <div className="sidebar-container">
            <Sidebar />
          </div>
        )}
        <div className="outlet">{children}</div>
      </div>
      { (
        <div className="footer-container">
          <Footer />
        </div>
      )}
    </div>
  );
}

export default CustomerLayout;
