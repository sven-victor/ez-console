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

import { Button, ButtonProps, Popconfirm, Tooltip } from 'antd';
import { PermissionGuard } from './PermissionGuard';
import { useState } from 'react';

export interface ActionProps extends ButtonProps {
  key: string;
  label?: string;
  permission?: string;
  icon?: React.ReactNode;
  tooltip?: string;
  onClick?: () => Promise<any>;
  hidden?: boolean;
  confirm?: {
    title: string;
    onConfirm: () => void;
    okText?: string;
    cancelText?: string;
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

export const Actions = ({ actions }: { actions: ActionProps[] }) => {
  return actions.filter(action => !action.hidden).map((action) => <ActionButton {...action} />)
}
export default Actions;