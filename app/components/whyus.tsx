'use client';

import { useState, type CSSProperties } from 'react';

export interface Faq {
  question: string;
  answer: string;
  tone: string; // glass tint colour of this item
}

interface WhyUsProps {
  faqs?: Faq[];
  highlights?: string[];
  ctaHref?: string;
  onBookService?: (service: string) => void;
}

const DEFAULT_FAQS: Faq[] = [
  {
    question: 'Do you come to our school or venue?',
    answer:
      'Yes. We travel to your school, home or venue and bring our own lights, backdrops and gear, so you only need to give us a space and a time.',
    tone: '#4F63FF'
  },
  {
    question: 'How do you handle ID card photos for a big school?',
    answer:
      'We shoot class by class with the same backdrop and lighting for every student. Files are named and sorted by class and section, and delivered in the format your card software needs.',
    tone: '#F7B731'
  },
  {
    question: 'How long until we get our photos?',
    answer:
      'For events, you get a few sneak-peek photos within days and the full edited gallery shortly after. ID card batches are delivered as per the school size, and we agree on a date before the shoot.',
    tone: '#19C3AB'
  },
  {
    question: 'Do we get all the photos or only a few?',
    answer:
      'You get every edited photo from the shoot in an online gallery you can download and share. Printed albums, framed photos and yearbooks are optional extras.',
    tone: '#FF5C7C'
  },
  {
    question: 'Can you cover a small or last-minute event?',
    answer:
      'Yes, as long as our team is free that day. Small birthdays and family functions are welcome. Message us as early as you can so we can hold the date.',
    tone: '#9B6BFF'
  },
  {
    question: 'How do I book, and what does it cost?',
    answer:
      'Tell us the type of shoot, date, hours and number of people. We will send a clear quote with no hidden charges, and the date is confirmed once you accept it.',
    tone: '#2EA8FF'
  }
];

const DEFAULT_HIGHLIGHTS = [
  'We come to you',
  'One team for events, schools and studio',
  'Clear quote before you book',
  'Edited photos, not raw dumps'
];

export default function WhyUs({
  faqs = DEFAULT_FAQS,
  highlights = DEFAULT_HIGHLIGHTS,
  ctaHref = '#contact',
  onBookService,
}: WhyUsProps) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="why" id="why-us">
      <header className="why-intro">
        <h2>Why Choose Us</h2>
        <p>Answers to the questions people ask us most before they book.</p>
      </header>

      <div className="why-layout">
        <div className="faq-list">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={f.question}
                className={`faq ${isOpen ? 'faq-open' : ''}`}
                style={{ '--tone': f.tone } as CSSProperties}
              >
                <h3>
                  <button
                    className="faq-q"
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    id={`faq-btn-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <span className="faq-dot" />
                    <span className="faq-text">{f.question}</span>
                    <span className="faq-plus" aria-hidden="true" />
                  </button>
                </h3>
                <div
                  className="faq-a"
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-btn-${i}`}
                >
                  <div className="faq-a-inner">
                    <p>{f.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <aside className="help">
          <span className="corner c-tl" />
          <span className="corner c-tr" />
          <span className="corner c-bl" />
          <span className="corner c-br" />

          <h3>Still have a question?</h3>
          <p>Talk to us directly. We reply fast and plan the shoot around you.</p>
          <ul>
            {highlights.map(h => (
              <li key={h}>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12.5l4.5 4.5L19 7.500" />
                </svg>
                {h}
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="help-cta"
            onClick={() => onBookService?.('General Enquiry')}
          >
            Talk to us
          </button>
        </aside>
      </div>

      <style jsx>{`
        .why {
          padding: clamp(1.5rem, 3vw, 2.5rem) 20px;
          max-width: 1240px;
          margin: 100 auto;
        }
        .why-intro {
          max-width: 640px;
          margin: 0 auto 36px;
          text-align: center;
        }
        .why-intro h2 {
          font-size: clamp(2rem, 4vw, 3rem);
          letter-spacing: -0.02em;
        }
        .why-intro p {
          margin-top: 10px;
          font-size: 1.1rem;
          opacity: 0.7;
          line-height: 1.6;
          margin-bottom: 100px;
        }

        .why-layout {
          display: grid;
          grid-template-columns: 1.7fr 1fr;
          gap: 18px;
          align-items: start;
        }

        .faq-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        /* glass accordion item */
        .faq {
          color: #fff;
          border-radius: 18px;
          overflow: hidden;
          background: linear-gradient(
            145deg,
            color-mix(in srgb, var(--tone) 45%, transparent) 0%,
            color-mix(in srgb, var(--tone) 20%, transparent) 100%
          );
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.22);
          -webkit-backdrop-filter: blur(22px) saturate(150%);
          backdrop-filter: blur(22px) saturate(150%);
          transition: background 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease;
        }
        .faq:hover {
          border-color: color-mix(in srgb, var(--tone) 65%, white);
        }
        .faq-open {
          background: linear-gradient(
            145deg,
            color-mix(in srgb, var(--tone) 68%, transparent) 0%,
            color-mix(in srgb, var(--tone) 32%, transparent) 100%
          );
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.3), 0 20px 40px -26px var(--tone);
        }

        .faq h3 {
          margin: 0;
          font-size: inherit;
        }
        .faq-q {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 18px 22px;
          background: none;
          border: 0;
          color: inherit;
          font: inherit;
          text-align: left;
          cursor: pointer;
        }
        .faq-q:focus-visible {
          outline: 3px solid #fff;
          outline-offset: -5px;
          border-radius: 18px;
        }
        .faq-dot {
          flex: none;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #fff;
          box-shadow: 0 0 0 4px color-mix(in srgb, var(--tone) 50%, transparent);
        }
        .faq-text {
          flex: 1;
          font-size: 1.08rem;
          font-weight: 600;
          letter-spacing: -0.01em;
          line-height: 1.35;
        }

        /* plus turns into a cross when open */
        .faq-plus {
          flex: none;
          position: relative;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.16);
          border: 1px solid rgba(255, 255, 255, 0.3);
          transition: transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1), background 0.25s ease;
        }
        .faq-plus::before,
        .faq-plus::after {
          content: '';
          position: absolute;
          left: 50%;
          top: 50%;
          width: 12px;
          height: 2px;
          border-radius: 2px;
          background: #fff;
          transform: translate(-50%, -50%);
        }
        .faq-plus::after {
          transform: translate(-50%, -50%) rotate(90deg);
        }
        .faq-open .faq-plus {
          transform: rotate(135deg);
          background: rgba(255, 255, 255, 0.28);
        }

        /* smooth height animation without measuring */
        .faq-a {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .faq-open .faq-a {
          grid-template-rows: 1fr;
        }
        .faq-a-inner {
          overflow: hidden;
        }
        .faq-a p {
          margin: 0;
          padding: 0 22px 20px 48px;
          line-height: 1.7;
          opacity: 0.92;
          max-width: 62ch;
        }

        /* side card */
        .help {
          position: sticky;
          top: 24px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          padding: 30px 28px;
          border-radius: 22px;
          color: #fff;
          overflow: hidden;
          background: linear-gradient(145deg, rgba(20, 24, 36, 0.78), rgba(20, 24, 36, 0.5));
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.22);
          -webkit-backdrop-filter: blur(22px) saturate(150%);
          backdrop-filter: blur(22px) saturate(150%);
        }
        .help h3 {
          font-size: 1.5rem;
          letter-spacing: -0.015em;
          line-height: 1.15;
          margin: 0;
        }
        .help p {
          margin: 0;
          line-height: 1.6;
          opacity: 0.82;
        }
        .help ul {
          list-style: none;
          padding: 0;
          margin: 4px 0 8px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .help li {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.95rem;
        }
        .help li svg {
          flex: none;
          padding: 4px;
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.16);
        }
        .help-cta {
          align-self: flex-start;
          font-weight: 600;
          text-decoration: none;
          color: #14182a;
          background: #fff;
          padding: 11px 22px;
          border-radius: 999px;
          transition: transform 0.2s ease;
        }
        .help-cta:hover {
          transform: scale(1.05);
        }
        .help-cta:focus-visible {
          outline: 3px solid #fff;
          outline-offset: 3px;
        }

        /* viewfinder corners, always on, frame the contact card */
        .corner {
          position: absolute;
          width: 14px;
          height: 14px;
          border: 0 solid rgba(255, 255, 255, 0.75);
          pointer-events: none;
        }
        .c-tl { top: 12px; left: 12px; border-top-width: 2px; border-left-width: 2px; }
        .c-tr { top: 12px; right: 12px; border-top-width: 2px; border-right-width: 2px; }
        .c-bl { bottom: 12px; left: 12px; border-bottom-width: 2px; border-left-width: 2px; }
        .c-br { bottom: 12px; right: 12px; border-bottom-width: 2px; border-right-width: 2px; }

        @media (max-width: 900px) {
          .why-layout {
            grid-template-columns: 1fr;
          }
          .help {
            position: static;
          }
        }
        @media (max-width: 620px) {
          .why { padding: 24px 14px; }
          .faq-q { padding: 16px 16px; gap: 12px; }
          .faq-text { font-size: 1rem; }
          .faq-a p { padding: 0 16px 18px 40px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .faq, .faq-a, .faq-plus, .help-cta { transition: none !important; }
        }
      `}</style>
    </section>
  );
}