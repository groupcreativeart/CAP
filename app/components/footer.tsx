
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const services = [
  { label: "Wedding Photography", href: "#services" },
  { label: "Portrait Photography", href: "#services" },
  { label: "Event Photography", href: "#services" },
  { label: "School Photography", href: "#services" },
];

const navigation = [
  { label: "Work", href: "#work" },
  { label: "Our Services", href: "#services" },
  { label: "Why Us", href: "#why-us" },
  { label: "About", href: "#about" },
];



export default function Footer() {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);
  

  return (
    <footer className="cap-footer">
      <div className="cap-footer__shell">

        <div className="cap-footer__grid">

          {/* 1. Logo and About */}
          <div className="cap-footer__brand">

            <Link href="/" className="cap-footer__logo">

              <img
                className="cap-footer__logo-image"
                src="https://res.cloudinary.com/fwadajoo/image/upload/v1794501862/logo.png"
                alt="Creative Art Production Logo"
                width={48}
                height={48}
                style={{
                  width: "48px",
                  height: "48px",
                  minWidth: "48px",
                  maxWidth: "48px",
                  objectFit: "contain",
                  flex: "0 0 48px",
                }}
              />

              <span className="cap-footer__logo-text">
                Creative Art
                <span className="cap-footer__logo-light"> Production</span>
              </span>

            </Link>

            <div className="cap-footer__about-wrap">
              <p className="cap-footer__about">
                Capturing genuine moments and turning them into
                timeless photographs you can cherish for years
                to come.
              </p>

              <p className="cap-footer__about">
                <span style={{ fontWeight: "bold" }}>Location:</span> Delhi, India
              </p>
            </div>

          </div>

          {/* 2. Services */}
          <nav className="cap-footer__column" aria-label="Services">

            <h3 className="cap-footer__heading">SERVICES</h3>

            <ul>
              {services.map((service) => (
                <li key={service.label}>
                  <Link href={service.href}>
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>

          </nav>

          {/* 3. Navigation */}
          <nav className="cap-footer__column" aria-label="Navigation">

            <h3 className="cap-footer__heading">EXPLORE</h3>

            <ul>
              {navigation.map((item) => (
                <li key={item.label}>
                  <Link href={item.href}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

          </nav>

          {/* 4. Contact Details */}
          <div className="cap-footer__column cap-footer__contact">

            <h3 className="cap-footer__heading">GET IN TOUCH</h3>

            <a href="mailto:groupcreativeart@gmail.com">
              groupcreativeart@gmail.com
            </a>

            <div className="cap-footer__phones">
              <a href="tel:+919654114000">+91 96541 14000</a><br></br>
              <a href="tel:+919654115000">+91 96541 15000</a><br></br>
              <a href="tel:+919654117000">+91 96541 17000</a>
            </div>

            <p className="cap-footer__contact-note">
              Have a shoot in mind? Let’s create something
              memorable together.
            </p>

          </div>

        </div>

        {/* Bottom Bar */}
        <div className="cap-footer__bottom">

          <p>
            © {year ?? "2026"} Creative Art Production.
            All rights reserved.
          </p>

          <div className="cap-footer__bottom-right">

            <p className="cap-footer__tagline">
              Real moments. Timeless frames.
            </p>

            <p className="cap-footer__credit">
              Developed by{" "}
              <a
                href="https://www.corelith.in/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Corelith
              </a>
            </p>

          </div>

        </div>

      </div>

      <style jsx>{`

        /* =====================================
           CREATIVE ART PRODUCTION - FOOTER
        ===================================== */

        .cap-footer {
          width: 100%;
          padding: 48px 24px 24px;
          display: flex;
          justify-content: center;
          box-sizing: border-box;
          color: #f3f4fa;
        }

        /* Main Container */
        .cap-footer__shell {
          position: relative;
          isolation: isolate;
          width: 92%;
          max-width: 1280px;
          margin-inline: auto;
          box-sizing: border-box;
          padding: clamp(30px, 4vw, 56px);
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.14);
          border-radius: 28px;
          background: linear-gradient(
            145deg,
            rgba(75, 85, 110, 0.42),
            rgba(32, 33, 49, 0.78) 48%,
            rgba(35, 26, 59, 0.72)
          );
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(22px) saturate(145%);
          -webkit-backdrop-filter: blur(22px) saturate(145%);
        }

        .cap-footer__shell::before {
          content: "";
          position: absolute;
          z-index: -1;
          inset: 0;
          pointer-events: none;
          background:
            radial-gradient(
              ellipse at 10% 0%,
              rgba(124, 139, 255, 0.12),
              transparent 42%
            ),
            radial-gradient(
              ellipse at 100% 100%,
              rgba(133, 82, 255, 0.1),
              transparent 40%
            );
        }

        /* Grid */
        .cap-footer__grid {
          display: grid;
          grid-template-columns:
            minmax(220px, 1.35fr)
            minmax(170px, 1fr)
            minmax(100px, 0.65fr)
            minmax(260px, 1.4fr);
          gap: clamp(24px, 3vw, 44px);
          padding-bottom: 48px;
        }

        /* Brand */
        .cap-footer__brand {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        /* Logo */
        .cap-footer__logo {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          color: #f3f4fa;
          font-family: var(--display);
          font-size: clamp(1.15rem, 1.6vw, 1.45rem);
          font-weight: 800;
          letter-spacing: -0.04em;
          text-decoration: none;
          white-space: nowrap;
        }

        /* Isolated logo image */
        .cap-footer__logo-image {
          display: block;
          width: 48px !important;
          height: 48px !important;
          min-width: 48px !important;
          min-height: 48px !important;
          max-width: 48px !important;
          max-height: 48px !important;
          object-fit: contain !important;
          object-position: center;
          flex: 0 0 48px !important;
          border-radius: 0;
        }

        .cap-footer__logo-text {
          color: #f3f4fa;
          font-weight: 800;
        }

        .cap-footer__logo-light {
          color: rgba(226, 230, 245, 0.7);
          font-weight: 400;
        }

        /* About */
        .cap-footer__about-wrap {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .cap-footer__about {
          max-width: 340px;
          margin: 10px 0;
          color: rgba(220, 225, 243, 0.68);
          font-size: 0.98rem;
          line-height: 1.35;
        }
          
        /* CTA */
        .cap-footer__cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          min-height: 48px;
          padding: 0 22px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 999px;
          background: linear-gradient(120deg, #6678ff, #7954db);
          color: #fff;
          font-size: 0.94rem;
          font-weight: 650;
          text-decoration: none;
          transition: transform 180ms ease, box-shadow 180ms ease;
        }

        .cap-footer__cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 28px rgba(103, 93, 255, 0.25);
        }

        .cap-footer__cta span {
          font-size: 1.1rem;
        }

        /* Headings */
        .cap-footer__heading {
          margin: 5px 0 24px;
          color: rgba(171, 180, 220, 0.65);
          font-size: 0.8rem;
          font-weight: 750;
          letter-spacing: 0.11em;
        }

        /* Columns */
        .cap-footer__column ul {
          display: flex;
          flex-direction: column;
          gap: 17px;
          margin: 0;
          padding: 0;
          list-style: none;
        }

        .cap-footer__column a {
          width: fit-content;
          color: rgba(221, 225, 243, 0.72);
          font-size: 0.98rem;
          line-height: 1.6;
          text-decoration: none;
          overflow-wrap: anywhere;
          transition: color 180ms ease;
        }

        .cap-footer__column a:hover {
          color: #fff;
        }

        /* Contact */
        .cap-footer__contact {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 16px;
        }

        .cap-footer__contact .cap-footer__heading {
          margin-bottom: 4px;
        }

        .cap-footer__contact-note {
          max-width: 260px;
          margin: 2px 0 0;
          color: rgba(220, 225, 243, 0.54);
          font-size: 0.88rem;
          line-height: 1.7;
        }

        /* Bottom Bar */
        .cap-footer__bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
          padding-top: 25px;
          border-top: 1px solid rgba(255, 255, 255, 0.12);
        }

        .cap-footer__bottom p {
          margin: 0;
          color: rgba(235, 237, 248, 0.8);
          font-size: 0.84rem;
          line-height: 1.6;
        }

        .cap-footer__bottom-right {
          display: flex;
          align-items: center;
          gap: 18px;
        }

        .cap-footer__tagline {
          text-align: right;
        }

        /* Developer Credit */
        .cap-footer__credit {
          font-size: 0.78rem !important;
          color: rgba(220, 225, 243, 0.5) !important;
        }

        .cap-footer__credit a {
          color: #a7b0ff;
          font-weight: 650;
          text-decoration: none;
          transition: color 180ms ease;
        }

        .cap-footer__credit a:hover {
          color: #fff;
        }

        /* Focus */
        .cap-footer__logo:focus-visible,
        .cap-footer__column a:focus-visible,
        .cap-footer__cta:focus-visible,
        .cap-footer__credit a:focus-visible {
          outline: 2px solid #a7b0ff;
          outline-offset: 4px;
        }

        /* Tablet */
        @media (max-width: 1050px) {
          .cap-footer__grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 42px 36px;
          }
        }

        /* Mobile */
        @media (max-width: 600px) {
          .cap-footer {
            padding: 28px 14px 14px;
          }

          .cap-footer__shell {
            width: 100%;
            padding: 30px 22px 22px;
            border-radius: 22px;
          }

          .cap-footer__grid {
            grid-template-columns: minmax(0, 1fr);
            gap: 34px;
            padding-bottom: 32px;
          }

          .cap-footer__logo {
            gap: 8px;
            font-size: 1.1rem;
          }

          .cap-footer__logo-image {
            width: 40px !important;
            height: 40px !important;
            min-width: 40px !important;
            min-height: 40px !important;
            max-width: 40px !important;
            max-height: 40px !important;
            flex: 0 0 40px !important;
          }

          .cap-footer__about {
            margin: 16px 0 20px;
          }

          .cap-footer__heading {
            margin-bottom: 16px;
          }

          .cap-footer__bottom {
            align-items: flex-start;
            flex-direction: column;
            gap: 12px;
            padding-top: 20px;
          }

          .cap-footer__bottom-right {
            align-items: flex-start;
            flex-direction: column;
            gap: 5px;
          }

          .cap-footer__tagline {
            text-align: left;
          }
        }

        /* Reduced Motion */
        @media (prefers-reduced-motion: reduce) {
          .cap-footer__cta,
          .cap-footer__column a,
          .cap-footer__credit a {
            transition: none;
          }

          .cap-footer__cta:hover {
            transform: none;
          }
        }

      `}</style>
    </footer>
  );
}
