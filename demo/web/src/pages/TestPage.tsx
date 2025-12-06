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