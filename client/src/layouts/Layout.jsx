import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ImageSlider from '../components/ImageSlider';

function Layout() {
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen bg-background text-text">
      <Navbar />
      {pathname === '/' && <ImageSlider />}
      <main className="relative overflow-hidden">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
