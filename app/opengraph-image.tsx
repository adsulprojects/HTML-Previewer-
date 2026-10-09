import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Free Online HTML Previewer – Live HTML, CSS & JS Sandbox';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          backgroundColor: '#0B0F14',
          backgroundImage:
            'radial-gradient(circle at 25px 25px, #1F2937 2%, transparent 0%), radial-gradient(circle at 75px 75px, #1F2937 2%, transparent 0%)',
          backgroundSize: '100px 100px',
          padding: '60px 80px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '14px',
              backgroundColor: '#7C3AED',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontSize: '28px',
              fontWeight: 800,
            }}
          >
            &lt;/&gt;
          </div>
          <span
            style={{
              fontSize: '32px',
              fontWeight: 800,
              color: '#F5F7FA',
              letterSpacing: '-0.02em',
            }}
          >
            HTML Previewer
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '950px' }}>
          <div
            style={{
              fontSize: '52px',
              fontWeight: 900,
              color: '#F5F7FA',
              lineHeight: 1.15,
              letterSpacing: '-0.03em',
            }}
          >
            Free Online HTML Previewer
          </div>
          <div
            style={{
              fontSize: '26px',
              fontWeight: 500,
              color: '#9CA3AF',
              lineHeight: 1.4,
            }}
          >
            Real-time live HTML, CSS &amp; JavaScript sandbox with isolated preview, responsive viewports, and developer console.
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              borderRadius: '9999px',
              backgroundColor: '#151B23',
              border: '1px solid #252C36',
              color: '#34D399',
              fontSize: '18px',
              fontWeight: 600,
            }}
          >
            <span>⚡ Instant Live Preview</span>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              borderRadius: '9999px',
              backgroundColor: '#151B23',
              border: '1px solid #252C36',
              color: '#38BDF8',
              fontSize: '18px',
              fontWeight: 600,
            }}
          >
            <span>📱 Responsive Testing</span>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              borderRadius: '9999px',
              backgroundColor: '#151B23',
              border: '1px solid #252C36',
              color: '#A78BFA',
              fontSize: '18px',
              fontWeight: 600,
            }}
          >
            <span>🔒 100% Client-Side</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
