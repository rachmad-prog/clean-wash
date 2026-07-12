import { useEffect, useRef, useState } from 'react';

/**
 * useScrollReveal
 * Triggers a boolean flag to `true` once the observed element enters the viewport.
 * Used to drive scroll-triggered entrance animations across the site.
 *
 * @param {Object} options
 * @param {number} options.threshold - fraction of element visible before triggering (0-1)
 * @param {string} options.rootMargin - margin around root, lets us trigger a bit early
 * @param {boolean} options.once - only trigger once (default true)
 */
export function useScrollReveal({ threshold = 0.15, rootMargin = '0px 0px -80px 0px', once = true } = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Respect users who prefer reduced motion: show immediately, no animation delay.
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (once) observer.unobserve(node);
          } else if (!once) {
            setIsVisible(false);
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return [ref, isVisible];
}
