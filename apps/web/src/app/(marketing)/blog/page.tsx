import type { Metadata } from 'next';
import Link from 'next/link';
import { blogPosts } from '@/content/blog';

export const metadata: Metadata = {
  title: 'Blog & Teknik Yazılar',
  description:
    'Arel Yazılım Kulübü teknik blog — yapay zekâ, web geliştirme, veri bilimi ve kariyer üzerine derinlemesine yazılar.',
  alternates: { canonical: '/blog' },
};

const categoryColors: Record<string, string> = {
  'Yapay Zeka': 'badge-purple',
  'Web Geliştirme': 'badge-orange',
  'Veri Bilimi': 'badge-blue',
  'Siber Güvenlik': 'badge-red',
  'Kariyer': 'badge-yellow',
  'Açık Kaynak': 'badge-green',
};

const categories = ['Tümü', 'Yapay Zeka', 'Web Geliştirme', 'Veri Bilimi', 'Siber Güvenlik', 'Kariyer', 'Açık Kaynak'];

export default function BlogPage() {
  const featured = blogPosts.filter((p) => p.featured);
  const rest = blogPosts.filter((p) => !p.featured);

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section
        style={{
          background: 'var(--bg-dark)',
          padding: '80px 0 60px',
          position: 'relative',
          overflow: 'hidden',
        }}
        aria-labelledby="blog-heading"
      >
        <div
          style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)',
            backgroundSize: '48px 48px',
          }}
          aria-hidden="true"
        />
        <div className="container-site" style={{ position: 'relative', zIndex: 1 }}>
          <span className="label-tag">İçerik</span>
          <h1
            id="blog-heading"
            style={{
              fontSize: 'clamp(36px, 5vw, 60px)',
              fontWeight: 900,
              letterSpacing: '-2px',
              color: '#fff',
              lineHeight: 1.1,
              marginBottom: '16px',
            }}
          >
            Blog &{' '}
            <span className="gradient-text">Teknik Yazılar</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '17px', maxWidth: '520px', lineHeight: 1.7 }}>
            Kulüp üyelerimizin yazdığı derinlemesine teknik yazılar, kariyer rehberleri ve araştırma notları.
          </p>

          {/* Category pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '32px' }}>
            {categories.map((cat) => (
              <span
                key={cat}
                style={{
                  padding: '6px 16px',
                  borderRadius: '999px',
                  fontSize: '12px',
                  fontWeight: 700,
                  background: cat === 'Tümü' ? 'var(--orange)' : 'rgba(255,255,255,0.07)',
                  color: cat === 'Tümü' ? '#fff' : 'rgba(255,255,255,0.6)',
                  border: '1px solid',
                  borderColor: cat === 'Tümü' ? 'var(--orange)' : 'rgba(255,255,255,0.12)',
                  cursor: 'pointer',
                }}
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED ─────────────────────────────────────────── */}
      <section style={{ background: 'var(--bg-alt)', padding: '72px 0' }} aria-labelledby="featured-heading">
        <div className="container-site">
          <div style={{ marginBottom: '32px' }}>
            <span className="label-tag">Öne Çıkan</span>
            <h2 className="section-title" id="featured-heading">
              Editörün <span className="gradient-text">Seçimi</span>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
            {featured.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
                <article
                  style={{
                    borderRadius: 'var(--radius-lg)',
                    overflow: 'hidden',
                    background: '#fff',
                    border: '1.5px solid var(--border)',
                    boxShadow: 'var(--glass-shadow)',
                    transition: 'var(--transition)',
                    height: '100%',
                  }}
                  className="card"
                >
                  {/* Cover gradient */}
                  <div
                    style={{
                      height: '160px',
                      background: post.coverGradient ?? 'linear-gradient(135deg, #E8531D 0%, #FF7043 100%)',
                      display: 'flex',
                      alignItems: 'flex-end',
                      padding: '20px',
                    }}
                  >
                    <span
                      style={{
                        padding: '4px 12px',
                        borderRadius: '999px',
                        background: 'rgba(255,255,255,0.2)',
                        backdropFilter: 'blur(8px)',
                        fontSize: '11px',
                        fontWeight: 700,
                        color: '#fff',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                      }}
                    >
                      {post.category}
                    </span>
                  </div>
                  <div style={{ padding: '24px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text)', marginBottom: '10px', lineHeight: 1.3 }}>
                      {post.title}
                    </h3>
                    <p style={{ fontSize: '14px', color: 'var(--text-2)', lineHeight: 1.65, marginBottom: '20px' }}>
                      {post.excerpt}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div
                          style={{
                            width: '32px', height: '32px', borderRadius: '50%',
                            background: 'linear-gradient(135deg, var(--orange) 0%, var(--orange-v) 100%)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '11px', fontWeight: 900, color: '#fff',
                          }}
                        >
                          {post.authorInitials}
                        </div>
                        <div>
                          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text)' }}>{post.author}</div>
                          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{post.readTime} dk okuma</div>
                        </div>
                      </div>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--orange)' }}>Oku →</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── ALL POSTS ─────────────────────────────────────────── */}
      <section style={{ background: 'var(--bg-premium)', padding: '72px 0' }} aria-labelledby="all-posts-heading">
        <div className="container-site">
          <div style={{ marginBottom: '32px' }}>
            <span className="label-tag">Tüm Yazılar</span>
            <h2 className="section-title" id="all-posts-heading">
              Son <span className="gradient-text">Yazılar</span>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            {rest.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
                <article className="card" style={{ padding: '24px', height: '100%', display: 'flex', flexDirection: 'column' }}>
                  {/* Top color strip */}
                  <div
                    style={{
                      height: '4px', borderRadius: '999px',
                      background: post.coverGradient ?? 'var(--orange)',
                      marginBottom: '18px',
                    }}
                  />
                  <div style={{ marginBottom: '10px' }}>
                    <span className={`badge badge-orange`} style={{ fontSize: '10px' }}>
                      {post.category}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text)', marginBottom: '8px', lineHeight: 1.35, flex: 1 }}>
                    {post.title}
                  </h3>
                  <p style={{ fontSize: '13px', color: 'var(--text-2)', lineHeight: 1.6, marginBottom: '16px' }}>
                    {post.excerpt.slice(0, 100)}…
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '16px' }}>
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        style={{ padding: '2px 8px', borderRadius: '999px', background: '#F3F4F6', fontSize: '10px', fontWeight: 600, color: 'var(--text-2)' }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '14px', borderTop: '1px solid var(--border)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div
                        style={{
                          width: '26px', height: '26px', borderRadius: '50%',
                          background: 'linear-gradient(135deg, var(--orange) 0%, var(--orange-v) 100%)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: '9px', fontWeight: 900, color: '#fff',
                        }}
                      >
                        {post.authorInitials}
                      </div>
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{post.author.split(' ')[0]}</span>
                    </div>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>⏱ {post.readTime} dk</span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA — Write for Us ─────────────────────────────────── */}
      <section style={{ background: 'var(--bg-alt)', padding: '72px 0' }} aria-labelledby="blog-cta">
        <div className="container-site" style={{ textAlign: 'center' }}>
          <span className="label-tag" style={{ display: 'block', marginBottom: '12px' }}>Katkıda Bulun</span>
          <h2 className="section-title" id="blog-cta" style={{ marginBottom: '16px' }}>
            Siz de <span className="gradient-text">Yazın</span>
          </h2>
          <p style={{ color: 'var(--text-2)', maxWidth: '480px', margin: '0 auto 32px', lineHeight: 1.7 }}>
            Teknik deneyimlerinizi, öğrendiklerinizi veya araştırmalarınızı toplulukla paylaşmak ister misiniz?
            Blog editörlerimize başvurun.
          </p>
          <Link href="/iletisim" className="btn btn-primary">
            Yazı Gönderin
          </Link>
        </div>
      </section>
    </>
  );
}
