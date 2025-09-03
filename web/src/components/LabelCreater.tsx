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

