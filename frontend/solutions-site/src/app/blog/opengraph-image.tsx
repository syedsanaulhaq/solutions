import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'HostingOcean Solutions Blog — Insights on LMS, AI & Web Development';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0F172A 0%, #1e293b 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          fontFamily: 'system-ui, sans-serif',
          padding: '60px',
        }}
      >
        {/* Accent bar */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 6,
            background: 'linear-gradient(90deg, #2563EB, #38BDF8)',
          }}
        />

        {/* Category pill */}
        <div
          style={{
            background: 'rgba(37,99,235,0.2)',
            border: '1px solid rgba(37,99,235,0.4)',
            borderRadius: 100,
            padding: '8px 20px',
            fontSize: 16,
            color: '#93C5FD',
            marginBottom: 24,
            fontWeight: 600,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
          }}
        >
          Blog
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 52,
            fontWeight: 800,
            color: 'white',
            letterSpacing: '-1px',
            lineHeight: 1.15,
            marginBottom: 20,
            maxWidth: 800,
          }}
        >
          Insights on LMS, AI Chatbots &amp; Web Development
        </div>

        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 8 }}>
          <div
            style={{
              width: 40,
              height: 40,
              background: '#2563EB',
              borderRadius: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 20,
              color: 'white',
            }}
          >
            ⚡
          </div>
          <span style={{ fontSize: 18, color: '#94a3b8', fontWeight: 600 }}>
            HostingOcean Solutions
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
