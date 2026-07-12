import { useMemo, useState } from 'react';
import { useFetch } from '../../hooks/useFetch';
import { getOutlets } from '../../services/outletService';
import OutletCard from '../../components/OutletCard';
import OutletFilter from '../../components/OutletFilter';

export default function Outlet() {
  const { data: outlets, loading } = useFetch(getOutlets, []);
  const [city, setCity] = useState('');

  const cities = useMemo(() => [...new Set((outlets || []).map((o) => o.city))], [outlets]);
  const filtered = useMemo(
    () => (city ? outlets?.filter((o) => o.city === city) : outlets),
    [outlets, city]
  );

  return (
    <div>
      <div className="bg-primary-50 py-16 text-center">
        <h1 className="text-4xl font-extrabold text-slate-800">Temukan Outlet Terdekat</h1>
        <p className="text-slate-500 mt-3">Kami hadir di berbagai kota untuk melayani Anda</p>
      </div>

      <section className="section">
        {!loading && <OutletFilter cities={cities} selectedCity={city} onChange={setCity} />}
        {loading ? (
          <p className="text-center text-slate-400">Memuat outlet...</p>
        ) : filtered?.length ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((o) => <OutletCard key={o.id} outlet={o} />)}
          </div>
        ) : (
          <p className="text-center text-slate-400">Belum ada outlet di kota ini.</p>
        )}
      </section>
    </div>
  );
}
