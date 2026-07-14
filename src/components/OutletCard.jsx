import { Link } from 'react-router-dom';
import { FiMapPin, FiClock, FiPhone } from 'react-icons/fi';

export default function OutletCard({ outlet }) {
  return (
    <div className="card">
      <img
        src={outlet.image || 'https://images.unsplash.com/photo-1604335398980-ed72c30a1c67?w=500'}
        alt={outlet.name}
        className="w-full h-44 object-cover"
      />
      <div className="p-5">
        <h3 className="font-display font-semibold text-ink mb-2">{outlet.name}</h3>
        <p className="text-xs uppercase tracking-wide text-primary-600 font-semibold mb-3">{outlet.city}</p>
        <p className="text-sm text-slate-500 flex items-center gap-2 mb-1">
          <FiMapPin className="shrink-0 text-primary-500" /> {outlet.address}
        </p>
        <p className="text-sm text-slate-500 flex items-center gap-2 mb-1">
          <FiClock className="shrink-0 text-primary-500" /> {outlet.openTime} - {outlet.closeTime}
        </p>
        <p className="text-sm text-slate-500 flex items-center gap-2 mb-4">
          <FiPhone className="shrink-0 text-primary-500" /> {outlet.phone}
        </p>
        <Link to={`/outlet/${outlet.slug}`} className="btn-outline w-full text-sm py-2">
          Lihat Detail
        </Link>
      </div>
    </div>
  );
}
