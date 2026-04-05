import type { Metadata } from 'next';
import Link from 'next/link';
import { events } from '@/content/events';
import { formatDate } from '@/lib/utils';

export const metadata: Metadata = { title: 'Etkinliklerim | Üye Paneli' };

// Mock: which events this user has registered for
const registeredEventIds = ['evt-001', 'evt-002', 'evt-006', 'evt-007', 'evt-008'];
const attendedEventIds = ['evt-006', 'evt-007', 'evt-008'];

export default function EtkinliklerimPage() {
  const myUpcoming = events.filter(
    (e) => registeredEventIds.includes(e.id) && (e.status === 'upcoming' || e.status === 'ongoing'),
  );
  const myPast = events.filter(
    (e) => registeredEventIds.includes(e.id) && e.status === 'past',
  );

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 900, color: 'var(--text)', marginBottom: '6px', letterSpacing: '-0.5px' }}>
            Etkinliklerim
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
            Kayıt olduğun ve katıldığın etkinlikler.
          </p>
        </div>
        <Link href="/etkinlikler" className="btn btn-primary btn-sm">
          Yeni Etkinlik Bul
        </Link>
      </div>

      {/* Summary stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '32px' }}>
        {[
          { label: 'Toplam Kayıt', value: registeredEventIds.length, icon: '📋', color: 'var(--orange)' },
          { label: 'Katıldım', value: attendedEventIds.length, icon: '✅', color: '#15803D' },
          { label: 'Yaklaşan', value: myUpcoming.length, icon: '⏳', color: '#7C3AED' },
        ].map(({ label, value, icon, color }) => (
          <div key={label} style={{ padding: '20px', background: '#fff', borderRadius: 'var(--radius-lg)', border: '1.5px solid var(--border)' }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>{icon}</div>
            <div style={{ fontSize: '28px', fontWeight: 900, color, lineHeight: 1, marginBottom: '4px' }}>{value}</div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Upcoming */}
      {myUpcoming.length > 0 && (
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text)', marginBottom: '16px' }}>
            📅 Yaklaşan Etkinlikler
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {myUpcoming.map((event) => (
              <Link key={event.id} href={`/etkinlikler/${event.slug}`} style={{ textDecoration: 'none' }}>
                <article
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '18px 22px',
                    background: '#fff',
                    borderRadius: 'var(--radius-lg)',
                    border: '1.5px solid var(--border)',
                    borderLeft: '4px solid var(--orange)',
                    transition: 'var(--transition)',
                  }}
                  className="card"
                >
                  <div style={{ flexShrink: 0, textAlign: 'center', minWidth: '52px', padding: '8px', background: 'var(--orange-soft)', borderRadius: 'var(--radius-md)' }}>
                    <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--orange)', textTransform: 'uppercase' }}>
                      {new Date(event.date).toLocaleDateString('tr-TR', { month: 'short' })}
                    </div>
                    <div style={{ fontSize: '22px', fontWeight: 900, color: 'var(--orange)', lineHeight: 1 }}>
                      {new Date(event.date).getDate()}
                    </div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 800, color: 'var(--text)', fontSize: '15px', marginBottom: '4px' }}>{event.title}</div>
                    <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                      {event.type} · {event.location}
                    </div>
                  </div>
                  <span style={{ padding: '5px 12px', borderRadius: '999px', background: '#DCFCE7', color: '#15803D', fontSize: '11px', fontWeight: 700, flexShrink: 0 }}>
                    Kayıtlısın
                  </span>
                </article>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Past */}
      {myPast.length > 0 && (
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text)', marginBottom: '16px' }}>
            🗂️ Geçmiş Etkinlikler
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {myPast.map((event) => {
              const attended = attendedEventIds.includes(event.id);
              return (
                <Link key={event.id} href={`/etkinlikler/${event.slug}`} style={{ textDecoration: 'none' }}>
                  <article
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      padding: '14px 20px',
                      background: '#fff',
                      borderRadius: 'var(--radius-lg)',
                      border: '1.5px solid var(--border)',
                      opacity: 0.8,
                      transition: 'var(--transition)',
                    }}
                    className="card"
                  >
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, color: 'var(--text)', fontSize: '14px', marginBottom: '3px' }}>{event.title}</div>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{formatDate(event.date)} · {event.type}</div>
                    </div>
                    <span style={{
                      padding: '4px 10px', borderRadius: '999px', fontSize: '11px', fontWeight: 700,
                      background: attended ? '#DCFCE7' : '#F3F4F6',
                      color: attended ? '#15803D' : '#6B7280',
                      flexShrink: 0,
                    }}>
                      {attended ? '✓ Katıldım' : 'Katılmadım'}
                    </span>
                  </article>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
