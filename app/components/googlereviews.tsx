
'use client';

import type { CSSProperties } from 'react';

export interface GoogleReviewItem {
  authorName: string;
  rating: number;
  text: string;
  time: string;
  avatarUrl?: string;
  tone: string;
}

interface GoogleReviewsProps {
  reviews?: GoogleReviewItem[];
  overallRating?: number;
  totalReviews?: number;
  ctaHref?: string;
}

const DEFAULT_REVIEWS: GoogleReviewItem[] = [
  {
    authorName: 'Rishipal Mathil',
    rating: 5,
    text: 'Totly professional work with good supported team I love this creative art production team. All the best',
    time: 'Google Review',
    avatarUrl:
      'https://lh3.googleusercontent.com/a-/ALV-UjVMUA3sd_XPJTuoDJUG90uhGb-9JlVpHb47OrT5QZ9SQ8SJcaJd=w90-h90-p-rp-mo-br100',
    tone: '#8B7CFF',
  },
  {
    authorName: 'SHRI KRISHNA',
    rating: 5,
    text: 'Totlly professionaly work .I love that full creative art team',
    time: 'Google Review',
    avatarUrl:
      'https://lh3.googleusercontent.com/a-/ALV-UjV4gHizZlFOHAQTl_BOEgocaD7DXcggqIbPdA5l16SOiK6CRJZywA=w90-h90-p-rp-mo-br100',
    tone: '#39C6B0',
  },
  {
    authorName: 'Kamlesh Kumar',
    rating: 5,
    text: 'Excellent work by professional team thanks for creative art production team',
    time: 'Google Review',
    avatarUrl:
      'https://lh3.googleusercontent.com/a-/ALV-UjUzZuQNSYzZRQFGDw8n2LBJyB_t8ymGqz_zfuzkkRTT3o4e7iJ4=w90-h90-p-rp-mo-br100',
    tone: '#FF829A',
  },
];

function GoogleMark({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" aria-label="Google" role="img">
      <path fill="#4285F4" d="M43.6 24.5c0-1.4-.1-2.8-.4-4.1H24v7.8h11a9.4 9.4 0 0 1-4.1 6.2v5.1h6.7c3.9-3.6 6-8.8 6-15Z" />
      <path fill="#34A853" d="M24 44c5.5 0 10.1-1.8 13.5-4.9l-6.7-5.1c-1.8 1.2-4.1 2-6.8 2-5.2 0-9.6-3.5-11.2-8.2H5.9v5.2A20 20 0 0 0 24 44Z" />
      <path fill="#FBBC05" d="M12.8 27.8a12 12 0 0 1 0-7.6V15H5.9a20 20 0 0 0 0 18l6.9-5.2Z" />
      <path fill="#EA4335" d="M24 12c3 0 5.7 1 7.8 3.1l5.8-5.8A19.5 19.5 0 0 0 24 4 20 20 0 0 0 5.9 15l6.9 5.2C14.4 15.5 18.8 12 24 12Z" />
    </svg>
  );
}

export default function GoogleReviews({
  reviews = DEFAULT_REVIEWS,
  overallRating = 5.0,
  totalReviews = 148,
  ctaHref = '#contact',
}: GoogleReviewsProps) {
  return (
    <section
      className="reviews-section"
      id="google-reviews"
      aria-labelledby="reviews-heading"
    >
      <div className="reviews-glow reviews-glow-one" aria-hidden="true" />
      <div className="reviews-glow reviews-glow-two" aria-hidden="true" />

      <header className="reviews-header">
        <span className="reviews-eyebrow">
          <span className="eyebrow-line" />
          KIND WORDS, REAL EXPERIENCES
        </span>

        <h2 id="reviews-heading">
          Loved by our <span>customers.</span>
        </h2>

        <p>
          Every project is personal. Here’s what people have to say about
          working with us.
        </p>
      </header>

      <div className="reviews-layout">
        <div className="reviews-grid">
          {reviews.map((review, index) => (
            <article
              className="review-card"
              key={`${review.authorName}-${index}`}
              style={
                {
                  '--review-tone': review.tone || '#8B7CFF',
                } as CSSProperties
              }
            >
              <div className="review-card-top">
                <div className="review-person">
                  {review.avatarUrl ? (
                    <img
                      className="review-avatar"
                      src={review.avatarUrl}
                      alt={review.authorName}
                      loading="lazy"
                    />
                  ) : (
                    <span className="review-avatar review-avatar-fallback" aria-hidden="true">
                      {review.authorName.trim().charAt(0).toUpperCase()}
                    </span>
                  )}

                  <div className="review-person-copy">
                    <h3>{review.authorName}</h3>
                    <span className="review-time">{review.time}</span>
                  </div>
                </div>
              </div>

              <div
                className="review-stars"
                aria-label={`${review.rating} out of 5 stars`}
              >
                {'★'.repeat(Math.max(0, Math.min(5, review.rating)))}
                <span className="review-rating-number">
                  {review.rating.toFixed(1)}
                </span>
              </div>

              <p className="review-copy">“{review.text}”</p>

              <div className="review-card-footer">
                <span className="review-footer-dot" />
                Customer review
              </div>
            </article>
          ))}
        </div>

        <aside className="rating-card" aria-label="Overall Google rating">
          <div className="rating-card-heading">
            <span className="rating-google-wrap">
              <GoogleMark className="rating-google-mark" />
            </span>

            <div>
              <span className="rating-overline">GOOGLE</span>
              <h3>Customer rating</h3>
            </div>
          </div>

          <div className="rating-score-row">
            <strong className="rating-score">
              {overallRating.toFixed(1)}
            </strong>

            <div className="rating-score-details">
              <div
                className="rating-stars"
                aria-label={`${overallRating.toFixed(1)} out of 5 stars`}
              >
                ★★★★★
              </div>
              <span className="rating-scale">out of 5.0</span>
            </div>
          </div>

          <div className="rating-divider" />

          <p className="rating-description">
            Based on <strong>{String(totalReviews)} reviews</strong> for
            Creative Art Production.
          </p>

          <div className="rating-trust-row">
            <span className="trust-check">✓</span>
            <span>Feedback from our customers</span>
          </div>

          <a className="rating-cta" href={ctaHref}>
            Share your experience <span aria-hidden="true">↗</span>
          </a>

          <p className="rating-note">
            Your feedback helps us keep getting better.
          </p>
        </aside>
      </div>

      <style jsx>{`
        .reviews-section {
          position: relative;
          isolation: isolate;
          width: min(100% - 40px, 1200px);
          margin: clamp(64px, 9vw, 112px) auto 24px;
          padding: clamp(28px, 4vw, 48px) 0;
          color: #f7f7fb;
        }
        .reviews-glow {
          position: absolute;
          z-index: -1;
          width: 280px;
          height: 280px;
          border-radius: 50%;
          filter: blur(90px);
          opacity: .13;
          pointer-events: none;
        }
        .reviews-glow-one {
          top: 12%;
          left: -100px;
          background: #7865ff;
        }
        .reviews-glow-two {
          right: -90px;
          bottom: 4%;
          background: #3ccbb1;
        }
        .reviews-header {
          max-width: 720px;
          margin: 0 auto 38px;
          text-align: center;
        }
        .reviews-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 17px;
          color: #b8b4d6;
          font-size: .7rem;
          font-weight: 700;
          letter-spacing: .18em;
        }
        .eyebrow-line {
          display: inline-block;
          width: 25px;
          height: 1px;
          background: #9b8cff;
        }
        .reviews-header h2 {
          margin: 0;
          font-size: clamp(2rem, 4.7vw, 3.55rem);
          line-height: 1.06;
          letter-spacing: -.055em;
          font-weight: 750;
        }
        .reviews-header h2 span {
          color: #a99aff;
        }
        .reviews-header > p {
          max-width: 540px;
          margin: 16px auto 0;
          color: rgba(239,239,249,.68);
          font-size: clamp(.94rem, 1.5vw, 1.05rem);
          line-height: 1.75;
          margin-bottom: 100px;
        }
        .reviews-layout {
          display: grid;
          grid-template-columns: minmax(0, 1.75fr) minmax(260px, .8fr);
          align-items: stretch;
          gap: 20px;
        }
        .reviews-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          align-content: start;
          gap: 14px;
          min-width: 0;
        }
        .review-card {
          min-width: 0;
          padding: 21px;
          border: 1px solid rgba(255,255,255,.105);
          border-radius: 20px;
          background: linear-gradient(145deg, rgba(255,255,255,.075), rgba(255,255,255,.025));
          box-shadow: 0 12px 34px rgba(0,0,0,.12), inset 0 1px 0 rgba(255,255,255,.055);
          backdrop-filter: blur(18px);
          transition: transform .25s ease, border-color .25s ease, background .25s ease;
        }
        .review-card:first-child {
          grid-row: span 2;
        }
        .review-card:hover {
          transform: translateY(-3px);
          border-color: color-mix(in srgb, var(--review-tone) 50%, rgba(255,255,255,.2));
          background: linear-gradient(145deg, color-mix(in srgb, var(--review-tone) 12%, rgba(255,255,255,.06)), rgba(255,255,255,.025));
        }
        .review-card-top,
        .review-person {
          display: flex;
          align-items: center;
        }
        .review-card-top {
          justify-content: space-between;
          gap: 10px;
        }
        .review-person {
          min-width: 0;
          gap: 11px;
        }
        .review-avatar {
          display: block;
          flex: 0 0 43px;
          width: 43px;
          height: 43px;
          border-radius: 50%;
          object-fit: cover;
          object-position: center;
          border: 2px solid rgba(255,255,255,.2);
          background: #282638;
        }
        .review-avatar-fallback {
          display: grid;
          place-items: center;
          color: #fff;
          font-weight: 700;
          background: color-mix(in srgb, var(--review-tone) 65%, #282638);
        }
        .review-person-copy {
          min-width: 0;
        }
        .review-person-copy h3 {
          overflow: hidden;
          margin: 0;
          color: #fff;
          font-size: .96rem;
          font-weight: 650;
          line-height: 1.3;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .review-time {
          display: block;
          margin-top: 4px;
          color: rgba(237,237,248,.53);
          font-size: .76rem;
        }
        .review-stars {
          display: flex;
          align-items: center;
          gap: 8px;
          margin: 21px 0 12px;
          color: #ffca63;
          font-size: 1rem;
          letter-spacing: 2px;
        }
        .review-rating-number {
          color: rgba(255,255,255,.7);
          font-size: .75rem;
          font-weight: 600;
          letter-spacing: 0;
        }
        .review-copy {
          margin: 0;
          color: rgba(247,247,252,.83);
          font-size: .92rem;
          line-height: 1.8;
          overflow-wrap: anywhere;
        }
        .review-card-footer {
          display: flex;
          align-items: center;
          gap: 7px;
          margin-top: 22px;
          color: rgba(237,237,248,.45);
          font-size: .72rem;
        }
        .review-footer-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--review-tone);
          box-shadow: 0 0 12px color-mix(in srgb, var(--review-tone) 70%, transparent);
        }
        .rating-card {
          position: relative;
          display: flex;
          min-width: 0;
          flex-direction: column;
          align-items: flex-start;
          padding: clamp(23px, 3vw, 32px);
          overflow: hidden;
          border: 1px solid rgba(255,255,255,.14);
          border-radius: 22px;
          background: linear-gradient(155deg, rgba(38,35,61,.9), rgba(20,21,34,.82));
          box-shadow: 0 18px 50px rgba(0,0,0,.2), inset 0 1px 0 rgba(255,255,255,.08);
        }
        .rating-card::before {
          position: absolute;
          top: -75px;
          right: -75px;
          width: 180px;
          height: 180px;
          border-radius: 50%;
          background: rgba(145,126,255,.16);
          filter: blur(35px);
          content: '';
          pointer-events: none;
        }
        .rating-card-heading {
          position: relative;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .rating-google-wrap {
          display: grid;
          place-items: center;
          width: 40px;
          height: 40px;
          flex: 0 0 40px;
          border: 1px solid rgba(255,255,255,.12);
          border-radius: 13px;
          background: rgba(255,255,255,.07);
        }
        .rating-google-mark {
          display: block !important;
          flex: 0 0 20px !important;
          width: 20px !important;
          min-width: 20px !important;
          max-width: 20px !important;
          height: 20px !important;
          min-height: 20px !important;
          max-height: 20px !important;
        }
        .rating-overline {
          display: block;
          margin-bottom: 3px;
          color: #a99aff;
          font-size: .65rem;
          font-weight: 750;
          letter-spacing: .17em;
        }
        .rating-card-heading h3 {
          margin: 0;
          color: #fff;
          font-size: 1rem;
          font-weight: 650;
        }
        .rating-score-row {
          display: flex;
          align-items: center;
          gap: 17px;
          margin: 31px 0 25px;
        }
        .rating-score {
          color: #fff;
          font-size: clamp(3.4rem, 5vw, 4.7rem);
          font-weight: 750;
          letter-spacing: -.075em;
          line-height: .95;
        }
        .rating-score-details {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
        .rating-stars {
          color: #ffca63;
          font-size: 1.02rem;
          letter-spacing: 2px;
          white-space: nowrap;
        }
        .rating-scale {
          color: rgba(239,239,249,.53);
          font-size: .76rem;
        }
        .rating-divider {
          width: 100%;
          height: 1px;
          background: rgba(255,255,255,.11);
        }
        .rating-description {
          margin: 20px 0 17px;
          color: rgba(239,239,249,.68);
          font-size: .9rem;
          line-height: 1.75;
        }
        .rating-description strong {
          color: #fff;
          font-weight: 650;
        }
        .rating-trust-row {
          display: flex;
          align-items: center;
          gap: 9px;
          color: rgba(239,239,249,.8);
          font-size: .82rem;
        }
        .trust-check {
          display: grid;
          place-items: center;
          width: 20px;
          height: 20px;
          flex: 0 0 20px;
          border-radius: 50%;
          color: #8ce4c8;
          background: rgba(91,220,179,.13);
          font-size: .75rem;
          font-weight: 800;
        }
        .rating-cta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
          width: 100%;
          margin-top: auto;
          padding: 13px 16px;
          border: 1px solid rgba(255,255,255,.13);
          border-radius: 12px;
          background: #f5f3ff;
          color: #24213a;
          font-size: .87rem;
          font-weight: 700;
          text-decoration: none;
          transition: transform .2s ease, background .2s ease;
        }
        .rating-cta span {
          font-size: 1.05rem;
        }
        .rating-cta:hover {
          transform: translateY(-2px);
          background: #fff;
        }
        .rating-cta:focus-visible {
          outline: 2px solid #b5a9ff;
          outline-offset: 4px;
        }
        .rating-note {
          margin: 13px 0 0;
          color: rgba(239,239,249,.43);
          font-size: .72rem;
          line-height: 1.5;
        }
        @media (max-width: 900px) {
          .reviews-layout {
            grid-template-columns: minmax(0, 1fr);
          }
          .rating-card {
            display: grid;
            grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
            align-items: center;
            column-gap: 20px;
          }
          .rating-card-heading,
          .rating-score-row,
          .rating-divider,
          .rating-description,
          .rating-trust-row,
          .rating-cta,
          .rating-note {
            grid-column: 1 / -1;
          }
          .rating-score-row {
            margin: 24px 0 20px;
          }
          .rating-cta {
            margin-top: 22px;
          }
        }
        @media (max-width: 620px) {
          .reviews-section {
            width: min(100% - 28px, 1160px);
            margin: 54px auto;
            padding: 20px 0;
          }
          .reviews-header {
            margin-bottom: 27px;
          }
          .reviews-eyebrow {
            font-size: .61rem;
            letter-spacing: .13em;
          }
          .reviews-header > p {
            margin-bottom: 0;
          }
          .reviews-grid {
            grid-template-columns: minmax(0, 1fr);
            gap: 12px;
          }
          .review-card:first-child {
            grid-row: auto;
          }
          .review-card {
            padding: 19px;
            border-radius: 17px;
          }
          .review-avatar {
            flex-basis: 40px;
            width: 40px;
            height: 40px;
          }
          .review-stars {
            margin-top: 17px;
          }
          .review-copy {
            font-size: .9rem;
          }
          .review-card-footer {
            margin-top: 17px;
          }
          .rating-card {
            display: flex;
            padding: 23px;
            border-radius: 19px;
          }
          .rating-score-row {
            margin: 26px 0 21px;
          }
          .rating-cta {
            margin-top: 22px;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .review-card,
          .rating-cta {
            transition: none;
          }
          .review-card:hover,
          .rating-cta:hover {
            transform: none;
          }
        }
      `}</style>
    </section>
  );
}
