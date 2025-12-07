# Frontend Components Guide

This guide covers using built-in components and creating custom components in EZ-Console.

## Built-in Components

### EZApp

Main application component that provides the entire app structure:

```typescript
import { EZApp } from 'ez-console';

<EZApp
  basePath='/'
  extraPrivateRoutes={[...]}
  extraPublicRoutes={[...]}
/>
```

### PermissionGuard

Conditionally renders content based on permissions:

```typescript
import { PermissionGuard } from 'ez-console';

<PermissionGuard permission="product:create">
  <Button type="primary">Create Product</Button>
</PermissionGuard>
```

### Layout

Pre-built layout with sidebar and header:

```typescript
import { Layout } from 'ez-console';

// Already included in EZApp
// Customize through theme configuration
```

### Loading

Loading spinner component:

```typescript
import { Loading } from 'ez-console';

<Loading />
```

## Creating Reusable Components

### Table Component

```typescript
// src/components/DataTable.tsx
import { Table, Button, Space } from 'antd';
import { TableProps } from 'antd/es/table';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

interface DataTableProps<T> extends TableProps<T> {
  onEdit?: (record: T) => void;
  onDelete?: (record: T) => void;
  canEdit?: boolean;
  canDelete?: boolean;
}

export function DataTable<T extends { id: string }>({
  onEdit,
  onDelete,
  canEdit = false,
  canDelete = false,
  columns,
  ...props
}: DataTableProps<T>) {
  const actionColumn = {
    title: 'Actions',
    key: 'actions',
    render: (_: any, record: T) => (
      <Space>
        {canEdit && onEdit && (
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => onEdit(record)}
          >
            Edit
          </Button>
        )}
        {canDelete && onDelete && (
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => onDelete(record)}
          >
            Delete
          </Button>
        )}
      </Space>
    ),
  };

  const finalColumns = [...(columns || []), actionColumn];

  return <Table columns={finalColumns} {...props} />;
}
```

### Form Component

```typescript
// src/components/FormModal.tsx
import { Modal, Form, FormInstance } from 'antd';
import { ReactNode } from 'react';

interface FormModalProps {
  title: string;
  visible: boolean;
  loading?: boolean;
  form: FormInstance;
  onOk: () => void;
  onCancel: () => void;
  children: ReactNode;
}

export const FormModal: React.FC<FormModalProps> = ({
  title,
  visible,
  loading,
  form,
  onOk,
  onCancel,
  children,
}) => {
  return (
    <Modal
      title={title}
      open={visible}
      onOk={onOk}
      onCancel={onCancel}
      confirmLoading={loading}
    >
      <Form form={form} layout="vertical">
        {children}
      </Form>
    </Modal>
  );
};
```

### Search Form Component

```typescript
// src/components/SearchForm.tsx
import { Form, Input, Button, Row, Col, Space } from 'antd';
import { FormInstance } from 'antd/es/form';
import { useTranslation } from 'ez-console';

interface SearchFormProps {
  form: FormInstance;
  onSearch: (values: any) => void;
  onReset: () => void;
  children?: React.ReactNode;
}

export const SearchForm: React.FC<SearchFormProps> = ({
  form,
  onSearch,
  onReset,
  children,
}) => {
  const { t } = useTranslation();

  return (
    <Form form={form} layout="vertical" onFinish={onSearch}>
      <Row gutter={16}>
        {children}
      </Row>
      <Row>
        <Col>
          <Space>
            <Button type="primary" htmlType="submit">
              {t('common.search')}
            </Button>
            <Button onClick={onReset}>
              {t('common.reset')}
            </Button>
          </Space>
        </Col>
      </Row>
    </Form>
  );
};
```

### Confirm Delete Component

```typescript
// src/components/ConfirmDelete.tsx
import { Modal } from 'antd';
import { useTranslation } from 'ez-console';
import { ExclamationCircleOutlined } from '@ant-design/icons';

export const useConfirmDelete = () => {
  const { t } = useTranslation();

  return (onConfirm: () => void, itemName?: string) => {
    Modal.confirm({
      title: t('common.confirmDelete'),
      icon: <ExclamationCircleOutlined />,
      content: itemName
        ? t('common.confirmDeleteItem', { item: itemName })
        : t('common.confirmDeleteMessage'),
      okText: t('common.confirm'),
      okType: 'danger',
      cancelText: t('common.cancel'),
      onOk: onConfirm,
    });
  };
};
```

## Component Patterns

### List-Detail Pattern

```typescript
// src/pages/products/index.tsx
import { useState } from 'react';
import ProductList from './ProductList';
import ProductDetail from './ProductDetail';

export const ProductsPage: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  if (selectedId) {
    return (
      <ProductDetail
        id={selectedId}
        onBack={() => setSelectedId(null)}
      />
    );
  }

  return (
    <ProductList
      onSelect={(id) => setSelectedId(id)}
    />
  );
};
```

### Master-Detail Pattern

```typescript
// src/pages/orders/OrderDetail.tsx
import { Tabs } from 'antd';
import OrderInfo from './OrderInfo';
import OrderItems from './OrderItems';
import OrderHistory from './OrderHistory';

export const OrderDetail: React.FC<{ id: string }> = ({ id }) => {
  return (
    <Tabs
      items={[
        {
          key: 'info',
          label: 'Order Information',
          children: <OrderInfo id={id} />,
        },
        {
          key: 'items',
          label: 'Items',
          children: <OrderItems id={id} />,
        },
        {
          key: 'history',
          label: 'History',
          children: <OrderHistory id={id} />,
        },
      ]}
    />
  );
};
```

### Form with Steps

```typescript
// src/pages/products/ProductWizard.tsx
import { Steps, Button } from 'antd';
import { useState } from 'react';

export const ProductWizard: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [formData, setFormData] = useState({});

  const steps = [
    {
      title: 'Basic Info',
      content: <BasicInfoForm data={formData} onChange={setFormData} />,
    },
    {
      title: 'Pricing',
      content: <PricingForm data={formData} onChange={setFormData} />,
    },
    {
      title: 'Images',
      content: <ImagesForm data={formData} onChange={setFormData} />,
    },
  ];

  return (
    <div>
      <Steps current={current} items={steps} />
      <div style={{ marginTop: 24 }}>
        {steps[current].content}
      </div>
      <div style={{ marginTop: 24 }}>
        {current > 0 && (
          <Button onClick={() => setCurrent(current - 1)}>
            Previous
          </Button>
        )}
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => setCurrent(current + 1)}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={handleSubmit}>
            Submit
          </Button>
        )}
      </div>
    </div>
  );
};
```

## Styling Components

### Using Ant Design Theme

```typescript
// src/App.tsx
import { ConfigProvider } from 'antd';

<ConfigProvider
  theme={{
    token: {
      colorPrimary: '#1890ff',
      borderRadius: 6,
      fontSize: 14,
    },
    components: {
      Button: {
        colorPrimary: '#00b96b',
      },
    },
  }}
>
  <EZApp />
</ConfigProvider>
```

### Inline Styles

```typescript
<div style={{
  padding: 24,
  background: '#fff',
  minHeight: 360,
}}>
  Content
</div>
```

### CSS Modules

```typescript
// styles.module.css
.container {
  padding: 24px;
  background: #fff;
}

// Component.tsx
import styles from './styles.module.css';

<div className={styles.container}>
  Content
</div>
```

## Best Practices

1. **Component Composition**: Break down complex components into smaller, reusable pieces
2. **Props Typing**: Always define TypeScript interfaces for props
3. **Default Props**: Provide sensible defaults
4. **Error Boundaries**: Wrap components in error boundaries
5. **Loading States**: Show loading indicators during async operations
6. **Empty States**: Handle empty data gracefully
7. **Accessibility**: Use semantic HTML and ARIA attributes
8. **Performance**: Use React.memo for expensive components
9. **Testing**: Write tests for components
10. **Documentation**: Document component props and usage

## Next Steps

- Learn about [Internationalization](./11-i18n.md)
- Explore [Frontend Development](./04-frontend-development.md)
- Review [API Best Practices](./09-api-best-practices.md)


