import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { events } from '@/content/events';
import { formatDate } from '@/lib/utils';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = events.find((e) => e.slug === slug);
  if (!event) return {};
  return {
    title: event.title,
    description: event.description,
    alternates: { canonical: `/etkinlikler/${slug}` },
  };
}

const typeColor: Record<string, string> = {
  Workshop: 'var(--orange)',
  Hackathon: '#7C3AED',
  Seminar: '#15803D',
  Panel: '#0EA5E9',
  Training: '#D97706',
  Social: '#EC4899',
};
const typeBadge: Record<string, string> = {
  Workshop: 'badge-orange',
  Hackathon: 'badge-purple',
  Seminar: 'badge-green',
  Panel: 'badge-blue',
  Training: 'badge-yellow',
  Social: 'badge-gray',
};

export default async function EtkinlikDetayPage({ params }: Props) {
  const { slug } = await params;
  const event = events.find((e) => e.slug === slug);
  if (!event) notFound();

  const accent = typeColor[event.type] ?? 'var(--orange)';
  const related = events.filter((e) => e.slug !== slug && e.type === event.type && e.status !== 'past').slice(0, 2);

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section
        style={{ background: 'var(--bg-dark)', padding: '80px 0 60px', borderTop: `4px solid ${accent}`, position: 'relative', overflow: 'hidden' }}
        aria-labelledby="event-heading"
      >
        <div style={{ position: 'absolute', width: '500px', height: '500px', top: '-200px', left: '-100px', background: `radial-gradient(circle, ${accent}22 0%, transparent 65%)`, filter: 'blur(40px)', pointerEvents: 'none' }} aria-hidden="true" />
        <div className="container-site" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ marginBottom: '16px' }}>
            <Link href="/etkinlikler" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', fontWeight: 600, textDecoration: 'none' }}>
              ← Etkinlikler
            </Link>
          </div>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
            <span className={`badge ${typeBadge[event.type] ?? 'badge-orange'}`}>{event.type}</span>
            {event.status === 'upcoming' && (
              <span style={{ padding: '3px 10px', borderRadius: '999px', background: 'rgba(21,128,61,0.15)', color: '#4ADE80', fontSize: '11px', fontWeight: 700, border: '1px solid rgba(21,128,61,0.3)' }}>
                🟢 Kayıt Açık
              </span>
            )}
            {event.status === 'past' && (
              <span style={{ padding: '3px 10px', borderRadius: '999px', background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.4)', fontSize: '11px', fontWeight: 700 }}>
                Geçti
              </span>
            )}
          </div>
          <h1
            id="event-heading"
            style={{ fontSize: 'clamp(28px, 4.5vw, 52px)', fontWeight: 900, color: '#fff', letterSpacing: '-1.5px', lineHeight: 1.1, marginBottom: '20px', maxWidth: '700px' }}
          >
            {event.title}
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '16px', maxWidth: '600px', lineHeight: 1.7, marginBottom: '32px' }}>
            {event.description}
          </p>

          {/* Meta row */}
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            {[
              { icon: '📅', label: formatDate(event.date) + (event.endDate ? ` – ${formatDate(event.endDate)}` : '') },
              { icon: '📍', label: event.location },
              ...(event.capacity ? [{ icon: '👥', label: `${event.capacity} Kontenjan` }] : []),
              ...(event.speaker ? [{ icon: '🎤', label: event.speaker }] : []),
            ].map(({ icon, label }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', background: 'rgba(255,255,255,0.06)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <span>{icon}</span>
                <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.75)', fontWeight: 600 }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTENT ──────────────────────────────────────────── */}
      <section style={{ background: 'var(--bg-premium)', padding: '64px 0 80px' }}>
        <div className="container-site" style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '60px', alignItems: 'start' }}>
          {/* Main */}
          <div>
            {event.longDescription && (
              <div style={{ marginBottom: '40px' }}>
                <h2 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text)', marginBottom: '14px' }}>Etkinlik Hakkında</h2>
                <p style={{ fontSize: '15px', color: 'var(--text-2)', lineHeight: 1.8 }}>{event.longDescription}</p>
              </div>
            )}

            {event.agenda && event.agenda.length > 0 && (
              <div style={{ marginBottom: '40px' }}>
                <h2 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text)', marginBottom: '20px' }}>Program</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {event.agenda.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: '16px', padding: '16px 20px', background: '#fff', borderRadius: 'var(--radius-md)', border: '1.5px solid var(--border)', alignItems: 'flex-start' }}>
                      <div style={{ minWidth: '90px', flexShrink: 0 }}>
                        <span style={{ fontSize: '12px', fontWeight: 800, color: accent, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{item.time}</span>
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, color: 'var(--text)', fontSize: '14px' }}>{item.title}</div>
                        {item.speaker && <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '3px' }}>🎤 {item.speaker}</div>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {event.prerequisites && event.prerequisites.length > 0 && (
              <div style={{ marginBottom: '40px' }}>
                <h2 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text)', marginBottom: '14px' }}>Ön Koşullar</h2>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {event.prerequisites.map((p) => (
                    <li key={p} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: 'var(--text-2)' }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: accent, flexShrink: 0 }} />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {event.tags.map((tag) => (
                <span key={tag} style={{ padding: '4px 12px', borderRadius: '999px', background: '#F3F4F6', fontSize: '12px', fontWeight: 600, color: 'var(--text-2)' }}>
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <aside style={{ position: 'sticky', top: '96px' }}>
            {/* Registration CTA */}
            <div style={{ background: '#fff', border: '1.5px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '28px', marginBottom: '20px' }}>
              <div style={{ fontWeight: 900, color: 'var(--text)', fontSize: '18px', marginBottom: '6px' }}>{event.title}</div>
              {event.capacity && (
                <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '20px' }}>
                  👥 {event.capacity} kişilik kontenjan
                </div>
              )}
              {event.status === 'upcoming' ? (
                <Link href="/uyelik" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  Kayıt Ol
                </Link>
              ) : (
                <div style={{ padding: '12px', background: '#F3F4F6', borderRadius: 'var(--radius-md)', textAlign: 'center', fontSize: '13px', color: 'var(--text-muted)', fontWeight: 600 }}>
                  Bu etkinlik sona erdi
                </div>
              )}
              <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-2)' }}>
                  <span>📅</span> {formatDate(event.date)}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-2)' }}>
                  <span>📍</span> {event.location}
                </div>
              </div>
            </div>

            {/* Related events */}
            {related.length > 0 && (
              <div style={{ background: '#fff', border: '1.5px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '24px' }}>
                <div style={{ fontWeight: 800, color: 'var(--text)', marginBottom: '14px', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  Benzer Etkinlikler
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {related.map((rel) => (
                    <Link key={rel.id} href={`/etkinlikler/${rel.slug}`} style={{ textDecoration: 'none' }}>
                      <div className="card" style={{ padding: '12px', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
                        <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text)', marginBottom: '4px' }}>{rel.title}</div>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{formatDate(rel.date)}</div>
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
