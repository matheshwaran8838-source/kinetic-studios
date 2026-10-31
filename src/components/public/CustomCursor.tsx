import React, { useEffect, useState } from 'react';
import { useWebsite } from '../../context/WebsiteContext';

export const CustomCursor: React.FC = () => {
  const { settings } = useWebsite();
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailPosition, setTrailPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!settings.cursor_effects_enabled) {
      document.body.classList.remove('custom-cursor-active');
      return;
    }

    document.body.classList.add('custom-cursor-active');

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      const target = e.target as HTMLElement;
      if (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('input') ||
        target.closest('textarea') ||
        target.closest('[role="button"]') ||
        target.classList.contains('cursor-pointer')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    let animationFrameId: number;
    const updateTrail = () => {
      setTrailPosition(prev => ({
        x: prev.x + (position.x - prev.x) * 0.15,
        y: prev.y + (position.y - prev.y) * 0.15,
      }));
      animationFrameId = requestAnimationFrame(updateTrail);
    };
    animationFrameId = requestAnimationFrame(updateTrail);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, [settings.cursor_effects_enabled, position.x, position.y]);

  if (!settings.cursor_effects_enabled || !isVisible) {
    return null;
  }

  return (
    <>
      {/* Primary Dot */}
      <div
        className="fixed pointer-events-none z-50 transition-transform duration-75 transform -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: isClicked ? '8px' : isHovering ? '12px' : '6px',
          height: isClicked ? '8px' : isHovering ? '12px' : '6px',
          backgroundColor: '#FFFFFF',
          boxShadow: '0 0 10px #FFFFFF',
        }}
      />

      {/* Trailing Glowing Ring */}
      <div
        className="fixed pointer-events-none z-40 transition-transform duration-100 ease-out transform -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          left: `${trailPosition.x}px`,
          top: `${trailPosition.y}px`,
          width: isHovering ? '52px' : isClicked ? '30px' : '38px',
          height: isHovering ? '52px' : isClicked ? '30px' : '38px',
          border: '1.5px solid rgba(139, 92, 246, 0.65)',
          backgroundColor: isHovering ? 'rgba(139, 92, 246, 0.15)' : 'rgba(139, 92, 246, 0.04)',
          boxShadow: isHovering ? '0 0 20px rgba(139, 92, 246, 0.4)' : 'none',
        }}
      />
    </>
  );
};
