import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'HostingOcean Solutions — Custom LMS, AI Chatbots & Web Development';
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
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif',
          padding: '60px',
        }}
      >
        {/* Logo mark */}
        <div
          style={{
            width: 72,
            height: 72,
            background: '#2563EB',
            borderRadius: 16,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 32,
            fontSize: 36,
            color: 'white',
          }}
        >
          ⚡
        </div>

        {/* Brand name */}
        <div
          style={{
            fontSize: 48,
            fontWeight: 800,
            color: 'white',
            letterSpacing: '-1px',
            marginBottom: 12,
          }}
        >
          HostingOcean{' '}
          <span style={{ color: '#38BDF8' }}>Solutions</span>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 22,
            color: '#94a3b8',
            textAlign: 'center',
            maxWidth: 700,
            lineHeight: 1.5,
          }}
        >
          Custom LMS · AI Chatbots · React &amp; Node.js Development · Automation
        </div>

        {/* URL */}
        <div
          style={{
            marginTop: 40,
            fontSize: 16,
            color: '#475569',
            borderTop: '1px solid #1e3a5f',
            paddingTop: 24,
            width: '100%',
            textAlign: 'center',
          }}
        >
          solutions.hostingocean.co.uk
        </div>
      </div>
    ),
    { ...size },
  );
}
