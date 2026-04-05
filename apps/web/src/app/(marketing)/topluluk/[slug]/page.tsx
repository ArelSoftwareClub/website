import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { subTeams } from '@/content/teams';
import { events } from '@/content/events';
import { projects } from '@/content/projects';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return subTeams.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const team = subTeams.find((t) => t.slug === slug);
  if (!team) return {};
  return {
    title: team.name,
    description: team.description,
    alternates: { canonical: `/topluluk/${slug}` },
  };
}

export default async function TeamDetailPage({ params }: Props) {
  const { slug } = await params;
  const team = subTeams.find((t) => t.slug === slug);
  if (!team) notFound();

  const teamEvents = events.filter((e) => e.teamSlug === slug).slice(0, 3);
  const teamProjects = projects.filter((p) => p.teamSlug === slug).slice(0, 3);

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section
        style={{ background: team.gradient, padding: '80px 0', position: 'relative', overflow: 'hidden' }}
        aria-labelledby="team-heading"
      >
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.25)' }} aria-hidden="true" />
        <div className="container-site" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ marginBottom: '16px' }}>
            <Link href="/topluluk" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', fontWeight: 600, textDecoration: 'none' }}>
              ← Tüm Topluluklar
            </Link>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px' }}>
            <span style={{ fontSize: '56px' }}>{team.icon}</span>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: 'rgba(255,255,255,0.65)', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '6px' }}>
                Alt Topluluk
              </div>
              <h1 id="team-heading" style={{ fontSize: 'clamp(30px, 4.5vw, 52px)', fontWeight: 900, color: '#fff', letterSpacing: '-1.5px', lineHeight: 1.1 }}>
                {team.name}
              </h1>
            </div>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '17px', maxWidth: '600px', lineHeight: 1.7, marginBottom: '32px' }}>
            {team.longDescription}
          </p>
          <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
            {[
              { num: `${team.memberCount}`, label: 'Aktif Üye' },
              { num: `${team.projectCount}`, label: 'Proje' },
              { num: team.focus.length.toString(), label: 'Odak Alanı' },
            ].map(({ num, label }) => (
              <div key={label}>
                <div style={{ fontSize: '28px', fontWeight: 900, color: '#fff', lineHeight: 1 }}>{num}</div>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.55)', marginTop: '4px' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOCUS AREAS + LEADER ─────────────────────────────── */}
      <section style={{ background: 'var(--bg-alt)', padding: '72px 0' }}>
        <div className="container-site" style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '48px', alignItems: 'start' }}>
          {/* Focus areas */}
          <div>
            <span className="label-tag">Çalışma Alanları</span>
            <h2 className="section-title" style={{ marginBottom: '28px' }}>
              Ne ile <span className="gradient-text">İlgileniyoruz?</span>
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
              {team.focus.map((area) => (
                <div key={area} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px 20px', background: '#fff', borderRadius: 'var(--radius-md)', border: '1.5px solid var(--border)' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: team.color, flexShrink: 0 }} />
                  <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text)' }}>{area}</span>
                </div>
              ))}
            </div>
            {/* Tags */}
            <div style={{ marginTop: '24px', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {team.tags.map((tag) => (
                <span key={tag} style={{ padding: '5px 14px', borderRadius: '999px', background: '#F3F4F6', fontSize: '12px', fontWeight: 600, color: 'var(--text-2)' }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Lead card */}
          <div>
            <span className="label-tag">Ekip Lideri</span>
            <div style={{ background: '#fff', border: '1.5px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '28px', marginTop: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: team.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: 900, color: '#fff', flexShrink: 0 }}>
                  {team.leadInitials}
                </div>
                <div>
                  <div style={{ fontWeight: 800, color: 'var(--text)', fontSize: '16px' }}>{team.lead}</div>
                  <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '3px' }}>{team.leadRole}</div>
                </div>
              </div>
              {team.contactEmail && (
                <a href={`mailto:${team.contactEmail}`} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', background: 'var(--orange-soft)', borderRadius: 'var(--radius-md)', color: 'var(--orange)', fontWeight: 700, fontSize: '13px', textDecoration: 'none', transition: 'var(--transition)' }}>
                  ✉ İletişime Geç
                </a>
              )}
              {team.githubUrl && (
                <a href={team.githubUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', background: '#F3F4F6', borderRadius: 'var(--radius-md)', color: 'var(--text)', fontWeight: 700, fontSize: '13px', textDecoration: 'none', marginTop: '8px', transition: 'var(--transition)' }}>
                  GitHub ↗
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── TEAM PROJECTS ─────────────────────────────────────── */}
      {teamProjects.length > 0 && (
        <section style={{ background: 'var(--bg-premium)', padding: '72px 0' }} aria-labelledby="team-projects-heading">
          <div className="container-site">
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <span className="label-tag">Projeler</span>
                <h2 className="section-title" id="team-projects-heading">
                  Ekip <span className="gradient-text">Projeleri</span>
                </h2>
              </div>
              <Link href="/projeler" className="btn btn-ghost btn-sm">Tüm Projeler →</Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
              {teamProjects.map((project) => (
                <Link key={project.id} href={`/projeler/${project.slug}`} style={{ textDecoration: 'none' }}>
                  <article className="proj-card">
                    <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text)', marginBottom: '8px' }}>{project.title}</h3>
                    <p style={{ fontSize: '13px', color: 'var(--text-2)', lineHeight: 1.6, marginBottom: '14px', flex: 1 }}>{project.description}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                      {project.techStack.slice(0, 3).map((t) => (
                        <span key={t} style={{ padding: '3px 8px', borderRadius: '999px', background: '#F3F4F6', fontSize: '10px', fontWeight: 600, color: 'var(--text-2)' }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── TEAM EVENTS ──────────────────────────────────────── */}
      {teamEvents.length > 0 && (
        <section style={{ background: 'var(--bg-alt)', padding: '72px 0' }} aria-labelledby="team-events-heading">
          <div className="container-site">
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <span className="label-tag">Etkinlikler</span>
                <h2 className="section-title" id="team-events-heading">
                  Ekip <span className="gradient-text">Etkinlikleri</span>
                </h2>
              </div>
              <Link href="/etkinlikler" className="btn btn-ghost btn-sm">Tüm Etkinlikler →</Link>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {teamEvents.map((event) => (
                <Link key={event.id} href={`/etkinlikler/${event.slug}`} style={{ textDecoration: 'none' }}>
                  <article style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '20px 24px', background: '#fff', borderRadius: 'var(--radius-lg)', border: '1.5px solid var(--border)', transition: 'var(--transition)' }} className="card">
                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: team.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>
                      {team.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 800, color: 'var(--text)', marginBottom: '4px' }}>{event.title}</div>
                      <div style={{ fontSize: '13px', color: 'var(--text-2)' }}>{event.type} · {event.location}</div>
                    </div>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: team.color, flexShrink: 0 }}>Detay →</span>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── JOIN CTA ──────────────────────────────────────────── */}
      <section style={{ background: 'var(--bg-premium)', padding: '72px 0' }} aria-labelledby="join-team-cta">
        <div className="container-site" style={{ textAlign: 'center' }}>
          <h2 id="join-team-cta" className="section-title" style={{ marginBottom: '14px' }}>
            {team.shortName}&apos;ye <span className="gradient-text">Katılmak İster misin?</span>
          </h2>
          <p style={{ color: 'var(--text-2)', maxWidth: '440px', margin: '0 auto 32px', lineHeight: 1.7 }}>
            Üyelik başvurusunu tamamla ve {team.shortName} lideriyle buluş.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/uyelik" className="btn btn-primary">Üye Ol</Link>
            {team.contactEmail && (
              <a href={`mailto:${team.contactEmail}`} className="btn btn-ghost">İletişim</a>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
