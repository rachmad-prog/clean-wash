import { Link } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { getBanners } from '../services/contentService';
import Reveal from './Reveal';

export default function Hero() {
  const { data: banners } = useFetch(getBanners, []);
  const banner = banners?.[0];

  return (
    <section className="relative bg-gradient-to-br from-primary-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid md:grid-cols-2 gap-10 items-center">
        <Reveal direction="left" duration={800}>
          <span className="inline-block bg-primary-100 text-primary-600 text-xs font-semibold px-3 py-1 rounded-full mb-4">
            #1 Laundry Terpercaya
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 leading-tight mb-5">
            {banner?.title || 'Laundry Bersih, Wangi, Cepat'}
          </h1>
          <p className="text-slate-600 mb-8 text-lg">
            {banner?.subtitle || 'Solusi laundry terpercaya untuk keluarga Anda, dengan puluhan outlet siap melayani.'}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/jadwal-penjemputan" className="btn-primary">
              {banner?.button || 'Pesan Sekarang'}
            </Link>
            <Link to="/outlet" className="btn-outline">Cari Outlet Terdekat</Link>
          </div>
        </Reveal>
        <Reveal direction="right" duration={800} delay={150} className="relative">
          <img
            src={banner?.image || 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=800'}
            alt="Laundry service"
            className="rounded-3xl shadow-2xl w-full object-cover aspect-square md:aspect-[4/3]"
          />
        </Reveal>
      </div>
    </section>
  );
}
