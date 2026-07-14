import { useFetch } from "../hooks/useFetch";
import { getServices } from "../services/serviceService";
import { formatCurrency } from "../utils/formatCurrency";
import Reveal from "./Reveal";

const ACCENTS = ["bg-primary-500", "bg-sun-500", "bg-plum-500"];

export default function Services() {
  const { data: services, loading } = useFetch(getServices, []);

  return (
    <section className="section">
      <Reveal direction="up" className="text-center max-w-2xl mx-auto mb-12">
        <span className="eyebrow">Pilihan Layanan</span>
        <h2 className="section-title">Layanan Kami</h2>
        <p className="text-slate-500">
          Berbagai pilihan layanan laundry sesuai kebutuhan Anda.
        </p>
      </Reveal>

      {loading ? (
        <p className="text-center text-slate-400">Memuat layanan...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {services?.map((service, i) => (
            <Reveal
              key={service.id}
              direction="up"
              delay={i * 90}
              className="card p-3 sm:p-6 text-center border-2 border-transparent hover:border-primary-200">
              <div
                className={`w-14 h-14 sm:w-20 sm:h-20 rounded-2xl mx-auto mb-3 sm:mb-4 overflow-hidden ${ACCENTS[i % ACCENTS.length]}/10 flex items-center justify-center`}>
                <img
                  src={
                    service.image ||
                    "https://images.unsplash.com/photo-1489274495757-95c7c837b101?w=400"
                  }
                  alt={service.name}
                  className="w-10 h-10 sm:w-14 sm:h-14 object-cover rounded-xl"
                />
              </div>
              <h3 className="font-display font-semibold text-ink mb-1 text-sm sm:text-base">
                {service.name}
              </h3>
              <p className="text-primary-600 font-bold mb-1 text-sm sm:text-base">
                {formatCurrency(service.price)}
              </p>
              <p className="text-xs text-slate-400">
                Estimasi: {service.duration}
              </p>
            </Reveal>
          ))}
        </div>
      )}
    </section>
  );
}
