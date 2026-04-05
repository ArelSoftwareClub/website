// ── Sponsors & Partners ───────────────────────────────────────
export type SponsorTier = 'platinum' | 'gold' | 'silver' | 'community';

export interface Sponsor {
  id: string;
  name: string;
  description: string;
  website: string;
  tier: SponsorTier;
  since: string; // year
  industry: string;
  benefit: string; // what they provide to club
}

export const sponsors: Sponsor[] = [
  {
    id: 'sp-001',
    name: 'Cloudly Technology',
    description: 'Bulut altyapı ve DevOps çözümleri konusunda lider Türk teknoloji şirketi.',
    website: 'https://cloudly.com.tr',
    tier: 'platinum',
    since: '2024',
    industry: 'Cloud & DevOps',
    benefit: 'Ücretsiz cloud hosting + staj pozisyonları',
  },
  {
    id: 'sp-002',
    name: 'JetBrains',
    description: 'Dünyaca ünlü geliştirici araçları şirketi. IntelliJ IDEA, PyCharm ve daha fazlası.',
    website: 'https://jetbrains.com',
    tier: 'gold',
    since: '2023',
    industry: 'Developer Tools',
    benefit: 'Tüm JetBrains ürünlerine ücretsiz lisans',
  },
  {
    id: 'sp-003',
    name: 'GitHub Education',
    description: 'GitHub\'ın öğrenci ve akademik topluluk programı.',
    website: 'https://education.github.com',
    tier: 'gold',
    since: '2022',
    industry: 'Developer Platform',
    benefit: 'GitHub Pro + 100+ araç ücretsiz erişim',
  },
  {
    id: 'sp-004',
    name: 'Figma for Education',
    description: 'Lider kolaboratif tasarım platformu Figma\'nın eğitim programı.',
    website: 'https://figma.com/education',
    tier: 'silver',
    since: '2024',
    industry: 'Design Tools',
    benefit: 'Figma Professional ücretsiz erişim',
  },
  {
    id: 'sp-005',
    name: 'Huawei Turkey',
    description: 'Telekomunikasyon, yapay zeka ve akıllı altyapı alanında global lider.',
    website: 'https://huawei.com/tr',
    tier: 'silver',
    since: '2025',
    industry: 'Telco & AI',
    benefit: 'Hackathon sponsorluğu + sertifika programı',
  },
  {
    id: 'sp-006',
    name: 'İstanbul Arel Üniversitesi GLO',
    description: 'Girişimcilik ve Liderlik Ofisi — kulübün kurumsal bağlantı noktası.',
    website: 'https://www.istanbularel.edu.tr',
    tier: 'community',
    since: '2022',
    industry: 'Akademik',
    benefit: 'Fiziksel alan, etkinlik desteği, kurumsal onay',
  },
  {
    id: 'sp-007',
    name: 'Vercel',
    description: 'Next.js\'in yaratıcısı. Dünyada en hızlı frontend deployment platformu.',
    website: 'https://vercel.com',
    tier: 'community',
    since: '2023',
    industry: 'Cloud & Deployment',
    benefit: 'Pro plan ücretsiz erişim',
  },
  {
    id: 'sp-008',
    name: 'Railway',
    description: 'Modern backend deployment platformu. Node.js, Python ve veritabanı hosting.',
    website: 'https://railway.app',
    tier: 'community',
    since: '2024',
    industry: 'Cloud & Deployment',
    benefit: 'Backend hosting credits',
  },
];

export const sponsorTierConfig: Record<SponsorTier, { label: string; color: string; bg: string; order: number }> = {
  platinum: { label: 'Platinum Sponsor', color: '#7C3AED', bg: '#EDE9FE', order: 1 },
  gold: { label: 'Gold Sponsor', color: '#D97706', bg: '#FEF3C7', order: 2 },
  silver: { label: 'Silver Sponsor', color: '#475569', bg: '#F1F5F9', order: 3 },
  community: { label: 'Topluluk Ortağı', color: '#15803D', bg: '#DCFCE7', order: 4 },
};

// Sponsorship packages
export const sponsorshipPackages = [
  {
    tier: 'platinum' as SponsorTier,
    price: 'İletişime Geçin',
    features: [
      'Ana sayfa logo yerleşimi (büyük)',
      'Tüm etkinliklerde logonuz',
      'Yıllık 2 özel workshop sponsorluğu',
      'Staj/iş ilanı öncelikli paylaşım',
      'Sosyal medyada aktif tanıtım',
      'Toplantılarda şirket sunumu hakkı',
    ],
  },
  {
    tier: 'gold' as SponsorTier,
    price: 'İletişime Geçin',
    features: [
      'Web sitesinde logo + link',
      'Etkinliklerde logo',
      'Yıllık 1 workshop sponsorluğu',
      'Staj ilanı paylaşımı',
      'Sosyal medya tanıtımı',
    ],
  },
  {
    tier: 'silver' as SponsorTier,
    price: 'İletişime Geçin',
    features: [
      'Web sitesinde logo + link',
      'Sosyal medya tanıtımı',
      'Etkinlik katılım daveti',
    ],
  },
];
