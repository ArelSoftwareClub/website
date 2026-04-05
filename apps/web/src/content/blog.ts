// ── Blog / Teknik Yazılar ──────────────────────────────────────
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string; // HTML / markdown string for static rendering
  author: string;
  authorRole: string;
  authorInitials: string;
  publishedAt: string; // ISO 8601
  readTime: number; // minutes
  tags: string[];
  category: 'Yapay Zeka' | 'Web Geliştirme' | 'Veri Bilimi' | 'Siber Güvenlik' | 'Kariyer' | 'Açık Kaynak';
  featured?: boolean;
  coverGradient?: string; // CSS gradient string
}

export const blogPosts: BlogPost[] = [
  {
    id: 'blog-001',
    slug: 'graf-sinir-aglari-ve-biyoinformatik',
    title: 'Graf Sinir Ağları ile Genomik Varyant Analizi',
    excerpt:
      'GNN teknolojisini biyoinformatik problemlerine nasıl uyguladık? VARIANT-GNN projesinin teknik mimarisi ve aldığımız dersler.',
    content: `
<h2>Giriş</h2>
<p>Graf Sinir Ağları (GNN), moleküler yapılar, sosyal ağlar ve genomik verileri gibi doğası gereği graf biçiminde olan verileri modellemek için son derece güçlü bir araçtır. Arel Yazılım Kulübü ARI Lab ekibi olarak, TEKNOFEST 2026 için geliştirdiğimiz VARIANT-GNN projesinde bu teknolojiyi genomik varyant analizine uyguladık.</p>
<h2>Neden Graf?</h2>
<p>DNA sekansları, amino asit bileşimleri ve protein-protein etkileşimleri gibi biyolojik veriler doğrusal değil, ilişkiseldir. Geleneksel CNN veya RNN mimarileri bu ilişkisel yapıyı tamamen yansıtamaz. GNN'ler ise düğümler (genler/proteinler) ve kenarlar (etkileşimler) aracılığıyla bu yapıyı doğrudan modelleyebilir.</p>
<h2>Mimari Seçimler</h2>
<p>PyTorch Geometric (PyG) framework'ünü tercih ettik çünkü:</p>
<ul>
<li>Büyük graf veri setleri için optimize batch loading</li>
<li>GraphSAGE, GAT ve GCN implementasyonları hazır</li>
<li>CUDA desteğiyle GPU hızlandırması</li>
</ul>
<h2>Sonuçlar</h2>
<p>Geliştirdiğimiz ensemble model, literatürdeki baseline modellere kıyasla %12 F1-score artışı sağladı. Tüm kaynak kodu ArelSoftwareClub GitHub organizasyonunda açık kaynak olarak yayınlanmıştır.</p>
    `.trim(),
    author: 'Muhammed Sina Gün',
    authorRole: 'Genel Koordinatör · ARI Lab',
    authorInitials: 'MSG',
    publishedAt: '2026-03-28',
    readTime: 8,
    tags: ['GNN', 'Python', 'PyTorch', 'Biyoinformatik', 'TEKNOFEST'],
    category: 'Yapay Zeka',
    featured: true,
    coverGradient: 'linear-gradient(135deg, #7C3AED 0%, #4F46E5 100%)',
  },
  {
    id: 'blog-002',
    slug: 'nextjs-15-app-router-rehberi',
    title: 'Next.js 15 App Router: Kapsamlı Geçiş Rehberi',
    excerpt:
      'Pages Router\'dan App Router\'a geçiş sürecinde öğrendiklerimiz. Server Components, Streaming ve caching stratejileri.',
    content: `
<h2>App Router Neden Farklı?</h2>
<p>Next.js 13 ile tanıtılan App Router, React Server Components (RSC) üzerine inşa edilmiş yeni nesil bir routing paradigmasıdır. 15. sürümde stabil hale gelen bu yapı, veri fetching ve caching konusunda köklü değişiklikler getirdi.</p>
<h2>Server vs Client Components</h2>
<p>App Router'da varsayılan olarak tüm bileşenler Server Component'tir. Client Component'e geçmek için dosyanın başına <code>'use client'</code> direktifini eklemeniz gerekir. Bu yaklaşım:</p>
<ul>
<li>İlk sayfa yükleme (TTFB) süresini dramatik azaltır</li>
<li>JavaScript bundle boyutunu küçültür</li>
<li>SEO'yu iyileştirir</li>
</ul>
<h2>Fetch ve Caching</h2>
<p>Next.js 15'te fetch API davranışı değişti: artık varsayılan olarak cache edilmiyor. Caching için <code>force-cache</code> veya <code>revalidate</code> parametrelerini açıkça belirtmeniz gerekiyor.</p>
    `.trim(),
    author: 'Mahsun Ulusal',
    authorRole: 'Başkan Yardımcısı · Web Ekibi',
    authorInitials: 'MU',
    publishedAt: '2026-03-15',
    readTime: 12,
    tags: ['Next.js', 'React', 'TypeScript', 'Web'],
    category: 'Web Geliştirme',
    featured: true,
    coverGradient: 'linear-gradient(135deg, #E8531D 0%, #FF7043 100%)',
  },
  {
    id: 'blog-003',
    slug: 'python-pandas-ile-veri-temizleme',
    title: 'Pandas ile Sağlam Veri Temizleme Pipeline\'ı Kurmak',
    excerpt:
      'Gerçek dünya veri setlerinde karşılaşılan eksik veri, aykırı değer ve format tutarsızlıklarını sistematik olarak çözme rehberi.',
    content: `
<h2>Kirli Veri Gerçeği</h2>
<p>Veri bilimi projelerinin %80'i veri hazırlama aşamasında harcanır. Bu makale, Pandas kullanarak tekrarlanabilir, otomatize edilebilir temizleme pipeline'ları kurmanın pratik yollarını gösteriyor.</p>
<h2>Eksik Veri Stratejileri</h2>
<p>Eksik veri türüne göre strateji seçimi kritiktir:</p>
<ul>
<li>MCAR (Tamamen Rastgele): Listwise deletion güvenli</li>
<li>MAR (Rastgele): Multiple imputation veya model-based</li>
<li>MNAR (Rastgele Değil): Domain knowledge zorunlu</li>
</ul>
<h2>Aykırı Değer Tespiti</h2>
<p>IQR yöntemi ve Z-score'un yanı sıra, Isolation Forest gibi ML tabanlı yöntemler çok boyutlu aykırı değer tespitinde çok daha etkilidir.</p>
    `.trim(),
    author: 'ARI Lab Ekibi',
    authorRole: 'Veri Bilimi Araştırma Grubu',
    authorInitials: 'AL',
    publishedAt: '2026-03-01',
    readTime: 10,
    tags: ['Python', 'Pandas', 'Veri Bilimi', 'EDA'],
    category: 'Veri Bilimi',
    coverGradient: 'linear-gradient(135deg, #0EA5E9 0%, #0284C7 100%)',
  },
  {
    id: 'blog-004',
    slug: 'web-guvenligi-101-temel-kavramlar',
    title: 'Web Güvenliği 101: Her Geliştiricinin Bilmesi Gerekenler',
    excerpt:
      'OWASP Top 10\'dan XSS ve SQL Injection\'a, modern web uygulamalarında en yaygın güvenlik açıklarını ve korunma yöntemlerini inceliyoruz.',
    content: `
<h2>OWASP Top 10 2024</h2>
<p>OWASP (Open Web Application Security Project), her yıl en kritik web güvenlik risklerini sıralayan bir liste yayınlar. 2024 baskısında ilk sıralar şöyle:</p>
<ul>
<li>A01: Broken Access Control</li>
<li>A02: Cryptographic Failures</li>
<li>A03: Injection (XSS, SQLi, vb.)</li>
</ul>
<h2>XSS Saldırıları</h2>
<p>Cross-Site Scripting (XSS), saldırganın güvenilir bir sitede zararlı script çalıştırmasına izin veren açıktır. Content Security Policy (CSP) header'ı ve sanitization kütüphaneleri kullanmak kritik öneme sahiptir.</p>
<h2>SQL Injection</h2>
<p>Parameterized query (prepared statements) kullanımı bu açığı tamamen ortadan kaldırır. Hiçbir zaman user input'ı direkt SQL string'e ekleme!</p>
    `.trim(),
    author: 'Kerim Can Karadağ',
    authorRole: 'Başkan · Siber Güvenlik Ekibi',
    authorInitials: 'KCK',
    publishedAt: '2026-02-18',
    readTime: 7,
    tags: ['Güvenlik', 'OWASP', 'XSS', 'SQL Injection'],
    category: 'Siber Güvenlik',
    coverGradient: 'linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)',
  },
  {
    id: 'blog-005',
    slug: 'acik-kaynak-katkida-bulunmak',
    title: 'İlk Açık Kaynak Katkısını Yapmak: Adım Adım Rehber',
    excerpt:
      'GitHub üzerindeki gerçek projelere nasıl katkıda bulunursunuz? Issue seçmeden PR merge\'e kadar tüm süreç.',
    content: `
<h2>Neden Açık Kaynak?</h2>
<p>Açık kaynak katkıları, CV'nize somut kanıt ekler, gerçek ekip ortamında çalışma deneyimi kazandırır ve global topluluğa katkıda bulunmanın en demokratik yoludur.</p>
<h2>Başlangıç için Doğru Proje</h2>
<ul>
<li>"good first issue" etiketli issue'ları araştır</li>
<li>Kullandığın araçların kaynak koduna bak</li>
<li>ArelSoftwareClub GitHub organizasyonu dahil yerel topluluklardan başla</li>
</ul>
<h2>PR Süreci</h2>
<p>Fork → Clone → Branch → Commit → Push → PR sırasını her zaman takip edin. Commit mesajlarınızı Conventional Commits standardına göre yazın: <code>feat:</code>, <code>fix:</code>, <code>docs:</code> önekleri.</p>
    `.trim(),
    author: 'Mahsun Ulusal',
    authorRole: 'Başkan Yardımcısı',
    authorInitials: 'MU',
    publishedAt: '2026-02-05',
    readTime: 6,
    tags: ['Git', 'GitHub', 'Açık Kaynak', 'Kariyer'],
    category: 'Açık Kaynak',
    coverGradient: 'linear-gradient(135deg, #15803D 0%, #166534 100%)',
  },
  {
    id: 'blog-006',
    slug: 'teknofest-hazirlik-taktikleri',
    title: 'TEKNOFEST\'e Hazırlanmak: Takım Kurma ve Strateji',
    excerpt:
      'Arel Yazılım Kulübü olarak TEKNOFEST deneyimimizden çıkardığımız dersler. Takım kurma, problem seçimi ve sunum taktikleri.',
    content: `
<h2>Doğru Kategori Seçimi</h2>
<p>TEKNOFEST'te başarının ilk adımı, takımınızın gerçekten güçlü olduğu bir kategoriye odaklanmaktır. Yapay Zeka kategorisi rekabet yoğun ama puan potansiyeli yüksek; Yazılım kategorisi ise daha geniş kapsam sunar.</p>
<h2>Takım Kompozisyonu</h2>
<ul>
<li>En az 1 backend/ML mühendisi</li>
<li>En az 1 frontend/UI geliştirici</li>
<li>Sunum/yazarlık konusunda güçlü biri</li>
<li>Domain expert (medikal, çevresel vb. problema göre)</li>
</ul>
<h2>Zaman Planlaması</h2>
<p>Başvuru → ön eleme → teknik rapor → demo günü sıralamasında her aşama için buffer bırakın. Teknik raporunuzda akademik dil kullanın, ama anlaşılır olsun.</p>
    `.trim(),
    author: 'Muhammed Sina Gün',
    authorRole: 'Genel Koordinatör',
    authorInitials: 'MSG',
    publishedAt: '2026-01-20',
    readTime: 9,
    tags: ['TEKNOFEST', 'Kariyer', 'Yarışma', 'Takım'],
    category: 'Kariyer',
    coverGradient: 'linear-gradient(135deg, #D97706 0%, #B45309 100%)',
  },
];
