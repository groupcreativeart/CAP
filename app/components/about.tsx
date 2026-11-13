
'use client';

interface Value {
  title: string;
  text: string;
}

interface AboutProps {
  paragraphs?: string[];
  values?: Value[];
  ctaHref?: string;
  onBookService?: (service: string) => void;
}

const DEFAULT_PARAGRAPHS = [
  'Creative Art Production is a photography and videography studio focused on capturing the moments people want to remember. From weddings and family functions to school events, ID cards and studio portraits, we create photographs and films that preserve real memories.',
  'Every assignment is approached with care, clear communication and attention to detail. Whether it is a personal celebration or a large event, our aim is to make the experience comfortable and deliver work that people can look back on with pride.'
];

const DEFAULT_VALUES: Value[] = [
  {
    title: 'Personal attention',
    text: 'We take time to understand each client, event and creative requirement.'
  },
  {
    title: 'Reliable service',
    text: 'Clear communication, thoughtful planning and a professional approach.'
  },
  {
    title: 'Care in every detail',
    text: 'We focus on capturing meaningful moments and preparing each delivery carefully.'
  }
];

const OWNERS = ['Santokh Singh Sodhi', 'Ram Sharan'];

const SERVICES = [
  'Wedding Photography',
  'Family Functions',
  'Candid Photography',
  'School Events & ID Cards',
  'Studio Portraits',
  'Event Videography'
];

export default function About({
  paragraphs = DEFAULT_PARAGRAPHS,
  values = DEFAULT_VALUES,
  ctaHref = '#contact',
  onBookService,
}: AboutProps) {
  return (
    <section className="abt" id="about">
      <div className="abt-inner">

        {/* Intro */}
        <header className="abt-intro">
          <span className="abt-eyebrow">
            <span className="abt-eyebrow-dot" />
            WHO WE ARE
          </span>

          <h2>
            Behind every picture,
            <span> there is a story.</span>
          </h2>

          <p>
            A creative photography and videography studio capturing moments
            that deserve to last a lifetime.
          </p>
        </header>

        {/* Story */}
        <div className="abt-story">
          <div className="abt-story-heading">
            <span className="abt-index">01 / OUR STORY</span>
            <h3>Creating memories, one frame at a time.</h3>
          </div>

          <div className="abt-story-copy">
            {paragraphs.map((paragraph, index) => (
              <p key={`${index}-${paragraph}`}>{paragraph}</p>
            ))}
          </div>
        </div>

        {/* Services */}
        <div className="abt-services">
          <div className="abt-section-heading">
            <span className="abt-index">02 / WHAT WE DO</span>
            <h3>Photography for every occasion.</h3>
          </div>

          <div className="abt-service-grid">
            {SERVICES.map((service, index) => (
              <div className="abt-service" key={service}>
                <span className="abt-service-number">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span>{service}</span>
                <span className="abt-service-arrow" aria-hidden="true">
                  ↗
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Values */}
        <div className="abt-values-section">
          <div className="abt-section-heading">
            <span className="abt-index">03 / OUR APPROACH</span>
            <h3>Good work starts with good values.</h3>
          </div>

          <div className="abt-values">
            {values.map((value, index) => (
              <article className="abt-value" key={value.title}>
                <span className="abt-value-number">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h4>{value.title}</h4>
                <p>{value.text}</p>
              </article>
            ))}
          </div>
        </div>

        {/* Owners */}
        <div className="abt-owners">
          <div className="abt-owners-copy">
            <span className="abt-index">
              04 / THE PEOPLE BEHIND THE STUDIO
            </span>

            <h3>
              Creative Art Production is built on experience, trust and a love
              for capturing moments.
            </h3>

            <p>
              The studio is owned by Santokh Singh Sodhi and Ram Sharan.
              Their names represent the people behind the work and the vision
              of Creative Art Production.
            </p>
          </div>

          <div className="abt-owner-list">
            {OWNERS.map((name, index) => (
              <div className="abt-owner" key={name}>
                <span className="abt-owner-number">0{index + 1}</span>
                <span className="abt-owner-name">{name}</span>
                <span className="abt-owner-role">Owner</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="abt-cta-panel">
          <div>
            <span className="abt-index">
              LET'S CREATE SOMETHING MEANINGFUL
            </span>

            <h3>Have a moment worth capturing?</h3>
            <p>Tell us about your event or photography requirement.</p>
          </div>

          <button
            type="button"
            className="abt-cta"
            onClick={() => onBookService?.('General Enquiry')}
          >
            Plan your shoot <span aria-hidden="true">↗</span>
          </button>
        </div>

      </div>

      <style jsx>{`
        .abt {
          --abt-ink: var(--foreground, #171717);
          --abt-muted: color-mix(in srgb, var(--abt-ink) 65%, transparent);
          --abt-line: color-mix(in srgb, var(--abt-ink) 16%, transparent);
          --abt-accent: var(--accent, #d6a64b);

          padding: clamp(38px, 5vw, 68px) 18px;
          color: var(--abt-ink);
        }

        .abt-inner {
          width: min(1200px, 100%);
          margin: 0 auto;
        }

        /* Intro */
        .abt-intro {
          max-width: 750px;
          margin: 0 auto clamp(38px, 5vw, 64px);
          text-align: center;
        }

        .abt-eyebrow,
        .abt-index {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-size: 10px;
          font-weight: 750;
          letter-spacing: .13em;
          text-transform: uppercase;
          opacity: .68;
        }

        .abt-eyebrow-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--abt-accent);
          box-shadow: 0 0 0 3px color-mix(in srgb, var(--abt-accent) 18%, transparent);
        }

        .abt-intro h2 {
          margin: 15px 0 10px;
          font-size: clamp(2rem, 5vw, 4rem);
          line-height: 1;
          letter-spacing: -.06em;
          font-weight: 800;
        }

        .abt-intro h2 span {
          display: block;
          color: var(--abt-accent);
        }

        .abt-intro > p {
          max-width: 520px;
          margin: 0 auto;
          font-size: clamp(.9rem, 1.2vw, 1rem);
          line-height: 1.6;
          color: var(--abt-muted);
        }

        /* Story */
        .abt-story {
          display: grid;
          grid-template-columns: .9fr 1.1fr;
          gap: clamp(24px, 5vw, 64px);
          padding: 24px 0 38px;
          border-top: 1px solid var(--abt-line);
          border-bottom: 1px solid var(--abt-line);
        }

        .abt-story-heading h3,
        .abt-section-heading h3 {
          max-width: 420px;
          margin: 15px 0 0;
          font-size: clamp(1.45rem, 2.8vw, 2.25rem);
          line-height: 1.1;
          letter-spacing: -.045em;
        }

        .abt-story-copy p {
          margin: 0 0 14px;
          color: var(--abt-muted);
          font-size: .92rem;
          line-height: 1.65;
        }

        .abt-story-copy p:last-child {
          margin-bottom: 0;
        }

        /* Services and values */
        .abt-services,
        .abt-values-section {
          padding: clamp(38px, 5vw, 58px) 0 0;
        }

        .abt-section-heading {
          margin-bottom: 20px;
        }

        .abt-service-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          border-top: 1px solid var(--abt-line);
        }

        .abt-service {
          min-height: 58px;
          display: grid;
          grid-template-columns: 35px 1fr 20px;
          align-items: center;
          gap: 10px;
          padding: 11px 8px;
          border-bottom: 1px solid var(--abt-line);
          font-size: clamp(.85rem, 1.2vw, .96rem);
          font-weight: 650;
        }

        .abt-service:nth-child(odd) {
          border-right: 1px solid var(--abt-line);
          padding-right: 18px;
        }

        .abt-service:nth-child(even) {
          padding-left: 18px;
        }

        .abt-service-number,
        .abt-value-number,
        .abt-owner-number {
          color: var(--abt-accent);
          font-size: 10px;
          font-weight: 800;
          letter-spacing: .08em;
        }

        .abt-service-arrow {
          opacity: .45;
          text-align: right;
          transition: transform .2s ease, opacity .2s ease;
        }

        .abt-service:hover .abt-service-arrow {
          opacity: 1;
          transform: translate(3px, -3px);
        }

        .abt-values {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          border-top: 1px solid var(--abt-line);
          border-bottom: 1px solid var(--abt-line);
        }

        .abt-value {
          padding: 20px 18px 22px 0;
        }

        .abt-value + .abt-value {
          padding-left: 18px;
          border-left: 1px solid var(--abt-line);
        }

        .abt-value h4 {
          margin: 15px 0 7px;
          font-size: 1rem;
          letter-spacing: -.02em;
        }

        .abt-value p {
          margin: 0;
          color: var(--abt-muted);
          font-size: .86rem;
          line-height: 1.6;
        }

        /* Owners */
        .abt-owners {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(24px, 5vw, 64px);
          align-items: center;
          margin-top: clamp(42px, 6vw, 68px);
          padding: clamp(22px, 3.5vw, 36px);
          border: 1px solid var(--abt-line);
          border-radius: 16px;
          background: color-mix(in srgb, var(--abt-ink) 3%, transparent);
        }

        .abt-owners-copy h3 {
          margin: 15px 0 7px;
          font-size: clamp(1.4rem, 2.4vw, 2rem);
          line-height: 1.12;
          letter-spacing: -.045em;
        }

        .abt-owners-copy p {
          margin: 0;
          max-width: 52ch;
          color: var(--abt-muted);
          font-size: .86rem;
          line-height: 1.6;
        }

        .abt-owner-list {
          border-top: 1px solid var(--abt-line);
        }

        .abt-owner {
          display: grid;
          grid-template-columns: 30px 1fr auto;
          align-items: center;
          gap: 10px;
          padding: 15px 0;
          border-bottom: 1px solid var(--abt-line);
        }

        .abt-owner-name {
          font-size: clamp(.9rem, 1.4vw, 1.05rem);
          font-weight: 750;
          letter-spacing: -.025em;
        }

        .abt-owner-role {
          color: var(--abt-muted);
          font-size: .8rem;
        }

        /* CTA */
        .abt-cta-panel {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          margin-top: clamp(40px, 5vw, 60px);
          padding: clamp(22px, 3.5vw, 36px);
          border-radius: 16px;
          background: var(--abt-ink);
          color: var(--background, #fff);
        }

        .abt-cta-panel .abt-index {
          color: inherit;
          opacity: .65;
        }

        .abt-cta-panel h3 {
          margin: 14px 0 8px;
          font-size: clamp(1.35rem, 2.6vw, 2rem);
          line-height: 1.1;
          letter-spacing: -.045em;
        }

        .abt-cta-panel p {
          margin: 0;
          color: inherit;
          opacity: .7;
          font-size: .88rem;
          line-height: 1.6;
        }

        .abt-cta {
          flex: 0 0 auto;
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 11px 16px;
          border-radius: 999px;
          background: var(--abt-accent);
          color: #171717;
          font-size: .88rem;
          font-weight: 750;
          text-decoration: none;
          transition: transform .2s ease, filter .2s ease;
        }

        .abt-cta:hover {
          transform: translateY(-2px);
          filter: brightness(1.06);
        }

        .abt-cta:focus-visible {
          outline: 3px solid var(--abt-accent);
          outline-offset: 4px;
        }

        /* Tablet */
        @media (max-width: 760px) {
          .abt-story,
          .abt-owners {
            grid-template-columns: 1fr;
          }

          .abt-values {
            grid-template-columns: 1fr;
          }

          .abt-value,
          .abt-value + .abt-value {
            padding: 18px 0;
            border-left: 0;
          }

          .abt-value + .abt-value {
            border-top: 1px solid var(--abt-line);
          }
        }

        /* Mobile */
        @media (max-width: 560px) {
          .abt {
            padding: 38px 14px;
          }

          .abt-intro {
            margin-bottom: 38px;
          }

          .abt-intro h2 {
            font-size: clamp(2rem, 10vw, 3rem);
          }

          .abt-service-grid {
            grid-template-columns: 1fr;
          }

          .abt-service:nth-child(odd),
          .abt-service:nth-child(even) {
            padding: 11px 4px;
            border-right: 0;
          }

          .abt-cta-panel {
            align-items: flex-start;
            flex-direction: column;
          }

          .abt-owner {
            grid-template-columns: 28px 1fr;
          }

          .abt-owner-role {
            grid-column: 2;
            margin-top: -7px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .abt-cta,
          .abt-service-arrow {
            transition: none;
          }
        }
      `}</style>
    </section>
  );
}
