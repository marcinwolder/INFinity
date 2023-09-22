import { FC, ReactNode, Suspense, useEffect, useState } from "react";

interface TabSwitchProps {
  tabs: ReactNode[];
  headers: string[];
}

const TabSwitch: FC<TabSwitchProps> = ({ tabs, headers }) => {
  const [tab, setTab] = useState(0);

  useEffect(() => {
    setTab(0);
  }, [tabs]);

  return (
    <>
      <div className="tabs-boxed tabs mb-2 justify-center bg-base-100">
        {headers.map((header, index) => {
          return (
            <a
              key={index}
              onClick={() => {
                setTab(index + 1);
              }}
              className={`tab ${tab === index + 1 && "tab-active"}`}
            >
              {header}
            </a>
          );
        })}
      </div>
      <div className="mx-auto max-w-screen-md">
        <Suspense
          fallback={
            <div className="mt-8 flex justify-center ">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          }
        >
          {tabs[tab - 1]}
        </Suspense>
      </div>
    </>
  );
};

export default TabSwitch;
