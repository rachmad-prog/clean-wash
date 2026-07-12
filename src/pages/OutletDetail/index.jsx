import { useParams, Link } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import { getOutletBySlug } from '../../services/outletService';
import { FiMapPin, FiClock, FiPhone } from 'react-icons/fi';

export default function OutletDetail() {
  const { slug } = useParams();
  const { data: outlet, loading, error } = useFetch(() => getOutletBySlug(slug), [slug]);

  if (loading) return <p className="section text-center text-slate-400">Memuat...</p>;
  if (error || !outlet) return <p className="section text-center text-slate-400">Outlet tidak ditemukan.</p>;

  return (
    <div className="section max-w-4xl">
      <img src={outlet.image || 'https://images.unsplash.com/photo-1604335398980-ed72c30a1c67?w=900'} alt={outlet.name} className="rounded-2xl w-full h-72 object-cover mb-8" />
      <h1 className="text-3xl font-extrabold text-slate-800 mb-4">{outlet.name}</h1>
      <div className="space-y-3 text-slate-600 mb-8">
        <p className="flex items-center gap-2"><FiMapPin /> {outlet.address}, {outlet.city}</p>
        <p className="flex items-center gap-2"><FiClock /> {outlet.openTime} - {outlet.closeTime}</p>
        <p className="flex items-center gap-2"><FiPhone /> {outlet.phone}</p>
      </div>
      {outlet.latitude && outlet.longitude && (
        <iframe
          title="map"
          className="w-full h-80 rounded-2xl border-0 mb-8"
          src={`https://maps.google.com/maps?q=${outlet.latitude},${outlet.longitude}&z=15&output=embed`}
        />
      )}
      <Link to="/jadwal-penjemputan" className="btn-primary">Jadwalkan Penjemputan di Outlet Ini</Link>
    </div>
  );
}
