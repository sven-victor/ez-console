import {generateService} from '@umijs/openapi';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

generateService({
  schemaPath: path.join(__dirname, '../swagger.json'),
  serversPath: path.join(__dirname, '../src/service/'),
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
    }
  },

  declareType: 'interface',
}).then(()=>{
  // Post-process typings.d.ts to convert to exported types
  const typingsPath = path.join(__dirname, '../src/service/api/typings.d.ts');
  const typingTsPath = path.join(__dirname, '../src/service/api/typing.ts');
  
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
});

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