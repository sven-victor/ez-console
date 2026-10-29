/**
 * Copyright 2025 Sven Victor
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { useState, useCallback, useEffect } from 'react';
import { createStyles } from 'antd-style';
import classNames from 'classnames';

interface ResizeDividerProps {
  onResize: (newWidth: number) => void;
  minWidth?: number;
  maxWidth?: number;
}

const useStyles = createStyles(({ token, css }) => ({
  root: css`
    width: 8px;
    align-self: stretch;
    cursor: col-resize;
    position: relative;
    flex-shrink: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${token.colorBorder};
    transition: background-color 0.2s ease;

    &:hover {
      background-color: ${token.colorFill};
    }
  `,
  dragging: css`
    background-color: ${token.colorPrimary};
    transition: none;

    &:hover {
      background-color: ${token.colorPrimary};
    }
  `,
  grip: css`
    width: 3px;
    height: 40px;
    border-radius: 2px;
    background-color: ${token.colorTextQuaternary};
    opacity: 0.85;
    transition: opacity 0.2s ease, background-color 0.2s ease;
    pointer-events: none;
  `,
  gripHover: css`
    background-color: ${token.colorBgContainer};
    opacity: 1;
  `,
  gripDragging: css`
    background-color: ${token.colorTextLightSolid};
    opacity: 1;
  `,
}));

const ResizeDivider: React.FC<ResizeDividerProps> = ({
  onResize,
  minWidth = 300,
  maxWidth = window.innerWidth * 0.5,
}) => {
  const { styles } = useStyles();
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
      className={classNames(styles.root, isDragging && styles.dragging)}
    >
      <div
        className={classNames(
          styles.grip,
          isHovering && styles.gripHover,
          isDragging && styles.gripDragging,
        )}
      />
    </div>
  );
};

export default ResizeDivider;

