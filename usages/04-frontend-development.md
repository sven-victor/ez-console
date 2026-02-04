# Frontend Development Guide

This guide covers building frontend UIs with EZ-Console using React, TypeScript, and Ant Design.

## Architecture Overview

The frontend is built as a Single Page Application (SPA) with the following structure:

```
App Component (EZApp)
├── Authentication Context
├── Site Configuration Context
├── Router
│   ├── Public Routes (Login, OAuth Callback)
│   └── Private Routes (Protected by Auth)
│       ├── Layout (Sidebar, Header, Content)
│       └── Pages
└── API Client (Axios + Interceptors)
```

## Project Setup

### Directory Structure

```
web/
├── src/
│   ├── pages/           # Page components
│   ├── components/      # Reusable components
│   ├── contexts/        # React contexts
│   ├── hooks/           # Custom hooks
│   ├── service/         # API services; `service/api/` is generated from OpenAPI (see [API Best Practices](./09-api-best-practices.md#frontend-backend-api-workflow-openapiswag))
│   ├── types/           # TypeScript types
│   ├── utils/           # Utility functions
│   ├── App.tsx          # Main app component
│   └── main.tsx         # Entry point
├── package.json
├── tsconfig.json
├── vite.config.ts
└── index.html
```

## Creating the Main App

### Basic App Setup

```typescript
// src/App.tsx
import { ConfigProvider } from 'antd';
import { EZApp } from 'ez-console';

export default function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1890ff',
        }
      }}
    >
      <EZApp basePath='/' />
    </ConfigProvider>
  );
}
```

### Adding Custom Routes

```typescript
// src/App.tsx
import { ConfigProvider } from 'antd';
import { EZApp, withSuspense, i18n } from 'ez-console';
import { lazy } from 'react';

// Lazy load pages
const ProductList = lazy(() => import('@/pages/products/ProductList'));
const ProductForm = lazy(() => import('@/pages/products/ProductForm'));
const ProductDetail = lazy(() => import('@/pages/products/ProductDetail'));

// Add translations
i18n.addResource('en', 'translation', 'menu.products', 'Products');
i18n.addResource('en', 'translation', 'menu.productList', 'Product List');

export default function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1890ff',
          borderRadius: 6,
        }
      }}
    >
      <EZApp
        basePath='/'
        extraPrivateRoutes={[
          {
            path: '/products',
            name: 'products',
            children: [
              {
                path: '',
                element: withSuspense(ProductList),
                name: 'productList',
              },
              {
                path: 'create',
                element: withSuspense(ProductForm),
                name: 'productCreate',
                hideInMenu: true,
              },
              {
                path: ':id',
                element: withSuspense(ProductDetail),
                name: 'productDetail',
                hideInMenu: true,
              },
              {
                path: ':id/edit',
                element: withSuspense(ProductForm),
                name: 'productEdit',
                hideInMenu: true,
              },
            ],
          },
        ]}
      />
    </ConfigProvider>
  );
}
```

## Creating Pages

### List Page with Table

```typescript
// src/pages/products/ProductList.tsx
import { useState } from 'react';
import { Button, Card, Form, Input, Row, Col, Table, Space, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, ReloadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useRequest } from 'ahooks';
import { useTranslation, apiGet, apiDelete, PermissionGuard } from 'ez-console';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  status: string;
  created_at: string;
}

interface ProductListResponse {
  data: Product[];
  total: number;
  current: number;
  page_size: number;
}

export const ProductList: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    status: '',
  });

  // Fetch products
  const { data, loading, run: fetchProducts } = useRequest(
    () => apiGet<ProductListResponse>('/products', {
      params: {
        current: pagination.current,
        page_size: pagination.pageSize,
        ...filters,
      },
    }),
    {
      refreshDeps: [pagination, filters],
    }
  );

  // Delete product
  const { run: deleteProduct, loading: deleting } = useRequest(
    (id: string) => apiDelete(`/products/${id}`),
    {
      manual: true,
      onSuccess: () => {
        message.success(t('common.deleteSuccess'));
        fetchProducts();
      },
      onError: (error: any) => {
        message.error(error.message || t('common.deleteFailed'));
      },
    }
  );

  const handleSearch = (values: any) => {
    setFilters(values);
    setPagination({ ...pagination, current: 1 });
  };

  const handleReset = () => {
    form.resetFields();
    setFilters({ search: '', category: '', status: '' });
    setPagination({ current: 1, pageSize: 10 });
  };

  const handleTableChange = (pagination: any) => {
    setPagination({
      current: pagination.current,
      pageSize: pagination.pageSize,
    });
  };

  const columns = [
    {
      title: t('product.name'),
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: t('product.category'),
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: t('product.price'),
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => `$${price.toFixed(2)}`,
    },
    {
      title: t('product.stock'),
      dataIndex: 'stock',
      key: 'stock',
    },
    {
      title: t('product.status'),
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <span style={{ color: status === 'active' ? 'green' : 'red' }}>
          {t(`product.status.${status}`)}
        </span>
      ),
    },
    {
      title: t('common.actions'),
      key: 'actions',
      render: (_: any, record: Product) => (
        <Space>
          <PermissionGuard permission="product:update">
            <Button
              type="link"
              icon={<EditOutlined />}
              onClick={() => navigate(`/products/${record.id}/edit`)}
            >
              {t('common.edit')}
            </Button>
          </PermissionGuard>
          <PermissionGuard permission="product:delete">
            <Button
              type="link"
              danger
              icon={<DeleteOutlined />}
              loading={deleting}
              onClick={() => {
                if (window.confirm(t('common.confirmDelete'))) {
                  deleteProduct(record.id);
                }
              }}
            >
              {t('common.delete')}
            </Button>
          </PermissionGuard>
        </Space>
      ),
    },
  ];

  return (
    <div>
      {/* Search Form */}
      <Card style={{ marginBottom: 16 }}>
        <Form form={form} layout="vertical" onFinish={handleSearch}>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item name="search" label={t('common.search')}>
                <Input placeholder={t('product.searchPlaceholder')} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="category" label={t('product.category')}>
                <Input placeholder={t('product.categoryPlaceholder')} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="status" label={t('product.status')}>
                <Input placeholder={t('product.statusPlaceholder')} />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col>
              <Space>
                <Button type="primary" htmlType="submit">
                  {t('common.search')}
                </Button>
                <Button onClick={handleReset}>
                  {t('common.reset')}
                </Button>
              </Space>
            </Col>
          </Row>
        </Form>
      </Card>

      {/* Data Table */}
      <Card>
        {/* Table Toolbar */}
        <div style={{ marginBottom: 16 }}>
          <Row justify="space-between" align="middle">
            <Col>
              <Button
                type="primary"
                onClick={handleReset}
                icon={<ReloadOutlined />}
              >
                {t('common.refresh')}
              </Button>
            </Col>
            <Col>
              <PermissionGuard permission="product:create">
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() => navigate('/products/create')}
                >
                  {t('product.create')}
                </Button>
              </PermissionGuard>
            </Col>
          </Row>
        </div>

        {/* Table */}
        <Table
          columns={columns}
          dataSource={data?.data || []}
          loading={loading}
          rowKey="id"
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: data?.total || 0,
            showSizeChanger: true,
            showTotal: (total) => t('common.totalItems', { total }),
          }}
          onChange={handleTableChange}
        />
      </Card>
    </div>
  );
};

export default ProductList;
```

### Create/Edit Form Page

```typescript
// src/pages/products/ProductForm.tsx
import { useEffect } from 'react';
import { Form, Input, InputNumber, Select, Button, Card, Space, message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useRequest } from 'ahooks';
import { useTranslation, apiGet, apiPost, apiPut } from 'ez-console';

const { TextArea } = Input;
const { Option } = Select;

interface ProductFormData {
  name: string;
  description?: string;
  price: number;
  category: string;
  stock: number;
}

export const ProductForm: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [form] = Form.useForm();
  const isEdit = !!id;

  // Fetch product data for edit mode
  const { data: product, loading: loadingProduct } = useRequest(
    () => (id ? apiGet(`/products/${id}`) : Promise.resolve(null)),
    {
      ready: isEdit,
      onSuccess: (data) => {
        if (data) {
          form.setFieldsValue(data);
        }
      },
    }
  );

  // Submit form
  const { run: submitForm, loading: submitting } = useRequest(
    (values: ProductFormData) => {
      if (isEdit && id) {
        return apiPut(`/products/${id}`, values);
      }
      return apiPost('/products', values);
    },
    {
      manual: true,
      onSuccess: () => {
        message.success(
          isEdit ? t('product.updateSuccess') : t('product.createSuccess')
        );
        navigate('/products');
      },
      onError: (error: any) => {
        message.error(error.message || t('common.operationFailed'));
      },
    }
  );

  const handleSubmit = (values: ProductFormData) => {
    submitForm(values);
  };

  const handleCancel = () => {
    navigate('/products');
  };

  return (
    <Card
      title={isEdit ? t('product.edit') : t('product.create')}
      loading={loadingProduct}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          stock: 0,
          status: 'active',
        }}
      >
        <Form.Item
          name="name"
          label={t('product.name')}
          rules={[
            { required: true, message: t('product.nameRequired') },
            { min: 1, max: 100, message: t('product.nameLength') },
          ]}
        >
          <Input placeholder={t('product.namePlaceholder')} />
        </Form.Item>

        <Form.Item
          name="description"
          label={t('product.description')}
          rules={[
            { max: 500, message: t('product.descriptionLength') },
          ]}
        >
          <TextArea
            rows={4}
            placeholder={t('product.descriptionPlaceholder')}
          />
        </Form.Item>

        <Form.Item
          name="price"
          label={t('product.price')}
          rules={[
            { required: true, message: t('product.priceRequired') },
          ]}
        >
          <InputNumber
            style={{ width: '100%' }}
            min={0}
            precision={2}
            prefix="$"
            placeholder={t('product.pricePlaceholder')}
          />
        </Form.Item>

        <Form.Item
          name="category"
          label={t('product.category')}
          rules={[
            { required: true, message: t('product.categoryRequired') },
          ]}
        >
          <Select placeholder={t('product.categoryPlaceholder')}>
            <Option value="electronics">Electronics</Option>
            <Option value="clothing">Clothing</Option>
            <Option value="food">Food</Option>
            <Option value="books">Books</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="stock"
          label={t('product.stock')}
          rules={[
            { required: true, message: t('product.stockRequired') },
          ]}
        >
          <InputNumber
            style={{ width: '100%' }}
            min={0}
            placeholder={t('product.stockPlaceholder')}
          />
        </Form.Item>

        <Form.Item>
          <Space>
            <Button
              type="primary"
              htmlType="submit"
              loading={submitting}
            >
              {t('common.submit')}
            </Button>
            <Button onClick={handleCancel}>
              {t('common.cancel')}
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ProductForm;
```

### Detail Page

```typescript
// src/pages/products/ProductDetail.tsx
import { Button, Card, Descriptions, Space, Spin, message } from 'antd';
import { EditOutlined, DeleteOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { useRequest } from 'ahooks';
import { useTranslation, apiGet, apiDelete, PermissionGuard } from 'ez-console';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export const ProductDetail: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  // Fetch product
  const { data: product, loading } = useRequest(
    () => apiGet<Product>(`/products/${id}`),
    {
      ready: !!id,
      onError: (error: any) => {
        message.error(error.message || t('product.loadFailed'));
        navigate('/products');
      },
    }
  );

  // Delete product
  const { run: deleteProduct, loading: deleting } = useRequest(
    () => apiDelete(`/products/${id}`),
    {
      manual: true,
      onSuccess: () => {
        message.success(t('common.deleteSuccess'));
        navigate('/products');
      },
      onError: (error: any) => {
        message.error(error.message || t('common.deleteFailed'));
      },
    }
  );

  const handleDelete = () => {
    if (window.confirm(t('common.confirmDelete'))) {
      deleteProduct();
    }
  };

  if (loading) {
    return (
      <Card>
        <Spin />
      </Card>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <Card
      title={product.name}
      extra={
        <Space>
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate('/products')}
          >
            {t('common.back')}
          </Button>
          <PermissionGuard permission="product:update">
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() => navigate(`/products/${id}/edit`)}
            >
              {t('common.edit')}
            </Button>
          </PermissionGuard>
          <PermissionGuard permission="product:delete">
            <Button
              danger
              icon={<DeleteOutlined />}
              loading={deleting}
              onClick={handleDelete}
            >
              {t('common.delete')}
            </Button>
          </PermissionGuard>
        </Space>
      }
    >
      <Descriptions bordered column={2}>
        <Descriptions.Item label={t('product.name')}>
          {product.name}
        </Descriptions.Item>
        <Descriptions.Item label={t('product.category')}>
          {product.category}
        </Descriptions.Item>
        <Descriptions.Item label={t('product.price')}>
          ${product.price.toFixed(2)}
        </Descriptions.Item>
        <Descriptions.Item label={t('product.stock')}>
          {product.stock}
        </Descriptions.Item>
        <Descriptions.Item label={t('product.status')}>
          <span style={{ color: product.status === 'active' ? 'green' : 'red' }}>
            {t(`product.status.${product.status}`)}
          </span>
        </Descriptions.Item>
        <Descriptions.Item label={t('common.createdAt')}>
          {new Date(product.created_at).toLocaleString()}
        </Descriptions.Item>
        <Descriptions.Item label={t('product.description')} span={2}>
          {product.description || '-'}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default ProductDetail;
```

## API Service Layer

Create a service module for API calls:

```typescript
// src/service/api/product.ts
import { apiGet, apiPost, apiPut, apiDelete } from 'ez-console';

export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  category: string;
  stock: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface ProductListParams {
  current: number;
  page_size: number;
  search?: string;
  category?: string;
  status?: string;
}

export interface ProductListResponse {
  data: Product[];
  total: number;
  current: number;
  page_size: number;
}

export interface CreateProductData {
  name: string;
  description?: string;
  price: number;
  category: string;
  stock: number;
}

export interface UpdateProductData {
  name?: string;
  description?: string;
  price?: number;
  category?: string;
  stock?: number;
}

// Get list of products
export const getProducts = (params: ProductListParams): Promise<ProductListResponse> => {
  return apiGet<ProductListResponse>('/products', { params });
};

// Get product by ID
export const getProduct = (id: string): Promise<Product> => {
  return apiGet<Product>(`/products/${id}`);
};

// Create product
export const createProduct = (data: CreateProductData): Promise<Product> => {
  return apiPost<Product>('/products', data);
};

// Update product
export const updateProduct = (id: string, data: UpdateProductData): Promise<Product> => {
  return apiPut<Product>(`/products/${id}`, data);
};

// Delete product
export const deleteProduct = (id: string): Promise<void> => {
  return apiDelete(`/products/${id}`);
};
```

## Permission Guard Component

The `PermissionGuard` component is built-in and can be used to conditionally render content:

```typescript
import { PermissionGuard } from 'ez-console';

<PermissionGuard permission="product:create">
  <Button type="primary" onClick={handleCreate}>
    Create Product
  </Button>
</PermissionGuard>
```

## Using Hooks

### Authentication Hook

```typescript
import { useAuth } from 'ez-console';

const MyComponent: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return <div>Please login</div>;
  }

  return (
    <div>
      <p>Welcome, {user?.full_name}!</p>
      <Button onClick={logout}>Logout</Button>
    </div>
  );
};
```

### Permission Hook

```typescript
import { usePermission } from 'ez-console';

const MyComponent: React.FC = () => {
  const hasCreatePermission = usePermission('product:create');
  const hasDeletePermission = usePermission('product:delete');

  return (
    <div>
      {hasCreatePermission && (
        <Button onClick={handleCreate}>Create</Button>
      )}
      {hasDeletePermission && (
        <Button onClick={handleDelete}>Delete</Button>
      )}
    </div>
  );
};
```

## Internationalization

### Adding Translations

```typescript
// In App.tsx or component
import { i18n } from 'ez-console';

// Add single translation
i18n.addResource('en', 'translation', 'product.name', 'Product Name');
i18n.addResource('zh-CN', 'translation', 'product.name', '产品名称');

// Add multiple translations
i18n.addResources('en', 'translation', {
  'product.name': 'Product Name',
  'product.price': 'Price',
  'product.stock': 'Stock',
});
```

### Using Translations

```typescript
import { useTranslation } from 'ez-console';

const MyComponent: React.FC = () => {
  const { t, i18n } = useTranslation();

  return (
    <div>
      <h1>{t('product.name')}</h1>
      <Button onClick={() => i18n.changeLanguage('zh-CN')}>
        Switch to Chinese
      </Button>
    </div>
  );
};
```

## Best Practices

1. **Use TypeScript**: Define types for all props and data
2. **Lazy Load Pages**: Use React.lazy for code splitting
3. **Error Boundaries**: Wrap components in error boundaries
4. **Loading States**: Show loading indicators during async operations
5. **Form Validation**: Use Ant Design form validation
6. **Permission Checks**: Use PermissionGuard for conditional rendering
7. **API Service Layer**: Centralize API calls in service modules
8. **i18n**: Use translations for all user-facing text
9. **Responsive Design**: Use Ant Design's grid system
10. **Component Reuse**: Create reusable components for common patterns

## Next Steps

- Learn about [Frontend Components](./10-frontend-components.md)
- Explore [Internationalization](./11-i18n.md)
- Review [API Best Practices](./09-api-best-practices.md)



