'use client';

import { useState, useRef, type FormEvent } from 'react';

interface FormState {
  status: 'idle' | 'loading' | 'success' | 'error';
  message: string;
}

export default function ContactForm() {
  const [state, setState] = useState<FormState>({ status: 'idle', message: '' });
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState({ status: 'loading', message: '' });

    const formData = new FormData(e.currentTarget);
    const data = {
      name: (formData.get('name') as string).trim(),
      email: (formData.get('email') as string).trim(),
      subject: (formData.get('subject') as string).trim(),
      message: (formData.get('message') as string).trim(),
    };

    // Basic validation
    if (!data.name || !data.email || !data.message) {
      setState({ status: 'error', message: 'Lütfen tüm zorunlu alanları doldurun.' });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      setState({ status: 'error', message: 'Geçerli bir e-posta adresi girin.' });
      return;
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setState({ status: 'success', message: 'Mesajınız alındı. En kısa sürede geri döneceğiz!' });
        formRef.current?.reset();
      } else {
        const err = await res.json().catch(() => ({}));
        setState({ status: 'error', message: (err as { message?: string }).message ?? 'Bir hata oluştu, lütfen tekrar deneyin.' });
      }
    } catch {
      setState({ status: 'error', message: 'İnternet bağlantınızı kontrol edin ve tekrar deneyin.' });
    }
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="rounded-2xl border border-slate-200 bg-white p-8 shadow-glass"
      noValidate
      aria-label="İletişim Formu"
    >
      <h2 className="mb-6 text-2xl font-extrabold text-slate-800">Bize Yazın</h2>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-[13px] font-semibold text-slate-700">
            Ad Soyad <span aria-hidden="true" className="text-orange-DEFAULT">*</span>
          </label>
          <input
            id="name" name="name" type="text" required autoComplete="name"
            placeholder="Adınız Soyadınız"
            className="w-full rounded-md border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-300 focus:border-orange-DEFAULT focus:ring-2 focus:ring-orange-soft"
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-[13px] font-semibold text-slate-700">
            E-posta <span aria-hidden="true" className="text-orange-DEFAULT">*</span>
          </label>
          <input
            id="email" name="email" type="email" required autoComplete="email"
            placeholder="ornek@email.com"
            className="w-full rounded-md border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-300 focus:border-orange-DEFAULT focus:ring-2 focus:ring-orange-soft"
          />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="subject" className="mb-1.5 block text-[13px] font-semibold text-slate-700">Konu</label>
        <select
          id="subject" name="subject"
          className="w-full rounded-md border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition-all focus:border-orange-DEFAULT focus:ring-2 focus:ring-orange-soft"
        >
          <option value="">Konu seçin (opsiyonel)</option>
          <option value="Üyelik">Üyelik Bilgisi</option>
          <option value="Etkinlik">Etkinlik Sorusu</option>
          <option value="İş Birliği">Kurumsal İş Birliği</option>
          <option value="Teknik">Teknik Soru</option>
          <option value="Genel">Genel</option>
        </select>
      </div>

      <div className="mt-5">
        <label htmlFor="message" className="mb-1.5 block text-[13px] font-semibold text-slate-700">
          Mesajınız <span aria-hidden="true" className="text-orange-DEFAULT">*</span>
        </label>
        <textarea
          id="message" name="message" rows={5} required
          placeholder="Mesajınızı buraya yazın..."
          className="w-full resize-none rounded-md border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-300 focus:border-orange-DEFAULT focus:ring-2 focus:ring-orange-soft"
        />
      </div>

      {/* Status message */}
      {state.message && (
        <div
          role="alert"
          aria-live="polite"
          className={`mt-4 rounded-md p-4 text-sm font-medium ${
            state.status === 'success'
              ? 'border border-green-200 bg-green-50 text-green-700'
              : 'border border-red-200 bg-red-50 text-red-700'
          }`}
        >
          {state.message}
        </div>
      )}

      <button
        type="submit"
        disabled={state.status === 'loading'}
        className="mt-6 flex w-full items-center justify-center gap-2.5 rounded-md bg-orange-DEFAULT py-4 text-[15px] font-bold text-white transition-all hover:bg-orange-vibrant disabled:cursor-not-allowed disabled:opacity-60"
      >
        {state.status === 'loading' ? (
          <>
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/>
              <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/>
              <line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/>
              <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/>
            </svg>
            Gönderiliyor...
          </>
        ) : (
          'Mesajı Gönder'
        )}
      </button>
    </form>
  );
}
