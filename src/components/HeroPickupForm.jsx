import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FiTruck } from 'react-icons/fi';
import { useFetch } from '../hooks/useFetch';
import { getOutlets } from '../services/outletService';
import { getServices } from '../services/serviceService';
import { createOrder } from '../services/orderService';

export default function HeroPickupForm() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();
  const { data: outlets } = useFetch(getOutlets, []);
  const { data: services } = useFetch(getServices, []);
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      const payload = {
        customerName: values.customerName,
        phone: values.phone,
        notes: values.address,
        outletId: values.outletId,
        serviceId: values.serviceId,
        pickupTime: values.pickupDate && values.pickupHour ? `${values.pickupDate}T${values.pickupHour}` : undefined,
      };
      const order = await createOrder(payload);
      toast.success(`Reservasi berhasil! No. Invoice: ${order.invoice}`);
      reset();
      navigate(`/tracking?invoice=${order.invoice}`);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Gagal membuat reservasi');
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-card p-6 sm:p-8">
      <h3 className="section-title text-2xl mb-5">Reservasi Laundry</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="grid sm:grid-cols-3 gap-4">
        <div className="sm:col-span-1">
          <input className="input" placeholder="Nama" {...register('customerName', { required: true })} />
          {errors.customerName && <p className="text-red-500 text-xs mt-1">Nama wajib diisi</p>}
        </div>
        <div className="sm:col-span-1">
          <input className="input" placeholder="Alamat" {...register('address', { required: true })} />
          {errors.address && <p className="text-red-500 text-xs mt-1">Alamat wajib diisi</p>}
        </div>
        <div className="sm:col-span-1">
          <input className="input" placeholder="Whatsapp" {...register('phone', { required: true })} />
          {errors.phone && <p className="text-red-500 text-xs mt-1">Whatsapp wajib diisi</p>}
        </div>

        <div className="sm:col-span-1">
          <select className="input" {...register('outletId', { required: true })}>
            <option value="">Pilih Outlet</option>
            {outlets?.map((o) => <option key={o.id} value={o.id}>{o.name}</option>)}
          </select>
        </div>
        <div className="sm:col-span-1">
          <select className="input" {...register('serviceId', { required: true })}>
            <option value="">Pilih Layanan</option>
            {services?.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
        </div>
        <div className="sm:col-span-1 grid grid-cols-2 gap-2">
          <input type="date" className="input" {...register('pickupDate')} />
          <input type="time" className="input" {...register('pickupHour')} />
        </div>

        <button type="submit" disabled={isSubmitting} className="btn-primary sm:col-span-3 justify-center">
          <FiTruck /> {isSubmitting ? 'Mengirim...' : 'Pickup Now'}
        </button>
      </form>
    </div>
  );
}
