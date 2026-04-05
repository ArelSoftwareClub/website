import type { Metadata } from 'next';
import Section, { SectionHeader } from '@/components/ui/Section';
import Badge from '@/components/ui/Badge';
import { events } from '@/content/events';
import { formatDate, formatEventDate } from '@/lib/utils';
import { siteConfig } from '@/content/site';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Etkinlikler',
  description: `Workshop, hackathon, seminer, panel etkinlikleri — ${siteConfig.name}. Güncel etkinlik takvimi ve kayıt bilgileri.`,
  alternates: { canonical: '/etkinlikler' },
};

export default function EtkinliklerPage() {
  const upcoming = events.filter((e) => e.status === 'upcoming' || e.status === 'ongoing');
  const past = events.filter((e) => e.status === 'past');

  return (
    <>
      <Section aria-labelledby="etkinlikler-heading">
        <div className="container-site">
          <SectionHeader
            label="Takvim"
            title={<>Yaklaşan <span className="text-orange-DEFAULT">Etkinlikler</span></>}
            description="Workshop, hackathon, seminer ve panel etkinlikleri."
            id="etkinlikler-heading"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {upcoming.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </Section>

      <Section variant="alt" aria-labelledby="gecmis-etkinlikler-heading">
        <div className="container-site">
          <SectionHeader
            label="Arşiv"
            title={<>Geçmiş <span className="text-orange-DEFAULT">Etkinlikler</span></>}
            id="gecmis-etkinlikler-heading"
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {past.map((event) => (
              <article
                key={event.id}
                className="rounded-xl border border-slate-200 bg-white p-5 opacity-75 transition-all hover:opacity-100 hover:shadow-md"
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    {formatEventDate(event.date)}
                  </span>
                  <Badge variant={event.type === 'Workshop' ? 'workshop' : event.type === 'Hackathon' ? 'hackathon' : 'seminar'}>
                    {event.type}
                  </Badge>
                </div>
                <h3 className="font-extrabold text-slate-700">{event.title}</h3>
                {event.featured && (
                  <span className="mt-2 inline-block text-[12px] font-semibold text-orange-DEFAULT">🏆 Ödüllü</span>
                )}
              </article>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}

function EventCard({ event }: { event: (typeof events)[number] }) {
  const borderColor = event.type === 'Workshop'
    ? 'border-orange-DEFAULT'
    : event.type === 'Hackathon'
      ? 'border-purple-500'
      : 'border-green-500';

  return (
    <article className={`overflow-hidden rounded-xl border-t-[3px] ${borderColor} bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg`}>
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3">
        <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
          {formatEventDate(event.date)}
        </span>
        <Badge variant={event.type === 'Workshop' ? 'workshop' : event.type === 'Hackathon' ? 'hackathon' : 'seminar'}>
          {event.type}
        </Badge>
      </div>
      <div className="p-5">
        <h3 className="mb-2 text-[17px] font-extrabold text-slate-800">{event.title}</h3>
        <p className="mb-4 text-sm leading-relaxed text-slate-500">{event.description}</p>
        {event.speaker && (
          <p className="mb-3 text-[12px] font-semibold text-slate-500">🎤 {event.speaker}</p>
        )}
        <div className="mb-2 flex items-center gap-1.5 text-[12px] text-slate-400">
          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
          </svg>
          {event.location}
          {event.capacity && ` · Kontenjan: ${event.capacity}`}
        </div>
        <div className="mb-5 flex items-center gap-1.5 text-[12px] text-slate-400">
          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="3" x2="21" y1="10" y2="10"/>
          </svg>
          {formatDate(event.date)}
          {event.endDate && ` – ${formatDate(event.endDate)}`}
        </div>
        <div className="flex items-center gap-2">
          <Link
            href={`/etkinlikler/${event.slug}`}
            className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 px-4 py-2 text-[13px] font-bold text-slate-600 transition-all hover:border-orange-DEFAULT hover:text-orange-DEFAULT"
          >
            Detay
          </Link>
          <Link
            href="/uyelik"
            className="inline-flex items-center gap-1.5 rounded-md bg-orange-DEFAULT px-5 py-2 text-[13px] font-bold text-white transition-all hover:bg-orange-vibrant"
          >
            Kayıt Ol
          </Link>
        </div>
      </div>
    </article>
  );
}

