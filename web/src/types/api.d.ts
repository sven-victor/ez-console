namespace API {
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