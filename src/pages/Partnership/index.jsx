import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { createPartnership } from '../../services/contentService';

export default function Partnership() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();

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

      <section className="section max-w-2xl">
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
