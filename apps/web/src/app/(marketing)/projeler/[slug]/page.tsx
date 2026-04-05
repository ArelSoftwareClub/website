import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { projects } from '@/content/projects';
import { subTeams } from '@/content/teams';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: `/projeler/${slug}` },
  };
}

const statusConfig = {
  active:      { label: 'Aktif', color: '#15803D', bg: '#DCFCE7' },
  development: { label: 'Geliştiriliyor', color: '#D97706', bg: '#FEF3C7' },
  completed:   { label: 'Tamamlandı', color: '#0EA5E9', bg: '#E0F2FE' },
  archived:    { label: 'Arşiv', color: '#64748B', bg: '#F1F5F9' },
};

export default async function ProjeDetayPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const status = statusConfig[project.status];
  const team = project.teamSlug ? subTeams.find((t) => t.slug === project.teamSlug) : null;
  const related = projects.filter((p) => p.slug !== slug && p.teamSlug === project.teamSlug).slice(0, 2);

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section
        style={{ background: 'var(--bg-dark)', padding: '80px 0 60px', position: 'relative', overflow: 'hidden' }}
        aria-labelledby="proj-heading"
      >
        <div style={{ position: 'absolute', width: '600px', height: '600px', top: '-200px', left: '-100px', background: 'radial-gradient(circle, rgba(232,83,29,0.12) 0%, transparent 65%)', filter: 'blur(40px)', pointerEvents: 'none' }} aria-hidden="true" />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)', backgroundSize: '48px 48px' }} aria-hidden="true" />
        <div className="container-site" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ marginBottom: '16px' }}>
            <Link href="/projeler" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', fontWeight: 600, textDecoration: 'none' }}>
              ← Projeler
            </Link>
          </div>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ padding: '4px 12px', borderRadius: '999px', background: status.bg + '22', color: status.color, fontSize: '12px', fontWeight: 700, border: `1px solid ${status.color}30` }}>
              ● {status.label}
            </span>
            {team && (
              <Link href={`/topluluk/${team.slug}`} style={{ padding: '4px 12px', borderRadius: '999px', background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.65)', fontSize: '12px', fontWeight: 600, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.12)' }}>
                {team.icon} {team.shortName}
              </Link>
            )}
          </div>
          <h1
            id="proj-heading"
            style={{ fontSize: 'clamp(30px, 4.5vw, 56px)', fontWeight: 900, color: '#fff', letterSpacing: '-2px', lineHeight: 1.1, marginBottom: '16px', maxWidth: '700px' }}
          >
            {project.title}
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '17px', maxWidth: '600px', lineHeight: 1.75, marginBottom: '32px' }}>
            {project.description}
          </p>

          {/* GitHub stats row */}
          {(project.stars !== undefined || project.forks !== undefined) && (
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '28px' }}>
              {project.stars !== undefined && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: 'rgba(255,255,255,0.06)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <span>⭐</span>
                  <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>{project.stars} Stars</span>
                </div>
              )}
              {project.forks !== undefined && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: 'rgba(255,255,255,0.06)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <span>🍴</span>
                  <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>{project.forks} Forks</span>
                </div>
              )}
              {project.contributors !== undefined && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: 'rgba(255,255,255,0.06)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <span>👥</span>
                  <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>{project.contributors} Katkıcı</span>
                </div>
              )}
            </div>
          )}

          {/* CTA buttons */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                GitHub&apos;da Aç ↗
              </a>
            )}
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline-white">
                Canlı Demo ↗
              </a>
            )}
          </div>
        </div>
      </section>

      {/* ── CONTENT ──────────────────────────────────────────── */}
      <section style={{ background: 'var(--bg-premium)', padding: '64px 0 80px' }}>
        <div className="container-site" style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '60px', alignItems: 'start' }}>
          {/* Main */}
          <div>
            {project.longDescription && (
              <div style={{ marginBottom: '40px' }}>
                <h2 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text)', marginBottom: '14px' }}>Proje Hakkında</h2>
                <p style={{ fontSize: '15px', color: 'var(--text-2)', lineHeight: 1.85 }}>{project.longDescription}</p>
              </div>
            )}

            {project.highlights && project.highlights.length > 0 && (
              <div style={{ marginBottom: '40px' }}>
                <h2 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text)', marginBottom: '16px' }}>Öne Çıkan Özellikler</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                  {project.highlights.map((h) => (
                    <div key={h} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '16px 18px', background: '#fff', borderRadius: 'var(--radius-md)', border: '1.5px solid var(--border)' }}>
                      <span style={{ color: 'var(--orange)', fontWeight: 700, flexShrink: 0 }}>✓</span>
                      <span style={{ fontSize: '13px', color: 'var(--text)', fontWeight: 600 }}>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tech stack */}
            <div style={{ marginBottom: '40px' }}>
              <h2 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text)', marginBottom: '16px' }}>Teknoloji Yığını</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    style={{
                      padding: '8px 18px',
                      borderRadius: 'var(--radius-md)',
                      background: '#fff',
                      border: '1.5px solid var(--border)',
                      fontSize: '13px',
                      fontWeight: 700,
                      color: 'var(--text)',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside style={{ position: 'sticky', top: '96px' }}>
            {/* Project info card */}
            <div style={{ background: '#fff', border: '1.5px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '24px', marginBottom: '16px' }}>
              <div style={{ fontWeight: 800, color: 'var(--text)', marginBottom: '16px', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Proje Bilgileri
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Durum</span>
                  <span style={{ padding: '2px 10px', borderRadius: '999px', background: status.bg, color: status.color, fontWeight: 700, fontSize: '12px' }}>{status.label}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Ekip</span>
                  <span style={{ fontWeight: 700, color: 'var(--text)' }}>{project.team}</span>
                </div>
                {project.lastCommit && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Son Commit</span>
                    <span style={{ fontWeight: 700, color: 'var(--text)' }}>{project.lastCommit}</span>
                  </div>
                )}
              </div>

              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm" style={{ marginTop: '20px', width: '100%', justifyContent: 'center' }}>
                  GitHub&apos;da Gör ↗
                </a>
              )}
            </div>

            {/* Contributing CTA */}
            <div style={{ background: 'var(--orange-soft)', border: '1.5px solid rgba(232,83,29,0.15)', borderRadius: 'var(--radius-lg)', padding: '20px' }}>
              <div style={{ fontWeight: 800, color: 'var(--text)', marginBottom: '6px', fontSize: '14px' }}>Katkıda Bulunmak İster misin?</div>
              <p style={{ fontSize: '12px', color: 'var(--text-2)', lineHeight: 1.6, marginBottom: '14px' }}>
                Ekibimize katıl ve bu projeye katkıda bulun.
              </p>
              <Link href="/uyelik" className="btn btn-primary btn-sm" style={{ width: '100%', justifyContent: 'center' }}>
                Üye Ol
              </Link>
            </div>

            {/* Related projects */}
            {related.length > 0 && (
              <div style={{ background: '#fff', border: '1.5px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '20px', marginTop: '16px' }}>
                <div style={{ fontWeight: 800, color: 'var(--text)', marginBottom: '14px', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  Aynı Ekipten
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {related.map((rel) => (
                    <Link key={rel.id} href={`/projeler/${rel.slug}`} style={{ textDecoration: 'none' }}>
                      <div className="card" style={{ padding: '12px', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
                        <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text)', marginBottom: '4px' }}>{rel.title}</div>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{rel.team}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </section>
    </>
  );
}
