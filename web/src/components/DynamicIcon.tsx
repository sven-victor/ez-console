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

import * as Icons from "@ant-design/icons";
import { Suspense } from "react";

const iconMap: Record<string, React.ComponentType> = Icons as any;

export const getIconByName = (name: string) => {
  return iconMap[name];
};

export interface DynamicIconProps { iconName: string }

export const DynamicIcon = ({ iconName }: DynamicIconProps) => {
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