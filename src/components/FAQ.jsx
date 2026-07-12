import { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { useFetch } from '../hooks/useFetch';
import { getFaqs } from '../services/contentService';
import Reveal from './Reveal';

export default function FAQ() {
  const { data: faqs, loading } = useFetch(getFaqs, []);
  const [openId, setOpenId] = useState(null);

  return (
    <section className="section max-w-3xl">
      <Reveal direction="up" className="text-center mb-12">
        <h2 className="section-title">Pertanyaan Umum</h2>
        <p className="text-slate-500">Temukan jawaban dari pertanyaan yang sering diajukan.</p>
      </Reveal>

      {loading ? (
        <p className="text-center text-slate-400">Memuat...</p>
      ) : (
        <div className="space-y-3">
          {faqs?.map((faq, i) => (
            <Reveal key={faq.id} direction={i % 2 === 0 ? 'left' : 'right'} delay={i * 60} className="border border-slate-200 rounded-xl overflow-hidden">
              <button
                className="w-full flex items-center justify-between px-5 py-4 text-left font-medium text-slate-800"
                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
              >
                {faq.question}
                <FiChevronDown className={`transition-transform ${openId === faq.id ? 'rotate-180' : ''}`} />
              </button>
              {openId === faq.id && (
                <div className="px-5 pb-4 text-sm text-slate-500">{faq.answer}</div>
              )}
            </Reveal>
          ))}
        </div>
      )}
    </section>
  );
}
