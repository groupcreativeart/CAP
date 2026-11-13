"use client";

import { useState, useEffect } from "react";
import "./main.css";
import "./background/aurora";
import Aurora from "./background/aurora";
import WorkSection from "./work/worksection"
import OurService from "./ourservice";
import WhyUs from "./whyus";
import About from "./about";
import GoogleReviews from "./googlereviews";
import Footer from "./footer";
import PopupForm, { type BookingFormData } from "./popup_from";
import logo_image from "../logo.png"

type HeroPhoto = {
  src?: string;
  tone: string;
};

const HERO_PHOTOS: HeroPhoto[] = [
  {
    tone: "#c9b8a6",
    src: "https://res.cloudinary.com/fwadajoo/image/upload/v1794254410/0O0A1468.jpg",
  },
  {
    tone: "#8a9ba8",
    src: "https://res.cloudinary.com/fwadajoo/image/upload/v1794254410/IMG_3383.jpg",
  },
  {
    tone: "#d6a77a",
    src: "https://res.cloudinary.com/fwadajoo/image/upload/v1794260381/0O0A1500.jpg",
  },
  {
    tone: "#a9a2b8",
    src: "https://res.cloudinary.com/fwadajoo/image/upload/v1794260382/0O0A1483.jpg",
  },
];





const CLIENTS_TOP = [
  {
    name: "St. Thomas School",
    src: "https://res.cloudinary.com/fwadajoo/image/upload/v1794575971/St_Thomas_School.png",
  },
  {
    name: "St. Xavier School",
    src: "https://res.cloudinary.com/fwadajoo/image/upload/v1794575971/St_Xavier_school_Panipat.png",
  },
  {
    name: "St. Anthony Girls School",
    src: "https://res.cloudinary.com/fwadajoo/image/upload/v1794575970/St_Anthony_Girls_School_Delhi.png",
  },
  {
    name: "Shah International School",
    src: "https://res.cloudinary.com/fwadajoo/image/upload/v1794575970/Shah_International_School_Delhi.png",
  },
  {
    name: "Fatima Convent School",
    src: "https://res.cloudinary.com/fwadajoo/image/upload/v1794575969/Fatima_Convent_School_GZb.png",
  },
  {
    name: "Sam International School",
    src: "https://res.cloudinary.com/fwadajoo/image/upload/v1794575969/Sam_International_School_Dwarka_Delhi.jpg",
  },
  {
    name: "Modern School",
    src: "https://res.cloudinary.com/fwadajoo/image/upload/v1794575969/Modern_School.png",
  },
];

const CLIENTS_BOTTOM = [
  {
    name: "Ganga International School",
    src: "https://res.cloudinary.com/fwadajoo/image/upload/v1794575969/Ganga_International.png",
  },
  {
    name: "DAV Collage Managment",
    src: "https://res.cloudinary.com/fwadajoo/image/upload/v1794575969/DAV_Collage_Managment.png",
  },
  {
    name: "The Infinty School",
    src: "https://res.cloudinary.com/fwadajoo/image/upload/v1794575969/The_Infinty_School_Grater_Noida.png",
  },
  {
    name: "DPS Sirsa",
    src: "https://res.cloudinary.com/fwadajoo/image/upload/v1794575969/DPS_Sirsa.png",
  },
  {
    name: "BVM School",
    src: "https://res.cloudinary.com/fwadajoo/image/upload/v1794575968/BVM_school_najafgarh.png",
  },
  {
    name: "Swarnprastha School",
    src: "https://res.cloudinary.com/fwadajoo/image/upload/v1794575968/Swarnprastha_School_Sonipat.jpg",
  },
  {
    name: "Viaan Internation School",
    src: "https://res.cloudinary.com/fwadajoo/image/upload/v1794575968/Viaan_Internation_School.png",
  },
];


type Client = { name: string; src: string };

function Marquee({
  items,
  reverse = false,
  duration = 40,
}: {
  items: Client[];
  reverse?: boolean;
  duration?: number; // seconds for one full loop (smaller = faster)
}) {
  // repeat the list so one group is always wider than the screen
  const group = [...items, ...items, ...items];

  const renderGroup = (hidden: boolean) => (
    <div className="marquee-group" aria-hidden={hidden || undefined}>
      {group.map((c, i) => (
        <div
          key={`${c.name}-${i}`}
          className="client-card"
          style={{ backgroundImage: `url(${c.src})` }}
          role={hidden ? undefined : "img"}
          aria-label={hidden ? undefined : c.name}
        >
          <span>{c.name}</span>
        </div>
      ))}
    </div>
  );

  return (
    <div
      className={`marquee ${reverse ? "marquee-reverse" : ""}`}
      style={{ "--duration": `${duration}s` } as React.CSSProperties}
    >
      {renderGroup(false)}
      {renderGroup(true)}
    </div>
  );
}


const FILTERS = ["All", "Weddings", "Portraits", "Travel", "Events"] as const;

// const PACKAGES = [
//   {
//     name: "Portrait session",
//     price: "$250",
//     points: ["1 hour on location", "20 edited photos", "Online gallery"],
//   },
//   {
//     name: "Event coverage",
//     price: "$600",
//     points: ["Up to 4 hours", "80 edited photos", "Fast 3-day delivery"],
//     featured: true,
//   },
//   {
//     name: "Wedding day",
//     price: "$1,800",
//     points: ["Full-day coverage", "400+ edited photos", "Printed album included"],
//   },
// ];

const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbwygDRMilBW1JJl-XlW1-PoahmhnHVVggtqHD3xRdMKlscUVc_PBq_HQBvkBdHB5edUCg/exec';

export default function Main() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [sent, setSent] = useState(false);
  const [year, setYear] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');

  const openBookingForm = (service = '') => {
    setSelectedService(service);
    setPopupOpen(true);
  };

  const closeBookingForm = () => {
    setPopupOpen(false);
  };

  const handleBookingSubmit = async (data: BookingFormData) => {
    await fetch(GOOGLE_SHEET_URL, {
      method: 'POST',
      mode: 'no-cors',
      body: JSON.stringify(data),
    });
  };

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <div className="top-section" id="top">
      <PopupForm
        isOpen={popupOpen}
        onClose={closeBookingForm}
        initialService={selectedService}
        onSubmit={handleBookingSubmit}
      />

      <div className="site">
        {/* NAV */}
        <header className={`nav ${menuOpen ? "nav-open" : ""}`}>
          <a href="#top" className="logo" onClick={() => setMenuOpen(false)}>
            <img src="https://res.cloudinary.com/fwadajoo/image/upload/v1794501862/logo.png" alt="Creative Art Production" />
            <span>
              Creative Art<span className="logo-highlight"> Production</span>
            </span>
          </a>

          <button
            type="button"
            className={`mobile-menu-toggle ${menuOpen ? "active" : ""}`}
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="main-navigation"
          >
            <span />
            <span />
            <span />
          </button>

          <nav
            className={`nav-links ${menuOpen ? "show-menu" : ""}`}
            id="main-navigation"
            aria-label="Main"
          >
            <a href="#work" onClick={() => setMenuOpen(false)}>Work</a>
            <a href="#services" onClick={() => setMenuOpen(false)}>Our Services</a>
            <a href="#why-us" onClick={() => setMenuOpen(false)}>Why us</a>
            <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
            <a
              href="#contact"
              className="btn btn-small"
              onClick={() => openBookingForm()}
            >
              Book a shoot
            </a>
          </nav>
        </header>


        {/* HERO */}
        <section className="hero" id="top">
          <div className="hero-text">
            <h1>
              Photographs that feel like the moment did.
            </h1>
            <p>
              Weddings, portraits and travel stories, shot with natural light and
              an eye for the unposed. Based in your city, available worldwide.
            </p>
            <div className="hero-actions">
            <a
              href="#contact"
                className="btn"
                onClick={() => openBookingForm()}
              >
                Book a shoot
            </a>
              <a href="#work" className="btn btn-ghost">
                See the work
              </a>
            </div>
          </div>

          <div className="hero-mosaic" aria-hidden="true">
            {HERO_PHOTOS.slice(0, 4).map((p, i) => (
              <div
                key={i}
                className={`frame frame-${i + 1}`}
                style={{
                  backgroundColor: p.tone,
                  "--img": p.src ? `url(${p.src})` : "none",
                } as React.CSSProperties}
              />
            ))}
          </div>
        </section>

        {/* CLIENTS */}
        <section className="section clients" id="clients">
          <div className="clients-head">
            <span className="eyebrow">Trusted by</span>
            <h2>Our clients</h2>
            <p className="muted">
              Couples, families and brands who trusted us with their moments.
            </p>
          </div>

          {/* Row 1: moves left */}
          <Marquee items={CLIENTS_TOP} duration={40} />

          {/* Row 2: moves right */}
          <Marquee items={CLIENTS_BOTTOM} reverse duration={50} />
        </section>

        {/* WORK */}
        <section className="section" id="work">
          <WorkSection
            videos={[
              {
                title: "A Beautiful Wedding Story.",
                description:
                  "Every wedding tells a beautiful story of love, emotions, and togetherness. From the stunning bridal moments and groom's grand entry to traditional rituals, joyful celebrations, and unforgettable memories with family and friends, every moment is filled with magic. Capturing the beauty of Indian wedding traditions and the happiness of two souls beginning a new journey together, creating memories that will last a lifetime.",
                src: "https://res.cloudinary.com/fwadajoo/video/upload/v1794255404/teaser-compressed.mp4",
                poster: "https://res.cloudinary.com/fwadajoo/image/upload/v1794261676/Screenshot_2026-11-10_033025.png",
              },
              {
                title: "T20 World Cup Trophy Arrives in Delhi.",
                description:
                  "A proud and unforgettable moment as the ICC T20 World Cup Trophy arrives at Ganga International School, Hirankudna, Delhi. The excitement, enthusiasm, and celebrations bring cricket fans together to witness this special occasion. A memorable experience celebrating the spirit of cricket, the passion of fans, and the pride of Indian cricket.",
                src: "https://res.cloudinary.com/fwadajoo/video/upload/v1794261898/vidssave.com_II_ICC_T20_WORLD_CUP_TROPHY_2026_II_REACHES_IN_GANGA_INTERNATIONAL_SCHOOL_HINRAN_KUDNA_DELHI_1080P.mp4",
                poster: "https://res.cloudinary.com/fwadajoo/image/upload/v1794262030/Screenshot_2026-11-10_033638.png",
              },
              {
                title: "Nike Store",
                description:"",
                src: "https://res.cloudinary.com/fwadajoo/video/upload/v1794261140/Video-11637.mp4",
                poster: "https://res.cloudinary.com/fwadajoo/image/upload/v1794262170/Screenshot_2026-11-10_033913.png",
              },
              {
                title: "One Short",
                description:"",
                src: "https://res.cloudinary.com/fwadajoo/video/upload/v1794261146/SAME_DAY_REEL.mp4",
                poster: "https://res.cloudinary.com/fwadajoo/image/upload/v1794262168/Screenshot_2026-11-10_033849.png",
              },
            ]}
          />
        </section>

        {/* PACKAGES */}
        {/* <section className="section" id="packages">
          <div className="section-head">
            <h2>Packages</h2>
            <p className="muted">Simple pricing. Custom quotes for larger projects.</p>
          </div>
          <div className="packages">
            {PACKAGES.map((pkg) => (
              <article
                key={pkg.name}
                className={`package ${pkg.featured ? "package-featured" : ""}`}
              >
                <h3>{pkg.name}</h3>
                <p className="price">{pkg.price}</p>
                <ul>
                  {pkg.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className={`btn ${pkg.featured ? "" : "btn-ghost"}`}
                >
                  Choose {pkg.name.toLowerCase()}
                </a>
              </article>
            ))}
          </div>
        </section> */}

        {/* Our service */}
        <OurService
            onBookService={(service) => openBookingForm(service)}
          />
        
        {/* Our service */}
        <WhyUs ctaHref="#contact" onBookService={(service) => openBookingForm(service)} />

        {/* ABOUT */}        
          <About ctaHref="#contact" onBookService={(service) => openBookingForm(service)} />

        {/* GoogleReviews */}
          <GoogleReviews 
              overallRating={5.0}
              totalReviews={150}
              ctaHref="https://g.page/Creative+Art+Production/review" 
            />


        {/* CONTACT */}
        {/* <section className="section contact" id="contact">
          <div className="contact-intro">
            <h2>Let's plan your shoot</h2>
            <p className="muted">
              Tell me about the date and what you have in mind. I reply within one
              business day.
            </p>
            <p>
              <a href="mailto:hello@yourdomain.com">hello@yourdomain.com</a>
              <br />
              <a href="https://instagram.com/yourhandle">@yourhandle</a>
            </p>
          </div>

          {sent ? (
            <div className="form-done" role="status">
              <h3>Message sent</h3>
              <p>Thanks! I'll get back to you within one business day.</p>
            </div>
          ) : (
            <form
              className="form"
              onSubmit={(e) => {
                e.preventDefault();
                // TODO: connect to your email service or API route here
                setSent(true);
              }}
            >
              <label>
                Name
                <input type="text" name="name" required autoComplete="name" />
              </label>
              <label>
                Email
                <input type="email" name="email" required autoComplete="email" />
              </label>
              <label>
                Type of shoot
                <select name="type" defaultValue="Portrait session">
                  <option>Portrait session</option>
                  <option>Event coverage</option>
                  <option>Wedding day</option>
                  <option>Something else</option>
                </select>
              </label>
              <label>
                Message
                <textarea name="message" rows={4} required />
              </label>
              <button type="submit" className="btn">
                Send message
              </button>
            </form>
          )}
        </section> */}

        {/* <footer className="footer">
          <span>© {year ?? 2026} Your Name Photography</span>
          <a href="#top">Back to top</a>
        </footer> */}
        <Footer />
      </div>
    </div>
  );  
}
