import { Link } from 'react-router-dom';
import Reveal from './Reveal';
import AnimatedTruck from './AnimatedTruck';
import { useFetch } from '../hooks/useFetch';
import { getBanners } from '../services/contentService';

const PAYMENT_METHODS = ['GoPay', 'OVO', 'DANA', 'ShopeePay', 'QRIS', 'BCA', 'Mandiri', 'BRI'];

export default function CTA() {
  const { data: pickupBanners } = useFetch(() => getBanners({ slot: 'pickup' }), []);
  const pickupImage = pickupBanners?.[0]?.image;

  return (
    <>
      <section className="bg-primary-600 text-white overflow-hidden">
        <div className="section grid md:grid-cols-2 gap-10 items-center">
          <Reveal direction="left" duration={700}>
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-3">
              Antar Jemput — Maksimal 30 Menit Dipickup
            </h2>
            <p className="text-primary-50 max-w-md">
              Kenyamanan Anda prioritas kami. Layanan antar-jemput gratis dengan waktu penjemputan maksimal
              30 menit setelah Anda melakukan pemesanan.
            </p>
          </Reveal>
          <Reveal direction="right" duration={700} delay={150} className="flex justify-center md:justify-end">
            {pickupImage ? (
              <img
                src={pickupImage}
                alt="Ilustrasi antar jemput"
                className="w-48 h-48 rounded-3xl bg-white/15 object-contain p-4"
              />
            ) : (
              <AnimatedTruck />
            )}
          </Reveal>
        </div>
      </section>

      <section className="section text-center">
        <Reveal direction="up" className="max-w-2xl mx-auto mb-8">
          <span className="eyebrow">Metode Pembayaran</span>
          <h2 className="section-title">
            Bayar Laundry, Semudah Bilang{' '}
            <span className="text-primary-500">&ldquo;Terima Kasih&rdquo;</span>
          </h2>
        </Reveal>
        <div className="flex flex-wrap justify-center gap-4">
          {PAYMENT_METHODS.map((m) => (
            <span key={m} className="px-5 py-3 rounded-2xl border border-slate-200 shadow-sm font-display font-semibold text-ink text-sm">
              {m}
            </span>
          ))}
        </div>
      </section>

      <section className="section">
        <Reveal direction="zoom" duration={700} className="bg-primary-50 rounded-3xl px-8 py-14 text-center border border-primary-100">
          <h2 className="section-title">Cucian di Rumah Sudah Numpuk?</h2>
          <p className="mb-8 text-slate-600 max-w-xl mx-auto">
            Jadwalkan penjemputan sekarang dan rasakan kemudahan laundry tanpa ribet.
          </p>
          <Link to="/jadwal-penjemputan" className="btn-primary">
            Jadwalkan Penjemputan
          </Link>
        </Reveal>
      </section>
    </>
  );
}
