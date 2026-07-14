import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AccessDisabled from '../components/AccessDisabled';
import { useFetch } from '../hooks/useFetch';
import { getSiteStatus } from '../services/contentService';

export default function MainLayout() {
  const { data: status, loading } = useFetch(getSiteStatus, []);

  // While checking, render nothing to avoid a flash of content that might get locked.
  if (loading) return null;

  if (status && status.active === false) {
    return <AccessDisabled expiresAt={status.expiresAt} />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
