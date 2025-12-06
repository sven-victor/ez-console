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

import ImgCrop from 'antd-img-crop';
import { Upload, UploadFile, UploadProps, Avatar as AntdAvatar, AvatarProps, Divider, List, Popover, Skeleton, Modal } from 'antd';
import api from '@/service/api';
import { RcFile } from 'antd/es/upload';
import React, { useEffect, useState } from 'react';
import { baseURL } from '@/service/client';
import { UploadOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import InfiniteScroll from 'react-infinite-scroll-component';
import { createStyles } from 'antd-style';
import { isString } from 'lodash';

const useStyles = createStyles(({ css }) => {
  return {
    avatarItem: css`
    :hover {
      background: rgba(0, 0, 0, 0.12);
    }
    padding: 5px;
  `,
  }
});


const getFileSrc = <T = React.ReactNode>(fileSrc?: T) => {
  if (isString(fileSrc) && fileSrc.match(/^[-_a-zA-Z0-9]+$/)) {
    if (baseURL.endsWith('/')) {
      return baseURL + `files/${fileSrc}`;
    }
    return baseURL + `/files/${fileSrc}`;
  }
  return fileSrc;
};


export const Avatar = ({ src, ...props }: AvatarProps) => {
  return <AntdAvatar src={getFileSrc(src)} {...props} />;
};

export type { AvatarProps }

export interface AvatarUploadProps extends Omit<UploadProps, 'onChange'> {
  value?: string;
  onChange?: (value?: string) => void;
  shape?: 'circle' | 'square';
}

const AvatarSelect = ({ onChange, shape = 'square' }: AvatarUploadProps) => {
  const [iconList, setIconList] = useState<{ id: string }[]>([]);
  const { styles } = useStyles();
  const [popupVisible, setPopupVisible] = useState(false);
  const [iconListHasMore, setIconListHasMore] = useState<boolean>(true);
  const [iconListPageNumber, setIconListPageNumber] = useState<number>(0);

  const { run: fetchFileList, loading: loadingFileList } = useRequest(() => {
    return api.base.listFiles({ current: iconListPageNumber + 1, page_size: 40, file_type: "avatar", access: "public", search: "" });
  }, {
    manual: true,
    onSuccess: ({ data }) => {
      setIconList([...iconList, ...data]);
      setIconListHasMore(data.length === 40);
      setIconListPageNumber(iconListPageNumber + 1);
    }
  });

  const resetIconList = () => {
    setIconListHasMore(true);
    setIconListPageNumber(0);
    setIconList([]);
  }

  return <Popover
    style={{ zIndex: 1000 }}
    onOpenChange={(v) => {
      setPopupVisible(v);
      if (v) {
        fetchFileList();
      } else {
        resetIconList()
      }
    }}
    open={popupVisible}
    content={
      <div style={{ width: 360, height: 200 }}>
        <div
          id="iconsScrollableDiv"
          style={{
            height: '100%',
            overflow: 'auto',
          }}
        >
          <InfiniteScroll
            dataLength={iconList.length}
            next={() => {
              fetchFileList();
            }}
            hasMore={iconListHasMore}
            loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
            endMessage={<Divider plain>End</Divider>}
            scrollableTarget="iconsScrollableDiv"
          >
            <List<{ id: string }>
              grid={{ gutter: 16, column: 8 }}
              dataSource={iconList}
              style={{ margin: '0 8px' }}
              loading={loadingFileList}
              renderItem={({ id }) => {
                return (
                  <div
                    className={styles.avatarItem}
                    onClick={(e) => {
                      e.stopPropagation();
                      onChange?.(id);
                      setPopupVisible(false);
                      resetIconList();
                    }}
                  >
                    <Avatar shape={shape} src={id} />
                  </div>
                );
              }}
            />
          </InfiniteScroll>
        </div>
      </div>
    }
    placement="bottom"
    trigger="hover"
  >
    <UploadOutlined
      shape={shape}
      style={{ width: 112, height: 112, placeContent: 'center' }}
    />
  </Popover>
};

export const AvatarUpload = ({ value, onChange, shape, ...props }: AvatarUploadProps) => {
  const [avatar, setAvatar] = useState<UploadFile | undefined>(undefined);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | undefined>(undefined);

  const onPreview = async (file: UploadFile) => {
    setPreviewOpen(true);
    setPreviewImage(file.url ?? file.preview);
  };

  useEffect(() => {
    setAvatar(value ? {
      uid: value,
      name: value,
      url: getFileSrc(value),
    } : undefined)
  }, [value]);
  return <>
    <ImgCrop
      beforeCrop={async (file: RcFile): Promise<boolean> => {
        if (file.type === 'image/svg+xml') {
          const files = await api.base.uploadFile({ type: "avatar" }, file);
          if (files.length > 0) {
            onChange?.(files[0].id)
          }
          return false;
        }
        return true;
      }}
    >
      <Upload
        customRequest={async (options) => {
          const files = await api.base.uploadFile({ type: "avatar", access: 'public' }, options.file as File);
          if (files.length > 0) {
            options.onSuccess?.(files[0].id);
            onChange?.(files[0].id);
          } else {
            options.onError?.(new Error('Upload file failed'));
          }
        }}

        listType="picture-card"
        onPreview={onPreview}
        maxCount={1}
        onChange={({ file }) => {
          switch (file.status) {
            case 'removed':
              onChange?.(undefined)
              break;
            case 'done':
              break;
            default:
              setAvatar(file)
              break;
          }
        }}

        fileList={avatar ? [avatar] : []}
        {...props}
      >
        {avatar ? undefined : <AvatarSelect shape={shape} onChange={onChange} />}
      </Upload>
    </ImgCrop>

    <Modal open={previewOpen} footer={null} onCancel={() => setPreviewOpen(false)}>
      <img style={{ width: '100%' }} src={previewImage} />
    </Modal>
  </>;
};

export default Avatar;
