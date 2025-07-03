import Footer from '@/components/shared/Footer';
import Navbar from '@/components/shared/Navbar';
import { Outlet } from 'react-router';

export default function Root() {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
