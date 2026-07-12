import { Link } from 'react-router-dom';
import Reveal from './Reveal';

export default function CTA() {
  return (
    <section className="section">
      <Reveal direction="zoom" duration={700} className="bg-primary-500 rounded-3xl px-8 py-14 text-center text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Siap Coba Layanan Kami?</h2>
        <p className="mb-8 text-primary-50 max-w-xl mx-auto">
          Jadwalkan penjemputan sekarang dan rasakan kemudahan laundry tanpa ribet.
        </p>
        <Link to="/jadwal-penjemputan" className="inline-block bg-white text-primary-600 font-semibold px-8 py-3 rounded-full hover:bg-primary-50 transition-colors">
          Jadwalkan Penjemputan
        </Link>
      </Reveal>
    </section>
  );
}
