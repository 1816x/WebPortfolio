import { ImageResponse } from 'next/og';

export const size = { width: 64, height: 64 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 38,
          background: '#0a0a0c',
          color: '#faf0e8',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'serif',
          fontStyle: 'italic',
          letterSpacing: '-0.03em',
        }}
      >
        Sr
      </div>
    ),
    { ...size },
  );
}
