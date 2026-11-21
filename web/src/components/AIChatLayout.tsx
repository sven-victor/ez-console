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

import React, { lazy, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Modal } from 'antd';
import { useAI } from '@/contexts/AIContext';
import { withSuspense } from '@/routes';
import ResizeDivider from './ResizeDivider';
import { createStyles } from 'antd-style';
import classNames from 'classnames';
import { type AIChatProps } from './AIChat';
import { AIChatFloatButton } from './AIChatFloatButton';
const AIChatDialog = lazy(() => import('./AIChat'));

const FLOAT_MARGIN = 16;
const FLOAT_POSITION_KEY = 'ai-float-sidebar-position';
const FLOAT_WIDTH_KEY = 'ai-float-sidebar-width';
const FLOAT_HEIGHT_KEY = 'ai-float-sidebar-height';
const MIN_FLOAT_WIDTH = 300;
const MIN_FLOAT_HEIGHT = 360;
const RESIZE_EDGE = 6;
const RESIZE_CORNER = 12;
const DRAG_HANDLE_SELECTOR = '.ai-chat-layout-selector';
const DRAG_INTERACTIVE_SELECTOR = [
  '.ant-radio-group',
  '.ant-btn',
  '.ant-dropdown',
  '.ant-dropdown-trigger',
  'button',
  'a',
  'input',
  'textarea',
  'select',
].join(', ');

type FloatPosition = { left: number; top: number };
type FloatFrame = FloatPosition & { width: number; height: number };
type ResizeEdge = 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw';

const RESIZE_HANDLES: { edge: ResizeEdge; cursor: string; style: React.CSSProperties }[] = [
  { edge: 'n', cursor: 'ns-resize', style: { top: 0, left: RESIZE_CORNER, right: RESIZE_CORNER, height: RESIZE_EDGE, zIndex: 30 } },
  { edge: 's', cursor: 'ns-resize', style: { bottom: 0, left: RESIZE_CORNER, right: RESIZE_CORNER, height: RESIZE_EDGE, zIndex: 30 } },
  { edge: 'e', cursor: 'ew-resize', style: { right: 0, top: 50, bottom: RESIZE_CORNER, width: RESIZE_EDGE, zIndex: 30 } },
  { edge: 'w', cursor: 'ew-resize', style: { left: 0, top: RESIZE_CORNER, bottom: RESIZE_CORNER, width: RESIZE_EDGE, zIndex: 30 } },
  { edge: 'nw', cursor: 'nwse-resize', style: { top: 0, left: 0, width: RESIZE_CORNER, height: RESIZE_CORNER, zIndex: 31 } },
  { edge: 'ne', cursor: 'nesw-resize', style: { top: 0, right: 0, width: RESIZE_CORNER, height: RESIZE_CORNER, zIndex: 31 } },
  { edge: 'sw', cursor: 'nesw-resize', style: { bottom: 0, left: 0, width: RESIZE_CORNER, height: RESIZE_CORNER, zIndex: 31 } },
  { edge: 'se', cursor: 'nwse-resize', style: { bottom: 0, right: 0, width: RESIZE_CORNER, height: RESIZE_CORNER, zIndex: 31 } },
];

function clampFloatPosition(left: number, top: number, width: number, height: number): FloatPosition {
  const maxLeft = window.innerWidth - width - FLOAT_MARGIN;
  const maxTop = window.innerHeight - height - FLOAT_MARGIN;
  return {
    left: Math.min(Math.max(left, Math.min(FLOAT_MARGIN, maxLeft)), Math.max(FLOAT_MARGIN, maxLeft)),
    top: Math.min(Math.max(top, Math.min(FLOAT_MARGIN, maxTop)), Math.max(FLOAT_MARGIN, maxTop)),
  };
}

function readFloatPosition(width: number, height: number): FloatPosition | null {
  try {
    const raw = localStorage.getItem(FLOAT_POSITION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<FloatPosition>;
    if (typeof parsed.left !== 'number' || typeof parsed.top !== 'number') return null;
    if (!Number.isFinite(parsed.left) || !Number.isFinite(parsed.top)) return null;
    return clampFloatPosition(parsed.left, parsed.top, width, height);
  } catch {
    return null;
  }
}

function readFloatWidth(): number | null {
  const saved = Number.parseFloat(localStorage.getItem(FLOAT_WIDTH_KEY) || '');
  if (!Number.isFinite(saved) || saved <= 0) return null;
  const maxWidth = Math.max(MIN_FLOAT_WIDTH, window.innerWidth - FLOAT_MARGIN * 2);
  return Math.min(Math.max(saved, MIN_FLOAT_WIDTH), maxWidth);
}

function readFloatHeight(): number | null {
  const saved = Number.parseFloat(localStorage.getItem(FLOAT_HEIGHT_KEY) || '');
  if (!Number.isFinite(saved) || saved <= 0) return null;
  const maxHeight = Math.max(MIN_FLOAT_HEIGHT, window.innerHeight - FLOAT_MARGIN * 2);
  return Math.min(Math.max(saved, MIN_FLOAT_HEIGHT), maxHeight);
}

function resizeFloatFrame(edge: ResizeEdge, origin: FloatFrame, dx: number, dy: number): FloatFrame {
  const right = origin.left + origin.width;
  const bottom = origin.top + origin.height;
  let left = origin.left;
  let top = origin.top;
  let width = origin.width;
  let height = origin.height;

  if (edge.includes('w')) {
    left = origin.left + dx;
    if (left < FLOAT_MARGIN) left = FLOAT_MARGIN;
    if (right - left < MIN_FLOAT_WIDTH) left = right - MIN_FLOAT_WIDTH;
    width = right - left;
  } else if (edge.includes('e')) {
    width = origin.width + dx;
    if (width < MIN_FLOAT_WIDTH) width = MIN_FLOAT_WIDTH;
    const maxWidth = window.innerWidth - FLOAT_MARGIN - origin.left;
    if (width > maxWidth) width = Math.max(MIN_FLOAT_WIDTH, maxWidth);
  }

  if (edge.includes('n')) {
    top = origin.top + dy;
    if (top < FLOAT_MARGIN) top = FLOAT_MARGIN;
    if (bottom - top < MIN_FLOAT_HEIGHT) top = bottom - MIN_FLOAT_HEIGHT;
    height = bottom - top;
  } else if (edge.includes('s')) {
    height = origin.height + dy;
    if (height < MIN_FLOAT_HEIGHT) height = MIN_FLOAT_HEIGHT;
    const maxHeight = window.innerHeight - FLOAT_MARGIN - origin.top;
    if (height > maxHeight) height = Math.max(MIN_FLOAT_HEIGHT, maxHeight);
  }

  return {
    left: Math.round(left),
    top: Math.round(top),
    width: Math.round(width),
    height: Math.round(height),
  };
}

function readSidebarWidth(): number {
  const saved = Number.parseInt(localStorage.getItem('ai-sidebar-width') || '', 10);
  return Number.isFinite(saved) && saved > 0 ? saved : 400;
}

function isFloatDragHandle(target: EventTarget | null): boolean {
  if (!(target instanceof Element)) return false;
  if (!target.closest(DRAG_HANDLE_SELECTOR)) return false;
  if (target.closest(DRAG_INTERACTIVE_SELECTOR)) return false;
  return true;
}

function applyFloatPosition(panel: HTMLDivElement | null, position: FloatPosition | null) {
  if (!panel || !position) return;
  panel.style.left = `${position.left}px`;
  panel.style.top = `${position.top}px`;
  panel.style.right = 'auto';
}

function applyFloatFrame(panel: HTMLDivElement | null, frame: FloatFrame | null) {
  if (!panel || !frame) return;
  panel.style.left = `${frame.left}px`;
  panel.style.top = `${frame.top}px`;
  panel.style.right = 'auto';
  panel.style.width = `${frame.width}px`;
  panel.style.height = `${frame.height}px`;
}


const useStyle = createStyles(({ token, css, appearance }, layout?: 'float-sidebar' | 'classic' | 'sidebar') => {
  const isDark = appearance === 'dark';
  const floatShadow = isDark
    ? '0 12px 40px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(255, 255, 255, 0.08)'
    : '0 8px 24px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.08)';
  const floatShadowHover = isDark
    ? '0 16px 48px rgba(0, 0, 0, 0.65), 0 0 0 1px rgba(255, 255, 255, 0.12)'
    : '0 12px 32px rgba(0, 0, 0, 0.15), 0 6px 12px rgba(0, 0, 0, 0.1)';

  return {
    resizeDivider: css`
      background-color: ${layout === 'sidebar' ? token.controlItemBgHover : 'unset'};
    `,
    siderLayout: css`
      position: relative;
      height: 100vh;
      background-color: ${token.colorBgContainer};
    `,
    siderLayoutContent: css`
      height: 100%;
      width: 100%;
      min-height: 0;
      background-color: ${token.colorBgContainer};
      overflow: hidden;
      border-radius: ${layout === 'float-sidebar' ? '12px' : '0'};
    `,
    chatHost: css`
      height: 100%;
      min-height: 0;
      display: flex;
      flex-direction: column;
    `,
    floatSiderLayout: css`
      position: fixed;
      right: 16px;
      top: 16px;
      height: calc(100vh - 32px);
      border-radius: 12px;
      box-shadow: ${floatShadow};
      z-index: 1000;
      overflow: hidden;
      background-color: ${token.colorBgElevated};
      box-sizing: border-box;
      border: 1px solid ${isDark ? token.colorBorder : token.colorBorderSecondary};
      transition: box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);

      &:hover {
        box-shadow: ${floatShadowHover};
      }
    `,
    floatResizeHandle: css`
      position: absolute;
      background: transparent;
      touch-action: none;
      user-select: none;
    `,
  };
});

export const AIChatLayout: React.FC<AIChatProps> = (props) => {
  const { visible: chatVisible, setVisible: setChatVisible, setLoaded, layout } = useAI()
  useEffect(() => {
    setLoaded(true);
  }, [setLoaded]);

  const { styles } = useStyle(layout);

  const [sidebarWidth, setSidebarWidth] = useState<number>(readSidebarWidth);
  const [floatWidth, setFloatWidth] = useState<number | null>(readFloatWidth);
  const [floatHeight, setFloatHeight] = useState<number | null>(readFloatHeight);
  const [floatPosition, setFloatPosition] = useState<FloatPosition | null>(() => {
    const width = readFloatWidth() ?? readSidebarWidth();
    const height = readFloatHeight() ?? Math.max(0, window.innerHeight - FLOAT_MARGIN * 2);
    return readFloatPosition(width, height);
  });
  const panelRef = useRef<HTMLDivElement>(null);
  const floatPositionRef = useRef(floatPosition);
  const draggingRef = useRef(false);
  const resizingRef = useRef(false);
  const liveFrameRef = useRef<FloatFrame | null>(null);
  const dragCleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    localStorage.setItem('ai-sidebar-width', sidebarWidth.toString());
  }, [sidebarWidth]);

  useEffect(() => {
    if (!floatPosition) return;
    localStorage.setItem(FLOAT_POSITION_KEY, JSON.stringify(floatPosition));
  }, [floatPosition]);

  useEffect(() => {
    if (floatWidth == null) return;
    localStorage.setItem(FLOAT_WIDTH_KEY, String(floatWidth));
  }, [floatWidth]);

  useEffect(() => {
    if (floatHeight == null) return;
    localStorage.setItem(FLOAT_HEIGHT_KEY, String(floatHeight));
  }, [floatHeight]);

  useEffect(() => () => dragCleanupRef.current?.(), []);

  // Re-apply the live geometry if a render lands mid-gesture and React resets inline styles.
  useLayoutEffect(() => {
    if (resizingRef.current) {
      applyFloatFrame(panelRef.current, liveFrameRef.current);
      return;
    }
    if (!draggingRef.current) return;
    applyFloatPosition(panelRef.current, floatPositionRef.current);
  });

  useEffect(() => {
    if (layout !== 'float-sidebar') return;
    const onResize = () => {
      const panel = panelRef.current;
      if (!panel || panel.getClientRects().length === 0) return;
      const maxWidth = Math.max(MIN_FLOAT_WIDTH, window.innerWidth - FLOAT_MARGIN * 2);
      const maxHeight = Math.max(MIN_FLOAT_HEIGHT, window.innerHeight - FLOAT_MARGIN * 2);
      const currentWidth = floatWidth ?? sidebarWidth;
      const nextWidth = Math.min(Math.max(currentWidth, MIN_FLOAT_WIDTH), maxWidth);
      if (nextWidth !== currentWidth) setFloatWidth(nextWidth);
      let height = panel.getBoundingClientRect().height;
      if (floatHeight != null) {
        const nextHeight = Math.min(Math.max(floatHeight, MIN_FLOAT_HEIGHT), maxHeight);
        if (nextHeight !== floatHeight) setFloatHeight(nextHeight);
        height = nextHeight;
      }
      const pos = floatPositionRef.current;
      if (!pos) return;
      const next = clampFloatPosition(pos.left, pos.top, nextWidth, height);
      if (next.left === pos.left && next.top === pos.top) return;
      floatPositionRef.current = next;
      setFloatPosition(next);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [layout, floatWidth, floatHeight, sidebarWidth]);


  if (layout === 'classic') {
    return (
      <Modal
        className="ai-chat-modal"
        width={1200}
        open={chatVisible}
        closable={false}
        onCancel={() => setChatVisible(false)}
        footer={null}
      >
        {withSuspense(AIChatDialog, props)}
      </Modal>
    )
  }


  const handleSidebarResize = (newWidth: number) => {
    setSidebarWidth(newWidth);
  };

  const handleFloatResizeStart = (edge: ResizeEdge, event: React.PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    event.preventDefault();
    event.stopPropagation();
    const panel = panelRef.current;
    if (!panel) return;

    const rect = panel.getBoundingClientRect();
    const origin: FloatFrame = {
      left: rect.left,
      top: rect.top,
      width: rect.width,
      height: rect.height,
    };
    const startX = event.clientX;
    const startY = event.clientY;
    const cursor = RESIZE_HANDLES.find((handle) => handle.edge === edge)?.cursor ?? 'default';
    resizingRef.current = true;
    liveFrameRef.current = resizeFloatFrame(edge, origin, 0, 0);
    floatPositionRef.current = { left: liveFrameRef.current.left, top: liveFrameRef.current.top };
    applyFloatFrame(panel, liveFrameRef.current);
    document.body.style.cursor = cursor;
    document.body.style.userSelect = 'none';

    const onMove = (ev: PointerEvent) => {
      const next = resizeFloatFrame(edge, origin, ev.clientX - startX, ev.clientY - startY);
      liveFrameRef.current = next;
      floatPositionRef.current = { left: next.left, top: next.top };
      applyFloatFrame(panel, next);
    };
    const finish = () => {
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerup', finish);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      dragCleanupRef.current = null;
      const next = liveFrameRef.current;
      if (next) {
        floatPositionRef.current = { left: next.left, top: next.top };
        setFloatPosition(floatPositionRef.current);
        if (edge.includes('e') || edge.includes('w')) setFloatWidth(next.width);
        if (edge.includes('n') || edge.includes('s')) setFloatHeight(next.height);
      }
      resizingRef.current = false;
    };
    dragCleanupRef.current = finish;
    document.addEventListener('pointermove', onMove);
    document.addEventListener('pointerup', finish);
  };

  const handleFloatDragStart = (event: React.PointerEvent<HTMLDivElement>) => {
    if (layout !== 'float-sidebar' || event.button !== 0) return;
    if (!isFloatDragHandle(event.target)) return;
    const panel = panelRef.current;
    if (!panel) return;

    event.preventDefault();
    const rect = panel.getBoundingClientRect();
    const origin = clampFloatPosition(rect.left, rect.top, rect.width, rect.height);
    const startX = event.clientX;
    const startY = event.clientY;
    draggingRef.current = true;
    floatPositionRef.current = origin;
    applyFloatPosition(panel, origin);
    document.body.style.cursor = 'grabbing';
    document.body.style.userSelect = 'none';

    const onMove = (ev: PointerEvent) => {
      const next = clampFloatPosition(
        origin.left + ev.clientX - startX,
        origin.top + ev.clientY - startY,
        rect.width,
        rect.height,
      );
      floatPositionRef.current = next;
      applyFloatPosition(panel, next);
    };
    const finish = () => {
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerup', finish);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      dragCleanupRef.current = null;
      const next = floatPositionRef.current;
      if (next) setFloatPosition(next);
      draggingRef.current = false;
    };
    dragCleanupRef.current = finish;
    document.addEventListener('pointermove', onMove);
    document.addEventListener('pointerup', finish);
  };

  return (
    <div
      ref={panelRef}
      onPointerDown={handleFloatDragStart}
      style={{
        width: `${layout === 'float-sidebar' ? (floatWidth ?? sidebarWidth) : sidebarWidth}px`,
        display: chatVisible ? 'flex' : 'none',
        overflow: 'hidden',
        flexShrink: 0,
        ...(layout === 'float-sidebar' && floatHeight != null ? { height: floatHeight } : null),
        ...(layout === 'float-sidebar' && floatPosition
          ? { left: floatPosition.left, top: floatPosition.top, right: 'auto' as const }
          : null),
      }}
      className={classNames("ai-sidebar-layout", layout === 'float-sidebar' ? styles.floatSiderLayout : styles.siderLayout)}
    >
      {layout === 'sidebar' && (
        <ResizeDivider
          rootClassName={styles.resizeDivider}
          onResize={handleSidebarResize}
          minWidth={300}
          maxWidth={window.innerWidth * 0.5}
        />
      )}
      <div
        className={styles.siderLayoutContent}
      >
        <div className={styles.chatHost}>
          {withSuspense(AIChatDialog, props)}
        </div>
      </div>
      {layout === 'float-sidebar' && RESIZE_HANDLES.map((handle) => (
        <div
          key={handle.edge}
          aria-hidden
          className={styles.floatResizeHandle}
          style={{ ...handle.style, cursor: handle.cursor }}
          onPointerDown={(event) => handleFloatResizeStart(handle.edge, event)}
        />
      ))}
    </div>
  )
}


export interface AIChatButtonProps {
  /** Custom float button icon; overrides the default blinking robot when provided. */
  icon?: React.ReactNode;
}

export const AIChatButton: React.FC<AIChatButtonProps> = ({ icon }) => (
  <AIChatFloatButton icon={icon} />
);

