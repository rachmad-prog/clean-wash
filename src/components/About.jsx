import Reveal from './Reveal';

export default function About() {
  return (
    <section className="section grid md:grid-cols-2 gap-12 items-center">
      <Reveal direction="left" duration={800} className="relative">
        <img
          src="https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=800"
          alt="Tentang kami"
          className="rounded-3xl shadow-card w-full object-cover aspect-[4/3]"
        />
        <div className="absolute -bottom-6 -right-6 bg-primary-600 text-white rounded-2xl shadow-pill px-6 py-4 text-center">
          <p className="font-display text-2xl font-bold leading-none">10+</p>
          <p className="text-xs mt-1 opacity-90">Tahun Pengalaman</p>
        </div>
      </Reveal>
      <Reveal direction="right" duration={800} delay={150}>
        <span className="eyebrow">Company Profile</span>
        <h2 className="section-title">Laundry Bersih, Wangi, Higienis & Tepat Waktu</h2>
        <p className="text-slate-600 mb-4">
          CleanWash adalah layanan laundry kiloan dan satuan. Kami adalah tim profesional yang selalu
          mengutamakan kualitas cucian & pelayanan dengan prinsip bersih, rapi, wangi, higienis, dan tepat waktu.
        </p>
        <p className="text-slate-600">
          Kami melayani laundry untuk perusahaan, kos, asrama, pesantren, sekolah, hingga perusahaan konveksi.
          Hubungi kami untuk penawaran harga khusus dengan kontrak berlangganan.
        </p>
      </Reveal>
    </section>
  );
}
