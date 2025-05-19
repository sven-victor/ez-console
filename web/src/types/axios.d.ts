import 'axios';

declare module 'axios' {
  export interface AxiosRequestConfig {
    withoutAuth?: boolean;
  }
}