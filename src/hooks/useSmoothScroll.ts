import { useCallback, useEffect, useRef } from 'react';

const DEFAULT_DURATION = 300;

function easeInOutCubic(t: number): number {
  return t < 0.5
    ? 4 * t * t * t
    : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function getScrollElement(): (Element & { scrollTop: number }) | null {
  if (typeof document === 'undefined') return null;
  const scrollingElement = document.scrollingElement as (Element & { scrollTop: number }) | null;
  if (scrollingElement) return scrollingElement;
  const docEl = document.documentElement as (Element & { scrollTop: number }) | null;
  if (docEl) return docEl;
  const body = document.body as (Element & { scrollTop: number }) | null;
  return body ?? null;
}

export function useSmoothScroll(defaultDuration = DEFAULT_DURATION) {
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => () => {
    if (animationFrameRef.current !== null && typeof window !== 'undefined') {
      window.cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  }, []);

  return useCallback((targetTop: number, duration = defaultDuration) => {
    if (typeof window === 'undefined') {
      return;
    }

    const scrollElement = getScrollElement();
    if (!scrollElement) {
      window.scrollTo({ top: Math.max(targetTop, 0), behavior: 'smooth' });
      return;
    }

    if (animationFrameRef.current !== null) {
      window.cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    const destination = Math.max(targetTop, 0);
    const start = scrollElement.scrollTop;
    const distance = destination - start;

    if (distance === 0 || duration <= 0 || typeof window.requestAnimationFrame !== 'function') {
      scrollElement.scrollTop = destination;
      return;
    }

    const startTime = (typeof performance !== 'undefined' && typeof performance.now === 'function')
      ? performance.now()
      : Date.now();

    const step = (timestamp: number) => {
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeInOutCubic(progress);

      scrollElement.scrollTop = start + distance * eased;

      if (progress < 1) {
        animationFrameRef.current = window.requestAnimationFrame(step);
      } else {
        animationFrameRef.current = null;
      }
    };

    animationFrameRef.current = window.requestAnimationFrame(step);
  }, [defaultDuration]);
}

export default useSmoothScroll;
