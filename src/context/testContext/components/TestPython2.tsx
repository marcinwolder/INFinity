import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { useTestContext } from "./TestProvider";
import { useMaturaPath } from "../../../redux/slices/pathSlice";
import _ from "lodash";

const TestPython: React.FC<{ parameters?: string[]; returns: string }> = ({
  parameters,
  returns,
}) => {
  const ref = useRef<HTMLDivElement & { getPySrc: () => string }>(null);
  const { values, setValues } = useTestContext();
  const { date } = useMaturaPath();

  const [num, setNum] = useState(0);

  const FUNC_NAME = `algo${(date || "").replace("-", "")}${num}`;
  const DEFAULT_REPL_VALUE = `def ${FUNC_NAME}(${
    parameters ? parameters.join(", ") : ""
  }):\n    return ${returns}`;
  const replValue = values[num] || DEFAULT_REPL_VALUE;
  const hideReplElements = () => {
    const id = setInterval(() => {
      if (ref.current && ref.current.querySelector(".py-repl-run-button")) {
        (
          ref.current.querySelector(".py-repl-run-button") as HTMLDivElement
        ).classList.add("hidden", "hover:hidden");
        clearInterval(id);
      }
    });
    const id2 = setInterval(() => {
      if (ref.current && ref.current.querySelector(".py-repl-output")) {
        (
          ref.current.querySelector(".py-repl-output") as HTMLDivElement
        ).classList.add("hidden");
        clearInterval(id2);
      }
    });
    return [id, id2];
  };
  useEffect(() => {
    const [id, id2] = hideReplElements();
    if (ref.current) {
      setNum(Number(ref.current.getAttribute("data-input-id")));
    }
    return () => {
      clearInterval(id);
      clearInterval(id2);
    };
  }, []);
  return (
    <>
      {window.sessionStorage.python === "loaded" || (
        <Helmet>
          <link
            rel="stylesheet"
            href="https://pyscript.net/latest/pyscript.css"
          />
          <script defer src="https://pyscript.net/latest/pyscript.js"></script>
        </Helmet>
      )}
      <div
        key={replValue ? replValue.toString() : "default"}
        className="mb-10 mt-2"
      >
        <div className="outline outline-1 outline-neutral-400">
          <py-repl
            onBlurCapture={() => {
              const repl = ref.current?.getPySrc() as string;
              if (repl !== DEFAULT_REPL_VALUE) {
                setValues((v) => ({ ...v, [num]: repl }));
              } else {
                setValues((v) => _.omit(v, num));
              }
              hideReplElements();
            }}
            data-input-id
            ref={ref}
          >
            {replValue}
          </py-repl>
        </div>
        <p className="mx-auto mt-4 w-3/4 text-xs font-light opacity-70">
          * twój algorytm będzie uznany za poprawny jedynie kiedy będzie
          spełniał warunki zadania <u>ORAZ</u> zostanie zapisany w przygotowanej
          dla niego funkcji nazwanej: {FUNC_NAME}
        </p>
      </div>
    </>
  );
};

export default TestPython;
