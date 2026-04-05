import type { Metadata } from 'next';
import Link from 'next/link';
import Section, { SectionHeader } from '@/components/ui/Section';
import { siteConfig } from '@/content/site';

export const metadata: Metadata = {
  title: 'ARI Araştırma Laboratuvarı',
  description: `ARI Lab — ${siteConfig.name} araştırma kolu. Yapay zekâ, makine öğrenmesi ve veri bilimi odaklı akademik projeler.`,
  alternates: { canonical: '/ari-lab' },
};

export default function AriLabPage() {
  const researchAreas = [
    { title: 'Yapay Zekâ & ML', desc: 'Graf sinir ağları, doğal dil işleme ve bilgisayarla görü alanlarında araştırmalar.', icon: '🧠' },
    { title: 'Veri Bilimi', desc: 'Büyük veri analizi, görselleştirme ve tahminsel modelleme çalışmaları.', icon: '📊' },
    { title: 'Biyoinformatik', desc: 'Biyolojik veri setleri üzerinde makine öğrenmesi uygulamaları.', icon: '🧬' },
    { title: 'Açık Kaynak Araştırma', desc: 'Tüm araştırma çıktıları açık lisanslar altında toplulukla paylaşılır.', icon: '🌐' },
  ];

  return (
    <>
      <Section aria-labelledby="ari-heading">
        <div className="container-site">
          <SectionHeader
            label="Araştırma Kolu"
            title={<>ARI <span className="text-orange-DEFAULT">Araştırma Laboratuvarı</span></>}
            description="Arel Yazılım Kulübü'nün araştırma ve geliştirme birimi. Yapay zekâ, veri bilimi ve akademik projelerin yürütüldüğü merkez."
            id="ari-heading"
          />
          <div className="grid gap-6 sm:grid-cols-2">
            {researchAreas.map((area) => (
              <div key={area.title} className="flex gap-5 rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                <span className="shrink-0 text-3xl" aria-hidden="true">{area.icon}</span>
                <div>
                  <h3 className="mb-2 font-extrabold text-slate-800">{area.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-500">{area.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA Join */}
      <section className="relative overflow-hidden bg-brand-dark py-20 text-white" aria-labelledby="ari-cta">
        <div className="container-site text-center">
          <h2 id="ari-cta" className="mb-4 text-4xl font-black">ARI Lab&apos;e Katıl</h2>
          <p className="mx-auto mb-8 max-w-[480px] text-white/70">
            2. ve 3. sınıf öğrencilerine açık araştırmacı pozisyonları için başvur.
            Mentor eşliğinde gerçek akademik projelerde yer al.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/uyelik"
              className="inline-flex items-center gap-2.5 rounded-md bg-orange-DEFAULT px-9 py-[18px] text-base font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-orange-vibrant hover:shadow-orange-lg"
            >
              Başvur
            </Link>
            <Link
              href="https://github.com/ArelSoftwareClub"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-md border border-white/20 px-9 py-[18px] text-base font-bold text-white transition-all hover:border-white/40 hover:bg-white/12"
            >
              GitHub&apos;da İncele
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
