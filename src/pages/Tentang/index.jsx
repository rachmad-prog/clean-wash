import About from '../../components/About';
import Features from '../../components/Features';

export default function Tentang() {
  return (
    <div>
      <div className="bg-primary-50 py-16 text-center">
        <h1 className="text-4xl font-extrabold text-slate-800">Tentang Kami</h1>
        <p className="text-slate-500 mt-3">Mengenal lebih dekat CleanWash Laundry</p>
      </div>
      <About />
      <Features />
    </div>
  );
}
