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

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Tooltip } from 'antd';
import { createStyles } from 'antd-style';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { useAI } from '@/contexts/AIContext';

const SIZE = 40;
const EDGE_THRESHOLD = 28;
const CLICK_THRESHOLD = 6;
const STORAGE_KEY = 'ai-chat-float-pos';

type Edge = 'left' | 'right' | 'top' | 'bottom';

interface FloatPos {
  x: number;
  y: number;
  edge: Edge | null;
}

/** Persisted as viewport ratios so resize keeps relative placement. */
interface StoredPos {
  rx: number;
  ry: number;
  edge: Edge | null;
}

const useStyle = createStyles(({ token, css }) => ({
  root: css`
    position: fixed;
    z-index: 1050;
    width: ${SIZE}px;
    height: ${SIZE}px;
    padding: 0;
    margin: 0;
    border: none;
    background: transparent;
    appearance: none;
    -webkit-appearance: none;
    touch-action: none;
    user-select: none;
    cursor: grab;
    transition: transform 0.28s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.2s ease;

    &:hover,
    &:focus,
    &:active,
    &:focus-visible {
      background: transparent;
      outline: none;
      box-shadow: none;
    }

    &:active {
      cursor: grabbing;
    }
  `,
  dragging: css`
    transition: none;
    cursor: grabbing;
    z-index: 1100;
  `,
  docked: css`
    &:hover,
    &:focus-visible {
      transform: translate(0, 0) rotate(0deg) !important;
    }
  `,
  dockLeft: css`
    transform: translateX(calc(-30% - 2px)) rotate(32deg);
  `,
  dockRight: css`
    transform: translateX(calc(30% + 2px)) rotate(-32deg);
  `,
  dockTop: css`
    transform: translateY(calc(-40% - 2px)) rotate(180deg);
  `,
  dockBottom: css`
    transform: translateY(calc(30% + 2px)) rotate(0deg);
  `,
  body: css`
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: linear-gradient(145deg, ${token.colorPrimaryHover}, ${token.colorPrimary});
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.18), 0 2px 6px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid rgba(255, 255, 255, 0.35);
    overflow: visible;

    &:hover {
      box-shadow: 0 8px 22px rgba(0, 0, 0, 0.22), 0 3px 8px rgba(0, 0, 0, 0.12);
    }
  `,
  robot: css`
    width: 32px;
    height: 32px;
    display: block;
    padding-bottom: 5px;
    overflow: visible;
  `,
  eye: css`
    transform-box: fill-box;
    transform-origin: center;
    animation: ai-robot-blink 4.2s infinite;

    &:nth-of-type(2) {
      animation-delay: 0.12s;
    }

    @keyframes ai-robot-blink {
      0%,
      42%,
      48%,
      100% {
        transform: scaleY(1);
      }
      45% {
        transform: scaleY(0.08);
      }
    }
  `,
}));

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function maxX() {
  return Math.max(0, window.innerWidth - SIZE);
}

function maxY() {
  return Math.max(0, window.innerHeight - SIZE);
}

function defaultStored(): StoredPos {
  const mx = maxX();
  const my = maxY();
  return {
    rx: mx > 0 ? clamp((mx - 24) / mx, 0, 1) : 1,
    ry: my > 0 ? clamp((my - 24) / my, 0, 1) : 1,
    edge: null,
  };
}

function snapToEdge(x: number, y: number, edge: Edge | null): FloatPos {
  let nextX = clamp(x, 0, maxX());
  let nextY = clamp(y, 0, maxY());

  if (edge === 'left') nextX = 0;
  if (edge === 'right') nextX = maxX();
  if (edge === 'top') nextY = 0;
  if (edge === 'bottom') nextY = maxY();

  return { x: nextX, y: nextY, edge };
}

function toStored(pos: FloatPos): StoredPos {
  const mx = maxX();
  const my = maxY();
  return {
    rx: mx > 0 ? clamp(pos.x / mx, 0, 1) : 0,
    ry: my > 0 ? clamp(pos.y / my, 0, 1) : 0,
    edge: pos.edge,
  };
}

function fromStored(stored: StoredPos): FloatPos {
  return snapToEdge(stored.rx * maxX(), stored.ry * maxY(), stored.edge);
}

function loadStored(): StoredPos {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultStored();
    const parsed = JSON.parse(raw) as Partial<StoredPos & FloatPos>;

    // New format: viewport ratios
    if (typeof parsed.rx === 'number' && typeof parsed.ry === 'number') {
      return {
        rx: clamp(parsed.rx, 0, 1),
        ry: clamp(parsed.ry, 0, 1),
        edge: parsed.edge ?? null,
      };
    }

    // Legacy absolute pixels → convert once against current viewport
    if (typeof parsed.x === 'number' && typeof parsed.y === 'number') {
      return toStored({
        x: clamp(parsed.x, 0, maxX()),
        y: clamp(parsed.y, 0, maxY()),
        edge: parsed.edge ?? null,
      });
    }

    return defaultStored();
  } catch {
    return defaultStored();
  }
}

function saveStored(stored: StoredPos) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
}

function resolveEdge(x: number, y: number): Edge | null {
  const distLeft = x;
  const distRight = window.innerWidth - (x + SIZE);
  const distTop = y;
  const distBottom = window.innerHeight - (y + SIZE);
  const nearest = Math.min(distLeft, distRight, distTop, distBottom);
  if (nearest > EDGE_THRESHOLD) return null;
  if (nearest === distLeft) return 'left';
  if (nearest === distRight) return 'right';
  if (nearest === distTop) return 'top';
  return 'bottom';
}

const BlinkingRobot: React.FC<{ className?: string; eyeClassName?: string }> = ({
  className,
  eyeClassName,
}) => (
  <svg className={className} viewBox="0 0 64 64" aria-hidden>
    <circle cx="32" cy="12" r="3.2" fill="rgba(255,255,255,0.9)" />
    <rect x="30.4" y="14" width="3.2" height="7" rx="1.4" fill="rgba(255,255,255,0.85)" />
    <rect x="10" y="22" width="44" height="34" rx="14" fill="rgba(255,255,255,0.95)" />
    <rect x="16" y="28" width="32" height="18" rx="9" fill="rgba(0,0,0,0.12)" />
    <ellipse className={eyeClassName} cx="25" cy="37" rx="4.2" ry="5" fill="#1f2937" />
    <ellipse className={eyeClassName} cx="39" cy="37" rx="4.2" ry="5" fill="#1f2937" />
    <circle cx="26.2" cy="35.5" r="1.2" fill="#fff" />
    <circle cx="40.2" cy="35.5" r="1.2" fill="#fff" />
    <path
      d="M26 48c2.2 2.4 9.8 2.4 12 0"
      stroke="#1f2937"
      strokeWidth="2.2"
      strokeLinecap="round"
      fill="none"
    />
    <rect x="4" y="34" width="7" height="10" rx="3.5" fill="rgba(255,255,255,0.9)" />
    <rect x="53" y="34" width="7" height="10" rx="3.5" fill="rgba(255,255,255,0.9)" />
  </svg>
);

export const AIChatFloatButton: React.FC = () => {
  const { styles } = useStyle();
  const { setVisible, visible } = useAI();
  const { t } = useTranslation('ai');
  const storedRef = useRef<StoredPos>(
    typeof window === 'undefined' ? { rx: 1, ry: 1, edge: null } : loadStored()
  );
  const [pos, setPos] = useState<FloatPos>(() =>
    typeof window === 'undefined' ? { x: 0, y: 0, edge: null } : fromStored(storedRef.current)
  );
  const [dragging, setDragging] = useState(false);
  const dragRef = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    originX: number;
    originY: number;
    moved: boolean;
  } | null>(null);
  const posRef = useRef(pos);
  posRef.current = pos;

  const dockClass =
    !dragging && pos.edge === 'left'
      ? styles.dockLeft
      : !dragging && pos.edge === 'right'
        ? styles.dockRight
        : !dragging && pos.edge === 'top'
          ? styles.dockTop
          : !dragging && pos.edge === 'bottom'
            ? styles.dockBottom
            : undefined;

  const persistPos = useCallback((next: FloatPos) => {
    const stored = toStored(next);
    storedRef.current = stored;
    saveStored(stored);
    setPos(next);
  }, []);

  const syncToViewport = useCallback(() => {
    if (dragRef.current) return;
    setPos(fromStored(storedRef.current));
  }, []);

  useEffect(() => {
    // Migrate legacy absolute coords to ratio format once loaded.
    saveStored(storedRef.current);
    window.addEventListener('resize', syncToViewport);
    return () => window.removeEventListener('resize', syncToViewport);
  }, [syncToViewport]);

  const onPointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (e.button !== 0) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    dragRef.current = {
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      originX: posRef.current.x,
      originY: posRef.current.y,
      moved: false,
    };
    setDragging(true);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== e.pointerId) return;

    const dx = e.clientX - drag.startX;
    const dy = e.clientY - drag.startY;
    if (!drag.moved && Math.hypot(dx, dy) > CLICK_THRESHOLD) {
      drag.moved = true;
    }

    setPos({
      x: clamp(drag.originX + dx, 0, maxX()),
      y: clamp(drag.originY + dy, 0, maxY()),
      edge: null,
    });
  };

  const finishPointer = (e: React.PointerEvent<HTMLButtonElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== e.pointerId) return;

    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // ignore if already released
    }

    const wasClick = !drag.moved;
    dragRef.current = null;
    setDragging(false);

    if (wasClick) {
      setVisible(true);
      return;
    }

    const edge = resolveEdge(posRef.current.x, posRef.current.y);
    persistPos(snapToEdge(posRef.current.x, posRef.current.y, edge));
  };

  if (visible) return null;

  return createPortal(
    <Tooltip
      title={t('chat.openAssistant', { defaultValue: 'Open AI Assistant' })}
      placement="left"
      mouseEnterDelay={0.4}
      open={dragging ? false : undefined}
    >
      <button
        type="button"
        aria-label={t('chat.openAssistant', { defaultValue: 'Open AI Assistant' })}
        className={classNames(
          'ai-chat-float-button',
          styles.root,
          dragging && styles.dragging,
          !dragging && pos.edge && styles.docked,
          dockClass
        )}
        style={{ left: pos.x, top: pos.y }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={finishPointer}
        onPointerCancel={finishPointer}
      >
        <span className={styles.body}>
          <BlinkingRobot className={styles.robot} eyeClassName={styles.eye} />
        </span>
      </button>
    </Tooltip>,
    document.body
  );
};

export default AIChatFloatButton;
