import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FiShield, FiHeadphones, FiSettings, FiTrendingUp } from 'react-icons/fi';
import { createPartnership } from '../../services/contentService';
import Reveal from '../../components/Reveal';

const BENEFITS = [
  {
    icon: FiShield,
    title: 'Brand Terpercaya',
    desc: 'Bermitra dengan merek yang sudah dikenal dan dipercaya pelanggan, memberikan Anda keuntungan kompetitif di pasar.',
  },
  {
    icon: FiHeadphones,
    title: 'Dukungan Penuh',
    desc: 'Kami menyediakan pelatihan operasional dan strategi pemasaran lengkap untuk membantu bisnis Anda sukses.',
  },
  {
    icon: FiSettings,
    title: 'Manajemen Mudah',
    desc: 'Nikmati kemudahan pengelolaan bisnis dengan sistem manajemen terintegrasi yang efisien.',
  },
  {
    icon: FiTrendingUp,
    title: 'Potensi ROI Cepat',
    desc: 'Model bisnis yang terbukti memungkinkan Anda meraih pengembalian investasi dalam waktu singkat.',
  },
];

export default function Partnership() {
  const formRef = useRef(null);
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const onSubmit = async (values) => {
    try {
      await createPartnership(values);
      toast.success('Pengajuan kemitraan berhasil dikirim!');
      reset();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Gagal mengirim pengajuan');
    }
  };

  return (
    <div>
      <div className="bg-primary-50 py-16 text-center">
        <h1 className="font-display text-4xl font-bold text-ink">Kemitraan</h1>
        <p className="text-slate-500 mt-3">Bergabunglah menjadi mitra outlet CleanWash di kota Anda</p>
      </div>

      {/* Info: Bisnis Laundry yang bikin Happy */}
      <section className="section grid md:grid-cols-2 gap-12 items-center">
        <Reveal direction="left" duration={800}>
          <img
            src="https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=800"
            alt="Outlet CleanWash"
            className="rounded-3xl shadow-card w-full object-cover aspect-[4/3]"
          />
        </Reveal>
        <Reveal direction="right" duration={800} delay={150}>
          <h2 className="section-title">Bisnis Laundry yang Bikin Happy</h2>
          <p className="text-slate-600 mb-4">
            CleanWash memiliki pengalaman yang luas dan reputasi yang kuat di industri laundry. Dengan sistem
            yang sudah teruji, brand yang terpercaya, dan dukungan penuh dari tim kami, Anda dapat menjalani
            bisnis laundry dengan percaya diri.
          </p>
          <p className="text-slate-600">
            Bergabung dengan kami berarti Anda berinvestasi dalam bisnis yang sudah terbukti sukses.
          </p>
        </Reveal>
      </section>

      {/* Keuntungan Bermitra */}
      <section className="section">
        <Reveal direction="up" className="text-center max-w-2xl mx-auto mb-12">
          <span className="eyebrow">Keuntungan</span>
          <h2 className="section-title">Keuntungan Bermitra dengan CleanWash</h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {BENEFITS.map((b, i) => (
            <Reveal key={b.title} direction="zoom" delay={i * 100} className="card p-6 text-center">
              <div className="w-12 h-12 rounded-xl bg-primary-500 text-white flex items-center justify-center mb-4 text-xl mx-auto">
                <b.icon />
              </div>
              <h3 className="font-display font-semibold text-ink mb-2">{b.title}</h3>
              <p className="text-sm text-slate-500">{b.desc}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA: Tertarik Menjadi Mitra? */}
      <section className="section">
        <Reveal direction="zoom" duration={700} className="bg-primary-50 rounded-3xl px-8 py-14 text-center border border-primary-100">
          <h2 className="section-title">Tertarik Menjadi Mitra?</h2>
          <p className="mb-8 text-slate-600 max-w-xl mx-auto">
            Jangan lewatkan kesempatan untuk menjadi bagian dari CleanWash. Hubungi kami hari ini dan mulailah
            langkah pertama menuju kesuksesan!
          </p>
          <button onClick={scrollToForm} className="btn-primary">
            Daftar Mitra
          </button>
        </Reveal>
      </section>

      {/* Form */}
      <section ref={formRef} className="section max-w-2xl scroll-mt-24">
        <Reveal direction="up" className="text-center max-w-2xl mx-auto mb-8">
          <span className="eyebrow">Formulir</span>
          <h2 className="section-title">Ajukan Kemitraan</h2>
          <p className="text-slate-500">Lengkapi data berikut, tim kami akan segera menghubungi Anda.</p>
        </Reveal>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 bg-white shadow-lg rounded-2xl p-8">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Nama Lengkap</label>
            <input className="input" {...register('fullname', { required: true })} />
            {errors.fullname && <p className="text-red-500 text-xs mt-1">Wajib diisi</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Nomor HP</label>
            <input className="input" {...register('phone', { required: true })} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <input type="email" className="input" {...register('email', { required: true })} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Kota</label>
            <input className="input" {...register('city', { required: true })} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Rencana Modal</label>
            <select className="input" {...register('capital', { required: true })}>
              <option value="">-- Pilih Range Modal --</option>
              <option value="< 50 Juta">&lt; 50 Juta</option>
              <option value="50-100 Juta">50-100 Juta</option>
              <option value="> 100 Juta">&gt; 100 Juta</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Pesan (opsional)</label>
            <textarea className="input" rows={3} {...register('message')} />
          </div>
          <button type="submit" disabled={isSubmitting} className="btn-primary w-full">
            {isSubmitting ? 'Mengirim...' : 'Ajukan Kemitraan'}
          </button>
        </form>
      </section>
    </div>
  );
}
