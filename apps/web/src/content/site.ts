// ── Site-wide configuration ───────────────────────────────────
export const siteConfig = {
  name: 'Arel Yazılım Kulübü',
  shortName: 'AYK',
  tagline: 'Yazılım, Üretim ve Topluluk Bir Arada',
  description:
    'İstanbul Arel Üniversitesi Yazılım Kulübü; yapay zekâ, yazılım geliştirme ve veri bilimi alanlarında proje üreten, etkinlikler düzenleyen ve kariyer odaklı öğrenci topluluğudur.',
  university: 'İstanbul Arel Üniversitesi',
  office: 'Girişimcilik ve Liderlik Ofisi',
  campus: 'Tepekent Kemal Gözükara Yerleşkesi, Büyükçekmece / İstanbul',
  email: 'yazilimkulubu@istanbularel.edu.tr',
  foundedYear: 2022,
  academicYear: '2025–2026',
  stats: {
    members: 250,
    projects: 15,
    events: 40,
    status: 'Resmî Statü',
  },
  social: {
    instagram: 'https://instagram.com/arel.yazilim',
    linkedin: 'https://linkedin.com/company/arel-yazilim',
    github: 'https://github.com/ArelSoftwareClub',
    twitter: 'https://twitter.com/ArelSoftware',
  },
  universityUrl: 'https://www.istanbularel.edu.tr',
} as const;

// Navigation links
export const navLinks = [
  { href: '/', label: 'Ana Sayfa' },
  { href: '/hakkimizda', label: 'Kulüp' },
  { href: '/etkinlikler', label: 'Etkinlikler' },
  { href: '/projeler', label: 'Projeler' },
  { href: '/topluluk', label: 'Topluluk' },
  { href: '/blog', label: 'Blog' },
  { href: '/sponsorlar', label: 'Partnerler' },
  { href: '/iletisim', label: 'İletişim' },
] as const;

export const mobileNavLinks = [
  { href: '/', label: 'Ana Sayfa' },
  { href: '/hakkimizda', label: 'Hakkımızda' },
  { href: '/etkinlikler', label: 'Etkinlikler' },
  { href: '/projeler', label: 'Projeler' },
  { href: '/topluluk', label: 'Alt Topluluklar' },
  { href: '/blog', label: 'Blog & Teknik Yazılar' },
  { href: '/sponsorlar', label: 'Partnerler' },
  { href: '/duyurular', label: 'Duyurular' },
  { href: '/ekip', label: 'Ekip' },
  { href: '/belgeler', label: 'Belgeler / SSS' },
  { href: '/iletisim', label: 'İletişim' },
  { href: '/panel', label: 'Üye Paneli 🔒' },
] as const;

// Footer links
export const footerLinks = {
  hizli: [
    { href: '/', label: 'Ana Sayfa' },
    { href: '/kurumsal', label: 'Kurumsal' },
    { href: '/etkinlikler', label: 'Etkinlikler' },
    { href: '/projeler', label: 'Projeler' },
    { href: '/kariyer', label: 'Kariyer' },
    { href: '/ekip', label: 'Yönetim Ekibi' },
  ],
  katilim: [
    { href: '/uyelik', label: 'Üyelik Başvurusu' },
    { href: '/ari-lab', label: 'ARI Lab' },
    { href: '/belgeler', label: 'Belgeler & Tüzük' },
    { href: '/sponsorlar', label: 'Kurumsal Ortaklık' },
  ],
  iletisim: [
    { href: 'mailto:yazilimkulubu@istanbularel.edu.tr', label: 'E-posta Gönder', external: true },
    { href: '/iletisim', label: 'İletişim Formu' },
    { href: 'https://instagram.com/arel.yazilim', label: 'Instagram', external: true },
    { href: 'https://linkedin.com/company/arel-yazilim', label: 'LinkedIn', external: true },
    { href: 'https://github.com/ArelSoftwareClub', label: 'GitHub', external: true },
  ],
  yasal: [
    { href: '/gizlilik', label: 'Gizlilik Politikası' },
    { href: '/gizlilik#kvkk', label: 'KVKK Aydınlatma' },
    { href: '/gizlilik#kullanim', label: 'Kullanım Koşulları' },
    { href: '/gizlilik#cerez', label: 'Çerez Politikası' },
    { href: 'https://www.istanbularel.edu.tr', label: 'Arel Üniversitesi', external: true },
  ],
} as const;

// FAQ Data
export interface FAQItem {
  question: string;
  answer: string;
}

export const faqItems: FAQItem[] = [
  {
    question: 'Kulübe nasıl üye olabilirim?',
    answer:
      'Üyelik tamamen ücretsizdir ve tüm İstanbul Arel Üniversitesi öğrencilerine açıktır. /uyelik sayfamızdaki formu doldurarak başvurabilir ya da e-posta ile iletişime geçebilirsiniz.',
  },
  {
    question: 'Üyelik için hangi bölümden olmak gerekiyor?',
    answer:
      'Herhangi bir bölümden olabilirsiniz! Kulübümüz üniversite genelinde açık olup; yazılım, bilgisayar, elektrik-elektronik, endüstri mühendisliği ve diğer bölümlerden aktif üyelerimiz bulunuyor.',
  },
  {
    question: 'Etkinliklere katılmak için ücret ödememiz gerekiyor mu?',
    answer:
      'Workshop ve seminerlerimizin büyük çoğunluğu ücretsizdir. Ücretli etkinlikler varsa duyurularda açıkça belirtilmektedir.',
  },
  {
    question: 'Projelere nasıl dahil olabilirim?',
    answer:
      'Üye olduktan sonra ilgi alanınıza göre aktif projelere katılmanız mümkündür. Teknik ekipler her dönem başında yeni üye alımı yapmaktadır.',
  },
  {
    question: 'ARI Lab nedir?',
    answer:
      'ARI Lab, kulübümüzün araştırma kolu olup yapay zekâ, veri bilimi ve makine öğrenmesi odaklı akademik çalışmaları yürütmektedir. Üyeler mentor eşliğinde gerçek araştırma projelerinde yer almaktadır.',
  },
  {
    question: 'Toplantılar ne sıklıkla yapılıyor?',
    answer:
      'Yönetim toplantıları haftada bir, departman toplantıları ise iki haftada bir düzenlenmektedir. Etkinlik ve workshop takvimi için sosyal medya hesaplarımızı takip edebilirsiniz.',
  },
];
