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

import 'axios';

declare module 'axios' {
  export interface AxiosRequestConfig {
    /** Skip attaching Authorization / org headers for this request. */
    withoutAuth?: boolean;
    /**
     * Skip response unwrapping.
     * When true, the response interceptor returns the full AxiosResponse
     * (including `{ code, data, err }` envelopes) instead of unwrapping `data`.
     */
    rawResponse?: boolean;
    /**
     * Skip the default error interceptor.
     * When true, rejects with the original AxiosError (no 401 redirect, no ApiError wrapping).
     */
    skipErrorHandler?: boolean;
  }
}
