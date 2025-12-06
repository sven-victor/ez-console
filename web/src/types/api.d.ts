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

declare global {
  export namespace API {
    export interface Entity {
      id: string;
      created_at: string;
      updated_at: string;
    }

    export interface BaseResponse<T> {
      code: string;
      data: T;
      err?: string;
    }

    export interface PaginationResponse<T extends Entity> extends BaseResponse<T[]> {
      total: number;
      current: number;
      page_size: number;
    }

    export interface PaginationRequest {
      current: number;
      page_size: number;
    }
  }
}

export { };