import * as Icons from "@ant-design/icons";
import { Suspense } from "react";

const iconMap: Record<string, React.ComponentType> = Icons as any;

export const getIconByName = (name: string) => {
  return iconMap[name];
};

export const DynamicIcon = ({ iconName }: { iconName: string }) => {
  if (!iconName) {
    return null;
  }
  const Icon = getIconByName(iconName);
  if (!Icon) {
    return null;
  }
  return (
    <Suspense fallback={null}>
      <Icon />
    </Suspense>
  );
};

export default DynamicIcon;