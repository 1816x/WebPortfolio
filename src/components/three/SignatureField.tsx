'use client';

/**
 * Signature visual: a slow-rotating wireframe field whose vertices respond
 * subtly to the cursor. Uses react-three-fiber for declarative composition.
 *
 * This is the one piece of "advanced visual" — restrained, reactive, and
 * bypassed entirely under prefers-reduced-motion or on mobile (the parent
 * decides whether to mount it).
 */

import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

function Field() {
  const groupRef = useRef<THREE.Group>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const { viewport, pointer } = useThree();

  const { positions, basePositions } = useMemo(() => {
    const COUNT = 90;
    const SIZE = 7;
    const pos = new Float32Array(COUNT * COUNT * 3);
    const base = new Float32Array(COUNT * COUNT * 3);
    let i = 0;
    for (let x = 0; x < COUNT; x++) {
      for (let y = 0; y < COUNT; y++) {
        const px = (x / (COUNT - 1) - 0.5) * SIZE;
        const py = (y / (COUNT - 1) - 0.5) * SIZE;
        pos[i] = px;
        pos[i + 1] = py;
        pos[i + 2] = 0;
        base[i] = px;
        base[i + 1] = py;
        base[i + 2] = 0;
        i += 3;
      }
    }
    return { positions: pos, basePositions: base };
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const points = pointsRef.current;
    if (!points) return;
    const geom = points.geometry as THREE.BufferGeometry;
    const attr = geom.attributes.position as THREE.BufferAttribute;
    const arr = attr.array as Float32Array;

    const px = (pointer.x * viewport.width) / 2;
    const py = (pointer.y * viewport.height) / 2;

    for (let i = 0; i < arr.length; i += 3) {
      const bx = basePositions[i];
      const by = basePositions[i + 1];
      const wave = Math.sin(bx * 0.5 + t * 0.7) * 0.18 + Math.cos(by * 0.6 + t * 0.5) * 0.18;
      const dx = bx - px;
      const dy = by - py;
      const d2 = dx * dx + dy * dy;
      const lift = Math.exp(-d2 * 0.6) * 0.6;
      arr[i + 2] = wave + lift;
    }
    attr.needsUpdate = true;

    if (groupRef.current) {
      groupRef.current.rotation.x = -0.6 + Math.sin(t * 0.08) * 0.02;
      groupRef.current.rotation.z = Math.sin(t * 0.04) * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} count={positions.length / 3} />
        </bufferGeometry>
        <pointsMaterial
          size={0.018}
          sizeAttenuation
          transparent
          opacity={0.9}
          color={'#ff5a3c'}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

export function SignatureField() {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = wrapRef.current;
    if (!node) return;
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      const rect = node.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        node.style.setProperty('--mx', x.toString());
        node.style.setProperty('--my', y.toString());
      });
    };
    node.addEventListener('mousemove', onMove);
    return () => {
      node.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={wrapRef} className="absolute inset-0 -z-10 opacity-90">
      <Canvas
        dpr={[1, 1.6]}
        camera={{ position: [0, 0, 4], fov: 35 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <Field />
      </Canvas>
    </div>
  );
}
