import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { blogPosts } from '@/content/blog';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author],
      tags: post.tags,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const related = blogPosts.filter((p) => p.slug !== slug && p.category === post.category).slice(0, 2);
  const formatted = new Intl.DateTimeFormat('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' }).format(
    new Date(post.publishedAt),
  );

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section
        style={{
          background: post.coverGradient ?? 'linear-gradient(135deg, var(--orange) 0%, #FF7043 100%)',
          padding: '80px 0 60px',
          position: 'relative',
          overflow: 'hidden',
        }}
        aria-labelledby="post-heading"
      >
        <div
          style={{
            position: 'absolute', inset: 0,
            background: 'rgba(0,0,0,0.35)',
          }}
          aria-hidden="true"
        />
        <div className="container-site" style={{ position: 'relative', zIndex: 1, maxWidth: '800px' }}>
          <div style={{ marginBottom: '16px' }}>
            <Link href="/blog" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', fontWeight: 600, textDecoration: 'none' }}>
              ← Blog&apos;a Dön
            </Link>
          </div>
          <div style={{ marginBottom: '12px' }}>
            <span
              style={{
                padding: '4px 14px', borderRadius: '999px',
                background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)',
                fontSize: '11px', fontWeight: 700, color: '#fff',
                textTransform: 'uppercase', letterSpacing: '1px',
              }}
            >
              {post.category}
            </span>
          </div>
          <h1
            id="post-heading"
            style={{
              fontSize: 'clamp(28px, 4.5vw, 48px)',
              fontWeight: 900,
              letterSpacing: '-1.5px',
              color: '#fff',
              lineHeight: 1.15,
              marginBottom: '20px',
            }}
          >
            {post.title}
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '40px', height: '40px', borderRadius: '50%',
                  background: 'rgba(255,255,255,0.25)', backdropFilter: 'blur(8px)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '13px', fontWeight: 900, color: '#fff',
                }}
              >
                {post.authorInitials}
              </div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#fff' }}>{post.author}</div>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.65)' }}>{post.authorRole}</div>
              </div>
            </div>
            <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px' }}>·</span>
            <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: '13px' }}>{formatted}</span>
            <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px' }}>·</span>
            <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: '13px' }}>⏱ {post.readTime} dk okuma</span>
          </div>
        </div>
      </section>

      {/* ── CONTENT ──────────────────────────────────────────── */}
      <section style={{ background: 'var(--bg-premium)', padding: '64px 0 80px' }}>
        <div className="container-site" style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '60px', alignItems: 'start' }}>
          {/* Main article */}
          <article>
            {/* Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '32px' }}>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  style={{ padding: '4px 12px', borderRadius: '999px', background: '#F3F4F6', fontSize: '12px', fontWeight: 600, color: 'var(--text-2)' }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Prose content */}
            <div
              className="prose prose-slate max-w-none prose-headings:font-black prose-headings:tracking-tight prose-a:text-orange-DEFAULT prose-code:bg-slate-100 prose-code:rounded prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Share / navigation */}
            <div
              style={{
                marginTop: '56px', paddingTop: '32px',
                borderTop: '1px solid var(--border)',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px',
              }}
            >
              <Link href="/blog" className="btn btn-ghost btn-sm">← Tüm Yazılar</Link>
              <div style={{ display: 'flex', gap: '8px' }}>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent('https://arelsoftwareclub.github.io/blog/' + post.slug)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost btn-sm"
                >
                  Paylaş
                </a>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside style={{ position: 'sticky', top: '96px' }}>
            {/* Author card */}
            <div
              style={{
                background: '#fff',
                border: '1.5px solid var(--border)',
                borderRadius: 'var(--radius-lg)',
                padding: '24px',
                marginBottom: '24px',
              }}
            >
              <div style={{ fontWeight: 800, color: 'var(--text)', marginBottom: '12px', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Yazar
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div
                  style={{
                    width: '48px', height: '48px', borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--orange) 0%, var(--orange-v) 100%)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '14px', fontWeight: 900, color: '#fff', flexShrink: 0,
                  }}
                >
                  {post.authorInitials}
                </div>
                <div>
                  <div style={{ fontWeight: 800, color: 'var(--text)', fontSize: '15px' }}>{post.author}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{post.authorRole}</div>
                </div>
              </div>
            </div>

            {/* Related posts */}
            {related.length > 0 && (
              <div
                style={{
                  background: '#fff',
                  border: '1.5px solid var(--border)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '24px',
                }}
              >
                <div style={{ fontWeight: 800, color: 'var(--text)', marginBottom: '16px', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  İlgili Yazılar
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {related.map((rel) => (
                    <Link key={rel.id} href={`/blog/${rel.slug}`} style={{ textDecoration: 'none' }}>
                      <div
                        style={{
                          padding: '12px',
                          borderRadius: 'var(--radius-md)',
                          border: '1px solid var(--border)',
                          transition: 'var(--transition)',
                        }}
                        className="card"
                      >
                        <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text)', marginBottom: '4px', lineHeight: 1.35 }}>
                          {rel.title}
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>⏱ {rel.readTime} dk</div>
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
