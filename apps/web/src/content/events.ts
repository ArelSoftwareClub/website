// ── Type Definitions ──────────────────────────────────────────
export interface Event {
  id: string;
  slug: string;
  title: string;
  date: string; // ISO 8601
  endDate?: string | undefined;
  type: 'Workshop' | 'Hackathon' | 'Seminar' | 'Panel' | 'Social' | 'Training';
  location: string;
  isOnline: boolean;
  capacity?: number | undefined;
  speaker?: string | undefined;
  description: string;
  longDescription?: string | undefined;
  agenda?: { time: string; title: string; speaker?: string }[] | undefined;
  prerequisites?: string[] | undefined;
  tags: string[];
  registrationUrl?: string | undefined;
  status: 'upcoming' | 'ongoing' | 'past';
  featured?: boolean | undefined;
  teamSlug?: string | undefined;
}

export const events: Event[] = [
  {
    id: 'evt-001',
    slug: 'full-stack-web-gelistirme-serisi',
    title: 'Full Stack Web Geliştirme Serisi',
    date: '2026-04-05',
    endDate: '2026-05-17',
    type: 'Workshop',
    location: 'Büyükçekmece Kampüsü · B Blok',
    isOnline: false,
    capacity: 30,
    description:
      'React, Node.js ve PostgreSQL ile modern uçtan uca web uygulama geliştirme. 6 haftalık yoğun program.',
    longDescription:
      'Full Stack Web Geliştirme Serisi, sıfırdan başlayarak profesyonel web uygulaması geliştirme yetkinliği kazandırmak için tasarlanmış 6 haftalık kapsamlı bir program. Katılımcılar her hafta sonunda üretime hazır özellikler inşa edecek ve programı tamamladıklarında portfolyo projelerine ekleyebilecekleri gerçek bir uygulama teslim edecekler.',
    agenda: [
      { time: 'Hafta 1', title: 'React Temelleri & Component Mimarisi' },
      { time: 'Hafta 2', title: 'Next.js App Router & Server Components' },
      { time: 'Hafta 3', title: 'Node.js & Express API Geliştirme' },
      { time: 'Hafta 4', title: 'PostgreSQL & ORM Kullanımı' },
      { time: 'Hafta 5', title: 'Auth & Güvenlik Temelleri' },
      { time: 'Hafta 6', title: 'Deploy & CI/CD Pipeline' },
    ],
    prerequisites: ['Temel JavaScript bilgisi', 'HTML/CSS deneyimi'],
    tags: ['React', 'Node.js', 'PostgreSQL', 'Full Stack'],
    status: 'upcoming',
    featured: true,
    teamSlug: 'web',
  },
  {
    id: 'evt-002',
    slug: 'hackathon-hazirlik-kampi',
    title: 'Hackathon Hazırlık Kampı',
    date: '2026-04-19',
    endDate: '2026-04-20',
    type: 'Hackathon',
    location: 'Arel Üniversitesi',
    isOnline: false,
    capacity: 30,
    description:
      'TEKNOFEST ve ulusal hackathon yarışmalarına hazırlık amacıyla düzenlenen iki günlük yoğun proje kampı.',
    longDescription:
      'İki günlük bu kamp boyunca katılımcılar; fikir geliştirme, prototipleme, takım çalışması ve sunum becerilerini pekiştirecek. Deneyimli mentorlar eşliğinde gerçek bir hackathon atmosferi simüle edilecek.',
    agenda: [
      { time: 'Gün 1 — 09:00', title: 'Açılış & Problem Statement' },
      { time: 'Gün 1 — 10:00', title: 'Takım Kurma & Fikir Geliştirme' },
      { time: 'Gün 1 — 14:00', title: 'Prototipleme Sprint' },
      { time: 'Gün 2 — 09:00', title: 'Geliştirme Devamı' },
      { time: 'Gün 2 — 15:00', title: 'Demo & Sunum' },
      { time: 'Gün 2 — 17:00', title: 'Değerlendirme & Ödüller' },
    ],
    tags: ['Hackathon', 'TEKNOFEST', 'Proje'],
    status: 'upcoming',
  },
  {
    id: 'evt-003',
    slug: 'yapay-zeka-kariyer-yol-haritasi',
    title: 'Yapay Zekâ ve Kariyer Yol Haritası',
    date: '2026-05-10',
    type: 'Panel',
    location: 'Arel Üniversitesi · Konferans Salonu',
    isOnline: false,
    description:
      'Sektör profesyonelleriyle yapay zekâ kariyeri, staj süreçleri ve iş başvuru stratejileri üzerine panel.',
    longDescription:
      'Yapay zekâ alanında kariyer yapmak isteyen öğrenciler için sektör profesyonellerinin bir araya geldiği interaktif panel etkinliği. Q&A oturumları ve networking fırsatlarıyla desteklenen bu etkinlikte; staj nasıl bulunur, portfolyo nasıl oluşturulur ve AI kariyerinde hangi beceriler kritiktir sorularına yanıt aranacak.',
    tags: ['AI', 'Kariyer', 'Staj'],
    status: 'upcoming',
    teamSlug: 'ai',
  },
  {
    id: 'evt-004',
    slug: 'islemcilerin-isimlendirilmesi',
    title: 'İşlemcilerin İsimlendirilmesi',
    date: '2025-11-20',
    type: 'Seminar',
    location: 'Büyükçekmece Kampüsü',
    isOnline: false,
    capacity: 80,
    description: 'CPU ve GPU mimarilerindeki isimlendirme standartları ve sektörel önemi üzerine seminer.',
    tags: ['Hardware', 'CPU', 'GPU'],
    status: 'past',
  },
  {
    id: 'evt-005',
    slug: 'ai-trendleri-semineri',
    title: 'AI Trendleri Semineri',
    date: '2025-10-15',
    type: 'Seminar',
    location: 'Büyükçekmece Kampüsü',
    isOnline: false,
    capacity: 100,
    description: 'Yapay zekâ alanındaki son gelişmeler ve 2026 trendleri üzerine kapsamlı sunum.',
    tags: ['AI', 'Machine Learning', 'Trends'],
    status: 'past',
    teamSlug: 'ai',
  },
  {
    id: 'evt-006',
    slug: 'python-ile-veri-analizi',
    title: 'Python ile Veri Analizi Workshop',
    date: '2025-12-10',
    type: 'Workshop',
    location: 'Büyükçekmece Kampüsü · Bilgisayar Laboratuvarı',
    isOnline: false,
    capacity: 25,
    speaker: 'AYK Teknik Ekibi',
    description: 'Pandas, NumPy ve Matplotlib ile veri analizi ve görselleştirme workshop.',
    tags: ['Python', 'Pandas', 'Data Science'],
    status: 'past',
    teamSlug: 'data',
  },
  {
    id: 'evt-007',
    slug: 'git-github-workshop',
    title: 'Git & GitHub Workshop',
    date: '2025-09-25',
    type: 'Workshop',
    location: 'Büyükçekmece Kampüsü',
    isOnline: false,
    description: 'Versiyon kontrol sistemleri, iş akışları ve açık kaynak katkı süreçleri.',
    tags: ['Git', 'GitHub', 'DevOps'],
    status: 'past',
    teamSlug: 'web',
  },
  {
    id: 'evt-008',
    slug: 'istanbul-universite-hackathonu',
    title: 'İstanbul Üniversite Hackathonu',
    date: '2025-05-18',
    endDate: '2025-05-19',
    type: 'Hackathon',
    location: 'İstanbul',
    isOnline: false,
    description: 'Kulübümüzün ödüllü hackathon katılımı. "En İyi Sunum" ödülü kazanıldı.',
    tags: ['Hackathon', 'Ödül', 'Proje'],
    status: 'past',
    featured: true,
  },
];
