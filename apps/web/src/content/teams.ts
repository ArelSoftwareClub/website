// ── Alt Topluluklar (Sub-Teams / SIG) ────────────────────────
export interface SubTeam {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  description: string;
  longDescription: string;
  color: string;        // accent color
  gradient: string;     // CSS gradient
  icon: string;         // emoji
  focus: string[];      // what they do
  lead: string;
  leadRole: string;
  leadInitials: string;
  memberCount: number;
  projectCount: number;
  tags: string[];
  contactEmail?: string;
  githubUrl?: string;
  featured?: boolean;
}

export const subTeams: SubTeam[] = [
  {
    id: 'team-ai',
    slug: 'ai',
    name: 'Yapay Zekâ & Makine Öğrenmesi',
    shortName: 'AI Ekibi',
    description:
      'Graf sinir ağları, doğal dil işleme ve bilgisayarla görü alanlarında araştırma ve proje geliştiren ekip.',
    longDescription:
      'ARI Lab bünyesinde faaliyet gösteren AI Ekibi, akademik araştırma ile pratik uygulama arasındaki köprüyü inşa eder. TEKNOFEST, Datathon ve uluslararası yarışmalara aktif katılım; Python, PyTorch ve HuggingFace ekosistemleri üzerinde çalışmalar yürütülür.',
    color: '#7C3AED',
    gradient: 'linear-gradient(135deg, #7C3AED 0%, #4F46E5 100%)',
    icon: '🧠',
    focus: [
      'Graf Sinir Ağları (GNN)',
      'Doğal Dil İşleme (NLP)',
      'Bilgisayarla Görü (CV)',
      'Veri Bilimi & Analitik',
      'Büyük Dil Modelleri (LLM)',
    ],
    lead: 'Muhammed Sina Gün',
    leadRole: 'AI Ekip Lideri',
    leadInitials: 'MSG',
    memberCount: 18,
    projectCount: 4,
    tags: ['Python', 'PyTorch', 'TensorFlow', 'HuggingFace', 'Pandas'],
    contactEmail: 'ai@arelsoftwareclub.dev',
    githubUrl: 'https://github.com/ArelSoftwareClub',
    featured: true,
  },
  {
    id: 'team-web',
    slug: 'web',
    name: 'Web Geliştirme',
    shortName: 'Web Ekibi',
    description:
      'Modern web teknolojileri ile full-stack projeler geliştiren ve kulübün dijital altyapısını yöneten ekip.',
    longDescription:
      'Web Ekibi, Next.js ve React ekosisteminden backend Node.js/Express çözümlerine kadar geniş bir spektrumda çalışır. Kulübün kendi web portalı, üye sistemleri ve açık kaynak araçlar bu ekip tarafından geliştirilir. Hem frontend hem backend deneyimi kazanmak isteyenler için ideal.',
    color: '#E8531D',
    gradient: 'linear-gradient(135deg, #E8531D 0%, #FF7043 100%)',
    icon: '🌐',
    focus: [
      'Next.js & React',
      'Node.js & Express',
      'TypeScript',
      'UI/UX & Tasarım',
      'DevOps & CI/CD',
    ],
    lead: 'Mahsun Ulusal',
    leadRole: 'Web Ekip Lideri',
    leadInitials: 'MU',
    memberCount: 22,
    projectCount: 3,
    tags: ['Next.js', 'React', 'TypeScript', 'Node.js', 'PostgreSQL'],
    contactEmail: 'web@arelsoftwareclub.dev',
    githubUrl: 'https://github.com/ArelSoftwareClub/website',
    featured: true,
  },
  {
    id: 'team-cyber',
    slug: 'cyber',
    name: 'Siber Güvenlik',
    shortName: 'Siber Güvenlik',
    description:
      'Web güvenliği, penetrasyon testleri ve güvenlik araştırmaları konusunda uzmanlaşan ekip.',
    longDescription:
      'Siber Güvenlik Ekibi, etik hacking, CTF (Capture The Flag) yarışmaları ve güvenlic araştırmalarına odaklanır. OWASP standartları, penetrasyon test metodolojileri ve güvenli yazılım geliştirme pratikleri ekibin temel çalışma alanlarıdır. CTF platformlarında aktif yarışma katılımı sağlanır.',
    color: '#DC2626',
    gradient: 'linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)',
    icon: '🛡️',
    focus: [
      'Web Uygulama Güvenliği',
      'CTF (Capture The Flag)',
      'Penetrasyon Testleri',
      'Kriptografi',
      'Güvenli Yazılım Geliştirme',
    ],
    lead: 'Kerim Can Karadağ',
    leadRole: 'Siber Güvenlik Lideri',
    leadInitials: 'KCK',
    memberCount: 14,
    projectCount: 2,
    tags: ['Kali Linux', 'Burp Suite', 'Python', 'CTF', 'OWASP'],
    contactEmail: 'cyber@arelsoftwareclub.dev',
    featured: true,
  },
  {
    id: 'team-data',
    slug: 'data',
    name: 'Veri Bilimi & Analitik',
    shortName: 'Veri Ekibi',
    description:
      'Büyük veri analizi, veri görselleştirme ve tahminsel modelleme üzerine çalışan ekip.',
    longDescription:
      'Veri Ekibi, ham veriden anlamlı içgörüler çıkarma sanatını öğretmeye odaklanır. SQL veritabanı optimizasyonundan Jupyter Notebook tabanlı keşifsel veri analizine, Power BI/Tableau görselleştirme araçlarından istatistiksel modellemeye kadar geniş bir yelpazede çalışırlar. Gerçek veri setleri üzerinde proje deneyimi.',
    color: '#0EA5E9',
    gradient: 'linear-gradient(135deg, #0EA5E9 0%, #0284C7 100%)',
    icon: '📊',
    focus: [
      'Veri Analizi & EDA',
      'Veri Görselleştirme',
      'İstatistiksel Modelleme',
      'SQL & Veritabanı',
      'Business Intelligence',
    ],
    lead: 'Eren Bahadır',
    leadRole: 'Veri Ekip Lideri',
    leadInitials: 'ERB',
    memberCount: 12,
    projectCount: 2,
    tags: ['Python', 'Pandas', 'SQL', 'Tableau', 'Jupyter'],
    contactEmail: 'data@arelsoftwareclub.dev',
    featured: false,
  },
  {
    id: 'team-mobile',
    slug: 'mobile',
    name: 'Mobil Geliştirme',
    shortName: 'Mobil Ekibi',
    description:
      'iOS ve Android platformları için React Native ve Flutter ile cross-platform uygulama geliştiren ekip.',
    longDescription:
      'Mobil Ekibi, akıllı telefon altyapısını kullanarak toplumsal sorunlara çözümler üretmek için çalışır. React Native ve Flutter frameworkleri birincil araçlardır. Uygulama mağazası yayınlama, push notification ve native modül entegrasyonları dahil kapsamlı mobil geliştirme deneyimi sunulur.',
    color: '#15803D',
    gradient: 'linear-gradient(135deg, #15803D 0%, #166534 100%)',
    icon: '📱',
    focus: [
      'React Native',
      'Flutter & Dart',
      'App Store & Google Play',
      'Push Notifications',
      'Native Modüller',
    ],
    lead: 'TBD',
    leadRole: 'Mobil Ekip Lideri',
    leadInitials: 'ME',
    memberCount: 8,
    projectCount: 1,
    tags: ['React Native', 'Flutter', 'Dart', 'JavaScript', 'iOS/Android'],
    contactEmail: 'mobile@arelsoftwareclub.dev',
    featured: false,
  },
];
