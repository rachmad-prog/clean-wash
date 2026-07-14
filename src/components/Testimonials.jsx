import { FiStar } from 'react-icons/fi';
import { useFetch } from '../hooks/useFetch';
import { getTestimonials } from '../services/contentService';
import Reveal from './Reveal';

export default function Testimonials() {
  const { data: testimonials, loading } = useFetch(getTestimonials, []);
  const list = testimonials?.slice(0, 3);

  if (!loading && !list?.length) return null;

  return (
    <section className="section bg-primary-50/60 rounded-3xl">
      <Reveal direction="up" className="text-center max-w-2xl mx-auto mb-12">
        <span className="eyebrow">Testimoni</span>
        <h2 className="section-title">Apa Kata Pelanggan Setia Kami?</h2>
      </Reveal>

      {loading ? (
        <p className="text-center text-slate-400">Memuat testimoni...</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((t, i) => (
            <Reveal key={t.id} direction="up" delay={i * 100} className="card p-6">
              <div className="flex text-sun-500 text-sm mb-3">
                {Array.from({ length: t.rating || 5 }).map((_, idx) => <FiStar key={idx} fill="currentColor" />)}
              </div>
              <p className="text-sm text-slate-600 mb-5">{t.review}</p>
              <div className="flex items-center gap-3">
                <img
                  src={t.photo || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(t.customer)}
                  alt={t.customer}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <p className="font-display font-semibold text-ink text-sm">{t.customer}</p>
              </div>
            </Reveal>
          ))}
        </div>
      )}
    </section>
  );
}
