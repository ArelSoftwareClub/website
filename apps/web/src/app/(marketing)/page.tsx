import type { Metadata } from 'next';
import Link from 'next/link';
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
  alternates: { canonical: '/website' },
};

const stats = [
  { value: '250+', label: 'Aktif Üye', suffix: '' },
  { value: '15+', label: 'Proje', suffix: '' },
  { value: '40+', label: 'Etkinlik', suffix: '' },
  { value: '%100', label: 'Ücretsiz', suffix: '' },
];

const values = [
  {
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" class="w-5 h-5"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>`,
    title: 'Gerçek Projeler',
    description: 'Portfolyona değer katacak açık kaynak projelerde çalış',
  },
  {
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" class="w-5 h-5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
    title: 'Kariyer Ağı',
    description: 'Sektör profesyonelleriyle networking fırsatları',
  },
  {
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" class="w-5 h-5"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>`,
    title: 'Eğitimler',
    description: 'Sektör profesyonellerinden ücretsiz teknik workshoplar',
  },
  {
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" class="w-5 h-5"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`,
    title: 'Hackathonlar',
    description: 'TEKNOFEST ve ulusal yarışmalarda takım kur',
  },
];

const socialProof = [
  { metric: '12+', label: 'GitHub Stars', icon: '⭐' },
  { metric: '6+', label: 'Aktif Geliştirici', icon: '👥' },
  { metric: '3+', label: 'Yıllık Tecrübe', icon: '📅' },
];

export default function HomePage() {
  const upcomingEvents = events.filter((e) => e.status === 'upcoming').slice(0, 3);
  const featuredAnnouncements = announcements.slice(0, 2);
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);
  const heroTeam = managementTeam.filter((m) => m.featured).slice(0, 4);

  return (
    <>
      {/* ── HERO SECTION ───────────────────────────────────────────── */}
      <section 
        className="relative min-h-[92vh] flex items-center overflow-hidden bg-slate-900 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800"
        aria-label="Ana Bölüm"
        id="home"
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-[0.03]" 
            style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '64px 64px' }} 
          />
          
          {/* Glow orbs */}
          <div className="absolute -top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-blue-500/10 blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-indigo-500/10 blur-[100px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-blue-600/5 blur-[150px]" />
          
          {/* Floating code elements */}
          <div className="absolute top-[15%] right-[10%] opacity-10 text-white font-mono text-xs leading-relaxed">
            <div className="animate-pulse">{`{`}</div>
            <div className="ml-4 animate-pulse delay-75">{`"tech": "future"`}</div>
            <div className="ml-2 animate-pulse delay-150">{`"community": true`}</div>
            <div className="animate-pulse delay-200">{`}`}</div>
          </div>
        </div>

        <div className="container-site relative z-10 py-20">
          <div className="grid gap-16 lg:grid-cols-[1.1fr_1fr] lg:items-center">
            {/* Left: Content */}
            <div className="max-w-2xl">
              {/* Top badge */}
              <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-[11px] font-bold uppercase tracking-[1.5px] text-blue-400 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500"></span>
                </span>
                {siteConfig.academicYear} Akademik Yılı Aktif
              </div>

              {/* Main heading */}
              <h1 className="mb-6 text-[clamp(38px,5.5vw,72px)] font-black leading-[1.05] tracking-[-2.5px] text-white">
                Kod Yaz,
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  Topluluk Oluştur
                </span>
              </h1>

              <p className="mb-8 text-lg leading-[1.75] text-slate-300 max-w-xl">
                İstanbul Arel Üniversitesi&apos;nin lider yazılım topluluğu. 
                Yapay zeka, web ve veri bilimi alanında gerçek projeler üretiyor, 
                kariyerine yön vermek isteyen öğrencileri bir araya getiriyoruz.
              </p>

              {/* CTA buttons */}
              <div className="mb-10 flex flex-wrap gap-4">
                <Link 
                  href="/uyelik" 
                  className="group inline-flex items-center gap-2.5 rounded-xl bg-blue-500 px-7 py-4 text-[15px] font-bold text-white shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-1 hover:bg-blue-600 hover:shadow-xl hover:shadow-blue-500/40"
                >
                  Hemen Üye Ol
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-4 w-4 transition-transform group-hover:translate-x-1">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link 
                  href="/etkinlikler" 
                  className="inline-flex items-center gap-2.5 rounded-xl border border-white/20 bg-white/5 px-7 py-4 text-[15px] font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/30"
                >
                  Etkinlikleri Keşfet
                </Link>
              </div>

          {/* Stats row with Legal Links */}
          <div className="flex flex-wrap items-center gap-x-12 gap-y-6 border-t border-white/10 pt-8">
            <div className="flex flex-wrap gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="group">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-white">{stat.value}</span>
                    <span className="text-lg font-bold text-blue-400">{stat.suffix}</span>
                  </div>
                  <div className="mt-1 text-xs font-medium text-slate-400">{stat.label}</div>
                </div>
              ))}
            </div>
            
            {/* Quick Access Legal Links in Hero */}
            <div className="flex flex-wrap gap-4 border-l border-white/10 pl-8 hidden md:flex">
              <Link href="/belgeler" className="text-[11px] font-bold uppercase tracking-wider text-slate-400 hover:text-white transition-colors">Tüzük & Yönetmelik</Link>
              <Link href="/gizlilik#kvkk" className="text-[11px] font-bold uppercase tracking-wider text-slate-400 hover:text-white transition-colors">KVKK</Link>
            </div>
          </div>
            </div>

            {/* Right: Visual */}
            <div className="hidden lg:block relative">
              <div className="relative mx-auto w-full max-w-md">
                {/* Floating cards effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl blur-2xl opacity-30 animate-pulse" />
                
                {/* Main card */}
                <div className="relative rounded-2xl border border-white/10 bg-slate-800/50 backdrop-blur-xl p-6 shadow-2xl">
                  {/* Code preview */}
                  <div className="mb-4 flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="h-3 w-3 rounded-full bg-red-500/80" />
                      <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                      <div className="h-3 w-3 rounded-full bg-green-500/80" />
                    </div>
                    <span className="ml-2 text-xs text-slate-500 font-mono">app.tsx</span>
                  </div>
                  
                  <pre className="text-xs leading-relaxed font-mono text-slate-300 overflow-x-auto">
                    <code>{`// Arel Software Club
const community = {
  founded: 2022,
  members: 250,
  focus: ['AI', 'Web', 'Data'],
  join: async () => {
    await startJourney();
    return await buildFuture();
  }
};

// Sen de katıl!
await community.join();`}</code>
                  </pre>

                  {/* Floating badge */}
                  <div className="absolute -right-4 -top-4 rounded-xl border border-white/10 bg-slate-900/80 px-4 py-3 shadow-xl backdrop-blur-md">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/20 text-green-400">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-5 w-5">
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                          <polyline points="22 4 12 14.01 9 11.01" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">Aktif Topluluk</div>
                        <div className="text-xs text-slate-400">Her hafta yeni etkinlik</div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom floating badges */}
                  <div className="absolute -bottom-3 -left-3 flex gap-2">
                    <div className="rounded-lg border border-white/10 bg-slate-800/90 px-3 py-2 shadow-lg backdrop-blur-md">
                      <div className="text-xs text-slate-400">GitHub</div>
                      <div className="text-sm font-bold text-white">⭐ 12+ Stars</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ── PARTNERS SECTION (NEW) ─────────────────────────────────── */}
      <section className="bg-slate-50 border-y border-slate-200 py-12 overflow-hidden">
        <div className="container-site text-center">
          <span className="mb-8 block text-[13px] font-black uppercase tracking-[3px] text-slate-600">
            Resmi İş Birliklerimiz & Partnerlerimiz
          </span>
          <div className="flex flex-wrap items-center justify-center gap-16 transition-all duration-500">
            {/* Placeholder for university logo */}
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-slate-200 border-2 border-slate-300" />
              <div className="flex flex-col items-start leading-none">
                <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">Bağlı Kurum</span>
                <span className="text-xl font-black text-slate-900 tracking-tighter">AREL ÜNİVERSİTESİ</span>
              </div>
            </div>
            {/* Other partners */}
            <div className="text-xl font-black text-slate-800 tracking-tighter">GOOGLE CLOUD</div>
            <div className="text-xl font-black text-slate-800 tracking-tighter">MICROSOFT AZURE</div>
            <div className="text-xl font-black text-slate-800 tracking-tighter">AWS EDU</div>
            <div className="text-xl font-black text-slate-800 tracking-tighter">GITHUB CAMPUS</div>
          </div>
        </div>
      </section>

      {/* ── VALUES SECTION ─────────────────────────────────────────── */}
      <section className="bg-white py-24" aria-labelledby="values-heading">
        <div className="container-site">
          <div className="mb-16 text-center">
            <span className="mb-3 block text-xs font-bold uppercase tracking-[2px] text-blue-600">
              Neden Katılmalısın?
            </span>
            <h2 id="values-heading" className="text-[clamp(32px,4.5vw,48px)] font-black tracking-tighter text-slate-900">
              Sadece <span className="text-blue-600">Üye</span> Değil, <span className="text-blue-600">Gelecek</span> Kur
            </h2>
            <div className="mx-auto mt-4 h-1.5 w-20 rounded-full bg-blue-600/10" />
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((item, i) => (
              <div 
                key={item.title}
                className="group relative rounded-2xl border border-slate-200 bg-slate-50/30 p-8 transition-all hover:-translate-y-2 hover:border-blue-200 hover:bg-white hover:shadow-2xl hover:shadow-blue-500/10"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-500/20 transition-transform group-hover:scale-110">
                  <span dangerouslySetInnerHTML={{ __html: item.icon }} />
                </div>
                <h3 className="mb-3 text-xl font-extrabold text-slate-900">{item.title}</h3>
                <p className="text-sm leading-relaxed text-slate-500 font-medium">{item.description}</p>
                
                {/* Subtle indicator */}
                <div className="absolute bottom-6 right-8 opacity-0 transition-opacity group-hover:opacity-100">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="h-4 w-4 text-blue-400">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── UPCOMING EVENTS ───────────────────────────────────────── */}
      <section className="bg-slate-50 py-20" aria-labelledby="events-heading">
        <div className="container-site">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="mb-3 block text-xs font-bold uppercase tracking-[1.5px] text-blue-600">
                Yaklaşan Etkinlikler
              </span>
              <h2 id="events-heading" className="text-[clamp(28px,4vw,42px)] font-black tracking-tight text-slate-900">
                Önümüzdeki <span className="text-blue-600">Etkinlikler</span>
              </h2>
            </div>
            <Link href="/etkinlikler" className="btn btn-ghost btn-sm">
              Tüm Etkinlikler →
            </Link>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {upcomingEvents.map((event) => {
              const accentColor = event.type === 'Workshop' ? '#2563eb' : event.type === 'Hackathon' ? '#7C3AED' : '#15803D';
              return (
                <article
                  key={event.id}
                  className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all hover:-translate-y-1 hover:shadow-xl"
                  style={{ borderTop: `3px solid ${accentColor}` }}
                >
                  <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      {formatEventDate(event.date)}
                    </span>
                    <span 
                      className="rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider"
                      style={{ backgroundColor: `${accentColor}15`, color: accentColor }}
                    >
                      {event.type}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="mb-2 text-[17px] font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {event.title}
                    </h3>
                    <p className="mb-4 text-sm leading-relaxed text-slate-500 line-clamp-2">
                      {event.description}
                    </p>
                    <div className="mb-4 flex items-center gap-1.5 text-xs text-slate-400">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      {event.location}
                    </div>
                    {event.registrationUrl ? (
                      <a 
                        href={event.registrationUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2.5 text-sm font-bold text-white transition-all hover:bg-blue-600"
                      >
                        Kayıt Ol
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                        </svg>
                      </a>
                    ) : (
                      <Link href="/iletisim" className="btn btn-ghost btn-sm">
                        Bilgi Al
                      </Link>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FEATURED PROJECTS ────────────────────────────────────── */}
      <section className="bg-white py-20" aria-labelledby="proj-heading">
        <div className="container-site">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="mb-3 block text-xs font-bold uppercase tracking-[1.5px] text-blue-600">
                Açık Kaynak
              </span>
              <h2 id="proj-heading" className="text-[clamp(28px,4vw,42px)] font-black tracking-tight text-slate-900">
                Öne Çıkan <span className="text-blue-600">Projeler</span>
              </h2>
            </div>
            <Link href="/projeler" className="btn btn-ghost btn-sm">
              Tüm Projeler →
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <article 
                key={project.id} 
                className="group relative flex flex-col rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
              >
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
                      <polyline points="16 18 22 12 16 6" />
                      <polyline points="8 6 2 12 8 18" />
                    </svg>
                  </div>
                  <span className={`badge ${
                    project.status === 'active' ? 'badge-green' : 
                    project.status === 'development' ? 'badge-yellow' : 'badge-gray'
                  }`}>
                    {project.status === 'active' ? 'Aktif' : project.status === 'development' ? 'Geliştiriliyor' : 'Tamamlandı'}
                  </span>
                </div>
                <h3 className="mb-2 text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {project.title}
                </h3>
                <p className="mb-4 flex-1 text-sm leading-relaxed text-slate-500">
                  {project.description}
                </p>
                <div className="mb-4 flex flex-wrap gap-1.5">
                  {project.techStack.slice(0, 4).map((t) => (
                    <span key={t} className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-semibold text-slate-600">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                  <span className="text-xs text-slate-400">👥 {project.team}</span>
                  {project.githubUrl && (
                    <a 
                      href={project.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-sm font-semibold text-slate-600 transition-colors hover:text-blue-600"
                    >
                      GitHub
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                      </svg>
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF / TEAM ───────────────────────────────────── */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 py-20" aria-labelledby="team-heading">
        <div className="container-site">
          <div className="mb-12 text-center">
            <span className="mb-3 block text-xs font-bold uppercase tracking-[1.5px] text-blue-400">
              Yönetim Kadromuz
            </span>
            <h2 id="team-heading" className="text-[clamp(28px,4vw,42px)] font-black tracking-tight text-white">
              Birlikte <span className="text-blue-400">Büyüyoruz</span>
            </h2>
          </div>

          <div className="mx-auto grid max-w-4xl grid-cols-2 gap-6 sm:grid-cols-4">
            {heroTeam.map((member) => (
              <div key={member.id} className="group text-center">
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-2xl font-black text-white shadow-lg shadow-blue-500/30 transition-transform group-hover:scale-105">
                  {member.initials}
                </div>
                <div className="text-[15px] font-bold text-white">{member.name}</div>
                <div className="mb-3 mt-1 text-[13px] font-semibold text-blue-400">{member.role}</div>
                <div className="flex justify-center gap-2">
                  {member.linkedin && (
                    <a 
                      href={member.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      aria-label={`${member.name} LinkedIn`}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-white/60 transition-all hover:border-blue-500 hover:text-blue-400"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                  )}
                  {member.github && (
                    <a 
                      href={member.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      aria-label={`${member.name} GitHub`}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-white/60 transition-all hover:border-blue-500 hover:text-blue-400"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Social proof stats */}
          <div className="mt-12 flex flex-wrap justify-center gap-8 border-t border-white/10 pt-10">
            {socialProof.map((item) => (
              <div key={item.label} className="text-center">
                <div className="text-2xl">
                  <span className="mr-1">{item.icon}</span>
                  <span className="text-3xl font-black text-white">{item.metric}</span>
                </div>
                <div className="mt-1 text-sm text-slate-400">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ANNOUNCEMENTS ─────────────────────────────────────────── */}
      {featuredAnnouncements.length > 0 && (
        <section className="bg-slate-50/80 py-24" aria-labelledby="ann-heading">
          <div className="container-site">
            <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
              <div>
                <span className="mb-3 block text-xs font-bold uppercase tracking-[2px] text-blue-600">
                  Topluluktan Haberler
                </span>
                <h2 id="ann-heading" className="text-[clamp(32px,4.5vw,48px)] font-black tracking-tighter text-slate-900">
                  Son <span className="text-blue-600">Duyurular</span>
                </h2>
              </div>
              <Link href="/duyurular" className="btn btn-ghost btn-sm font-bold">
                Tümünü Gör →
              </Link>
            </div>

            <div className="flex flex-col gap-5">
              {featuredAnnouncements.map((ann, i) => (
                <Link
                  key={ann.id}
                  href={ann.url ?? '/duyurular'}
                  className={`group flex items-start gap-6 rounded-2xl border border-slate-200 bg-white p-8 transition-all hover:-translate-y-1 hover:border-blue-300 hover:shadow-2xl ${
                    i === 0 ? 'border-l-8 border-l-blue-600' : ''
                  }`}
                >
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 transition-all group-hover:bg-blue-600 group-hover:text-white">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-7 w-7">
                      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="mb-3 flex flex-wrap items-center gap-3">
                      <AnnouncementBadge category={ann.category as any} />
                      <span className="text-xs font-bold text-slate-400">{formatDate(ann.date)}</span>
                      {ann.deadline && (
                        <span className="rounded-full bg-red-50 px-3 py-1 text-[10px] font-black uppercase text-red-600">
                          ⏳ Son Başvuru: {formatDate(ann.deadline)}
                        </span>
                      )}
                    </div>
                    <div className="mb-2 text-lg font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                      {ann.title}
                    </div>
                    <div className="text-sm font-medium leading-relaxed text-slate-500 line-clamp-2">{ann.summary}</div>
                  </div>
                  <div className="ml-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-100 text-blue-600 transition-all group-hover:bg-blue-600 group-hover:text-white">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="h-4 w-4">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── NEWSLETTER SECTION (NEW) ────────────────────────────────── */}
      <section className="bg-white py-24 border-t border-slate-100">
        <div className="container-site">
          <div className="relative overflow-hidden rounded-[32px] bg-slate-900 p-8 md:p-16">
            {/* Background elements */}
            <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-blue-600/20 to-transparent" />
            <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-blue-500/10 blur-[80px]" />
            
            <div className="relative z-10 grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 className="mb-4 text-[clamp(28px,4vw,42px)] font-black tracking-tight text-white">
                  Gelişmelerden <span className="text-blue-400">Haberdar</span> Ol
                </h2>
                <p className="text-lg text-slate-400">
                  Yeni etkinlikler, proje çağrıları ve teknoloji dünyasından seçmeler her hafta e-posta kutunda.
                </p>
              </div>
              
              <div className="flex flex-col gap-4 sm:flex-row">
                <input 
                  type="email" 
                  placeholder="E-posta adresin"
                  className="flex-1 rounded-xl border border-slate-700 bg-slate-800/50 px-6 py-4 text-white outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />
                <button className="rounded-xl bg-blue-600 px-8 py-4 font-black text-white transition-all hover:bg-blue-500 hover:shadow-xl hover:shadow-blue-500/20 active:scale-95">
                  Abone Ol
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA SECTION ───────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 py-24" aria-labelledby="cta-heading">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        </div>
        
        <div className="container-site relative z-10 text-center">
          <h2 id="cta-heading" className="mb-4 text-[clamp(32px,4.5vw,52px)] font-black tracking-tight text-white">
            Hayalindeki Kariyere <br className="hidden sm:block" />
            <span className="text-blue-300">Bugün Başla</span>
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-lg leading-relaxed text-blue-100">
            250+ aktif üye, 15+ proje, 40+ etkinlik. 
            Sınıftaki bilgilerini gerçek dünya projelerine dönüştür.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/uyelik" 
              className="inline-flex items-center gap-2.5 rounded-xl bg-white px-8 py-4 text-[16px] font-bold text-blue-600 shadow-xl transition-all hover:-translate-y-1 hover:shadow-2xl"
            >
              Ücretsiz Üye Ol
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-4 w-4">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link 
              href="/hakkimizda" 
              className="inline-flex items-center gap-2.5 rounded-xl border-2 border-white/30 bg-white/10 px-8 py-4 text-[16px] font-bold text-white backdrop-blur-sm transition-all hover:bg-white/20"
            >
              Daha Fazla Öğren
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}