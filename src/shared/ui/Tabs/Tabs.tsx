import React from 'react';

import {classNames} from "@/shared/lib/classNames";

type TTab = {
  label: string;
  value: string;
}

interface TabsProps {
  className?: string;
  activeTab?: string;
  tabs: TTab[];
  onToggle: (idx: string) => void;
}

const Tabs: React.FC<TabsProps> = ({className, activeTab, tabs, onToggle}) => {
  const [active, setActive] = React.useState(activeTab ? activeTab : tabs[0].value);

  const onClick = (value: string) => {
    setActive(value);
    onToggle(value);
  }

  return (
    <>
      <div className={classNames("flex items-center justify-center gap-4", className)}>
        {tabs.map((tab, idx: number) => (
          <div
            key={idx}
            className={
              classNames(
                "shrink-0 cursor-pointer transition-all hover:text-purple-1000/70 hover:border-purple-1000/70 text-gray-600 text-sm font-semibold border-b-2 border-white py-4 px-2",
                {"!text-purple-1000 !border-purple-1000": tab.value === active}
              )
            }
            onClick={() => onClick(tab.value)}
          >
            {tab.label}
          </div>
        ))}
      </div>
    </>
  );
};

export default Tabs;