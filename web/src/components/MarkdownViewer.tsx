/**
 * Copyright 2025 Sven Victor
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 */

import React from 'react';
import { type ComponentProps, XMarkdown } from '@ant-design/x-markdown';
import { Mermaid, CodeHighlighter } from '@ant-design/x';
import { theme } from 'antd';
import '@ant-design/x-markdown/themes/light.css';
import '@ant-design/x-markdown/themes/dark.css';
import classNames from 'classnames';

export interface MarkdownViewerProps {
  content: string;
  className?: string;
  style?: React.CSSProperties;
  components?: React.ComponentProps<typeof XMarkdown>['components'];
  paragraphTag?: keyof JSX.IntrinsicElements;
  rootClassName?: string;
}

export const Code: React.FC<ComponentProps> = (props) => {
  const { className, children } = props;
  const lang = className?.match(/language-(\w+)/)?.[1] || '';

  if (typeof children !== 'string') return null;
  if (lang === 'mermaid') {
    return <Mermaid>{children}</Mermaid>;
  }
  return <CodeHighlighter lang={lang}>{children}</CodeHighlighter>;
};

export const useMarkdownTheme = () => {
  const token = theme.useToken();

  const isLightMode = React.useMemo(() => {
    return token?.theme?.id === 0;
  }, [token]);

  const className = React.useMemo(() => {
    return isLightMode ? 'x-markdown-light' : 'x-markdown-dark';
  }, [isLightMode]);

  return [className];
};

const MarkdownViewer: React.FC<MarkdownViewerProps> = ({
  content,
  className,
  style,
  paragraphTag = 'div',
  rootClassName,
  components = { code: Code },
}) => {
  const [markdownThemeClassName] = useMarkdownTheme();
  return (
    <XMarkdown
      content={content}
      className={classNames(className, markdownThemeClassName)}
      style={style}
      components={components}
      paragraphTag={paragraphTag}
      rootClassName={rootClassName}
    />
  );
};

export default MarkdownViewer;
