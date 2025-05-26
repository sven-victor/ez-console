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
