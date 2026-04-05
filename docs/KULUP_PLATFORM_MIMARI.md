# Üniversite Yazılım Kulübü Platformu — Mimari & Ürün Spesifikasyonu

Bu doküman; Stanford ACM, Berkeley ACM, Harvard Computer Society ve MIT CSAIL çizgisinde **kurumsal, ölçeklenebilir ve yönetilebilir** bir kulüp platformu için hedef mimariyi tanımlar. Mevcut kod tabanı: **Turborepo + `apps/web` (Next.js 15)** ve **`server/` (Express + JWT + SQLite)** — üretimde PostgreSQL ve modüler API genişlemesi için yol haritası aşağıdadır.

---

## 1. Benchmark’tan çıkan UI/UX ilkeleri

| Referans | Öğrenilen desen | Uygulama |
|----------|-----------------|----------|
| **Stanford ACM** | Üst seviye menü, etkinlik/öğrenci odaklı net akış | Birincil nav: Kulüp → Etkinlikler → Projeler → Ekipler → İçerik → Partnerler; CTA sabit (üyelik / takvim) |
| **Berkeley ACM** | Alt topluluklar (SIG / committee) | “Odak alanları” veya **alt ekipler** (AI, Web, Siber Güvenlik, Mobil…) ayrı sayfa + lider iletişim |
| **Harvard CS** | Premium, sakin grid, güçlü tipografi | Geniş boşluk, sınırlı renk paleti, kaliteli font hiyerarşisi (display + body) |
| **MIT CSAIL** | Bilgi yoğunluğu + minimal görsel gürültü | İçerik (blog/teknik yazı) okunabilirliği: tipografi plugin, kod blokları, TOC |

**Mobil öncelik:** navigasyon drawer + “en çok kullanılan” 3 aksiyon (etkinlikler, projeler, üyelik) üstte; formlar tek sütun, dokunma hedefleri ≥ 44px.

---

## 2. Teknoloji yığını — öneri ve karşılaştırma

### 2.1 Önerilen ana hat (mevcut yapı ile uyumlu)

| Katman | Seçim | Gerekçe |
|--------|--------|---------|
| **Frontend** | **Next.js (App Router) + React + TypeScript** | SSR/SSG, iyi DX, ekosistem; statik export (GitHub Pages) ile sınırlı dinamik özellikler — tam üyelik panosu için **Node runtime** (Vercel/AWS) tercih edilir |
| **Backend** | **Node.js (Express veya NestJS)** | Frontend ile paylaşılan tipler, tek dil, hızlı iterasyon; mevcut `server/` doğal evrim |
| **Veritabanı** | **PostgreSQL** | İlişkisel model, JSON alanlar, tam metin arama (ileride), row-level güvenlik opsiyonu |
| **Auth** | **JWT (access + refresh)** + **OAuth2** (Google/GitHub kampüs e-postası ile doğrulama ileride) | API-first; mobil/3. parti istemciler için uygun |
| **Deploy** | **Vercel** (web) + **AWS/Railway/Fly** (API) + **Docker** (API + worker) | CDN + serverless edge; API konteynerde öngörülebilir |

### 2.2 Backend alternatifleri

| | **Node.js** | **Django** | **.NET (ASP.NET Core)** |
|---|------------|------------|-------------------------|
| **Artı** | Kulüp ekibinde JS yaygın; mevcut kod; WebSocket/SSE kolay | Admin panel, ORM, güvenlik pil paketi; içerik yönetimi hızlı | Kurumsal performans, tip güvenliği, uzun vadeli bakım |
| **Eksi** | Disiplinsiz büyüme riski (modül sınırları şart) | Python + Node iki ekosistem | Windows/Linux pipeline ve hosting bilgisi gerekir |
| **Ne zaman** | Varsayılan, MVP → ölçek | Çok içerik/editor odaklı, güçlü admin | Üniversite IT .NET standardı varsa |

**Sonuç:** Kısa ve orta vadede **Node + PostgreSQL**; içerik ekibi güçlenirse Django Admin veya headless CMS (Strapi/Sanity) **ayrı servis** olarak eklenebilir.

---

## 3. Mimari yaklaşım: modüler monolit vs mikroservis

### 3.1 Modüler monolit (önerilen başlangıç)

- Tek deploy birimi içinde **sınırı net modüller**: `auth`, `members`, `events`, `projects`, `teams`, `content`, `sponsors`.
- Ortak: veritabanı şeması + paylaşılan kütüphane (doğrulama, RBAC).
- **Artı:** düşük operasyonel yük, basit transaction’lar, hızlı özellik teslimi.
- **Dikkat:** Modül köprülerini (import çapraz kaçakları) kurallarla yasaklayın; klasör/feature bazlı sahiplik.

### 3.2 Mikroservis (ileride)

Aşağıdakiler **ayrı servis** düşünülebilir: bildirim (e-posta/push), dosya/medya, arama (Meilisearch/Algolia), raporlama/analitik.

**Geçiş tetikleyicileri:** farklı ölçek/SLA ihtiyacı, bağımsız ekip, yoğun arka plan işleri.

### 3.3 API-first

1. **OpenAPI 3.1** (veya Zod → OpenAPI) kaynak doğruluk.
2. Sürümleme: `/api/v1/...`; kırıcı değişiklikte v2.
3. İstemci: generated fetch client veya `packages/api-client` (monorepo).

---

## 4. Ölçeklenebilir monorepo klasör yapısı (hedef)

Mevcut `apps/web` ve `server` korunur; aşamalı olarak genişletilir:

```
website/
├── apps/
│   └── web/                          # Next.js — public + (ileride) üye alanı
│       └── src/
│           ├── app/
│           │   ├── (marketing)/      # Statik/hafif dinamik sayfalar
│           │   ├── (auth)/         # giriş, kayıt, şifre sıfırlama
│           │   ├── (member)/       # oturum gerekli: profil, kayıtlarım
│           │   └── (dashboard)/    # rol: board, lead, admin
│           ├── components/
│           │   ├── ui/             # tasarım sistemi atomları
│           │   ├── layout/         # Navbar, Footer, Shell, DashboardShell
│           │   └── modules/        # domain bileşenleri (EventCard, ProjectShowcase)
│           ├── features/           # use-case odaklı (contact-form gibi)
│           ├── lib/                # api client, auth helper, utils
│           └── content/            # geçici statik içerik; sonra CMS/API
├── server/                         # API (Express → modüler router’lar)
│   ├── modules/
│   │   ├── auth/
│   │   ├── members/
│   │   ├── events/
│   │   ├── projects/
│   │   ├── teams/
│   │   ├── content/
│   │   └── sponsors/
│   ├── db/
│   │   ├── migrations/             # PostgreSQL (örn. node-pg-migrate / Knex)
│   │   └── seeds/
│   └── openapi.yaml                # veya codegen çıktısı
├── packages/                       # (opsiyonel)
│   ├── eslint-config/
│   ├── tsconfig/
│   └── api-types/                  # paylaşılan Zod/TS tipleri
├── docs/
│   └── KULUP_PLATFORM_MIMARI.md
├── turbo.json
└── pnpm-workspace.yaml
```

---

## 5. Sayfa haritası (bilgi mimarisi / sitemap)

### 5.1 Kamu (marketing + keşif)

| Rota | Amaç |
|------|------|
| `/` | Kahraman mesajı, yaklaşan etkinlik, öne çıkan proje, partner şeridi |
| `/hakkimizda` | Misyon, tarihçe, değerler |
| `/etkinlikler` | Liste + filtre; `/etkinlikler/[slug]` detay, kayıt CTA |
| `/projeler` | Vitrin; `/projeler/[slug]` README özeti, GitHub link, ekip |
| `/ekip` / `/odak-alanlari` | Yönetim + alt ekipler (Berkeley modeli) |
| `/blog` veya `/yazilar` | Teknik yazılar listesi; `/blog/[slug]` |
| `/partnerler` | Sponsor seviyeleri, logolar, iletişim |
| `/uyelik` | Başvuru formu / yönlendirme |
| `/iletisim` | Form |
| `/gizlilik`, `/yonetmelik` | Yasal |

### 5.2 Kimlik doğrulama

| Rota | Amaç |
|------|------|
| `/giris`, `/kayit` | OAuth + e-posta (politikaya göre) |
| `/hesabim` | Profil, iletişim, bildirim tercihleri |

### 5.3 Üye / yönetim (RBAC)

| Rota | Roller (örnek) |
|------|----------------|
| `/panel` | `member` — kendi etkinlik kayıtları, proje ilgisi |
| `/panel/etkinlikler` | `event_lead`, `board` — oluşturma, katılımcı listesi |
| `/panel/projeler` | `project_maintainer` — GitHub repo eşlemesi |
| `/panel/icerik` | `editor`, `board` — taslak/yayın |
| `/panel/partnerler` | `sponsorship` — logo, sözleşme tarihi (hassas alanlar ayrı) |

**Not:** Statik export kullanıldığında bu rotalar için **Node barındırmalı** Next veya ayrı SPA + API şarttır.

---

## 6. Zorunlu modüller — sistem özeti

### 6.1 Üye yönetimi

- Kayıt, profil, roller (`guest`, `member`, `lead`, `board`, `admin`).
- JWT + refresh rotation; oturum tablosu (mevcut `sessions` PostgreSQL’e taşınır).
- İleride: üniversite e-postası doğrulama, LDAP/SAML (kampüs SSO).

### 6.2 Etkinlik yönetimi

- `Event`, `EventRegistration`, `Attendance` (opsiyonel QR/check-in).
- Takvim: iCal feed veya public API; UI’da ay/hafta görünümü.

### 6.3 Proje yönetimi

- `Project` meta alanları + `github_repo_full_name`; periyodik sync (yıldız, son commit) — **GitHub App** veya PAT ile sınırlı scope.
- Showcase: README özeti, katkıda bulunan üyeler (kulüp profiline link).

### 6.4 Topluluk / alt ekipler

- `Team` (AI, Web, Cyber…), `TeamMembership`, `TeamLead`.
- Her takımın kendi sayfası: hedefler, iletişim, alt etkinlikler.

### 6.5 İçerik sistemi

- `Post` (blog/teknik), `Tag`, `Author` (User ile ilişkili).
- Taslak → yayın akışı; Markdown veya rich text; SEO alanları.

### 6.6 Sponsorluk & partner

- `Sponsor` (tier: Platinum/Gold…), `Sponsorship` (dönem, sözleşme referansı), `Partner` (eğitim kurumu/NGO).
- Kamuya sadece `is_public` kayıtlar.

---

## 7. Bileşen mimarisi (React)

```
components/
├── ui/                    # Atomlar: Button, Badge, Card, Input, Select, Tabs
├── layout/                # SiteChrome, Navbar, Footer, PageHeader, DashboardShell
├── modules/
│   ├── events/            # EventCard, EventCalendar, RegistrationButton
│   ├── projects/          # ProjectCard, GitHubStats, ContributorList
│   ├── teams/             # TeamGrid, TeamLeadCard
│   ├── sponsors/          # SponsorTier, LogoMarquee
│   └── content/           # PostList, ProseArticle (typography)
└── providers/             # Theme, AuthSession (client)
```

**Veri akışı:** Server Components ile mümkün olan her yerde veri çekme; interaktif parçalar `use client` ile sınırlı.

---

## 8. UI sistemi (tasarım token’ları)

Mevcut `globals.css` / Tailwind tema ile uyumlu genişleme:

- **Tipografi:** display (hero), `h1–h3`, body, `caption`; satır yüksekliği ve letter-spacing MIT tarzı sıkı kontrol.
- **Renk:** birincil marka + nötr gri ölçeği; durum renkleri (başarı/uyarı) sadece geri bildirimde.
- **Spacing:** 4px grid; bölüm dikey ritim tutarlılığı (`Section` bileşeni).
- **Kartlar:** tek gölge seviyesi, hover’da hafif lift (tutarlı `Card`).
- **Dashboard:** sol sidebar nav + üst bar (kullanıcı menüsü); mobilde sidebar → drawer.

---

## 9. Veri modeli (ER mantığı)

### 9.1 Varlıklar ve ilişkiler (özet)

```
User 1──* UserRole *──1 Role
User 1──* TeamMembership *──1 Team
User 1──* EventRegistration *──1 Event
User 1──* ProjectMembership *──1 Project
Team 1──* Event (organizer_team_id, opsiyonel)
Project *──1 GitHubRepositoryCache (veya json alan)
Post *──1 User (author)
Sponsorship *──1 Sponsor
Sponsorship *──1 Season (yıl/dönem)
```

### 9.2 diyagram (Mermaid)

```mermaid
erDiagram
  users ||--o{ user_roles : has
  roles ||--o{ user_roles : assigned
  users ||--o{ team_memberships : joins
  teams ||--o{ team_memberships : has
  users ||--o{ event_registrations : registers
  events ||--o{ event_registrations : receives
  teams ||--o{ events : organizes
  users ||--o{ project_members : contributes
  projects ||--o{ project_members : includes
  users ||--o{ posts : writes
  sponsors ||--o{ sponsorships : funds
  seasons ||--o{ sponsorships : covers
  users {
    uuid id PK
    string email UK
    string display_name
    string avatar_url
    timestamptz created_at
  }
  roles {
    uuid id PK
    string key UK
    string label
  }
  teams {
    uuid id PK
    string slug UK
    string name
    text description
  }
  events {
    uuid id PK
    string slug UK
    string title
    timestamptz starts_at
    timestamptz ends_at
    uuid organizer_team_id FK
  }
  projects {
    uuid id PK
    string slug UK
    string name
    string github_repo_full_name
    text summary
  }
  posts {
    uuid id PK
    string slug UK
    string title
    text body_md
    string status
    uuid author_id FK
  }
  sponsors {
    uuid id PK
    string name
    string tier
    string logo_url
    boolean is_public
  }
```

---

## 10. CI/CD önerisi

| Aşama | Araç | İçerik |
|-------|------|--------|
| **PR** | GitHub Actions | `pnpm install`, `turbo lint`, `turbo type-check`, `turbo build` |
| **Güvenlik** | Dependabot / npm audit | Haftalık |
| **Deploy web** | Mevcut `deploy.yml` (Pages) veya Vercel | `main` merge |
| **Deploy API** | Docker → Railway/Fly/AWS ECS | `server` image; env secrets |
| **DB** | Migration job | deploy öncesi `migrate` tek komut |

Bu repoda PR doğrulaması için `.github/workflows/ci.yml` eklenebilir (mevcut deploy workflow’u ile birlikte).

---

## 11. Güvenlik ve uyumluluk (kısa)

- Rate limit (mevcut), Helmet, CORS allowlist.
- RBAC her hassas endpoint’te; admin işlemleri audit log.
- KVKK: iletişim ve üyelik verileri için saklama süresi ve silme talebi süreci dokümante edilmeli.

---

## 12. Yol haritası (fazlar)

1. **Faz 0:** Tasarım token’ları + `Card`/`DashboardShell` + bilgi mimarisi (bu doküman).
2. **Faz 1:** PostgreSQL + migration; üye profili + etkinlik CRUD API.
3. **Faz 2:** Kayıt + e-posta bildirimi; public takvim sayfası API’den beslensin.
4. **Faz 3:** GitHub sync job; proje vitrin dinamik.
5. **Faz 4:** Blog workflow; sponsor paneli.

---

*Bu doküman, kulübün “sadece vitrin” aşamasından **operasyonel platform**a geçişi için tek referans mimari metin olarak kullanılmalıdır.*
