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

import { PlusOutlined } from "@ant-design/icons";
import { Button, Input, Space } from "antd";
import { useState } from "react";

export interface LabelCreaterProps {
  onChange: (name: string, value: string) => void;
}

const LabelCreater: React.FC<LabelCreaterProps> = ({ onChange }) => {
  const [key, setKey] = useState<string>('');
  const [value, setValue] = useState<string>('');
  return <Space.Compact>
    <Input style={{ width: 'calc(100% - 80px)' }} value={key} onChange={(e) => setKey(e.target.value)} />
    <Input style={{ width: '40px' }} readOnly value={"="} tabIndex={-1} />
    <Input style={{ width: 'calc(100% - 80px)' }} value={value} onChange={(e) => setValue(e.target.value)} />
    <Button type="primary" icon={<PlusOutlined />} onClick={() => {
      onChange(key, value)
    }} />
  </Space.Compact>;
};

export default LabelCreater;

