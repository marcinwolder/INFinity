import { FC, ReactNode, Suspense } from "react";
import { useSearchParams } from "react-router-dom";

interface TabSwitchProps {
  tabs: ReactNode[];
  headers: string[];
}

const TabSwitch: FC<TabSwitchProps> = ({ tabs, headers }) => {
  const [urlParams, setUrlParams] = useSearchParams();

  return (
    <>
      <div className="tabs tabs-boxed mb-2 justify-center bg-base-100">
        {headers.map((header, index) => {
          return (
            <a
              key={index}
              onClick={() => {
                setUrlParams((params) => {
                  params.set("tab", header);
                  return params;
                });
              }}
              className={`tab ${
                urlParams.get("tab") === header && "tab-active"
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
          {tabs[headers.findIndex((header) => header === urlParams.get("tab"))]}
        </Suspense>
      </div>
    </>
  );
};

export default TabSwitch;
