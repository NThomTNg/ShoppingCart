import React, { ReactNode } from 'react';
import FooterOverlay from './FooterOverlay';

interface LayoutProps {
  children?: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <div className="app-container">
    <main>{children}</main>
    <FooterOverlay />
  </div>
);

export default Layout;