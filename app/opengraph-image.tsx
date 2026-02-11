import { ImageResponse } from 'next/og';

export const alt = 'HomeFix — Your Handyman, On Speed Dial.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#0a0a0a',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
        }}
      >
        {/* Subtle glow */}
        <div
          style={{
            position: 'absolute',
            width: 500,
            height: 500,
            borderRadius: '50%',
            background: 'rgba(232, 168, 56, 0.08)',
            filter: 'blur(100px)',
          }}
        />

        {/* Logo */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            marginBottom: 40,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 12,
              background: '#e8a838',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#0a0a0a"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
            </svg>
          </div>
          <span
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: '#f5f0e8',
              letterSpacing: '0.1em',
              textTransform: 'uppercase' as const,
            }}
          >
            HomeFix
          </span>
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 800,
            color: '#f5f0e8',
            lineHeight: 1.1,
            textAlign: 'center',
            marginBottom: 8,
          }}
        >
          Your handyman.
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 800,
            color: '#e8a838',
            lineHeight: 1.1,
            textAlign: 'center',
            marginBottom: 32,
          }}
        >
          On speed dial.
        </div>

        {/* Subline */}
        <div
          style={{
            fontSize: 24,
            color: '#888880',
            textAlign: 'center',
            maxWidth: 600,
          }}
        >
          $29 first visit &middot; $99/mo membership &middot; Raleigh-Durham
        </div>
      </div>
    ),
    { ...size }
  );
}
