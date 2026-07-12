import { useScrollReveal } from '../hooks/useScrollReveal';

/**
 * Reveal
 * Wraps children and animates them into view as the user scrolls.
 *
 * Props:
 *  - direction: 'up' | 'down' | 'left' | 'right' | 'zoom' | 'fade' (default 'up')
 *  - delay: extra delay in ms before the animation starts (default 0)
 *  - duration: animation duration in ms (default 700)
 *  - as: HTML tag to render (default 'div')
 *  - className: extra classes passed through
 */
export default function Reveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 700,
  as: Tag = 'div',
  className = '',
  ...rest
}) {
  const [ref, isVisible] = useScrollReveal();

  const hiddenTransforms = {
    up: 'translate-y-10 opacity-0',
    down: '-translate-y-10 opacity-0',
    left: 'translate-x-10 opacity-0',
    right: '-translate-x-10 opacity-0',
    zoom: 'scale-90 opacity-0',
    fade: 'opacity-0',
  };

  const visibleTransforms = 'translate-y-0 translate-x-0 scale-100 opacity-100';

  return (
    <Tag
      ref={ref}
      className={`transition-all ease-out will-change-transform ${
        isVisible ? visibleTransforms : hiddenTransforms[direction] || hiddenTransforms.up
      } ${className}`}
      style={{ transitionDuration: `${duration}ms`, transitionDelay: isVisible ? `${delay}ms` : '0ms' }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
