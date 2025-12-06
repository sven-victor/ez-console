import { Button, Card, Input } from "antd"
import { useTranslation, apiPost } from 'ez-console'
import { useRequest } from 'ahooks';
import { useState } from "react";

interface TestResponse {
  body: string;
  headers: Record<string, string[]>;
}

export const TestPage: React.FC = () => {
  const { i18n } = useTranslation();
  const [body, setBody] = useState('');
  const { data, loading, runAsync } = useRequest(() => {
    return apiPost<TestResponse>('/test', body)
  }, {
    manual: true,
  });

  return <Card loading={loading} title={i18n.t('common.testPage', { defaultValue: 'Test Page' })}>
    <div>Body: {data?.body}</div>
    <div>Headers: {JSON.stringify(data?.headers)}</div>
    <Input onChange={(e) => setBody(e.target.value)} />
    <Button onClick={() => runAsync()}>Test</Button>
  </Card>
}

export default TestPage;