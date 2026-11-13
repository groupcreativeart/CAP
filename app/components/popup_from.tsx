
'use client';

import { useEffect, useState } from 'react';

export const SERVICE_OPTIONS = [
  'Event Photography',
  'School ID Card Photos',
  'School Events',
  'Class and Group Portraits',
  'Studio Portraits',
  'Albums and Prints',
  'Other',
];

export interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  description: string;
}

interface PopupFormProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
  onSubmit?: (data: BookingFormData) => void | Promise<void>;
}

export default function PopupForm({
  isOpen,
  onClose,
  initialService = '',
  onSubmit,
}: PopupFormProps) {
  const [form, setForm] = useState<BookingFormData>({
    name: '',
    email: '',
    phone: '',
    service: initialService,
    description: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setForm({
        name: '',
        email: '',
        phone: '',
        service: initialService,
        description: '',
      });
      setSuccess(false);
      setError('');
    }
  }, [isOpen, initialService]);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!onSubmit) {
      setError('Form submission is not connected yet. Please connect your backend.');
      return;
    }

    try {
      setLoading(true);
      setError('');
      await onSubmit(form);
      setSuccess(true);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="booking-overlay"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="booking-popup"
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-title"
      >
        <button
          type="button"
          className="booking-close"
          onClick={onClose}
          aria-label="Close booking form"
        >
          ×
        </button>

        {success ? (
          <div className="booking-success">
            <div className="success-icon">✓</div>
            <h2>Thank You!</h2>
            <p>Your enquiry has been submitted successfully.</p>
            <button
              type="button"
              className="booking-submit"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <div className="booking-heading">
              <span className="booking-eyebrow">
                LET'S CREATE MEMORIES
              </span>

              <h2 id="booking-title">
                Book a <span>Shoot.</span>
              </h2>

              <p>
                Tell us a little about your requirements.
                We'll get in touch with you.
              </p>
            </div>

            <form className="booking-form" onSubmit={handleSubmit}>
              <div className="booking-field">
                <label htmlFor="booking-name">Full Name</label>
                <input
                  id="booking-name"
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="booking-row">
                <div className="booking-field">
                  <label htmlFor="booking-email">Email Address</label>
                  <input
                    id="booking-email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="booking-field">
                  <label htmlFor="booking-phone">Phone Number</label>
                  <input
                    id="booking-phone"
                    name="phone"
                    type="tel"
                    placeholder="Phone number"
                    value={form.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="booking-field">
                <label htmlFor="booking-service">Service Type</label>
                <select
                  id="booking-service"
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    Select a service
                  </option>

                  {SERVICE_OPTIONS.map((service) => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
              </div>

              <div className="booking-field">
                <label htmlFor="booking-description">
                  Short Description
                </label>

                <textarea
                  id="booking-description"
                  name="description"
                  placeholder="Tell us about your event, date or requirements..."
                  rows={2}
                  value={form.description}
                  onChange={handleChange}
                />
              </div>

              {error && (
                <p className="booking-error">{error}</p>
              )}

              <button
                type="submit"
                className="booking-submit"
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Send Enquiry →'}
              </button>

              <p className="booking-note">
                We'll contact you soon to discuss the details.
              </p>
            </form>
          </>
        )}
      </div>

      <style jsx>{`
        .booking-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: grid;
          place-items: center;
          padding: 14px;
          background: rgba(0, 0, 0, 0.72);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          animation: overlayIn 0.2s ease;
        }

        .booking-popup {
          position: relative;
          width: min(100%, 480px);
          max-height: 90vh;
          overflow-y: auto;
          padding: 25px;
          color: #fff;
          background: #17191d;
          border: 1px solid rgba(255, 255, 255, 0.13);
          border-radius: 18px;
          box-shadow: 0 25px 90px rgba(0, 0, 0, 0.5);
          animation: popupIn 0.3s ease;
        }

        .booking-close {
          position: absolute;
          top: 13px;
          right: 14px;
          display: grid;
          place-items: center;
          width: 31px;
          height: 31px;
          border: 1px solid rgba(255,255,255,.15);
          border-radius: 50%;
          background: rgba(255,255,255,.07);
          color: #fff;
          font-size: 22px;
          cursor: pointer;
          transition: background .2s ease;
        }

        .booking-close:hover {
          background: rgba(117, 133, 255, .2);
        }

        .booking-eyebrow {
          color: #7585ff;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 1.7px;
        }

        .booking-heading h2 {
          margin: 7px 0;
          font-size: clamp(25px, 5vw, 32px);
          letter-spacing: -1.2px;
        }

        .booking-heading h2 span {
          color: #7585ff;
        }

        .booking-heading p {
          margin: 0 35px 18px 0;
          color: #aaa;
          font-size: 12px;
          line-height: 1.5;
        }

        .booking-form {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .booking-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 11px;
        }

        .booking-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
          min-width: 0;
        }

        .booking-field label {
          color: #e9e9e9;
          font-size: 11px;
          font-weight: 700;
        }

        .booking-field input,
        .booking-field select,
        .booking-field textarea {
          width: 100%;
          min-width: 0;
          padding: 10px 11px;
          color: #fff;
          background: #22252a;
          border: 1px solid #393c42;
          border-radius: 8px;
          outline: none;
          font: inherit;
          font-size: 12px;
          transition: border-color .2s ease, box-shadow .2s ease;
        }

        .booking-field select {
          color-scheme: dark;
        }

        .booking-field input:focus,
        .booking-field select:focus,
        .booking-field textarea:focus {
          border-color: #7585ff;
          box-shadow: 0 0 0 2px rgba(117, 133, 255, .12);
        }

        .booking-field input::placeholder,
        .booking-field textarea::placeholder {
          color: #777;
        }

        .booking-field textarea {
          resize: vertical;
          min-height: 62px;
          max-height: 110px;
        }

        .booking-submit {
          width: 100%;
          padding: 12px;
          border: 0;
          border-radius: 8px;
          color: #fff;
          background: #7585ff;
          font-size: 12px;
          font-weight: 800;
          cursor: pointer;
          transition: transform .2s ease, background .2s ease;
        }

        .booking-submit:hover {
          background: #6475f0;
          transform: translateY(-2px);
        }

        .booking-submit:disabled {
          opacity: .65;
          cursor: not-allowed;
          transform: none;
        }

        .booking-note {
          color: #888;
          font-size: 10px;
          text-align: center;
        }

        .booking-error {
          color: #ff7777;
          font-size: 12px;
        }

        .booking-success {
          padding: 25px 5px;
          text-align: center;
        }

        .success-icon {
          display: grid;
          place-items: center;
          width: 48px;
          height: 48px;
          margin: 0 auto 14px;
          border-radius: 50%;
          color: #fff;
          background: #7585ff;
          font-size: 24px;
        }

        .booking-success h2 {
          margin-bottom: 8px;
          font-size: 26px;
        }

        .booking-success p {
          margin-bottom: 20px;
          color: #aaa;
          font-size: 13px;
        }

        @keyframes overlayIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes popupIn {
          from {
            opacity: 0;
            transform: translateY(15px) scale(.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @media (max-width: 600px) {
          .booking-popup {
            width: min(100%, 420px);
            padding: 22px 17px;
            border-radius: 15px;
          }

          .booking-row {
            grid-template-columns: 1fr;
            gap: 12px;
          }

          .booking-heading p {
            margin-bottom: 15px;
          }

          .booking-form {
            gap: 11px;
          }
        }

        @media (max-height: 650px) {
          .booking-popup {
            max-height: 94vh;
            padding-top: 20px;
            padding-bottom: 20px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .booking-overlay,
          .booking-popup {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
