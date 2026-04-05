// ── Type Definitions ──────────────────────────────────────────
export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  status: 'active' | 'development' | 'completed' | 'archived';
  techStack: string[];
  team: string;
  teamSlug?: string;
  githubUrl?: string | undefined;
  liveUrl?: string | undefined;
  featured?: boolean | undefined;
  stars?: number;
  forks?: number;
  contributors?: number;
  lastCommit?: string;
  highlights?: string[];
}

export const projects: Project[] = [
  {
    id: 'proj-001',
    slug: 'kulup-web-portali',
    title: 'Kulüp Web Portalı',
    description:
      'Arel Yazılım Kulübü\'nün resmî web portalı. Next.js, TypeScript ve Tailwind CSS ile geliştirilmiş açık kaynak proje.',
    longDescription:
      'Kulübün tüm dijital altyapısını yöneten bu platform; etkinlik yönetimi, üye sistemi, blog yayını ve proje vitrinini tek çatı altında toplar. Next.js 15 App Router, TypeScript strict mode ve Tailwind CSS ile inşa edilmiş; pnpm Turborepo monorepo yapısında yönetilmektedir. Vercel üzerinde otomatik deploy, Railway üzerinde backend barındırma.',
    status: 'active',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Express.js', 'SQLite'],
    team: 'Web Ekibi',
    teamSlug: 'web',
    githubUrl: 'https://github.com/ArelSoftwareClub/website',
    liveUrl: 'https://arelsoftwareclub.github.io',
    featured: true,
    stars: 12,
    forks: 4,
    contributors: 6,
    lastCommit: '2026-04-03',
    highlights: [
      'Next.js 15 App Router ile SSR + SSG',
      'pnpm Turborepo monorepo yapısı',
      'GLO onaylı resmî platform',
      'Vercel + Railway deployment',
    ],
  },
  {
    id: 'proj-002',
    slug: 'variant-gnn',
    title: 'VARIANT-GNN',
    description:
      'Graf Sinir Ağı tabanlı varyant analiz modeli. TEKNOFEST Yapay Zekâ kategorisi araştırma projesi.',
    longDescription:
      'VARIANT-GNN, genomik varyantların patolojik etkisini tahmin etmek için geliştirilmiş Graph Neural Network tabanlı bir araştırma sistemidir. Protein-protein etkileşim ağları üzerinde mesaj geçişi algoritmaları kullanarak BRCA1/2 mutasyonlarını sınıflandırır. TEKNOFEST 2026 Yapay Zekâ kategorisinde yarışma projesidir.',
    status: 'development',
    techStack: ['Python', 'PyTorch', 'PyTorch Geometric', 'Streamlit', 'NumPy'],
    team: 'AI Ekibi',
    teamSlug: 'ai',
    githubUrl: 'https://github.com/ArelSoftwareClub',
    featured: true,
    stars: 8,
    forks: 2,
    contributors: 4,
    lastCommit: '2026-03-28',
    highlights: [
      'Graph Neural Network mimarisi',
      'TEKNOFEST 2026 finalisti',
      'Biyoinformatik + AI entegrasyonu',
      'Açık kaynak araştırma verisi',
    ],
  },
  {
    id: 'proj-003',
    slug: 'veri-analizi-arac-seti',
    title: 'Veri Analizi Araç Seti',
    description:
      'Öğrencilerin veri bilimi projelerinde kullanabileceği Python tabanlı eğitim amaçlı açık kaynak araç seti.',
    longDescription:
      'Pandas, NumPy, Matplotlib ve Seaborn üzerine inşa edilmiş bu araç seti; öğrencilerin veri analizi süreçlerini otomatize etmelerine yardımcı olan hazır fonksiyon koleksiyonu içerir. EDA (Exploratory Data Analysis), temizleme pipeline\'ları ve otomatik rapor üretimi özellikleri bulunur.',
    status: 'development',
    techStack: ['Python', 'Pandas', 'Plotly', 'NumPy', 'Seaborn'],
    team: 'Veri Ekibi',
    teamSlug: 'data',
    highlights: [
      'Otomatik EDA rapor üretimi',
      'Veri temizleme pipeline\'ları',
      'Interaktif visualizations',
    ],
  },
  {
    id: 'proj-004',
    slug: 'arel-smart-campus',
    title: 'Arel Smart Campus',
    description:
      'Kampüs içi enerji yönetimini optimize eden IoT tabanlı akıllı sistem prototipi.',
    longDescription:
      'Arel Kampüsü\'nün enerji tüketimini gerçek zamanlı izleyen ve optimize eden IoT sistemi. Raspberry Pi tabanlı sensör ağı, MQTT protokolü ile merkezi bir Node.js sunucusuna veri iletir. React dashboard ile canlı izleme ve anomali tespiti yapılabilir.',
    status: 'development',
    techStack: ['React', 'Node.js', 'IoT', 'MQTT', 'Raspberry Pi'],
    team: 'Web Ekibi',
    teamSlug: 'web',
    githubUrl: 'https://github.com/ArelSoftwareClub',
    highlights: [
      'Gerçek zamanlı IoT veri akışı',
      'MQTT protokolü',
      'Anomali tespit algoritması',
    ],
  },
  {
    id: 'proj-005',
    slug: 'ari-lab-arastirma-platformu',
    title: 'ARI Lab Araştırma Platformu',
    description:
      'Kulüp araştırma faaliyetlerini koordine eden, literatür takibi ve proje yönetimini bir araya getiren platform.',
    longDescription:
      'ARI Lab üyelerinin akademik makaleleri takip ettiği, araştırma notlarını paylaştığı ve proje koordinasyonunu yürüttüğü internal platform. Next.js frontend, PostgreSQL veritabanı ve Prisma ORM ile inşa edilmektedir.',
    status: 'development',
    techStack: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'NextAuth.js'],
    team: 'ARI Lab Ekibi',
    teamSlug: 'ai',
    highlights: [
      'Akademik makale takibi',
      'Proje koordinasyon araçları',
      'Rol tabanlı erişim sistemi',
    ],
  },
];
