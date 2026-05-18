import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Cookie, X } from 'lucide-react';

const STORAGE_KEY = 'infotron_cookie_consent';
const REOPEN_EVENT = 'infotron:open-cookie-prefs';

/** Programmatically reopen the banner from anywhere (footer link, etc.) */
export const openCookiePreferences = () => {
  window.dispatchEvent(new Event(REOPEN_EVENT));
};

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);
  // mounted=true triggers the slide-up + fade-in animation
  const [mounted, setMounted] = useState(false);

  // Show only on first visit (or when reopened via footer link)
  useEffect(() => {
    let timer;
    const existing = (() => {
      try {
        return localStorage.getItem(STORAGE_KEY);
      } catch {
        return null;
      }
    })();

    if (!existing) {
      // Wait a beat after first paint so it doesn't fight the hero entrance
      timer = setTimeout(() => setVisible(true), 800);
    }

    const reopen = () => setVisible(true);
    window.addEventListener(REOPEN_EVENT, reopen);
    return () => {
      if (timer) clearTimeout(timer);
      window.removeEventListener(REOPEN_EVENT, reopen);
    };
  }, []);

  // Drive the entrance animation after the banner is in the DOM
  useEffect(() => {
    if (!visible) {
      setMounted(false);
      return;
    }
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, [visible]);

  const persist = (value) => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ value, at: new Date().toISOString() })
      );
    } catch {
      // localStorage may be unavailable (private mode); silently no-op
    }
  };

  const close = () => {
    setMounted(false);
    // allow the slide-down animation to play before unmounting
    setTimeout(() => setVisible(false), 320);
  };

  const onAccept = () => {
    persist('accepted');
    close();
  };

  const onDecline = () => {
    persist('declined');
    close();
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      data-testid="cookie-consent-banner"
      className={`fixed inset-x-3 bottom-3 sm:inset-x-auto sm:left-1/2 sm:bottom-5 sm:-translate-x-1/2 z-[60] w-auto sm:w-[min(720px,calc(100vw-2.5rem))] transition-all duration-500 ease-out ${
        mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 pointer-events-none'
      }`}
    >
      {/* Soft brand-gradient halo behind the banner */}
      <div
        aria-hidden="true"
        className="absolute -inset-px rounded-2xl pointer-events-none"
        style={{
          background:
            'linear-gradient(135deg, rgba(59,130,246,0.30) 0%, rgba(124,58,237,0.22) 50%, rgba(59,130,246,0.18) 100%)',
        }}
      />
      <div className="relative rounded-2xl border border-white/[0.08] bg-[#0E1B36]/85 backdrop-blur-xl shadow-[0_22px_60px_-20px_rgba(0,0,0,0.6)]">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 px-4 sm:px-5 py-3.5 sm:py-3">
          {/* Icon + copy */}
          <div className="flex items-start sm:items-center gap-3 flex-1 min-w-0">
            <div
              className="hidden sm:flex w-9 h-9 rounded-xl items-center justify-center flex-shrink-0"
              style={{
                background:
                  'linear-gradient(135deg, rgba(59,130,246,0.18) 0%, rgba(124,58,237,0.18) 100%)',
                border: '1px solid rgba(99,137,255,0.25)',
              }}
            >
              <Cookie className="w-4 h-4 text-blue-300" />
            </div>
            <p className="text-[13px] sm:text-sm leading-snug text-slate-200">
              We use cookies and similar technologies to analyze site traffic and improve your
              experience.{' '}
              <Link
                to="/privacy"
                className="text-blue-300 hover:text-violet-300 underline-offset-2 hover:underline transition-colors"
                data-testid="cookie-consent-privacy-link"
              >
                Privacy Policy
              </Link>
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-2.5 sm:flex-shrink-0">
            <button
              type="button"
              onClick={onDecline}
              data-testid="cookie-consent-decline"
              className="flex-1 sm:flex-none px-3.5 sm:px-4 py-2 rounded-lg text-[13px] font-semibold text-slate-300 bg-white/[0.04] border border-white/[0.10] hover:bg-white/[0.08] hover:text-white transition-colors duration-200"
            >
              Decline
            </button>
            <button
              type="button"
              onClick={onAccept}
              data-testid="cookie-consent-accept"
              className="flex-1 sm:flex-none px-4 sm:px-5 py-2 rounded-lg text-[13px] font-semibold text-white bg-gradient-to-r from-blue-600 to-violet-500 shadow-[0_8px_24px_-10px_rgba(59,130,246,0.6)] hover:from-blue-500 hover:to-violet-400 transition-all duration-200"
            >
              Accept
            </button>
            <button
              type="button"
              onClick={onDecline}
              aria-label="Dismiss cookie banner"
              data-testid="cookie-consent-close"
              className="hidden sm:inline-flex w-8 h-8 items-center justify-center rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors duration-200"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
