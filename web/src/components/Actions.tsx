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

export interface Action extends ButtonProps {
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


const renderButton = (action: Action) => {
  const [loading, setLoading] = useState(false);
  const { permission, icon, tooltip, onClick, confirm, label, ...rest } = action;
  if (permission) {
    return <PermissionGuard permission={permission} key={action.key}>
      {renderButton({ icon, tooltip, onClick, confirm, label, ...rest })}
    </PermissionGuard>
  }
  if (confirm) {
    return <Popconfirm title={confirm.title} onConfirm={confirm.onConfirm || onClick} okText={confirm.okText} cancelText={confirm.cancelText} key={action.key}>
      {renderButton({ icon, tooltip, label, ...rest })}
    </Popconfirm>
  }
  if (tooltip) {
    return <Tooltip title={tooltip} key={action.key}>
      {renderButton({ icon, onClick, label, ...rest })}
    </Tooltip>
  }

  const handleClick = onClick ? async () => {
    console.log(new Date(), "handleClick")
    setLoading(true);
    try {
      await onClick();
    } finally {
      setLoading(false);
      console.log(new Date(), "handleClick1")
    }
  } : undefined;

  return <Button type='text' size='small' loading={loading} icon={icon} onClick={handleClick} {...rest} key={action.key} >
    {label && <span style={{ position: 'inherit', top: '-2px' }}>{label}</span>}
  </Button>
}

export const Actions = ({ actions }: { actions: Action[] }) => {
  return actions.filter(action => !action.hidden).map((action) => renderButton(action))
}
export default Actions;