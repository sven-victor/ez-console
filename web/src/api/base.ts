import { apiGet, apiPost } from './client';


// Upload file
export const uploadFile = async (file: File, fileType: string, access: 'private' | 'public' | 'owner' = 'private'): Promise<API.FileItem[]> => {
  const formData = new FormData();
  formData.append(file.name ?? 'file', file);
  formData.append('access', access);
  formData.append('type', fileType);
  return apiPost<API.FileItem[]>(`/files`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

// Get file
export const getFile = async (id: string): Promise<string> => {
  return apiGet<any>(`/files/${id}`);
};

// Get file list
export const getFileList = async (current?: number, pageSize?: number, fileType?: string, access?: string, search?: string): Promise<API.FileItem[]> => {
  return apiGet<API.FileItem[]>(`/files`, {
    params: {
      current,
      page_size: pageSize,
      search,
      type: fileType,
      access,
    },
  });
};

// Get statistics
export const getStatistics = async (): Promise<API.Charts> => {
  return apiGet<API.Charts>(`/statistics`);
};
