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

import { Button, ButtonProps, Popconfirm, Tooltip, Dropdown, MenuProps, Modal } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import { PermissionGuard } from './PermissionGuard';
import { useState } from 'react';

export interface ActionProps extends ButtonProps {
  key: string;
  label?: React.ReactNode;
  permission?: string;
  icon?: React.ReactNode;
  tooltip?: React.ReactNode;
  onClick?: () => Promise<any>;
  hidden?: boolean;
  confirm?: {
    title: React.ReactNode;
    description?: React.ReactNode;
    onConfirm: () => void;
    okText?: React.ComponentProps<typeof Popconfirm>['okText'];
    cancelText?: React.ComponentProps<typeof Popconfirm>['cancelText'];
  }
}


const ActionButton: React.FC<ActionProps> = (action) => {
  const [loading, setLoading] = useState(false);
  const { permission, icon, tooltip, onClick, confirm, label, ...rest } = action;

  const handleClick = onClick ? async () => {
    setLoading(true);
    try {
      await onClick();
    } finally {
      setLoading(false);
    }
  } : undefined;

  let button = (
    <Button
      type='text'
      size='small'
      loading={loading}
      icon={icon}
      onClick={confirm ? undefined : handleClick}
      {...rest}
    >
      {label && <span style={{ position: 'inherit', top: '-2px' }}>{label}</span>}
    </Button>
  );

  if (tooltip) {
    button = <Tooltip title={tooltip}>{button}</Tooltip>;
  }

  if (confirm) {
    const confirmHandler = async () => {
      if (confirm.onConfirm) {
        confirm.onConfirm();
      } else if (handleClick) {
        await handleClick();
      }
    };

    button = (
      <Popconfirm
        title={confirm.title}
        description={confirm.description}
        onConfirm={confirmHandler}
        okText={confirm.okText}
        cancelText={confirm.cancelText}
      >
        {button}
      </Popconfirm>
    );
  }

  if (permission) {
    button = <PermissionGuard permission={permission}>{button}</PermissionGuard>;
  }

  return button;
};

export interface ActionsProps {
  actions: ActionProps[];
  maxVisibleItems?: number;
}

export const Actions: React.FC<ActionsProps> = ({ actions, maxVisibleItems }) => {
  const visibleActions = actions.filter(action => !action.hidden);

  // If no limit or actions fit within limit, render all normally
  if (!maxVisibleItems || visibleActions.length <= maxVisibleItems) {
    return <>{visibleActions.map(({ key, ...action }) => <ActionButton key={key} {...action} />)}</>;
  }

  // Split actions into visible and overflow
  const displayedActions = visibleActions.slice(0, maxVisibleItems - 1);
  const overflowActions = visibleActions.slice(maxVisibleItems - 1);

  // Create dropdown menu items from overflow actions
  const menuItems: MenuProps['items'] = overflowActions.map((action) => {
    const { key, label, icon, permission, onClick, confirm, disabled, tooltip } = action;

    const handleMenuClick = async () => {
      if (confirm) {
        Modal.confirm({
          title: confirm.title,
          content: confirm.description,
          onOk: confirm.onConfirm,
          okText: confirm.okText,
          cancelText: confirm.cancelText,
        });
      } else if (onClick) {
        await onClick();
      }
    };

    const menuItem = {
      key,
      label,
      icon,
      disabled,
      onClick: handleMenuClick,
    };

    // If has permission requirement, wrap the label
    if (permission) {
      return {
        ...menuItem,
        label: (
          <PermissionGuard permission={permission}>
            <span>{label ?? tooltip}</span>
          </PermissionGuard>
        ),
      };
    }

    return menuItem;
  });

  return (
    <>
      {displayedActions.map(({ key, ...action }) => (
        <ActionButton key={key} {...action} />
      ))}
      <Dropdown menu={{ items: menuItems }} trigger={['click']}>
        <Button type="text" size="small" icon={<MoreOutlined />} />
      </Dropdown>
    </>
  );
};

export default Actions;