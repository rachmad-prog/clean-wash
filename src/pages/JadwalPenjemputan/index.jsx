import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useFetch } from '../../hooks/useFetch';
import { getOutlets } from '../../services/outletService';
import { getServices } from '../../services/serviceService';
import { createOrder } from '../../services/orderService';
import { useNavigate } from 'react-router-dom';

export default function JadwalPenjemputan() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();
  const { data: outlets } = useFetch(getOutlets, []);
  const { data: services } = useFetch(getServices, []);
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      const order = await createOrder(values);
      toast.success(`Pesanan berhasil dibuat! No. Invoice: ${order.invoice}`);
      reset();
      navigate(`/tracking?invoice=${order.invoice}`);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Gagal membuat pesanan');
    }
  };

  return (
    <div>
      <div className="bg-primary-50 py-16 text-center">
        <h1 className="text-4xl font-extrabold text-slate-800">Jadwal Penjemputan</h1>
        <p className="text-slate-500 mt-3">Isi form di bawah untuk menjadwalkan penjemputan cucian Anda</p>
      </div>

      <section className="section max-w-2xl">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 bg-white shadow-lg rounded-2xl p-8">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Nama Lengkap</label>
            <input className="input" {...register('customerName', { required: true })} placeholder="Nama Anda" />
            {errors.customerName && <p className="text-red-500 text-xs mt-1">Nama wajib diisi</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Nomor HP</label>
            <input className="input" {...register('phone', { required: true })} placeholder="08xxxxxxxxxx" />
            {errors.phone && <p className="text-red-500 text-xs mt-1">Nomor HP wajib diisi</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email (opsional)</label>
            <input type="email" className="input" {...register('email')} placeholder="email@example.com" />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Pilih Outlet</label>
            <select className="input" {...register('outletId', { required: true })}>
              <option value="">-- Pilih Outlet --</option>
              {outlets?.map((o) => <option key={o.id} value={o.id}>{o.name} - {o.city}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Pilih Layanan</label>
            <select className="input" {...register('serviceId', { required: true })}>
              <option value="">-- Pilih Layanan --</option>
              {services?.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Waktu Penjemputan</label>
            <input type="datetime-local" className="input" {...register('pickupTime')} />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Catatan (opsional)</label>
            <textarea className="input" rows={3} {...register('notes')} placeholder="Contoh: alamat lengkap, patokan, dll." />
          </div>

          <button type="submit" disabled={isSubmitting} className="btn-primary w-full">
            {isSubmitting ? 'Mengirim...' : 'Jadwalkan Sekarang'}
          </button>
        </form>
      </section>
    </div>
  );
}
