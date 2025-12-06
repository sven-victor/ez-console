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

import { Dropdown } from 'antd';
import type { DropDownProps } from 'antd/es/dropdown';
import classNames from 'classnames';
import React from 'react';


import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token, css }) => {
  return {
    container: css`
      ${css`
        @media screen and (max-width: ${token.screenXS}px) {
          width: 100% !important;
          > * {
            border-radius: 0 !important;
          }
        }
      `}
    > *{
      background-color: ${token.colorBgElevated};
      border-radius: 4px;
      box-shadow: ${token.boxShadowTertiary};
    }
    `,
    iconStyle: {
      cursor: "pointer",
      padding: "12px",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 18,
      verticalAlign: "middle",
      '&:hover': {
        color: token.colorPrimaryTextHover
      },
    },
  };
});

export type HeaderDropdownProps = {
  overlayClassName?: string;
  hidden?: boolean;
  overlay?: React.ReactNode | (() => React.ReactNode) | any;
  placement?: 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topCenter' | 'topRight' | 'bottomCenter';
} & Omit<DropDownProps, 'overlay'>;

const HeaderDropdown: React.FC<HeaderDropdownProps> = ({
  overlayClassName: cls,
  overlay,
  hidden,
  children,
  ...restProps
}) => {
  if (hidden) {
    return <></>;
  }
  const { styles } = useStyles();
  return (
    <Dropdown
      dropdownRender={overlay}
      overlayClassName={classNames(styles.container, cls)}
      {...restProps}
    >
      <span className={styles.iconStyle}>
        {children}
      </span>
    </Dropdown>
  );
};

export default HeaderDropdown;
