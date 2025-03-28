import { Button, ButtonProps, Popconfirm, Tooltip } from 'antd';
import { PermissionGuard } from './PermissionGuard';

interface Action extends ButtonProps {
  permission?: string;
  icon?: React.ReactNode;
  tooltip?: string;
  onClick?: () => void;
  hidden?: boolean;
  confirm?: {
    title: string;
    onConfirm: () => void;
    okText?: string;
    cancelText?: string;
  }
}


const renderButton = (action: Action) => {
  const { permission, icon, tooltip, onClick, confirm, ...rest } = action;
  if (permission) {
    return <PermissionGuard permission={permission}>
      {renderButton({ icon, tooltip, onClick, confirm, ...rest })}
    </PermissionGuard>
  }
  if (confirm) {
    return <Popconfirm title={confirm.title} onConfirm={confirm.onConfirm || onClick} okText={confirm.okText} cancelText={confirm.cancelText}>
      {renderButton({ icon, tooltip, ...rest })}
    </Popconfirm>
  }
  if (tooltip) {
    return <Tooltip title={tooltip}>
      {renderButton({ icon, onClick, ...rest })}
    </Tooltip>
  }
  return <Button type='text' size='small' icon={icon} onClick={onClick} {...rest} />
}

export const Actions = ({ actions }: { actions: Action[] }) => {
  return actions.filter(action => !action.hidden).map((action) => renderButton(action))
}
export default Actions;