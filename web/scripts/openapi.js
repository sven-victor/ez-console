import {generateService} from '@umijs/openapi';
import path from 'path';
import { fileURLToPath } from 'url';


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

})