import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function TrackingForm() {
  const [invoice, setInvoice] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!invoice.trim()) {
      toast.error('Masukkan nomor invoice terlebih dahulu');
      return;
    }
    navigate(`/tracking?invoice=${encodeURIComponent(invoice.trim())}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
      <input
        type="text"
        placeholder="Masukkan nomor invoice, contoh: INV-20260101-0001"
        value={invoice}
        onChange={(e) => setInvoice(e.target.value)}
        className="input"
      />
      <button type="submit" className="btn-primary shrink-0">Lacak</button>
    </form>
  );
}
