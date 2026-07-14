import Services from '../../components/Services';

export default function Layanan() {
  return (
    <div>
      <div className="bg-primary-50 py-16 text-center">
        <h1 className="font-display text-4xl font-bold text-ink">Layanan Kami</h1>
        <p className="text-slate-500 mt-3">Pilihan layanan laundry sesuai kebutuhan Anda</p>
      </div>
      <Services />
    </div>
  );
}
