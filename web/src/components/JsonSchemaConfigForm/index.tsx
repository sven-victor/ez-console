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

import { lazy, Suspense } from 'react';
import Loading from '@/components/Loading';
import type { JsonSchemaConfigFormItemProps, JsonSchemaConfigFormProps } from './JsonSchemaConfigForm';

const JsonSchemaConfigFormLazy = lazy(() => import('./JsonSchemaConfigForm').then((module) => ({
  default: module.JsonSchemaConfigForm,
})));

const JsonSchemaConfigFormItemLazy = lazy(() => import('./JsonSchemaConfigForm').then((module) => ({
  default: module.JsonSchemaConfigFormItem,
})));

export function JsonSchemaConfigForm(props: JsonSchemaConfigFormProps) {
  return (
    <Suspense fallback={<Loading style={{ minHeight: '200px', height: 'calc(100vh - 800px)' }} />}>
      <JsonSchemaConfigFormLazy {...props} />
    </Suspense>
  );
}

export function JsonSchemaConfigFormItem(props: JsonSchemaConfigFormItemProps) {
  return (
    <Suspense fallback={<Loading style={{ minHeight: '200px', height: 'calc(100vh - 800px)' }} />}>
      <JsonSchemaConfigFormItemLazy {...props} />
    </Suspense>
  );
}
