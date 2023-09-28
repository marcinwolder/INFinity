import React, { useEffect, useRef } from "react";
import { useTestContext } from "./TestProvider";
import { useForceUpdate } from "@mantine/hooks";
import { useSearchParams } from "react-router-dom";

const TestPython: React.FC = () => {
  const { taskNum } = useTestContext();
  const ref = useRef<HTMLDivElement>(null);
  const [urlParams, setUrlParams] = useSearchParams();
  useEffect(() => {
    const id = setInterval(() => {
      if (ref.current && ref.current.children[0]) {
        setUrlParams((params) => {
          const buf = params.get("tab");
          setTimeout(() => params.set("tab", buf as string), 100);
          params.set("tab", "0");
          return params;
        });
        clearInterval(id);
      }
    });
  }, []);
  return (
    <div key={window.localStorage.python} className="mb-10">
      <py-repl ref={ref} id={`${taskNum.toString().replace(".", "")}`}>
        print("Test")
      </py-repl>
    </div>
  );
};

export default TestPython;
