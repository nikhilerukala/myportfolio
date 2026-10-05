'use client';

import { useEffect } from 'react';

/**
 * One delegated pointer listener for the whole site: feeds the cursor position
 * into .spotlight cards as --x / --y so their glow follows the pointer.
 */
export function Interactions() {
  useEffect(() => {
    if (!window.matchMedia('(hover: hover)').matches) return;

    let frame = 0;
    const onMove = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const card = (event.target as Element | null)?.closest<HTMLElement>('.spotlight');
        if (!card) return;
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--x', `${event.clientX - rect.left}px`);
        card.style.setProperty('--y', `${event.clientY - rect.top}px`);
      });
    };

    document.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener('pointermove', onMove);
    };
  }, []);

  return null;
}
