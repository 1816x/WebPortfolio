'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { site } from '@/content/site';

const SignatureField = dynamic(
  () => import('./SignatureField').then((m) => m.SignatureField),
  { ssr: false },
);

/**
 * Mounts the signature 3D visual only when it makes sense:
 *  - user has not requested reduced motion
 *  - device is wide enough to justify the GPU cost
 *  - the visual.enableSignatureField flag is on
 */
export function SignatureCanvas() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!site.visual.enableSignatureField) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(max-width: 720px)').matches) return;
    setShow(true);
  }, []);

  if (!show) return null;
  return <SignatureField />;
}
