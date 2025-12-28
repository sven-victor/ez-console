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

import {generateService} from '@umijs/openapi';
import path from 'path';
import { fileURLToPath } from 'url';
import fs,{readdirSync} from 'fs';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseSerPath = path.join(__dirname, '../src/service/');
const baseApiPath = path.join(baseSerPath, 'api/');

generateService({
  schemaPath: path.join(__dirname, '../swagger.json'),
  serversPath: baseSerPath,
  requestLibPath: "import { request } from '@/service/client'",
  hook: {
    customFileNames: (data, path, method) => {
      if (path.startsWith("/api/system-settings") || path.startsWith("/api/ldap-settings")|| path.startsWith("/api/base-settings")) {
        return ['system'];
      }
      if (path.startsWith("/api/file")|| path.startsWith('/api/statistics')) {
        return ['base'];
      }
      if (path.startsWith('/api/')) {
        return [path.slice('/api/'.length).split('/')[0]];
      }
      return 
    },
    afterOpenApiDataInited: (data) => {
      delete(data.paths['/api/ai/chat/sessions/{sessionId}'].post)
    }
  },

  declareType: 'interface',
}).then(()=>{
  // Post-process typings.d.ts to convert to exported types
  const typingsPath = path.join(baseApiPath, 'typings.d.ts');
  const typingTsPath = path.join(baseApiPath, 'typing.ts');
  
  if (fs.existsSync(typingsPath)) {
    const content = fs.readFileSync(typingsPath, 'utf-8');
    
    // Transform for typing.ts (exported types)
    const exportedContent = transformToExportedTypes(content);
    fs.writeFileSync(typingTsPath, exportedContent, 'utf-8');
    
    // Transform for typings.d.ts (global namespace)
    const globalContent = transformToGlobalNamespace(content);
    fs.writeFileSync(typingsPath, globalContent, 'utf-8');
    
    console.log('✅ Successfully transformed typings.d.ts');
    console.log('✅ Created typing.ts with exported types');
  }
  // Post-process api/ai.ts
  if (fs.existsSync(path.join(baseApiPath, 'ai.ts'))) {
    const content = fs.readFileSync(path.join(baseApiPath, 'ai.ts'), 'utf-8');
    const newContent = injectSSE(content);
    fs.writeFileSync(path.join(baseApiPath, 'ai.ts'), newContent, 'utf-8');
    console.log('✅ Successfully transformed ai.ts');
    console.log('✅ Created ai.ts with exported types');
  }
}).then(()=>{
  try {
    const dir = readdirSync(baseApiPath);
    for (const dirent of dir){
      const filePath = path.join(baseApiPath, dirent);
      const content = fs.readFileSync(filePath, 'utf-8');
      const newContent = content.replace(/^  \/\/ .+$\n/gm, '');
      fs.writeFileSync(filePath, newContent, 'utf-8');
    }
  } catch (err) {
    console.error(err);
  }
});

function injectSSE(content) {
  return content + `
import { type SSERequestConfig } from '@/service/client'
/** Stream chat Stream chat responses using Server-Sent Events POST /api/ai/chat/sessions/\${param0} */
export async function streamChat(
  params: {
    /** Chat session ID */
    sessionId: string;
  },
  body: API.SendMessageRequest,
  options: SSERequestConfig
) {
  const { sessionId: param0, ...queryParams } = params;
  return request(\`/api/ai/chat/sessions/\${param0}\`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {})
  });
}
  `
}

function transformToExportedTypes(content) {
  // Remove the declare namespace wrapper and convert to exports
  let transformed = content
    // Remove declare namespace API { and closing }
    .replace(/declare namespace API \{[\s\S]*?\n/, '')
    .replace(/\n\}[\s]*$/, '')
    // Convert interface declarations to export interface
    .replace(/^(\s*)interface\s+/gm, '$1export interface ')
    // Convert type declarations to export type
    .replace(/^(\s*)type\s+/gm, '$1export type ')
    // Remove extra indentation (2 spaces that were inside namespace)
    .replace(/^  /gm, '');
  
  return transformed.trim() + '\n';
}

function transformToGlobalNamespace(content) {
  // Wrap the existing content in declare global
  return `declare global {\n  ${content.replace(/^/gm, '  ').replace(/^  declare namespace API/, 'namespace API')}\n}\n\nexport {};\n`;
}