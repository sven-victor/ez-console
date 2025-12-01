import React, { useState, useCallback, useEffect } from 'react';

interface ResizeDividerProps {
  onResize: (newWidth: number) => void;
  minWidth?: number;
  maxWidth?: number;
}

const ResizeDivider: React.FC<ResizeDividerProps> = ({
  onResize,
  minWidth = 300,
  maxWidth = window.innerWidth * 0.5,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;

      const newWidth = window.innerWidth - e.clientX;
      const constrainedWidth = Math.max(minWidth, Math.min(maxWidth, newWidth));
      onResize(constrainedWidth);
    },
    [isDragging, minWidth, maxWidth, onResize]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{
        width: '8px',
        height: '100vh',
        cursor: 'col-resize',
        position: 'relative',
        flexShrink: 0,
        transition: isDragging ? 'none' : 'background-color 0.2s ease',
        backgroundColor: isDragging
          ? '#1890ff'
          : isHovering
            ? '#bfbfbf'
            : '#e8e8e8',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Visual indicator line */}
      <div
        style={{
          width: '3px',
          height: '40px',
          borderRadius: '2px',
          backgroundColor: isDragging || isHovering ? '#fff' : '#999',
          opacity: isDragging || isHovering ? 1 : 0.5,
          transition: 'opacity 0.2s ease',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};

export default ResizeDivider;

