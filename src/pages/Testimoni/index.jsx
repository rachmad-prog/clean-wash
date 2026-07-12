import { useFetch } from '../../hooks/useFetch';
import { getTestimonials } from '../../services/contentService';
import { FiStar } from 'react-icons/fi';

export default function Testimoni() {
  const { data: testimonials, loading } = useFetch(getTestimonials, []);

  return (
    <div>
      <div className="bg-primary-50 py-16 text-center">
        <h1 className="text-4xl font-extrabold text-slate-800">Testimoni Pelanggan</h1>
        <p className="text-slate-500 mt-3">Apa kata mereka tentang layanan kami</p>
      </div>
      <section className="section">
        {loading ? (
          <p className="text-center text-slate-400">Memuat...</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials?.map((t) => (
              <div key={t.id} className="card p-6">
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={t.photo || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(t.customer)}
                    alt={t.customer}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-slate-800">{t.customer}</p>
                    <div className="flex text-yellow-400 text-sm">
                      {Array.from({ length: t.rating }).map((_, i) => <FiStar key={i} fill="currentColor" />)}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-slate-600">{t.review}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
