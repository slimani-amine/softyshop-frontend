interface MainLayoutProps {
  children: React.ReactNode;
}

const GuestLayout = ({ children }: MainLayoutProps) => {
  return <div className="guest-layout">{children}</div>;
};

export default GuestLayout;
