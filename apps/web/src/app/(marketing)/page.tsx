import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { AnnouncementBadge } from '@/components/ui/Badge';
import { siteConfig } from '@/content/site';
import { announcements } from '@/content/announcements';
import { events } from '@/content/events';
import { projects } from '@/content/projects';
import { managementTeam } from '@/content/team';
import { formatDate, formatEventDate } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Arel Yazılım Kulübü | İstanbul Arel Üniversitesi',
  description: siteConfig.description,
  alternates: { canonical: '/' },
};

const quickAccessItems = [
  { href: '/uyelik',      Icon: UserPlusIcon,  label: 'Üyelik Başvurusu' },
  { href: '/etkinlikler', Icon: CalendarIcon,  label: 'Etkinlik Takvimi' },
  { href: '/duyurular',   Icon: BellIcon,      label: 'Duyurular' },
  { href: '/projeler',    Icon: CodeIcon,      label: 'Projeler' },
  { href: 'https://github.com/ArelSoftwareClub', Icon: GithubIcon, label: 'GitHub', external: true },
  { href: 'https://linkedin.com/company/arel-yazilim', Icon: LinkedinIcon, label: 'LinkedIn', external: true },
  { href: '/ekip',        Icon: UsersIcon,     label: 'Yönetim Ekibi' },
  { href: '/belgeler',    Icon: FileTextIcon,  label: 'Belgeler / SSS' },
  { href: 'https://www.istanbularel.edu.tr', Icon: UniversityIcon, label: 'Arel Üniversitesi', external: true },
  { href: '/iletisim',    Icon: MailIcon,      label: 'İletişim' },
];

export default function HomePage() {
  const upcomingEvents = events.filter((e) => e.status === 'upcoming').slice(0, 3);
  const featuredAnnouncements = announcements.slice(0, 3);
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);
  const heroTeam = managementTeam.filter((m) => m.featured).slice(0, 4);

  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────── */}
      <section className="hero-section" aria-label="Ana Hero Bölümü" id="home">
        <div className="hero-grid-bg" aria-hidden="true" />
        <div className="hero-glow-1" aria-hidden="true" />
        <div className="hero-glow-2" aria-hidden="true" />

        <div className="container-site" style={{ position: 'relative', zIndex: 10, width: '100%' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            gap: '60px',
            alignItems: 'center',
            padding: '80px 0',
          }}>
            {/* Content */}
            <div>
              {/* Academic year pill */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '8px 18px',
                borderRadius: '999px',
                border: '1px solid rgba(232,83,29,0.3)',
                background: 'rgba(232,83,29,0.10)',
                marginBottom: '24px',
                fontSize: '12px',
                fontWeight: 800,
                letterSpacing: '1.2px',
                textTransform: 'uppercase' as const,
                color: '#FF7755',
                backdropFilter: 'blur(8px)',
              }}>
                <span className="blink-dot" style={{
                  width: '7px', height: '7px', borderRadius: '50%',
                  background: 'var(--orange)', display: 'block', flexShrink: 0,
                }} aria-hidden="true" />
                {siteConfig.academicYear} Akademik Yılı Aktif
              </div>

              {/* Heading */}
              <h1 style={{
                fontSize: 'clamp(44px, 6.5vw, 84px)',
                fontWeight: 900,
                lineHeight: 1.04,
                letterSpacing: '-3px',
                color: '#fff',
                marginBottom: '24px',
              }}>
                Yazılım, Üretim
                <br />ve{' '}
                <span className="gradient-text">Topluluk</span>
                <br />Bir Arada
              </h1>

              <p style={{
                fontSize: '18px',
                lineHeight: 1.75,
                color: 'rgba(255,255,255,0.65)',
                maxWidth: '480px',
                marginBottom: '40px',
              }}>
                İstanbul Arel Üniversitesi Yazılım Kulübü; yapay zekâ, yazılım ve veri bilimi alanlarında
                proje üreten, etkinlikler düzenleyen kariyer odaklı öğrenci topluluğudur.
              </p>

              {/* CTA buttons */}
              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '56px' }}>
                <Link href="/uyelik" className="btn btn-primary btn-lg">
                  Üye Ol Hemen
                </Link>
                <Link href="/etkinlikler" className="btn btn-outline-white btn-lg">
                  Etkinlikler
                </Link>
              </div>

              {/* Stats */}
              <div style={{
                display: 'flex',
                gap: '48px',
                flexWrap: 'wrap',
                paddingTop: '32px',
                borderTop: '1px solid rgba(255,255,255,0.10)',
              }}>
                {[
                  { num: `${siteConfig.stats.members}+`, label: 'Aktif Üye' },
                  { num: `${siteConfig.stats.projects}+`, label: 'Açık Kaynak Proje' },
                  { num: `${siteConfig.stats.events}+`, label: 'Yıllık Etkinlik' },
                ].map(({ num, label }) => (
                  <div key={label}>
                    <div style={{
                      fontSize: '36px', fontWeight: 900,
                      background: 'linear-gradient(180deg, #fff 0%, rgba(255,255,255,0.5) 100%)',
                      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text', lineHeight: 1,
                    }}>{num}</div>
                    <div style={{ marginTop: '6px', fontSize: '13px', color: 'rgba(255,255,255,0.45)' }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Logo visual */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div className="logo-ring">
                <Image
                  src="/images/arel-logo.png"
                  alt="Arel Yazılım Kulübü logosu"
                  width={200}
                  height={200}
                  priority
                  className="float-anim"
                  style={{ objectFit: 'contain', filter: 'brightness(0) invert(1) drop-shadow(0 0 30px rgba(232,83,29,0.4))' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURE STRIP ─────────────────────────────────────── */}
      <div className="feature-strip">
        <div className="container-site">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
            {[
              { Icon: UsersIcon,    strong: `${siteConfig.stats.members}+ Üye`,    span: 'Aktif Topluluk' },
              { Icon: CodeIcon,     strong: `${siteConfig.stats.projects}+ Proje`,  span: 'Açık Kaynak' },
              { Icon: CalendarIcon, strong: `${siteConfig.stats.events}+ Etkinlik`, span: 'Yıllık Takvim' },
              { Icon: ShieldIcon,   strong: siteConfig.stats.status,                span: 'GLO Onaylı Kulüp' },
            ].map(({ Icon, strong, span }) => (
              <div key={strong} className="feature-item">
                <div className="feature-icon"><Icon size={20} /></div>
                <div>
                  <strong style={{ display: 'block', fontSize: '15px', fontWeight: 800, color: 'var(--text)' }}>{strong}</strong>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{span}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── QUICK ACCESS ──────────────────────────────────────── */}
      <section style={{ background: 'var(--bg-alt)', padding: '80px 0' }} aria-labelledby="qa-heading">
        <div className="container-site">
          <div style={{ marginBottom: '40px', textAlign: 'center' }}>
            <span className="label-tag">Portal</span>
            <h2 className="section-title" id="qa-heading">
              Hızlı <span className="gradient-text">Erişim</span>
            </h2>
            <p style={{ marginTop: '12px', color: 'var(--text-2)', maxWidth: '480px', margin: '12px auto 0' }}>
              Kulübün tüm alanlarına tek tıkla ulaşın.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '12px',
          }}>
            {quickAccessItems.map(({ href, Icon, label, external }) => {
              const Tag = external ? 'a' : Link;
              const extraProps = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};
              return (
                <Tag key={label} href={href} {...extraProps as Record<string,string>} className="qa-card">
                  <div className="qa-icon"><Icon size={24} /></div>
                  <span style={{ fontSize: '13px', fontWeight: 700 }}>{label}</span>
                </Tag>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── ANNOUNCEMENTS ─────────────────────────────────────── */}
      <section style={{ background: 'var(--bg-premium)', padding: '80px 0' }} aria-labelledby="ann-heading">
        <div className="container-site">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '36px', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <span className="label-tag">Güncel</span>
              <h2 className="section-title" id="ann-heading">
                Son <span className="gradient-text">Duyurular</span>
              </h2>
            </div>
            <Link href="/duyurular" className="btn btn-ghost btn-sm">Tümünü Gör →</Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {featuredAnnouncements.map((ann, i) => (
              <Link
                key={ann.id}
                href={ann.url ?? '/duyurular'}
                className={`ann-card ${i === 0 ? 'featured' : ''}`}
              >
                <div className={`ann-icon ${i === 0 ? '' : ''}`}>
                  <BellIcon size={20} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <AnnouncementBadge category={ann.category as 'Üyelik' | 'Yarışma' | 'Workshop' | 'Etkinlik' | 'Genel'} />
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{formatDate(ann.date)}</span>
                    {ann.deadline && (
                      <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--orange)' }}>
                        Son Başvuru: {formatDate(ann.deadline)}
                      </span>
                    )}
                  </div>
                  <div style={{ fontWeight: 700, color: 'var(--text)', marginBottom: '4px' }}>{ann.title}</div>
                  <div style={{ fontSize: '14px', color: 'var(--text-2)', lineHeight: 1.6 }}>{ann.summary}</div>
                </div>
                <span style={{ flexShrink: 0, fontWeight: 700, color: 'var(--orange)', fontSize: '13px' }}>
                  Detay →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── EVENTS ────────────────────────────────────────────── */}
      <section style={{ background: 'var(--bg-alt)', padding: '80px 0' }} aria-labelledby="events-heading">
        <div className="container-site">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '36px', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <span className="label-tag">Takvim</span>
              <h2 className="section-title" id="events-heading">
                Yaklaşan <span className="gradient-text">Etkinlikler</span>
              </h2>
            </div>
            <Link href="/etkinlikler" className="btn btn-ghost btn-sm">Tümünü Gör →</Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            {upcomingEvents.map((event) => {
              const accent = event.type === 'Workshop' ? '#E8531D'
                : event.type === 'Hackathon' ? '#7C3AED' : '#15803D';
              return (
                <article key={event.id} className="event-card" style={{ borderTop: `3px solid ${accent}` }}>
                  <div className="event-header">
                    <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)' }}>
                      {formatEventDate(event.date)}
                    </span>
                    <span className={`badge ${event.type === 'Workshop' ? 'badge-orange' : event.type === 'Hackathon' ? 'badge-purple' : 'badge-green'}`}>
                      {event.type}
                    </span>
                  </div>
                  <div style={{ padding: '20px' }}>
                    <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--text)', marginBottom: '8px' }}>{event.title}</h3>
                    <p style={{ fontSize: '14px', color: 'var(--text-2)', lineHeight: 1.65, marginBottom: '16px' }}>{event.description}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '20px' }}>
                      📍 {event.location} {event.capacity ? `· ${event.capacity} Kontenjan` : ''}
                    </div>
                    <Link href="/uyelik" className="btn btn-primary btn-sm">Kayıt Ol</Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ──────────────────────────────────────────── */}
      <section style={{ background: 'var(--bg-premium)', padding: '80px 0' }} aria-labelledby="proj-heading">
        <div className="container-site">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '36px', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <span className="label-tag">Teknik Üretim</span>
              <h2 className="section-title" id="proj-heading">
                Projeler &amp; <span className="gradient-text">Açık Kaynak</span>
              </h2>
            </div>
            <Link href="/projeler" className="btn btn-ghost btn-sm">Tüm Projeler →</Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            {featuredProjects.map((project) => (
              <article key={project.id} className="proj-card">
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <div style={{
                    width: '48px', height: '48px', borderRadius: '12px',
                    background: 'var(--orange-soft)', color: 'var(--orange)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <CodeIcon size={22} />
                  </div>
                  <span className={`badge ${project.status === 'active' ? 'badge-green' : project.status === 'development' ? 'badge-yellow' : 'badge-gray'}`}>
                    {project.status === 'active' ? 'Aktif' : project.status === 'development' ? 'Geliştiriliyor' : 'Tamamlandı'}
                  </span>
                </div>
                <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--text)', marginBottom: '8px' }}>{project.title}</h3>
                <p style={{ fontSize: '14px', color: 'var(--text-2)', lineHeight: 1.65, marginBottom: '16px', flex: 1 }}>{project.description}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                  {project.techStack.map((t) => (
                    <span key={t} style={{
                      padding: '3px 10px', borderRadius: '999px',
                      background: '#F3F4F6', fontSize: '11px', fontWeight: 600, color: 'var(--text-2)',
                    }}>{t}</span>
                  ))}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '14px', borderTop: '1px solid var(--border)' }}>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>👥 {project.team}</span>
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">
                      GitHub ↗
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ──────────────────────────────────────────────── */}
      <section style={{ background: 'var(--bg-alt)', padding: '80px 0' }} aria-labelledby="team-heading">
        <div className="container-site">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '36px', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <span className="label-tag">Ekip</span>
              <h2 className="section-title" id="team-heading">
                Yönetim <span className="gradient-text">Kadrosu</span>
              </h2>
            </div>
            <Link href="/ekip" className="btn btn-ghost btn-sm">Tüm Ekibi Gör →</Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
            {heroTeam.map((member) => (
              <div key={member.id} className="team-card">
                <div className="avatar">{member.initials}</div>
                <div style={{ fontWeight: 800, color: 'var(--text)', fontSize: '15px' }}>{member.name}</div>
                <div style={{ fontWeight: 600, color: 'var(--orange)', fontSize: '13px', margin: '4px 0 2px' }}>{member.role}</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '16px' }}>
                  {member.faculty} · {member.year}
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {member.linkedin && (
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${member.name} LinkedIn`}
                      className="social-btn">in</a>
                  )}
                  {member.github && (
                    <a href={member.github} target="_blank" rel="noopener noreferrer" aria-label={`${member.name} GitHub`}
                      className="social-btn">GH</a>
                  )}
                  {member.email && (
                    <a href={`mailto:${member.email}`} aria-label={`${member.name} e-posta`}
                      className="social-btn">✉</a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section className="cta-section" aria-labelledby="cta-heading">
        <div className="cta-glow" style={{ top: '-100px', left: '-100px' }} aria-hidden="true" />
        <div className="cta-glow" style={{ bottom: '-100px', right: '-100px' }} aria-hidden="true" />
        <div className="container-site" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <h2 id="cta-heading" style={{
            fontSize: 'clamp(30px, 4.5vw, 52px)',
            fontWeight: 900,
            letterSpacing: '-2px',
            color: '#fff',
            marginBottom: '16px',
          }}>
            Topluluğumuza Katıl
          </h2>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.82)', maxWidth: '500px', margin: '0 auto 40px', lineHeight: 1.7 }}>
            Sınıftaki bilgileri gerçek projelere dönüştür. Etkinliklere katıl, ekip kur, kariyer yolculuğuna bugün başla.
          </p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/uyelik" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '18px 40px', borderRadius: '16px',
              background: '#fff', color: 'var(--orange)',
              fontWeight: 800, fontSize: '16px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
              transition: 'all 0.25s ease',
            }}>
              Üyelik Başvurusu
            </Link>
            <Link href="/hakkimizda" style={{
              display: 'inline-flex', alignItems: 'center',
              padding: '18px 40px', borderRadius: '16px',
              border: '2px solid rgba(255,255,255,0.35)',
              background: 'rgba(255,255,255,0.10)',
              color: '#fff', fontWeight: 700, fontSize: '16px',
              backdropFilter: 'blur(8px)',
              transition: 'all 0.25s ease',
            }}>
              Daha Fazla Öğren
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

// ── Icon components ──────────────────────────────────────────
type IconProps = { size?: number };
function UserPlusIcon({ size }: IconProps) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>;
}
function CalendarIcon({ size }: IconProps) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
}
function BellIcon({ size }: IconProps) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>;
}
function CodeIcon({ size }: IconProps) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>;
}
function UsersIcon({ size }: IconProps) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
}
function FileTextIcon({ size }: IconProps) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>;
}
function ShieldIcon({ size }: IconProps) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
}
function UniversityIcon({ size }: IconProps) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>;
}
function MailIcon({ size }: IconProps) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>;
}
function GithubIcon({ size }: IconProps) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>;
}
function LinkedinIcon({ size }: IconProps) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>;
}
