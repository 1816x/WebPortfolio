import { ImageResponse } from 'next/og';

export const size = { width: 64, height: 64 };
export const contentType = 'image/png';

// Neo-brutalist "SR" lockup — cream on ink, matching the header logo and the
// OpenGraph card. (Replaces the old dark-serif "Sr".)
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#111111',
          color: '#FBF4E4',
          fontSize: 34,
          fontWeight: 700,
          letterSpacing: '-0.02em',
        }}
      >
        SR
      </div>
    ),
    { ...size },
  );
}
