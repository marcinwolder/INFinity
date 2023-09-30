import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { useTestContext } from "./TestProvider";
import { Formula, useMaturaPath } from "../../../redux/slices/pathSlice";
import { updateAnswer } from "..";
import { useDispatch } from "react-redux";

const TestPython: React.FC<{ parameters?: string[]; returns: string }> = ({
  parameters,
  returns,
}) => {
  const ref = useRef<HTMLDivElement & { getPySrc: () => string }>(null);
  const { values, points, taskNum } = useTestContext();
  const { date, formula } = useMaturaPath();
  const dispatch = useDispatch();

  const [num, setNum] = useState(0);

  const getRunBtnRef = () =>
    ref.current?.querySelector(".py-repl-run-button") as HTMLButtonElement;
  const FUNC_NAME = `algo${(date || "").replace("-", "")}${num}`;
  const REPL_VALUE = values[num];
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
    if (ref.current) setNum(Number(ref.current.getAttribute("data-input-id")));
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
        key={REPL_VALUE ? REPL_VALUE.toString() : "default"}
        className="mb-10 mt-2"
      >
        <py-repl data-input-id ref={ref}>
          {REPL_VALUE ||
            `def ${FUNC_NAME}(${
              parameters ? parameters.join(", ") : ""
            }):\n    return ${returns}`}
        </py-repl>
        <button
          className="mx-auto my-2 block w-fit italic tracking-wide hover:font-medium hover:tracking-normal hover:text-blue-600 active:text-blue-800"
          onClick={() => {
            if (ref.current) {
              getRunBtnRef().click();
              const repl = ref.current.getPySrc();
              updateAnswer(dispatch, {
                answers: {
                  [taskNum]: { [num]: repl, points: Number(points) },
                },
                formula: formula as Formula,
                date: date || "",
              });
              hideReplElements();
            }
          }}
        >
          Zapisz Algorytm
        </button>
        <p className="mx-auto w-3/4 text-xs font-light opacity-70">
          * twój algorytm będzie uznany za poprawny jedynie kiedy będzie
          spełniał warunki zadania <u>ORAZ</u> zostanie zapisany w przygotowanej
          dla niego funkcji nazwanej: {FUNC_NAME}
        </p>
      </div>
    </>
  );
};

export default TestPython;
