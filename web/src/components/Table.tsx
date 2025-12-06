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

import React, {
    useState,
    useImperativeHandle,
    forwardRef,
    useEffect,
} from 'react';
import { Table as AntTable, TablePaginationConfig, TableProps as AntTableProps } from 'antd';
import { useRequest } from 'ahooks';

export interface TableProps<T extends API.Entity> extends AntTableProps<T> {
    request: (params: API.PaginationRequest) => Promise<API.PaginationResponse<T>>;
    tableRef?: React.LegacyRef<{

        nativeElement: HTMLDivElement;
        scrollTo: (config: {
            index?: number;
            key?: React.Key;
            top?: number;
        }) => void;
    }>;
    ref?: React.LegacyRef<TableRef<T>>;
}

export interface TableRef<T extends API.Entity> extends AntTableProps<T> {
    reload: () => void;
}

// export type RefTable = <T extends Entity>(props: React.PropsWithChildren<TableProps<T>> & React.RefAttributes<TableRef<T>>) => React.ReactElement;

export type RefTable = <T extends API.Entity>(props: React.PropsWithChildren<TableProps<T>> & React.RefAttributes<TableRef<T>>) => React.ReactElement;

const TableDef = <T extends API.Entity>(
    { request, tableRef, ...props }: TableProps<T>,
    ref: React.Ref<TableRef<T>>
): React.ReactElement => {
    const [pagination, setPagination] = useState<Required<Pick<TablePaginationConfig, 'current' | 'pageSize'>>>({
        current: 1,
        pageSize: 10,
    });
    const [total, setTotal] = useState(0);
    const { data, loading, refresh } = useRequest(async () => {
        const result = await request({
            current: pagination.current,
            page_size: pagination.pageSize,
        });
        setTotal(result.total);
        return result.data;
    }, {
        refreshDeps: [pagination]
    });
    useImperativeHandle(ref, () => ({
        reload: () => {
            refresh();
        }
    }));
    return (
        <AntTable
            rowKey="id"
            loading={loading}
            dataSource={data ?? []}
            pagination={{
                ...pagination,
                total: total,
                onChange: (current, pageSize) => {
                    setPagination({ current, pageSize });
                },
            }}
            {...props}
            ref={tableRef}
        />
    );
}

export interface TableActionRefProps<T extends API.Entity> extends TableProps<T> {
    actionRef?: React.LegacyRef<TableRef<T>>;
}

export interface TableRefProps<T extends API.Entity> extends TableProps<T> {
    ref?: React.LegacyRef<TableRef<T>>;
}
export const Table = <T extends API.Entity>({ actionRef, ...props }: TableActionRefProps<T>) => {
    const [TableRender, setTableRender] = useState<React.ComponentType<TableRefProps<T>> | undefined>();
    useEffect(() => {
        setTableRender(forwardRef<TableRef<T>, TableRefProps<T>>(TableDef<T>));
    }, []);
    if (!TableRender) {
        return null;
    }
    return <TableRender {...props} ref={actionRef} />;
}


export default Table;
