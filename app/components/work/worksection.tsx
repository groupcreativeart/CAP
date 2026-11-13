
'use client';

import { useEffect, useMemo, useState } from 'react';
import Masonry, { type MasonryItem } from './masonry';

// =====================================
// TYPES
// =====================================

interface Photo {
  title: string;
  category: string;
  tone: string;
  src: string;
  width?: number;
  height?: number;
}

export interface VideoItem {
  title: string;
  description: string;
  src: string;
  poster?: string;
}

interface WorkSectionProps {
  videos: VideoItem[];
  filters?: string[];
}

// =====================================
// WEDDING PHOTOGRAPHY
// =====================================

const WEDDING_PHOTOS: Photo[] = [
  {
    title: 'Elegant Indian Wedding Photography',
    category: 'Wedding',
    tone: '#c9b8a6',
    src: 'https://res.cloudinary.com/fwadajoo/image/upload/v1794257467/gg.jpg',
  },
  {
    title: 'Beautiful Bridal Portrait Photography',
    category: 'Wedding',
    tone: '#c9b8a6',
    src: 'https://res.cloudinary.com/fwadajoo/image/upload/v1794257466/pur.jpg',
  },
  {
    title: 'Traditional Wedding Ceremony Moments',
    category: 'Wedding',
    tone: '#c9b8a6',
    src: 'https://res.cloudinary.com/fwadajoo/image/upload/v1794257463/0O0A0527_a.jpg',
  },
  {
    title: 'Candid Wedding Couple Photography',
    category: 'Wedding',
    tone: '#c9b8a6',
    src: 'https://res.cloudinary.com/fwadajoo/image/upload/v1794257462/B_J-W__C_-154.jpg',
  },
  {
    title: 'Luxury Wedding Celebration Photography',
    category: 'Wedding',
    tone: '#c9b8a6',
    src: 'https://res.cloudinary.com/fwadajoo/image/upload/v1794257461/WEDDING__6577.jpg',
  },
  {
    title: 'Romantic Wedding Photography',
    category: 'Wedding',
    tone: '#c9b8a6',
    src: 'https://res.cloudinary.com/fwadajoo/image/upload/v1794257460/WEDDING__6623.jpg',
  },
  {
    title: 'Indian Wedding Traditional Portraits',
    category: 'Wedding',
    tone: '#c9b8a6',
    src: 'https://res.cloudinary.com/fwadajoo/image/upload/v1794257459/76.jpg',
  },
  {
    title: 'Wedding Day Candid Photography',
    category: 'Wedding',
    tone: '#c9b8a6',
    src: 'https://res.cloudinary.com/fwadajoo/image/upload/v1794257458/786A8702.jpg',
  },
  {
    title: 'Timeless Wedding Couple Portraits',
    category: 'Wedding',
    tone: '#c9b8a6',
    src: 'https://res.cloudinary.com/fwadajoo/image/upload/v1794257456/03.jpg',
  },
  {
    title: 'Traditional Bridal Wedding Moments',
    category: 'Wedding',
    tone: '#c9b8a6',
    src: 'https://res.cloudinary.com/fwadajoo/image/upload/v1794257456/1w.jpg',
  },
  {
    title: 'Wedding Rituals and Celebrations',
    category: 'Wedding',
    tone: '#c9b8a6',
    src: 'https://res.cloudinary.com/fwadajoo/image/upload/v1794257455/01_2057.jpg',
  },
  {
    title: 'Professional Wedding Photography Highlights',
    category: 'Wedding',
    tone: '#c9b8a6',
    src: 'https://res.cloudinary.com/fwadajoo/image/upload/v1794257435/Screenshot_2026-01-15_195659.jpg',
  },
  {
    title: 'Beautiful Indian Bride Photography',
    category: 'Wedding',
    tone: '#c9b8a6',
    src: 'https://res.cloudinary.com/fwadajoo/image/upload/v1794257434/02.jpg',
  },
  {
    title: 'Wedding Ceremony Candid Moments',
    category: 'Wedding',
    tone: '#c9b8a6',
    src: 'https://res.cloudinary.com/fwadajoo/image/upload/v1794257434/01.jpg',
  },
];

// =====================================
// SCHOOL PHOTOGRAPHY
// =====================================

const SCHOOL_PHOTOS: Photo[] = [
  {
    title: 'Student Portrait',
    category: 'School',
    tone: '#8a9ba8',
    src: 'https://res.cloudinary.com/fwadajoo/image/upload/v1794260378/0O0A6300.jpg',
  },
  {
    title: 'School Memories',
    category: 'School',
    tone: '#8a9ba8',
    src: 'https://res.cloudinary.com/fwadajoo/image/upload/v1794260377/001.jpg',
  },
  {
    title: 'Classroom Moments',
    category: 'School',
    tone: '#8a9ba8',
    src: 'https://res.cloudinary.com/fwadajoo/image/upload/v1794260377/0O0A3658.jpg',
  },
  {
    title: 'Young Achievers',
    category: 'School',
    tone: '#8a9ba8',
    src: 'https://res.cloudinary.com/fwadajoo/image/upload/v1794260376/0O0A3619.jpg',
  },
  {
    title: 'Learning Environment',
    category: 'School',
    tone: '#8a9ba8',
    src: 'https://res.cloudinary.com/fwadajoo/image/upload/v1794260380/LIBRARY.jpg',
  },
  {
    title: 'Campus Life',
    category: 'School',
    tone: '#8a9ba8',
    src: 'https://res.cloudinary.com/fwadajoo/image/upload/v1794260381/0O0A1500.jpg',
  },
  {
    title: 'Student Activities',
    category: 'School',
    tone: '#8a9ba8',
    src: 'https://res.cloudinary.com/fwadajoo/image/upload/v1794260382/0O0A1483.jpg',
  },
  {
    title: 'Creative Learning',
    category: 'School',
    tone: '#8a9ba8',
    src: 'https://res.cloudinary.com/fwadajoo/image/upload/v1794260384/0O0A1538.jpg',
  },
  {
    title: 'School Celebration',
    category: 'School',
    tone: '#8a9ba8',
    src: 'https://res.cloudinary.com/fwadajoo/image/upload/v1794260385/77.jpg',
  },
  {
    title: 'Student Life',
    category: 'School',
    tone: '#8a9ba8',
    src: 'https://res.cloudinary.com/fwadajoo/image/upload/v1794260386/DSC03963.jpg',
  },
  {
    title: 'Moments to Remember',
    category: 'School',
    tone: '#8a9ba8',
    src: 'https://res.cloudinary.com/fwadajoo/image/upload/v1794260388/DSC01798.jpg',
  },
];

// =====================================
// EVENT PHOTOGRAPHY
// =====================================

const EVENT_PHOTOS: Photo[] = [
  {
    title: 'Grand Celebration',
    category: 'Event',
    tone: '#d6a77a',
    src: 'https://res.cloudinary.com/fwadajoo/image/upload/v1794260689/10e.jpg',
  },
  {
    title: 'Special Evening',
    category: 'Event',
    tone: '#d6a77a',
    src: 'https://res.cloudinary.com/fwadajoo/image/upload/v1794260688/12e.jpg',
  },
  {
    title: 'Unforgettable Moments',
    category: 'Event',
    tone: '#d6a77a',
    src: 'https://res.cloudinary.com/fwadajoo/image/upload/v1794260686/11e.jpg',
  },
  {
    title: 'Gothic Celebration',
    category: 'Event',
    tone: '#d6a77a',
    src: 'https://res.cloudinary.com/fwadajoo/image/upload/v1794260685/10_goth.jpg',
  },
  {
    title: 'Joyful Gathering',
    category: 'Event',
    tone: '#d6a77a',
    src: 'https://res.cloudinary.com/fwadajoo/image/upload/v1794260683/7e.jpg',
  },
  {
    title: 'Beautiful Traditions',
    category: 'Event',
    tone: '#d6a77a',
    src: 'https://res.cloudinary.com/fwadajoo/image/upload/v1794260681/264.jpg',
  },
  {
    title: 'A Night to Remember',
    category: 'Event',
    tone: '#d6a77a',
    src: 'https://res.cloudinary.com/fwadajoo/image/upload/v1794260680/28e.jpg',
  },
  {
    title: 'Celebration Highlights',
    category: 'Event',
    tone: '#d6a77a',
    src: 'https://res.cloudinary.com/fwadajoo/image/upload/v1794260678/17e.jpg',
  },
  {
    title: 'Candid Moments',
    category: 'Event',
    tone: '#d6a77a',
    src: 'https://res.cloudinary.com/fwadajoo/image/upload/v1794260678/209.jpg',
  },
  {
    title: 'Memories in Frames',
    category: 'Event',
    tone: '#d6a77a',
    src: 'https://res.cloudinary.com/fwadajoo/image/upload/v1794260677/3e.jpg',
  },
];

// =====================================
// ALL PHOTOS
// =====================================

const PHOTOS: Photo[] = [
  ...WEDDING_PHOTOS,
  ...SCHOOL_PHOTOS,
  ...EVENT_PHOTOS,
];

// =====================================
// HELPERS
// =====================================

const toneImage = (tone: string, width = 600, height = 750) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">` +
      `<rect width="100%" height="100%" fill="${tone}"/></svg>`
  )}`;

export default function WorkSection({
  videos,
  filters,
}: WorkSectionProps) {

  // =====================================
  // STATES
  // =====================================

  const [filter, setFilter] = useState('All');

  const [isMobile, setIsMobile] = useState(false);

  const [showAllPhotos, setShowAllPhotos] = useState(false);

  const [showAllVideos, setShowAllVideos] = useState(false);

  // =====================================
  // RESPONSIVE SCREEN DETECTION
  // =====================================

  useEffect(() => {
    const media = window.matchMedia('(max-width: 768px)');

    const updateScreen = () => setIsMobile(media.matches);

    updateScreen();

    media.addEventListener('change', updateScreen);

    return () => media.removeEventListener('change', updateScreen);
  }, []);

  // =====================================
  // FILTERS
  // =====================================

  const FILTERS = useMemo(
    () =>
      filters ?? [
        'All',
        ...Array.from(new Set(PHOTOS.map(p => p.category))),
      ],
    [filters]
  );

  // =====================================
  // PHOTO GALLERY
  // =====================================

  const filteredPhotos = useMemo(
    () =>
      PHOTOS.filter(
        p => filter === 'All' || p.category === filter
      ),
    [filter]
  );

  // Preview: 4 desktop / 2 mobile per category
  const previewPhotos = useMemo(() => {
    const limit = isMobile ? 2 : 4;

    if (filter !== 'All') {
      return filteredPhotos.slice(0, limit);
    }

    return FILTERS
      .filter(category => category !== 'All')
      .flatMap(category =>
        PHOTOS
          .filter(p => p.category === category)
          .slice(0, limit)
      );
  }, [filter, isMobile, filteredPhotos, FILTERS]);

  // =====================================
  // MASONRY DATA
  // =====================================

  const createMasonryItems = (photos: Photo[]): MasonryItem[] =>
    photos.map((p, index) => ({
      id: `${p.category}-${p.src}-${index}`,
      img: p.src || toneImage(p.tone, p.width, p.height),
      width: p.width,
      height: p.height,
      title: p.title,
      description: p.category,
      alt: p.title,
    }));

  const previewItems = useMemo(
    () => createMasonryItems(previewPhotos),
    [previewPhotos]
  );

  const fullGalleryItems = useMemo(
    () => createMasonryItems(filteredPhotos),
    [filteredPhotos]
  );

  // =====================================
  // VIDEO PREVIEW
  // =====================================

  const previewVideos = videos.slice(0, 2);

  // =====================================
  // MODAL SCROLL LOCK
  // =====================================

  useEffect(() => {
    if (showAllPhotos || showAllVideos) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [showAllPhotos, showAllVideos]);

  // =====================================
  // ESCAPE KEY
  // =====================================

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowAllPhotos(false);
        setShowAllVideos(false);
      }
    };

    window.addEventListener('keydown', handleEscape);

    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <section className="section work-section" id="work">

      {/* =====================================
          MAIN HEADING
      ===================================== */}

      <header className="work-intro">
        <h2>Our Work</h2>
        <p>
          A look at the projects we have photographed and filmed.
        </p>
      </header>

      {/* =====================================
          PHOTOS SECTION
      ===================================== */}

      <div className="work-block">

        <h3 className="work-subheading">Our Photos</h3>

        {/* CATEGORY FILTER - ALWAYS VISIBLE */}

        <div className="section-head">
          <h4 className="work-sectors-title">
            Browse by Sector
          </h4>

          <div
            className="filters"
            role="tablist"
            aria-label="Filter photos by sector"
          >
            {FILTERS.map(f => (
              <button
                key={f}
                type="button"
                role="tab"
                aria-selected={filter === f}
                className={`chip ${filter === f ? 'chip-active' : ''}`}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* PHOTO PREVIEW */}

        <Masonry
          items={previewItems}
          columnWidth={260}
          gap={14}
          radius={12}
          animateFrom="bottom"
          stagger={0.05}
          hoverEffect="zoom"
          captions="hover"
          lightbox
          draggable={false}
        />

        {/* VIEW MORE PHOTOS */}

        {filteredPhotos.length > previewPhotos.length && (
          <div className="view-more-wrapper">
            <button
              className="view-more-btn"
              onClick={() => setShowAllPhotos(true)}
            >
              View More Photos
              <span>↗</span>
            </button>
          </div>
        )}

      </div>

      {/* =====================================
          VIDEOS SECTION
      ===================================== */}

      <div className="work-block">

        <h3 className="work-subheading">Our Videos</h3>

        {/* VIDEO PREVIEW WITH DESCRIPTIONS */}

        <div className="video-list">

          {previewVideos.map((v, i) => (
            <article
              key={`${v.title}-${i}`}
              className={`video-row ${
                i % 2 === 1 ? 'video-row-reverse' : ''
              }`}
            >
              <div className="video-media">
                <video
                  src={v.src}
                  poster={v.poster}
                  controls
                  preload="metadata"
                  playsInline
                />
              </div>

              <div className="video-text">
                <h4>{v.title}</h4>
                <p>{v.description}</p>
              </div>
            </article>
          ))}

        </div>

        {/* VIEW MORE VIDEOS */}

        {videos.length > 2 && (
          <div className="view-more-wrapper">
            <button
              className="view-more-btn"
              onClick={() => setShowAllVideos(true)}
            >
              View More Videos
              <span>↗</span>
            </button>
          </div>
        )}

      </div>

      {/* =====================================
          FULL PHOTO GALLERY MODAL
      ===================================== */}

      {showAllPhotos && (
        <div
          className="gallery-modal"
          role="dialog"
          aria-modal="true"
          aria-label="Full photo gallery"
        >

          <div className="gallery-modal-header">

            <div className="gallery-modal-title">
              <span className="gallery-eyebrow">Our Collection</span>
              <h2>Photo Gallery</h2>
              <p>
                Explore our photography collection.
              </p>
            </div>

            {/* FILTERS TOP RIGHT */}

            <div className="gallery-modal-actions">

              <div className="gallery-modal-filters">
                {FILTERS.map(f => (
                  <button
                    key={f}
                    className={`chip ${filter === f ? 'chip-active' : ''}`}
                    onClick={() => setFilter(f)}
                  >
                    {f}
                  </button>
                ))}
              </div>

              <button
                className="gallery-close"
                onClick={() => setShowAllPhotos(false)}
                aria-label="Close photo gallery"
              >
                ×
              </button>

            </div>

          </div>

          <div className="gallery-modal-content">

            <Masonry
              items={fullGalleryItems}
              columnWidth={260}
              gap={14}
              radius={12}
              animateFrom="bottom"
              stagger={0.04}
              hoverEffect="zoom"
              captions="hover"
              lightbox
              draggable={false}
            />

          </div>

        </div>
      )}

      {/* =====================================
          FULL VIDEO GALLERY MODAL
      ===================================== */}

      {showAllVideos && (
        <div
          className="gallery-modal video-gallery-modal"
          role="dialog"
          aria-modal="true"
          aria-label="Full video gallery"
        >

          <div className="gallery-modal-header">

            <div className="gallery-modal-title">
              <span className="gallery-eyebrow">Our Collection</span>
              <h2>Video Gallery</h2>
              <p>
                Explore all our films and creative stories.
              </p>
            </div>

            <button
              className="gallery-close"
              onClick={() => setShowAllVideos(false)}
              aria-label="Close video gallery"
            >
              ×
            </button>

          </div>

          {/* VIDEOS WITHOUT DESCRIPTIONS */}

          <div className="full-video-grid">

            {videos.map((v, i) => (
              <article
                className="full-video-card"
                key={`${v.title}-${i}`}
              >
                <div className="full-video-media">
                  <video
                    src={v.src}
                    poster={v.poster}
                    controls
                    preload="metadata"
                    playsInline
                  />
                </div>

                <h3>{v.title}</h3>

              </article>
            ))}

          </div>

        </div>
      )}

  {/* =====================================
      STYLES
  ===================================== */}

  <style jsx>{`

    .work-intro {
      max-width: 640px;
      margin: 0 auto 56px;
      text-align: center;
    }

    .work-intro p {
      margin-top: 8px;
      opacity: 0.7;
    }

    .work-block {
      margin-bottom: 96px;
    }

    .work-subheading {
      font-size: 1.75rem;
      margin-bottom: 24px;
    }

    .work-sectors-title {
      font-size: 1rem;
      font-weight: 500;
      opacity: 0.7;
    }

    .section-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 20px;
      margin-bottom: 24px;
    }

    .filters {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    /* VIEW MORE BUTTON */

    .view-more-wrapper {
      display: flex;
      justify-content: center;
      margin-top: 38px;
    }

    .view-more-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 16px;
      padding: 13px 24px;
      border: 1px solid currentColor;
      border-radius: 50px;
      background: transparent;
      color: inherit;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .view-more-btn span {
      font-size: 17px;
      transition: transform 0.3s ease;
    }

    .view-more-btn:hover {
      background: #ffffff;
      color: #111111;
      border-color: #ffffff;
    }

    .view-more-btn:hover span {
      transform: translate(3px, -3px);
    }

    /* =====================================
      VIDEO PREVIEW
    ===================================== */

    .video-list {
      display: flex;
      flex-direction: column;
      gap: 64px;
    }

    .video-row {
      display: grid;
      grid-template-columns: 1.4fr 1fr;
      gap: 40px;
      align-items: center;
    }

    .video-row-reverse {
      grid-template-columns: 1fr 1.4fr;
    }

    .video-row-reverse .video-media {
      order: 2;
    }

    .video-row-reverse .video-text {
      order: 1;
    }

    /* Supports landscape and portrait videos */

    .video-media {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #000000;
      border-radius: 12px;
      overflow: hidden;
    }

    .video-media video {
      display: block;
      width: 100%;
      height: auto;
      max-height: 550px;
      object-fit: contain;
      border-radius: 12px;
      background: #000000;
    }

    .video-text h4 {
      font-size: 1.4rem;
      margin-bottom: 12px;
    }

    .video-text p {
      line-height: 1.7;
      opacity: 0.8;
      max-width: 46ch;
    }

    /* =====================================
      FULL SCREEN GALLERY MODALS
    ===================================== */

    .gallery-modal {
      position: fixed;
      inset: 0;
      z-index: 2000;
      overflow-y: auto;
      padding: 100px 5% 35px;
      background: #101114f5;
      color: #ffffff;
      animation: galleryOpen 0.3s ease;
    }

    @keyframes galleryOpen {
      from {
        opacity: 0;
        transform: translateY(12px);
      }

      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .gallery-modal-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 25px;
      margin-bottom: 35px;
    }

    .gallery-modal-title h2 {
      font-size: clamp(25px, 4vw, 38px);
      margin: 5px 0 8px;
    }

    .gallery-modal-title p {
      opacity: 0.65;
      font-size: 14px;
    }

    .gallery-eyebrow {
      color: #b8b8b8;
      text-transform: uppercase;
      letter-spacing: 2px;
      font-size: 11px;
      font-weight: 600;
    }

    .gallery-modal-actions {
      display: flex;
      align-items: flex-start;
      gap: 18px;
    }

    .gallery-modal-filters {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-end;
      gap: 8px;
    }

    .gallery-close {
      flex-shrink: 0;
      width: 44px;
      height: 44px;
      border: 1px solid rgba(255,255,255,0.3);
      border-radius: 50%;
      background: rgba(255,255,255,0.08);
      color: #ffffff;
      font-size: 28px;
      line-height: 1;
      cursor: pointer;
      transition: all 0.25s ease;
    }

    .gallery-close:hover {
      background: #ffffff;
      color: #111111;
      transform: rotate(90deg);
    }

    .gallery-modal-content {
      width: 100%;
    }

    /* =====================================
      FULL VIDEO GALLERY
    ===================================== */

    .full-video-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 35px;
      align-items: start;
    }

    .full-video-card {
      min-width: 0;
    }

    .full-video-media {
      width: 100%;
      min-height: 260px;
      max-height: 550px;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      border-radius: 12px;
      background: #000000;
    }

    /* Preserve each video's original orientation */

    .full-video-media video {
      display: block;
      max-width: 100%;
      max-height: 550px;
      width: auto;
      height: auto;
      object-fit: contain;
      background: #000000;
    }

    .full-video-card h3 {
      margin-top: 14px;
      font-size: 16px;
      font-weight: 600;
    }

    /* =====================================
      MOBILE
    ===================================== */

    @media (max-width: 768px) {

      .work-block {
        margin-bottom: 65px;
      }

      .section-head {
        align-items: flex-start;
        flex-direction: column;
        gap: 14px;
      }

      .filters {
        gap: 7px;
      }

      .video-row,
      .video-row-reverse {
        grid-template-columns: 1fr;
        gap: 20px;
      }

      .video-row-reverse .video-media {
        order: 1;
      }

      .video-row-reverse .video-text {
        order: 2;
      }

      .video-list {
        gap: 40px;
      }

      .video-media video {
        max-height: 500px;
      }

      .gallery-modal {
        padding: 100px 16px 22px;
      }

      .gallery-modal-header {
        flex-direction: column;
        gap: 20px;
        position: relative;
        padding-right: 48px;
      }

      .gallery-modal-actions {
        width: 100%;
        align-items: flex-start;
      }

      .gallery-modal-filters {
        justify-content: flex-start;
      }

      .gallery-modal-header > .gallery-close,
      .gallery-modal-actions > .gallery-close {
        position: absolute;
        top: 0;
        right: -10px;
      }

      .full-video-grid {
        grid-template-columns: 1fr;
        gap: 28px;
      }

      .full-video-media {
        min-height: 200px;
        max-height: 500px;
      }

      .full-video-media video {
        max-height: 500px;
      }

      .view-more-wrapper {
        margin-top: 28px;
      }
    }

  `}</style>

    </section>
  );
}
