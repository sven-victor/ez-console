import React, { useState } from 'react';
import {
  Card,
  Table,
  Button,
  Space,
  Modal,
  Form,
  Input,
  message,
  Tag,
  Descriptions,
  Select,
} from 'antd';
import {
  ArrowLeftOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useRequest } from 'ahooks';
import { useNavigate, useParams } from 'react-router-dom';
import type { ColumnsType } from 'antd/es/table';
import * as systemApi from '@/service/api/system';
import * as authorizationApi from '@/service/api/authorization';
import Actions from '@/components/Actions';

interface OrganizationUser extends API.User {
  organization_roles?: API.Role[];
}

interface AddUserFormData {
  user_id: string;
  role_ids: string[];
}

interface UpdateRolesFormData {
  role_ids: string[];
}

const OrganizationDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation('system');
  const { t: tCommon } = useTranslation('common');
  const [addUserForm] = Form.useForm();
  const [updateRolesForm] = Form.useForm();
  const [isAddUserModalVisible, setIsAddUserModalVisible] = useState(false);
  const [isUpdateRolesModalVisible, setIsUpdateRolesModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<OrganizationUser | null>(null);
  const [searchText, setSearchText] = useState('');
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Fetch organization details
  const { data: orgData, loading: orgLoading, refresh: refreshOrg } = useRequest(
    () => systemApi.getOrganization({ id: id! }),
    {
      ready: !!id,
      onError: (error) => {
        message.error(t('settings.organizations.fetchFailed', { defaultValue: 'Failed to fetch organization' }));
        console.error('Failed to fetch organization:', error);
      },
    }
  );

  // Fetch organization users
  const { data: usersData, loading: usersLoading, refresh: refreshUsers } = useRequest(
    () => systemApi.listOrganizationUsers({ id: id!, current, page_size: pageSize, search: searchText }) as Promise<any>,
    {
      ready: !!id,
      refreshDeps: [id, current, pageSize, searchText],
      onError: (error) => {
        message.error(t('settings.organizations.users.fetchFailed', { defaultValue: 'Failed to fetch organization users' }));
        console.error('Failed to fetch organization users:', error);
      },
    }
  );

  // Fetch all users for selection
  const { data: allUsersData, loading: allUsersLoading } = useRequest(
    () => authorizationApi.listUsers({ current: 1, page_size: 1000 }),
    {
      ready: isAddUserModalVisible,
    }
  );

  // Fetch organization roles
  const { data: orgRolesData, loading: orgRolesLoading } = useRequest(
    () => authorizationApi.listRoles({ organization_id: id, current: 1, page_size: 1000 }),
    {
      ready: !!id,
    }
  );

  // Add user to organization
  const { loading: addingUser, run: addUser } = useRequest(
    (data: AddUserFormData) => systemApi.addUserToOrganization({ id: id! }, data) as Promise<any>,
    {
      manual: true,
      onSuccess: () => {
        message.success(t('settings.organizations.users.addSuccess', { defaultValue: 'User added to organization successfully' }));
        setIsAddUserModalVisible(false);
        addUserForm.resetFields();
        refreshUsers();
      },
      onError: (error: any) => {
        message.error(error?.err || t('settings.organizations.users.addFailed', { defaultValue: 'Failed to add user to organization' }));
      },
    }
  );

  // Update user roles in organization
  const { loading: updatingRoles, run: updateRoles } = useRequest(
    (data: UpdateRolesFormData) => systemApi.updateUserOrganizationRoles({ id: id!, user_id: editingUser?.id! }, data) as Promise<any>,
    {
      manual: true,
      onSuccess: () => {
        message.success(t('settings.organizations.users.updateRolesSuccess', { defaultValue: 'User roles updated successfully' }));
        setIsUpdateRolesModalVisible(false);
        updateRolesForm.resetFields();
        setEditingUser(null);
        refreshUsers();
      },
      onError: (error: any) => {
        message.error(error?.err || t('settings.organizations.users.updateRolesFailed', { defaultValue: 'Failed to update user roles' }));
      },
    }
  );

  // Remove user from organization
  const { run: removeUser } = useRequest(
    (userId: string) => systemApi.removeUserFromOrganization({ id: id!, user_id: userId }) as Promise<any>,
    {
      manual: true,
      onSuccess: () => {
        message.success(t('settings.organizations.users.removeSuccess', { defaultValue: 'User removed from organization successfully' }));
        refreshUsers();
      },
      onError: (error: any) => {
        message.error(error?.err || t('settings.organizations.users.removeFailed', { defaultValue: 'Failed to remove user from organization' }));
      },
    }
  );

  const handleAddUser = () => {
    setIsAddUserModalVisible(true);
    addUserForm.resetFields();
  };

  const handleEditRoles = (user: OrganizationUser) => {
    setEditingUser(user);
    updateRolesForm.setFieldsValue({
      role_ids: user.organization_roles?.map(role => role.id) || [],
    });
    setIsUpdateRolesModalVisible(true);
  };

  const handleRemoveUser = (user: OrganizationUser) => {
    Modal.confirm({
      title: t('settings.organizations.users.removeConfirm', { defaultValue: 'Remove User' }),
      content: t('settings.organizations.users.removeConfirmContent', {
        defaultValue: `Are you sure you want to remove user "${user.full_name || user.username}" from this organization? This will also remove all their roles in this organization.`
      }),
      onOk: () => removeUser(user.id),
    });
  };

  const handleAddUserSubmit = () => {
    addUserForm.validateFields().then((values) => {
      addUser(values);
    });
  };

  const handleUpdateRolesSubmit = () => {
    updateRolesForm.validateFields().then((values) => {
      updateRoles(values);
    });
  };

  // Filter out users already in the organization
  const availableUsers = allUsersData?.data?.filter((user: API.User) => {
    return !usersData?.data?.some((orgUser: OrganizationUser) => orgUser.id === user.id);
  }) || [];

  const columns: ColumnsType<OrganizationUser> = [
    {
      title: t('settings.organizations.users.username', { defaultValue: 'Username' }),
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: t('settings.organizations.users.email', { defaultValue: 'Email' }),
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: t('settings.organizations.users.fullName', { defaultValue: 'Full Name' }),
      dataIndex: 'full_name',
      key: 'full_name',
    },
    {
      title: t('settings.organizations.users.status', { defaultValue: 'Status' }),
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'active' ? 'green' : 'default'}>
          {status === 'active' ? t('settings.organizations.active', { defaultValue: 'Active' }) : status}
        </Tag>
      ),
    },
    {
      title: t('settings.organizations.users.roles', { defaultValue: 'Roles' }),
      key: 'roles',
      render: (_, record) => (
        <Space wrap>
          {record.organization_roles?.map((role) => (
            <Tag key={role.id}>{role.name}</Tag>
          )) || <Tag>No roles</Tag>}
        </Space>
      ),
    },
    {
      title: tCommon('actions', { defaultValue: 'Actions' }),
      key: 'actions',
      render: (_, record) => (
        <Actions
          actions={[
            {
              key: 'edit',
              label: t('settings.organizations.users.editRoles', { defaultValue: 'Edit Roles' }),
              icon: <EditOutlined />,
              onClick: async () => handleEditRoles(record),
            },
            {
              key: 'delete',
              label: t('settings.organizations.users.remove', { defaultValue: 'Remove' }),
              icon: <DeleteOutlined />,
              danger: true,
              onClick: async () => handleRemoveUser(record),
            },
          ]}
        />
      ),
    },
  ];

  return (
    <div>
      <Card
        title={
          <Space>
            <Button
              icon={<ArrowLeftOutlined />}
              onClick={() => navigate('/system/settings#organizations')}
            >
              {tCommon('back', { defaultValue: 'Back' })}
            </Button>
            <span>
              {t('settings.organizations.detail', { defaultValue: 'Organization Detail' })}: {orgData?.name}
            </span>
          </Space>
        }
        extra={
          <Button icon={<ReloadOutlined />} onClick={() => { refreshOrg(); refreshUsers(); }}>
            {tCommon('refresh', { defaultValue: 'Refresh' })}
          </Button>
        }
        loading={orgLoading}
      >
        <Descriptions column={2} bordered>
          <Descriptions.Item label={t('settings.organizations.name', { defaultValue: 'Name' })}>
            {orgData?.name}
          </Descriptions.Item>
          <Descriptions.Item label={t('settings.organizations.status', { defaultValue: 'Status' })}>
            <Tag color={orgData?.status === 'active' ? 'green' : 'default'}>
              {orgData?.status === 'active' ? t('settings.organizations.active', { defaultValue: 'Active' }) : t('settings.organizations.disabled', { defaultValue: 'Disabled' })}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label={t('settings.organizations.description', { defaultValue: 'Description' })} span={2}>
            {orgData?.description || '-'}
          </Descriptions.Item>
        </Descriptions>
      </Card>

      <Card
        title={t('settings.organizations.users.title', { defaultValue: 'Organization Users' })}
        extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAddUser}>
            {t('settings.organizations.users.add', { defaultValue: 'Add User' })}
          </Button>
        }
        style={{ marginTop: 16 }}
      >
        <Space direction="vertical" style={{ width: '100%' }} size="middle">
          <Input.Search
            placeholder={t('settings.organizations.users.searchPlaceholder', { defaultValue: 'Search users...' })}
            allowClear
            onSearch={(value) => {
              setSearchText(value);
              setCurrent(1);
            }}
            style={{ width: 300 }}
          />
          <Table<OrganizationUser>
            columns={columns}
            dataSource={usersData?.data || []}
            loading={usersLoading}
            rowKey="id"
            pagination={{
              current,
              pageSize,
              total: usersData?.total || 0,
              showSizeChanger: true,
              showTotal: (total) => tCommon('pagination.total', { defaultValue: `Total ${total} items` }),
              onChange: (page, size) => {
                setCurrent(page);
                setPageSize(size);
              },
            }}
          />
        </Space>
      </Card>

      {/* Add User Modal */}
      <Modal
        title={t('settings.organizations.users.add', { defaultValue: 'Add User' })}
        open={isAddUserModalVisible}
        onOk={handleAddUserSubmit}
        onCancel={() => {
          setIsAddUserModalVisible(false);
          addUserForm.resetFields();
        }}
        confirmLoading={addingUser}
        width={600}
      >
        <Form form={addUserForm} layout="vertical">
          <Form.Item
            name="user_id"
            label={t('settings.organizations.users.user', { defaultValue: 'User' })}
            rules={[{ required: true, message: t('settings.organizations.users.userRequired', { defaultValue: 'Please select a user' }) }]}
          >
            <Select
              showSearch
              placeholder={t('settings.organizations.users.selectUser', { defaultValue: 'Select a user' })}
              loading={allUsersLoading}
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
              options={availableUsers.map((user: API.User) => ({
                label: `${user.full_name || user.username} (${user.email})`,
                value: user.id,
              }))}
            />
          </Form.Item>
          <Form.Item
            name="role_ids"
            label={t('settings.organizations.users.roles', { defaultValue: 'Roles' })}
          >
            <Select
              mode="multiple"
              placeholder={t('settings.organizations.users.selectRoles', { defaultValue: 'Select roles (optional)' })}
              loading={orgRolesLoading}
              options={orgRolesData?.data?.map((role: API.Role) => ({
                label: role.name,
                value: role.id,
              })) || []}
            />
          </Form.Item>
        </Form>
      </Modal>

      {/* Update Roles Modal */}
      <Modal
        title={t('settings.organizations.users.editRoles', { defaultValue: 'Edit Roles' })}
        open={isUpdateRolesModalVisible}
        onOk={handleUpdateRolesSubmit}
        onCancel={() => {
          setIsUpdateRolesModalVisible(false);
          updateRolesForm.resetFields();
          setEditingUser(null);
        }}
        confirmLoading={updatingRoles}
        width={600}
      >
        <Form form={updateRolesForm} layout="vertical">
          <Form.Item
            label={t('settings.organizations.users.user', { defaultValue: 'User' })}
          >
            <Input
              value={editingUser?.full_name || editingUser?.username}
              disabled
            />
          </Form.Item>
          <Form.Item
            name="role_ids"
            label={t('settings.organizations.users.roles', { defaultValue: 'Roles' })}
          >
            <Select
              mode="multiple"
              placeholder={t('settings.organizations.users.selectRoles', { defaultValue: 'Select roles' })}
              loading={orgRolesLoading}
              options={orgRolesData?.data?.map((role: API.Role) => ({
                label: role.name,
                value: role.id,
              })) || []}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default OrganizationDetail;

