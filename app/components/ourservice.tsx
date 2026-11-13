'use client';

import type { CSSProperties, ReactNode } from 'react';

export interface Service {
  title: string;
  description: string;
  points: string[];
  tone: string; // glass tint colour of the card
  wide?: 'two' | 'full'; // optional: span 2 or all 3 columns on desktop
  icon: ReactNode;
}

interface OurServiceProps {
  services?: Service[];
  ctaHref?: string;
  onBookService?: (service: string) => void;
}

const svg = (children: ReactNode) => (
  <svg
    viewBox="0 0 24 24"
    width="20"
    height="20"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
);

const DEFAULT_SERVICES: Service[] = [
  {
    title: 'Event Photography',
    description:
      'Weddings, birthdays, engagements and corporate functions. We stay in the moment so you can too, and hand back a story you will want to revisit.',
    points: ['Candid and posed coverage', 'Same-week sneak peek', 'Full edited gallery'],
    tone: '#4F63FF',
    wide: 'two',
    icon: svg(
      <>
        <path d="M4 8h3l2-3h6l2 3h3v11H4z" />
        <circle cx="12" cy="13" r="3.5" />
      </>
    )
  },
  {
    title: 'School ID Card Photos',
    description:
      'Fast, uniform photos for student and staff ID cards. We come to your campus and shoot class by class.',
    points: ['On-campus setup', 'Plain backdrop', 'Sorted by class'],
    tone: '#F7B731',
    icon: svg(
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <circle cx="9" cy="11" r="2" />
        <path d="M6 16c.6-1.6 1.7-2.4 3-2.4s2.4.8 3 2.4M14 10h4M14 13h3" />
      </>
    )
  },
  {
    title: 'School Events',
    description:
      'Annual day, sports day, farewell, science fair and cultural programs, from the stage to the crowd.',
    points: ['Stage and crowd coverage', 'Award shots', 'Shared parent album'],
    tone: '#19C3AB',
    icon: svg(
      <>
        <path d="M2 9l10-5 10 5-10 5z" />
        <path d="M6 11.5V16c0 1.4 2.7 3 6 3s6-1.6 6-3v-4.5" />
      </>
    )
  },
  {
    title: 'Class and Group Portraits',
    description:
      'Class photos, house teams and staff groups, arranged so every face is clear and every smile is in frame.',
    points: ['Tiered setups', 'Every face sharp', 'Print-ready sizes'],
    tone: '#FF5C7C',
    icon: svg(
      <>
        <circle cx="8" cy="9" r="2.5" />
        <circle cx="16" cy="9" r="2.5" />
        <path d="M3.5 18c.5-2.6 2.3-4 4.5-4s4 1.4 4.5 4M12.5 18c.5-2.6 2.3-4 4.5-4s4 1.4 4.5 4" />
      </>
    )
  },
  {
    title: 'Studio Portraits',
    description:
      'Family, couple, maternity, newborn and professional headshots in our studio, with lighting and posing guidance.',
    points: ['Family and couples', 'Business headshots', 'Pose guidance'],
    tone: '#9B6BFF',
    icon: svg(
      <>
        <circle cx="12" cy="8.5" r="3.5" />
        <path d="M5 20c.8-4 3.5-6 7-6s6.2 2 7 6" />
      </>
    )
  },
  {
    title: 'Albums and Prints',
    description:
      'Your best frames, made physical. Hand-designed albums, framed prints, canvas and school yearbooks that outlast a hard drive.',
    points: ['Custom album layouts', 'Framed and canvas prints', 'School yearbook design'],
    tone: '#2EA8FF',
    wide: 'full',
    icon: svg(
      <>
        <path d="M5 4h11a3 3 0 013 3v13H8a3 3 0 01-3-3z" />
        <path d="M5 17a3 3 0 013-3h11M10 8h5" />
      </>
    )
  }
];

export default function OurService({ services = DEFAULT_SERVICES, ctaHref = '#contact', onBookService, }: OurServiceProps) {
  return (
    <section className="svc" id="services">
      <div className="svc-inner">
        <header className="svc-intro">
          <h2>Our Services</h2>
          <p>From a single school ID to a three-day wedding, we shoot it with the same care.</p>
        </header>

        <div className="svc-stage">

          <div className="svc-grid">
            {services.map(s => (
              <article
                key={s.title}
                className={['card', s.wide === 'two' ? 'span-2' : '', s.wide === 'full' ? 'span-3' : ''].join(' ')}
                style={{ '--tone': s.tone } as CSSProperties}
              >
                <span className="corner c-tl" />
                <span className="corner c-tr" />
                <span className="corner c-bl" />
                <span className="corner c-br" />

                <div className="card-icon">{s.icon}</div>

                <div className="card-body">
                  <h3>{s.title}</h3>
                  <p>{s.description}</p>
                  <ul>
                    {s.points.map(pt => (
                      <li key={pt}>{pt}</li>
                    ))}
                  </ul>
                </div>

                {onBookService ? (
                  <button
                    type="button"
                    className="card-cta"
                    onClick={() => onBookService(s.title)}
                  >
                    Book this shoot
                  </button>
                ) : (
                  <a className="card-cta" href={ctaHref}>
                    Book this shoot
                  </a>
                )}
              </article>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .svc {
          padding: 0px 20px;
          overflow: hidden;
        }
        .svc-inner {
          max-width: 1240px;
          margin: 0 auto;
        }
        .svc-intro {
          max-width: 640px;
          margin: 0 auto 32px;
          text-align: center;
        }
        .svc-intro h2 {
          font-size: clamp(2rem, 4vw, 3rem);
          letter-spacing: -0.02em;
        }
        .svc-intro p {
          margin-top: 10px;
          margin-bottom: 100px;
          font-size: 1.1rem;
          opacity: 0.7;
          line-height: 1.6;
        }

        .svc-stage {
          position: relative;
          isolation: isolate;
        }


        .svc-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }
        .span-2 { grid-column: span 2; }
        .span-3 { grid-column: span 3; }

        /* the glass card */
        .card {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding: 20px;
          border-radius: 18px;
          overflow: hidden;
          color: #fff;
          background:
            linear-gradient(
              145deg,
              color-mix(in srgb, var(--tone) 62%, transparent) 0%,
              color-mix(in srgb, var(--tone) 28%, transparent) 100%
            );
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.25),
            0 18px 40px -24px rgba(0, 0, 0, 0.6);
          -webkit-backdrop-filter: blur(22px) saturate(150%);
          backdrop-filter: blur(22px) saturate(150%);
          transition: transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1), border-color 0.35s ease,
            box-shadow 0.35s ease;
        }
        .card:hover {
          transform: translateY(-4px);
          border-color: color-mix(in srgb, var(--tone) 70%, white);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.3),
            0 26px 50px -22px var(--tone);
        }

        .card-icon {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          display: grid;
          place-items: center;
          flex: none;
          color: #fff;
          background: color-mix(in srgb, var(--tone) 45%, transparent);
          border: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.3);
        }

        .card-body {
          flex: 1;
        }
        .card-body h3 {
          font-size: 1.1rem;
          letter-spacing: -0.01em;
          line-height: 1.2;
          margin-bottom: 6px;
        }
        .card-body p {
          font-size: 0.86rem;
          line-height: 1.5;
          opacity: 0.82;
          max-width: 52ch;
          margin-bottom: 10px;
        }
        .card-body ul {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .card-body li {
          font-size: 0.72rem;
          padding: 3px 9px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.18);
        }

        .card-cta {
          align-self: flex-start;
          font-weight: 600;
          text-decoration: none;
          color: #fff;
          font-size: 0.85rem;
          cursor: pointer;
          font-family: inherit;
          padding: 7px 15px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.14);
          border: 1px solid rgba(255, 255, 255, 0.3);
          transition: background 0.25s ease, color 0.25s ease, transform 0.2s ease;
        }
        .card-cta:hover {
          background: #fff;
          color: #0c0f16;
          transform: scale(1.05);
        }
        .card-cta:focus-visible {
          outline: 3px solid #fff;
          outline-offset: 3px;
        }

        /* viewfinder corners */
        .corner {
          position: absolute;
          width: 12px;
          height: 12px;
          border: 0 solid #fff;
          opacity: 0;
          transition: opacity 0.3s ease, inset 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
          pointer-events: none;
        }
        .c-tl { top: 12px; left: 12px; border-top-width: 2px; border-left-width: 2px; }
        .c-tr { top: 12px; right: 12px; border-top-width: 2px; border-right-width: 2px; }
        .c-bl { bottom: 12px; left: 12px; border-bottom-width: 2px; border-left-width: 2px; }
        .c-br { bottom: 12px; right: 12px; border-bottom-width: 2px; border-right-width: 2px; }
        .card:hover .corner { opacity: 0.8; }
        .card:hover .c-tl { top: 7px; left: 7px; }
        .card:hover .c-tr { top: 7px; right: 7px; }
        .card:hover .c-bl { bottom: 7px; left: 7px; }
        .card:hover .c-br { bottom: 7px; right: 7px; }

        @media (max-width: 980px) {
          .svc-grid { grid-template-columns: repeat(2, 1fr); }
          .span-2, .span-3 { grid-column: span 2; }
        }
        @media (max-width: 620px) {
          .svc { padding: 40px 14px; }
          .svc-grid { grid-template-columns: 1fr; }
          .span-2, .span-3 { grid-column: span 1; }
          .card { padding: 18px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .card, .corner, .card-cta { transition: none !important; }
          .card:hover { transform: none; }
        }
      `}</style>
    </section>
  );
}