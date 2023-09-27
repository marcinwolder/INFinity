import { FC, ReactNode, Suspense, useState } from "react";
import { useSearchParams } from "react-router-dom";

interface TabSwitchProps {
  tabs: ReactNode[];
  headers: string[];
}

const TabSwitch: FC<TabSwitchProps> = ({ tabs, headers }) => {
  const [urlParams, setUrlParams] = useSearchParams();

  return (
    <>
      <div className="tabs-boxed tabs mb-2 justify-center bg-base-100">
        {headers.map((header, index) => {
          return (
            <a
              key={index}
              onClick={() => {
                setUrlParams((params) => {
                  params.set("tab", `${index + 1}`);
                  return params;
                });
              }}
              className={`tab ${
                urlParams.get("tab") === `${index + 1}` && "tab-active"
              }`}
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
          {tabs[Number(urlParams.get("tab")) - 1]}
        </Suspense>
      </div>
    </>
  );
};

export default TabSwitch;
