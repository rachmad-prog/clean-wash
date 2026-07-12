import Reveal from './Reveal';

export default function About() {
  return (
    <section className="section grid md:grid-cols-2 gap-12 items-center">
      <Reveal direction="left" duration={800}>
        <img
          src="https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=800"
          alt="Tentang kami"
          className="rounded-3xl shadow-lg w-full object-cover aspect-[4/3]"
        />
      </Reveal>
      <Reveal direction="right" duration={800} delay={150}>
        <h2 className="section-title">Tentang CleanWash</h2>
        <p className="text-slate-600 mb-4">
          Sejak berdiri, CleanWash berkomitmen menghadirkan layanan laundry yang cepat, bersih, dan terjangkau
          bagi masyarakat perkotaan yang sibuk. Kami telah melayani ribuan pelanggan di berbagai kota melalui
          jaringan outlet mitra kami.
        </p>
        <p className="text-slate-600">
          Dengan teknologi pelacakan pesanan real-time dan tim profesional, kami memastikan pakaian Anda
          ditangani dengan standar kualitas terbaik.
        </p>
      </Reveal>
    </section>
  );
}
