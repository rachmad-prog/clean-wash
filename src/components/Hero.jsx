import { useFetch } from '../hooks/useFetch';
import { getBanners } from '../services/contentService';
import { FiTruck, FiTag, FiZap } from 'react-icons/fi';
import Reveal from './Reveal';
import HeroPickupForm from './HeroPickupForm';

export default function Hero() {
  const { data: banners } = useFetch(() => getBanners({ slot: 'hero' }), []);
  const banner = banners?.[0];

  return (
    <section className="relative bg-gradient-to-b from-primary-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-28 grid md:grid-cols-2 gap-10 items-center">
        <Reveal direction="left" duration={800}>
          <span className="eyebrow">#1 Laundry Terpercaya</span>
          <h1 className="heading-pop text-4xl md:text-5xl leading-tight mb-5">
            {banner?.title || 'Laundry Bersih, Wangi, & Tepat Waktu'}
          </h1>
          <p className="text-slate-600 mb-8 text-lg max-w-md">
            {banner?.subtitle || 'Solusi laundry terpercaya untuk keluarga Anda, dengan puluhan outlet siap melayani setiap hari.'}
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#reservasi" className="btn-primary">
              {banner?.button || 'Pesan Sekarang'}
            </a>
            <a href="/outlet" className="btn-outline">Cari Outlet Terdekat</a>
          </div>
        </Reveal>

        <Reveal direction="right" duration={800} delay={150} className="relative">
          <div className="relative">
            <img
              src={banner?.image || 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=800'}
              alt="Laundry service"
              className="rounded-3xl shadow-card w-full object-cover aspect-square md:aspect-[4/3]"
            />
            <div className="badge-pill absolute top-2 left-2 sm:-top-4 sm:-left-4 max-w-[180px] sm:max-w-[210px]">
              <span className="badge-icon bg-primary-500"><FiTruck /></span>
              <span className="text-sm font-semibold text-ink">Pickup dalam 30 menit</span>
            </div>
            <div className="badge-pill absolute top-1/2 -translate-y-1/2 right-2 sm:-right-4 max-w-[180px] sm:max-w-[210px]">
              <span className="badge-icon bg-sun-500"><FiTag /></span>
              <span className="text-sm font-semibold text-ink">Harga mulai dari IDR 8.000</span>
            </div>
            <div className="badge-pill absolute bottom-2 left-2 sm:-bottom-4 sm:left-6 max-w-[180px] sm:max-w-[210px]">
              <span className="badge-icon bg-plum-500"><FiZap /></span>
              <span className="text-sm font-semibold text-ink">Express 3 jam selesai</span>
            </div>
          </div>
        </Reveal>
      </div>

      <div id="reservasi" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10 scroll-mt-24">
        <Reveal direction="up" duration={700}>
          <HeroPickupForm />
        </Reveal>
      </div>
    </section>
  );
}
