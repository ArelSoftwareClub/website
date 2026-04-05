import type { Metadata } from 'next';
import Link from 'next/link';
import { subTeams } from '@/content/teams';

export const metadata: Metadata = {
  title: 'Alt Topluluklar & Odak Alanları',
  description:
    'Arel Yazılım Kulübü alt ekipleri — AI, Web Geliştirme, Siber Güvenlik, Veri Bilimi ve Mobil alanlarında uzmanlaşmış topluluklar.',
  alternates: { canonical: '/topluluk' },
};

export default function ToplulukPage() {
  const featured = subTeams.filter((t) => t.featured);
  const others = subTeams.filter((t) => !t.featured);

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section
        style={{
          background: 'var(--bg-dark)',
          padding: '80px 0',
          position: 'relative',
          overflow: 'hidden',
        }}
        aria-labelledby="topluluk-heading"
      >
        <div
          style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)',
            backgroundSize: '48px 48px',
          }}
          aria-hidden="true"
        />
        <div style={{ position: 'absolute', width: '600px', height: '600px', top: '-200px', left: '-100px', background: 'radial-gradient(circle, rgba(232,83,29,0.12) 0%, transparent 65%)', filter: 'blur(40px)', pointerEvents: 'none' }} aria-hidden="true" />
        <div className="container-site" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <span className="label-tag" style={{ color: '#FF7755' }}>Berkeley Modeli</span>
          <h1
            id="topluluk-heading"
            style={{
              fontSize: 'clamp(40px, 5.5vw, 68px)',
              fontWeight: 900,
              letterSpacing: '-2.5px',
              color: '#fff',
              lineHeight: 1.08,
              marginBottom: '20px',
            }}
          >
            Alt <span className="gradient-text">Topluluklar</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '18px', maxWidth: '560px', margin: '0 auto 40px', lineHeight: 1.7 }}>
            Her üye ilgi alanına göre uzmanlaşmış bir ekibe katılır. Birlikte öğrenir, birlikte üretir.
          </p>
          {/* Stats row */}
          <div style={{ display: 'flex', gap: '48px', justifyContent: 'center', flexWrap: 'wrap', paddingTop: '32px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            {[
              { num: `${subTeams.length}`, label: 'Aktif Ekip' },
              { num: `${subTeams.reduce((acc, t) => acc + t.memberCount, 0)}+`, label: 'Toplam Üye' },
              { num: `${subTeams.reduce((acc, t) => acc + t.projectCount, 0)}+`, label: 'Proje' },
            ].map(({ num, label }) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '36px', fontWeight: 900, background: 'linear-gradient(180deg,#fff 0%,rgba(255,255,255,0.5) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', lineHeight: 1 }}>
                  {num}
                </div>
                <div style={{ marginTop: '6px', fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED TEAMS ────────────────────────────────────── */}
      <section style={{ background: 'var(--bg-alt)', padding: '80px 0' }} aria-labelledby="featured-teams-heading">
        <div className="container-site">
          <div style={{ marginBottom: '40px' }}>
            <span className="label-tag">Öne Çıkan</span>
            <h2 className="section-title" id="featured-teams-heading">
              Ekip <span className="gradient-text">Odak Alanları</span>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {featured.map((team) => (
              <Link key={team.id} href={`/topluluk/${team.slug}`} style={{ textDecoration: 'none' }}>
                <article
                  className="card"
                  style={{
                    padding: '0',
                    overflow: 'hidden',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    border: '1.5px solid var(--border)',
                    borderRadius: 'var(--radius-lg)',
                    background: '#fff',
                  }}
                >
                  {/* Header gradient */}
                  <div
                    style={{
                      height: '120px',
                      background: team.gradient,
                      display: 'flex',
                      alignItems: 'center',
                      padding: '24px',
                      gap: '16px',
                    }}
                  >
                    <span style={{ fontSize: '40px' }}>{team.icon}</span>
                    <div>
                      <div style={{ fontSize: '20px', fontWeight: 900, color: '#fff', lineHeight: 1.2 }}>{team.shortName}</div>
                      <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', marginTop: '4px' }}>
                        {team.memberCount} üye · {team.projectCount} proje
                      </div>
                    </div>
                  </div>
                  <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <p style={{ fontSize: '14px', color: 'var(--text-2)', lineHeight: 1.65, marginBottom: '16px', flex: 1 }}>
                      {team.description}
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '16px' }}>
                      {team.tags.slice(0, 4).map((tag) => (
                        <span key={tag} style={{ padding: '3px 8px', borderRadius: '999px', background: '#F3F4F6', fontSize: '10px', fontWeight: 600, color: 'var(--text-2)' }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '14px', borderTop: '1px solid var(--border)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: team.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 900, color: '#fff' }}>
                          {team.leadInitials}
                        </div>
                        <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{team.lead.split(' ')[0]} {team.lead.split(' ')[1]}</span>
                      </div>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: team.color }}>Keşfet →</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── OTHER TEAMS ──────────────────────────────────────── */}
      {others.length > 0 && (
        <section style={{ background: 'var(--bg-premium)', padding: '72px 0' }} aria-labelledby="other-teams-heading">
          <div className="container-site">
            <div style={{ marginBottom: '32px' }}>
              <span className="label-tag">Büyüyen Ekipler</span>
              <h2 className="section-title" id="other-teams-heading">
                Gelişen <span className="gradient-text">Topluluklar</span>
              </h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
              {others.map((team) => (
                <Link key={team.id} href={`/topluluk/${team.slug}`} style={{ textDecoration: 'none' }}>
                  <article
                    className="card"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '20px',
                      padding: '24px',
                      background: '#fff',
                      border: '1.5px solid var(--border)',
                      borderRadius: 'var(--radius-lg)',
                    }}
                  >
                    <div style={{ width: '60px', height: '60px', borderRadius: '16px', background: team.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', flexShrink: 0 }}>
                      {team.icon}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 800, color: 'var(--text)', fontSize: '16px', marginBottom: '4px' }}>{team.shortName}</div>
                      <div style={{ fontSize: '13px', color: 'var(--text-2)', marginBottom: '8px', lineHeight: 1.5 }}>
                        {team.description.slice(0, 80)}…
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{team.memberCount} üye · {team.projectCount} proje</div>
                    </div>
                    <span style={{ color: team.color, fontWeight: 700, fontSize: '13px', flexShrink: 0 }}>→</span>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── JOIN CTA ──────────────────────────────────────────── */}
      <section className="cta-section" aria-labelledby="topluluk-cta">
        <div className="cta-glow" style={{ top: '-100px', left: '-100px' }} aria-hidden="true" />
        <div className="cta-glow" style={{ bottom: '-100px', right: '-100px' }} aria-hidden="true" />
        <div className="container-site" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <h2 id="topluluk-cta" style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 900, color: '#fff', letterSpacing: '-1.5px', marginBottom: '14px' }}>
            Hangi Ekibe Katılmak İstersin?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '17px', maxWidth: '480px', margin: '0 auto 36px', lineHeight: 1.7 }}>
            Üye ol ve ilgi alanına uygun ekibe katılmak için sana özel yönlendirme al.
          </p>
          <Link href="/uyelik" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '16px 36px', borderRadius: '14px', background: '#fff', color: 'var(--orange)', fontWeight: 800, fontSize: '15px', boxShadow: '0 8px 24px rgba(0,0,0,0.15)', textDecoration: 'none' }}>
            Üyelik Başvurusu
          </Link>
        </div>
      </section>
    </>
  );
}
