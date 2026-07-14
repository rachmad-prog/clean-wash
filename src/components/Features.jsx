import { FiAward, FiUsers, FiTruck, FiCreditCard } from 'react-icons/fi';
import Reveal from './Reveal';

const FEATURES = [
  { icon: FiAward, title: 'Merk Terpercaya', desc: 'Dipercaya ribuan pelanggan dengan reputasi kualitas cucian bersih, wangi, dan profesional.', accent: 'bg-primary-500' },
  { icon: FiUsers, title: 'Tim Profesional', desc: 'Layanan ditangani tim berdedikasi dan berpengalaman dalam menangani berbagai jenis kain.', accent: 'bg-sun-500' },
  { icon: FiTruck, title: 'Express 3 Jam Selesai', desc: 'Untuk kebutuhan mendesak, kami hadir dengan layanan express tanpa mengurangi kualitas.', accent: 'bg-plum-500' },
  { icon: FiCreditCard, title: 'Pembayaran Mudah', desc: 'Bayar dengan berbagai metode: tunai, transfer bank, QRIS, hingga dompet digital.', accent: 'bg-primary-600' },
];

export default function Features() {
  return (
    <section className="section">
      <Reveal direction="up" className="text-center max-w-2xl mx-auto mb-12">
        <span className="eyebrow">Kenapa Kami</span>
        <h2 className="section-title">Mengapa Harus CleanWash?</h2>
      </Reveal>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {FEATURES.map((f, i) => (
          <Reveal key={f.title} direction="zoom" delay={i * 100} className="card p-6">
            <div className={`w-12 h-12 rounded-xl ${f.accent} text-white flex items-center justify-center mb-4 text-xl`}>
              <f.icon />
            </div>
            <h3 className="font-display font-semibold text-ink mb-2">{f.title}</h3>
            <p className="text-sm text-slate-500">{f.desc}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
