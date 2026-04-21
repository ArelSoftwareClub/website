'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import Link from 'next/link';
import { toast } from 'sonner';

const DEPARTMENTS = [
  'Bilgisayar Mühendisliği',
  'Yazılım Mühendisliği',
  'Yönetim Bilişim Sistemleri',
  'Elektrik-Elektronik Mühendisliği',
  'Endüstri Mühendisliği',
  'Dijital Oyun Tasarımı',
  'Matematik-Bilgisayar',
  'Grafik Tasarım',
  'Diğer',
] as const;

const YEARS = ['Hazırlık', '1. Sınıf', '2. Sınıf', '3. Sınıf', '4. Sınıf', 'Mezun'] as const;

const INTERESTS = [
  { id: 'web', label: 'Web Geliştirme', icon: '🌐' },
  { id: 'ai', label: 'Yapay Zeka / ML', icon: '🤖' },
  { id: 'mobile', label: 'Mobil Uygulama', icon: '📱' },
  { id: 'cyber', label: 'Siber Güvenlik', icon: '🛡️' },
  { id: 'design', label: 'UI/UX Tasarım', icon: '🎨' },
  { id: 'game', label: 'Oyun Geliştirme', icon: '🎮' },
] as const;

export default function KayitPage() {
  const { register, isLoading } = useAuth();
  
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    department: '',
    year: '',
    interests: [] as string[],
    motivation: '',
    kvkkConsent: false,
  });
  const [showPassword, setShowPassword] = useState(false);

  const canGoNext = step === 1 
    ? form.name && form.email && form.password && form.confirmPassword && form.password === form.confirmPassword
    : step === 2
    ? form.department && form.year
    : true;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step < 3) {
      setStep(step + 1);
      return;
    }

    const result = await register({
      name: form.name,
      email: form.email,
      password: form.password,
      department: form.department,
      year: form.year,
      interests: form.interests,
      motivation: form.motivation,
      kvkkConsent: form.kvkkConsent,
    });

    if (!result.success) {
      toast.error(result.error || 'Kayıt başarısız');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 px-4 py-12">
      <div className="w-full max-w-lg">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-3 mb-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-xl font-black text-white shadow-lg shadow-blue-500/30">
            A
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black uppercase tracking-tight text-white">
              AREL YAZILIM
            </span>
            <span className="text-xs font-semibold tracking-widest text-slate-400">
              SOFTWARE CLUB
            </span>
          </div>
        </Link>

        {/* Progress */}
        <div className="mb-6 flex gap-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-1.5 flex-1 rounded-full bg-slate-700">
              <div
                className={`h-full rounded-full transition-all duration-300 ${
                  i <= step ? 'bg-blue-500' : 'bg-transparent'
                }`}
                style={{ width: i <= step ? '100%' : '0%' }}
              />
            </div>
          ))}
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-slate-700/50 bg-slate-800/50 p-8 shadow-2xl backdrop-blur-xl">
          <div className="mb-6 text-center">
            <h1 className="mb-2 text-2xl font-black text-white">
              {step === 1 && 'Hesap Oluştur'}
              {step === 2 && 'Akademik Bilgiler'}
              {step === 3 && 'Son Adım'}
            </h1>
            <p className="text-sm text-slate-400">
              {step === 1 && 'Kişisel bilgilerinizi girin'}
              {step === 2 && 'Üniversite bilgilerinizi girin'}
              {step === 3 && 'İlgi alanlarınızı seçin'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Step 1: Account */}
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Ad Soyad
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Adınız Soyadınız"
                    required
                    className="w-full rounded-xl border border-slate-600 bg-slate-700/50 px-4 py-3.5 text-white placeholder-slate-500 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                    E-posta
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="ornek@ogr.istanbularel.edu.tr"
                    required
                    className="w-full rounded-xl border border-slate-600 bg-slate-700/50 px-4 py-3.5 text-white placeholder-slate-500 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Şifre
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={form.password}
                      onChange={(e) => setForm({ ...form, password: e.target.value })}
                      placeholder="••••••••"
                      required
                      minLength={6}
                      className="w-full rounded-xl border border-slate-600 bg-slate-700/50 px-4 py-3.5 pr-12 text-white placeholder-slate-500 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-white"
                    >
                      {showPassword ? '🙈' : '👁️'}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Şifre Tekrar
                  </label>
                  <input
                    type="password"
                    value={form.confirmPassword}
                    onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                    placeholder="••••••••"
                    required
                    className="w-full rounded-xl border border-slate-600 bg-slate-700/50 px-4 py-3.5 text-white placeholder-slate-500 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                  {form.confirmPassword && form.password !== form.confirmPassword && (
                    <p className="mt-1 text-xs text-red-400">Şifreler eşleşmiyor</p>
                  )}
                </div>
              </div>
            )}

            {/* Step 2: Academic */}
            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Bölüm
                  </label>
                  <select
                    value={form.department}
                    onChange={(e) => setForm({ ...form, department: e.target.value })}
                    required
                    className="w-full rounded-xl border border-slate-600 bg-slate-700/50 px-4 py-3.5 text-white outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  >
                    <option value="" className="bg-slate-800">Bölümünüzü seçin</option>
                    {DEPARTMENTS.map((d) => (
                      <option key={d} value={d} className="bg-slate-800">{d}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Sınıf
                  </label>
                  <select
                    value={form.year}
                    onChange={(e) => setForm({ ...form, year: e.target.value })}
                    required
                    className="w-full rounded-xl border border-slate-600 bg-slate-700/50 px-4 py-3.5 text-white outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  >
                    <option value="" className="bg-slate-800">Sınıfınızı seçin</option>
                    {YEARS.map((y) => (
                      <option key={y} value={y} className="bg-slate-800">{y}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Step 3: Interests & Motivation */}
            {step === 3 && (
              <div className="space-y-5">
                <div>
                  <label className="mb-3 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                    İlgi Alanları
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {INTERESTS.map(({ id, label, icon }) => {
                      const active = form.interests.includes(id);
                      return (
                        <button
                          key={id}
                          type="button"
                          onClick={() => {
                            const next = active
                              ? form.interests.filter((i) => i !== id)
                              : [...form.interests, id];
                            setForm({ ...form, interests: next });
                          }}
                          className={`flex items-center gap-2 rounded-lg border px-3 py-2.5 text-sm font-semibold transition-all ${
                            active
                              ? 'border-blue-500 bg-blue-500/20 text-blue-400'
                              : 'border-slate-600 bg-slate-700/50 text-slate-300 hover:border-slate-500'
                          }`}
                        >
                          <span>{icon}</span> {label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Neden Katılmak İstiyorsunuz?
                  </label>
                  <textarea
                    value={form.motivation}
                    onChange={(e) => setForm({ ...form, motivation: e.target.value })}
                    placeholder="Kendinizi ve kulüpte ne yapmak istediğinizi anlatın..."
                    required
                    minLength={20}
                    rows={4}
                    className="w-full rounded-xl border border-slate-600 bg-slate-700/50 px-4 py-3.5 text-white placeholder-slate-500 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 resize-none"
                  />
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="kvkk"
                    checked={form.kvkkConsent}
                    onChange={(e) => setForm({ ...form, kvkkConsent: e.target.checked })}
                    required
                    className="mt-1 h-4 w-4 rounded border-slate-600 bg-slate-700 text-blue-500"
                  />
                  <label htmlFor="kvkk" className="text-xs text-slate-400">
                    <Link href="/gizlilik" className="text-blue-400 hover:underline">
                      KVKK Aydınlatma Metni
                    </Link>
                    &apos;ni okudum ve verilerimin işlenmesini onaylıyorum.
                  </label>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex gap-3 pt-4">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="rounded-xl border border-slate-600 px-6 py-3.5 font-bold text-slate-300 transition-all hover:bg-slate-700"
                >
                  Geri
                </button>
              )}

              <button
                type="submit"
                disabled={!canGoNext || isLoading}
                className="flex-1 rounded-xl bg-blue-500 px-6 py-3.5 font-bold text-white shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-0.5 hover:bg-blue-600 hover:shadow-xl disabled:opacity-50"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" className="opacity-25" />
                      <path d="M12 2a10 10 0 0 1 10 10" className="opacity-75" />
                    </svg>
                    Kayıt yapılıyor...
                  </span>
                ) : step < 3 ? (
                  'Devam Et →'
                ) : (
                  'Kayıt Ol'
                )}
              </button>
            </div>
          </form>

          <div className="mt-6 border-t border-slate-700 pt-6 text-center text-sm text-slate-400">
            Zaten hesabın var mı?{' '}
            <Link href="/giris" className="font-semibold text-blue-400 hover:text-blue-300">
              Giriş Yap
            </Link>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link href="/" className="text-sm text-slate-500 hover:text-white transition-colors">
            ← Siteye geri dön
          </Link>
        </div>
      </div>
    </div>
  );
}