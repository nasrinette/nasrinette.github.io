import { useEffect, useState, useCallback } from 'react';

export function useCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [enabled, setEnabled] = useState(true);

  const handleMouseEnter = useCallback(() => setScale(1.5), []);
  const handleMouseLeave = useCallback(() => setScale(1), []);

  useEffect(() => {
    if (window.innerWidth <= 768) {
      setEnabled(false);
      return;
    }

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener('mousemove', handleMouseMove);

    // Add hover effect to interactive elements
    const addHoverListeners = () => {
      const interactiveElements = document.querySelectorAll('a, button, .project, .project-card');
      interactiveElements.forEach((el) => {
        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
      });
    };

    // Initial setup
    addHoverListeners();

    // Re-add listeners when DOM changes (for dynamically added elements)
    const observer = new MutationObserver(() => {
      addHoverListeners();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
      const interactiveElements = document.querySelectorAll('a, button, .project, .project-card');
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [handleMouseEnter, handleMouseLeave]);

  return { position, scale, setScale, enabled };
}
