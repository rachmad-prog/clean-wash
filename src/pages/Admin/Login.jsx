import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { adminLogin } from '../../services/authService';
import { useAuth } from '../../hooks/useAuth';

export default function Login() {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm();
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      const data = await adminLogin(values);
      setAuth(data);
      toast.success('Login berhasil');
      navigate('/admin');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login gagal');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm">
        <h1 className="text-2xl font-extrabold text-slate-800 mb-1">CleanWash Admin</h1>
        <p className="text-sm text-slate-500 mb-6">Masuk ke dashboard admin</p>

        <div className="mb-4">
          <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
          <input type="email" className="input" {...register('email', { required: true })} placeholder="admin@laundry.com" />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
          <input type="password" className="input" {...register('password', { required: true })} placeholder="••••••••" />
        </div>
        <button type="submit" disabled={isSubmitting} className="btn-primary w-full">
          {isSubmitting ? 'Memproses...' : 'Masuk'}
        </button>
      </form>
    </div>
  );
}
