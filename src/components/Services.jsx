import { useFetch } from '../hooks/useFetch';
import { getServices } from '../services/serviceService';
import { formatCurrency } from '../utils/formatCurrency';
import Reveal from './Reveal';

export default function Services() {
  const { data: services, loading } = useFetch(getServices, []);

  return (
    <section className="section">
      <Reveal direction="up" className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="section-title">Layanan Kami</h2>
        <p className="text-slate-500">Berbagai pilihan layanan laundry sesuai kebutuhan Anda.</p>
      </Reveal>

      {loading ? (
        <p className="text-center text-slate-400">Memuat layanan...</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services?.map((service, i) => (
            <Reveal key={service.id} direction="up" delay={i * 100} className="card p-6 text-center">
              <img
                src={service.image || 'https://images.unsplash.com/photo-1489274495757-95c7c837b101?w=400'}
                alt={service.name}
                className="w-20 h-20 object-cover rounded-full mx-auto mb-4"
              />
              <h3 className="font-semibold text-slate-800 mb-1">{service.name}</h3>
              <p className="text-primary-600 font-bold mb-1">{formatCurrency(service.price)}</p>
              <p className="text-xs text-slate-400">Estimasi: {service.duration}</p>
            </Reveal>
          ))}
        </div>
      )}
    </section>
  );
}
