import { FiClock, FiShield, FiTruck, FiSmile } from 'react-icons/fi';
import Reveal from './Reveal';

const FEATURES = [
  { icon: FiClock, title: 'Proses Cepat', desc: 'Pengerjaan mulai dari 6 jam hingga 2 hari.' },
  { icon: FiShield, title: 'Terjamin Aman', desc: 'Pakaian ditangani dengan hati-hati & higienis.' },
  { icon: FiTruck, title: 'Antar Jemput Gratis', desc: 'Layanan pickup & delivery tanpa biaya tambahan.' },
  { icon: FiSmile, title: 'Pelanggan Puas', desc: 'Rating rata-rata 4.8/5 dari ribuan ulasan.' },
];

export default function Features() {
  return (
    <section className="section bg-slate-50 rounded-3xl">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {FEATURES.map((f, i) => (
          <Reveal key={f.title} direction="zoom" delay={i * 120} className="text-center">
            <div className="w-14 h-14 rounded-2xl bg-primary-500 text-white flex items-center justify-center mx-auto mb-4 text-2xl">
              <f.icon />
            </div>
            <h3 className="font-semibold text-slate-800 mb-1">{f.title}</h3>
            <p className="text-sm text-slate-500">{f.desc}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
