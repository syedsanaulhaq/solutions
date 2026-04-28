import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'HostingOcean Solutions Portfolio — Real Projects, Real Results';
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
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 6,
            background: 'linear-gradient(90deg, #7c3aed, #2563EB)',
          }}
        />

        <div
          style={{
            background: 'rgba(124,58,237,0.2)',
            border: '1px solid rgba(124,58,237,0.4)',
            borderRadius: 100,
            padding: '8px 20px',
            fontSize: 16,
            color: '#c4b5fd',
            marginBottom: 24,
            fontWeight: 600,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
          }}
        >
          Portfolio
        </div>

        <div
          style={{
            fontSize: 56,
            fontWeight: 800,
            color: 'white',
            letterSpacing: '-1.5px',
            lineHeight: 1.1,
            marginBottom: 16,
          }}
        >
          Real projects.{' '}
          <span style={{ color: '#38BDF8' }}>Real results.</span>
        </div>

        <div
          style={{
            fontSize: 22,
            color: '#94a3b8',
            marginBottom: 32,
            maxWidth: 680,
            lineHeight: 1.5,
          }}
        >
          LMS platforms, AI chatbots, React dashboards, Node.js APIs, and automation systems
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
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
