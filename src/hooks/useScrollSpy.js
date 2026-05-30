import { useState, useEffect } from 'react';

/**
 * Custom hook to spy on scrolling sections and return the active section ID.
 * @param {Array<string>} sectionIds - Array of HTML section IDs (e.g. ['home', 'about'])
 * @returns {string} activeId - The ID of the currently active section
 */
export default function useScrollSpy(sectionIds) {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -65% 0px', // Detect sections as they cross the upper-middle region
      threshold: 0
    };

    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    // Cleanup
    return () => {
      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, [sectionIds]);

  return activeId;
}
