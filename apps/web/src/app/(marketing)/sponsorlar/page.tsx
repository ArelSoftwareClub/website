import type { Metadata } from 'next';
import Link from 'next/link';
import { sponsors, sponsorTierConfig, sponsorshipPackages } from '@/content/sponsors';

export const metadata: Metadata = {
  title: 'Sponsorlar & Partnerler',
  description:
    'Arel Yazılım Kulübü sponsorları ve kurumsal ortakları. Sponsorluk paketleri ve iş birliği fırsatları.',
  alternates: { canonical: '/sponsorlar' },
};

const tierOrder: Array<'platinum' | 'gold' | 'silver' | 'community'> = ['platinum', 'gold', 'silver', 'community'];

export default function SponsorlarPage() {
  const grouped = tierOrder.map((tier) => ({
    tier,
    config: sponsorTierConfig[tier],
    items: sponsors.filter((s) => s.tier === tier),
  }));

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section
        style={{ background: 'var(--bg-dark)', padding: '80px 0', position: 'relative', overflow: 'hidden' }}
        aria-labelledby="sponsorlar-heading"
      >
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)', backgroundSize: '48px 48px' }} aria-hidden="true" />
        <div className="container-site" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <span className="label-tag" style={{ color: '#FF7755' }}>Ortaklar</span>
          <h1
            id="sponsorlar-heading"
            style={{ fontSize: 'clamp(40px, 5.5vw, 68px)', fontWeight: 900, letterSpacing: '-2.5px', color: '#fff', lineHeight: 1.08, marginBottom: '20px' }}
          >
            Sponsorlar &amp;{' '}
            <span className="gradient-text">Partnerler</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '18px', maxWidth: '520px', margin: '0 auto 40px', lineHeight: 1.7 }}>
            Arel Yazılım Kulübü büyümesini destekleyen teknoloji şirketleri ve kurumsal ortaklar.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#paketler" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 32px', borderRadius: '12px', background: 'var(--orange)', color: '#fff', fontWeight: 700, fontSize: '14px', boxShadow: '0 4px 14px var(--orange-glow)', textDecoration: 'none' }}>
              Sponsor Ol
            </a>
            <a href="mailto:yazilimkulubu@istanbularel.edu.tr" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 32px', borderRadius: '12px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', fontWeight: 700, fontSize: '14px', textDecoration: 'none' }}>
              İletişime Geç
            </a>
          </div>
        </div>
      </section>

      {/* ── SPONSORS by tier ─────────────────────────────────── */}
      {grouped.map(({ tier, config, items }) =>
        items.length === 0 ? null : (
          <section key={tier} style={{ background: tier === 'platinum' ? 'var(--bg-alt)' : 'var(--bg-premium)', padding: '64px 0' }} aria-labelledby={`${tier}-heading`}>
            <div className="container-site">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
                <span
                  style={{
                    padding: '6px 18px',
                    borderRadius: '999px',
                    background: config.bg,
                    color: config.color,
                    fontSize: '12px',
                    fontWeight: 800,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}
                >
                  {config.label}
                </span>
                <h2 id={`${tier}-heading`} className="section-title" style={{ fontSize: '28px' }}>
                  {tier === 'platinum' && 'Platinum'}
                  {tier === 'gold' && 'Gold'}
                  {tier === 'silver' && 'Silver'}
                  {tier === 'community' && 'Topluluk'} Ortaklar
                </h2>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: tier === 'platinum' ? 'repeat(2, 1fr)' : tier === 'gold' ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
                  gap: '20px',
                }}
              >
                {items.map((sponsor) => (
                  <a
                    key={sponsor.id}
                    href={sponsor.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: 'none' }}
                  >
                    <article
                      className="card"
                      style={{
                        padding: tier === 'platinum' ? '32px' : '24px',
                        background: '#fff',
                        border: '1.5px solid var(--border)',
                        borderRadius: 'var(--radius-lg)',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      {/* Logo placeholder */}
                      <div
                        style={{
                          height: tier === 'platinum' ? '80px' : '56px',
                          background: 'linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%)',
                          borderRadius: 'var(--radius-md)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginBottom: '16px',
                          border: '1px solid #E2E8F0',
                        }}
                      >
                        <span style={{ fontSize: tier === 'platinum' ? '24px' : '18px', fontWeight: 900, color: config.color, letterSpacing: tier === 'platinum' ? '-1px' : '-0.5px' }}>
                          {sponsor.name}
                        </span>
                      </div>

                      {tier !== 'community' && (
                        <p style={{ fontSize: '13px', color: 'var(--text-2)', lineHeight: 1.6, marginBottom: '14px', flex: 1 }}>
                          {sponsor.description}
                        </p>
                      )}

                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '12px', borderTop: '1px solid var(--border)' }}>
                        <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                          {sponsor.industry} · {sponsor.since}&apos;den beri
                        </span>
                        <span style={{ fontSize: '12px', fontWeight: 700, color: config.color }}>↗</span>
                      </div>

                      {/* Benefit pill */}
                      <div style={{ marginTop: '10px', padding: '8px 12px', background: config.bg, borderRadius: 'var(--radius-sm)', fontSize: '11px', fontWeight: 600, color: config.color }}>
                        🎁 {sponsor.benefit}
                      </div>
                    </article>
                  </a>
                ))}
              </div>
            </div>
          </section>
        )
      )}

      {/* ── PACKAGES ─────────────────────────────────────────── */}
      <section id="paketler" style={{ background: 'var(--bg-dark)', padding: '80px 0' }} aria-labelledby="packages-heading">
        <div className="container-site">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span className="label-tag" style={{ color: '#FF7755' }}>Sponsorluk</span>
            <h2 id="packages-heading" style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 900, letterSpacing: '-1.5px', color: '#fff', lineHeight: 1.1, marginBottom: '14px' }}>
              Sponsorluk <span className="gradient-text">Paketleri</span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '16px', maxWidth: '480px', margin: '0 auto', lineHeight: 1.7 }}>
              Topluluğumuza destek verin, yetkin yazılım geliştirici adaylarıyla buluşun.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {sponsorshipPackages.map((pkg, i) => {
              const conf = sponsorTierConfig[pkg.tier];
              const isHighlighted = i === 0;
              return (
                <div
                  key={pkg.tier}
                  style={{
                    padding: '32px',
                    borderRadius: 'var(--radius-lg)',
                    background: isHighlighted ? `linear-gradient(135deg, ${conf.color}18 0%, ${conf.color}08 100%)` : 'rgba(255,255,255,0.04)',
                    border: `1.5px solid ${isHighlighted ? conf.color + '40' : 'rgba(255,255,255,0.1)'}`,
                    position: 'relative',
                  }}
                >
                  {isHighlighted && (
                    <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', padding: '4px 16px', borderRadius: '999px', background: conf.color, fontSize: '11px', fontWeight: 800, color: '#fff', letterSpacing: '1px', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
                      En Kapsamlı
                    </div>
                  )}
                  <div style={{ marginBottom: '6px' }}>
                    <span style={{ padding: '4px 14px', borderRadius: '999px', background: conf.bg, color: conf.color, fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {conf.label}
                    </span>
                  </div>
                  <div style={{ fontSize: '28px', fontWeight: 900, color: '#fff', marginTop: '12px', marginBottom: '4px' }}>{pkg.price}</div>
                  <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', margin: '20px 0' }} />
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
                    {pkg.features.map((feat) => (
                      <li key={feat} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '13px', color: 'rgba(255,255,255,0.75)' }}>
                        <span style={{ color: conf.color, fontWeight: 700, flexShrink: 0 }}>✓</span>
                        {feat}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="mailto:yazilimkulubu@istanbularel.edu.tr"
                    style={{
                      display: 'block',
                      textAlign: 'center',
                      padding: '12px',
                      borderRadius: 'var(--radius-md)',
                      background: isHighlighted ? conf.color : 'rgba(255,255,255,0.08)',
                      color: '#fff',
                      fontWeight: 700,
                      fontSize: '14px',
                      textDecoration: 'none',
                      transition: 'var(--transition)',
                    }}
                  >
                    İletişime Geç
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── WHY SPONSOR ──────────────────────────────────────── */}
      <section style={{ background: 'var(--bg-premium)', padding: '72px 0' }} aria-labelledby="why-heading">
        <div className="container-site">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span className="label-tag">Neden Arel Yazılım?</span>
            <h2 id="why-heading" className="section-title">
              Neden <span className="gradient-text">Sponsor Olmalısınız?</span>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {[
              { icon: '👥', title: '250+ Aktif Üye', desc: 'Yetkin yazılım geliştirici adaylarından oluşan güçlü bir ekosistem.' },
              { icon: '🎯', title: 'Hedef Kitle', desc: '2. ve 3. sınıf öğrenciler — staj ve kariyer arayışındaki en aktif dönem.' },
              { icon: '📣', title: 'Görünürlük', desc: 'Kampüs, sosyal medya ve etkinliklerde marka bilinirliği.' },
              { icon: '🤝', title: 'Yetenek Erişimi', desc: 'Teknik mülakatlar öncesi yetenekleri tanıma fırsatı.' },
              { icon: '🏆', title: 'Başarı Kültürü', desc: 'TEKNOFEST ve ulusal yarışmalarda ödüllü projektlerimiz var.' },
              { icon: '🔬', title: 'Araştırma İş Birlikleri', desc: 'ARI Lab ile ortak araştırma projeleri geliştirme imkânı.' },
            ].map(({ icon, title, desc }) => (
              <div
                key={title}
                style={{
                  padding: '24px',
                  background: '#fff',
                  borderRadius: 'var(--radius-lg)',
                  border: '1.5px solid var(--border)',
                  transition: 'var(--transition)',
                }}
                className="card"
              >
                <span style={{ fontSize: '32px', display: 'block', marginBottom: '12px' }}>{icon}</span>
                <div style={{ fontWeight: 800, color: 'var(--text)', marginBottom: '8px', fontSize: '16px' }}>{title}</div>
                <p style={{ fontSize: '13px', color: 'var(--text-2)', lineHeight: 1.6 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT CTA ──────────────────────────────────────── */}
      <section className="cta-section" aria-labelledby="sponsor-cta">
        <div className="cta-glow" style={{ top: '-80px', left: '-80px' }} aria-hidden="true" />
        <div className="cta-glow" style={{ bottom: '-80px', right: '-80px' }} aria-hidden="true" />
        <div className="container-site" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <h2 id="sponsor-cta" style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 900, color: '#fff', letterSpacing: '-1.5px', marginBottom: '14px' }}>
            Birlikte Büyüyelim
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '17px', maxWidth: '460px', margin: '0 auto 32px', lineHeight: 1.7 }}>
            Sponsorluk detayları ve özel teklifler için ekibimizle iletişime geçin.
          </p>
          <Link href="/iletisim" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '16px 36px', borderRadius: '14px', background: '#fff', color: 'var(--orange)', fontWeight: 800, fontSize: '15px', boxShadow: '0 8px 24px rgba(0,0,0,0.15)', textDecoration: 'none' }}>
            İletişim Formu
          </Link>
        </div>
      </section>
    </>
  );
}
