import { useEffect, useId, useRef, useState } from "react";
import usePyRepl from "../../../components/PythonCompiler/usePyRepl";
import { updateAnswer } from "..";
import { useDispatch } from "react-redux";
import { Formula, useMaturaPath } from "../../../redux/slices/pathSlice";
import _ from "lodash";
import { Helmet } from "react-helmet";
import classNames from "classnames";
import { ImPlay3 } from "react-icons/im";
import { VscRunAll } from "react-icons/vsc";
import { useTestContext } from "./TestProvider";

type ReplElement = HTMLDivElement & { getPySrc: () => string };

type Test =
  | {
      input:
        | string
        | number
        | boolean
        | Array<string | number | boolean | Array<string | number | boolean>>;
      output: string | number | boolean | Array<string | number | boolean>;
    }[]
  | string[];

interface PythonCompilerProps {
  tests: Test; //set of test that will check if algo is working
  parameters?: string[]; //parameters used in prepared func or print func (when with terminal)
  terminal?: boolean; //determines if terminal should be visible or not
  dataPath?: string; //data file path
  testPath?: string; //test data file path
}

export const TestPython: React.FC<
  React.PropsWithChildren<PythonCompilerProps>
> = ({ children, tests, parameters, terminal, dataPath, testPath }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [num, setNum] = useState(0);
  const [PyRepl, setReplSrc] = usePyRepl();
  const { show, taskNum, setValues, values, points } = useTestContext();
  const dispatch = useDispatch();
  const maturaPath = useMaturaPath();

  const terminalId = useId();
  const terminalRef = useRef<HTMLDivElement>(null);
  const replRef = useRef<ReplElement>(null);
  const runBtn = useRef<HTMLButtonElement>(null);

  const [result, setResult] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const funcName = `algo${(maturaPath.date || "").replace("-", "")}${num}`;

  const getStartBtn = () =>
    replRef.current?.children[0].children[0].children[1] as HTMLButtonElement;

  const resultCheck = (terminalContent: string) => {
    if (terminalContent === "") {
      setValues((v) => _.omit(v, num));
    } else setValues((v) => ({ ...v, [num]: terminalContent }));

    const func = pyscript.interpreter.globals.get(funcName) as (
      ...args: unknown[]
    ) => unknown;

    let afterTest = true;

    tests.forEach((test) => {
      if (typeof test === "string") {
        afterTest = false;
        if (terminalContent.trim() === test.trim()) {
          afterTest = true;
        }
      } else {
        const { input, output } = test;
        if (typeof input === "object") {
          if (func(...input) !== output) afterTest = false;
        } else {
          if (func(input) !== output) afterTest = false;
        }
      }
    });
    setResult(afterTest);
  };
  const startClick = () => {
    setDisabled(false);
    if (values[num]) {
      if (typeof values === "string") {
        setReplSrc(values);
      } else {
        setReplSrc(values[num] as string);
      }
    }
    getStartBtn().click();
  };
  const runClick = () => {
    const replContent = replRef.current?.getPySrc() || "";
    if (terminalRef.current) {
      getStartBtn().click();
      terminalRef.current.innerText = "";
      setTimeout(() => {
        if (terminalRef.current) {
          resultCheck(terminalRef.current.innerText);
        }
      }, 1);
    }
    updateAnswer(dispatch, {
      answers: {
        [taskNum]: { 0: replContent, points: Number(points) },
      },
      formula: maturaPath.formula as Formula,
      date: maturaPath.date || "",
    });
    setReplSrc(replContent);
  };

  useEffect(() => {
    const func = async () => {
      await new Promise((resolve) => {
        const unsubscribe = setInterval(() => {
          if (replRef.current?.children[0]) {
            clearInterval(unsubscribe);
            resolve(null);
          }
        });
      });
      getStartBtn().classList.add("hidden");
    };
    func();
  });
  useEffect(() => {
    if (ref.current) setNum(Number(ref.current.getAttribute("data-input-id")));
  }, []);

  return (
    <>
      {!window.sessionStorage.python && (
        <Helmet>
          <link
            rel="stylesheet"
            href="https://pyscript.net/latest/pyscript.css"
          />
          <script defer src="https://pyscript.net/latest/pyscript.js"></script>
        </Helmet>
      )}
      <div data-input-id>
        <p
          className={classNames("mb-2 text-center text-sm font-semibold", {
            hidden: terminal,
          })}
        >
          (rozwiązanie zadania zapisz w podanej funkcji)
        </p>
        <div className="relative">
          <div
            tabIndex={0}
            onClick={startClick}
            className={classNames(
              "absolute z-[5] flex h-full w-full items-center justify-center bg-neutral-700 opacity-70 hover:cursor-pointer",
              { hidden: !disabled },
            )}
          >
            <div className="flex animate-pulse items-center">
              <ImPlay3 className="text-4xl" />
              <center>ROZPOCZNIJ</center>
            </div>
          </div>
          <div className="relative">
            <PyRepl output={terminalId} ref={replRef}>
              {(() => {
                if (children) return children;
                if (terminal) {
                  let output = "";
                  if (dataPath) {
                    output += `# DANE PRAWDZIWE SĄ DOSTĘPNE W: ${dataPath}\n`;
                  }
                  if (testPath) {
                    output += `# DANE PRZYKŁADOWE SĄ DOSTĘPNE W: ${testPath}\n`;
                  }
                  if (parameters) {
                    output += `# ODPOWIEDŹ WYPISZ W PODANYM FORMACIE:\n ${parameters
                      .map((el) => `#print(${el})`)
                      .join("\n ")}`;
                  }
                  return output;
                }
                if (parameters)
                  return `def ${funcName}(${
                    parameters ? parameters.join(", ") : ""
                  }):\n    return 0`;
              })()}
            </PyRepl>
          </div>
        </div>
        <div
          className={classNames(`my-2 flex flex-col items-center`, {
            hidden: terminal,
          })}
        >
          <button
            disabled={disabled}
            className={classNames(
              "z-10 flex items-center gap-1 pl-2 text-black hover:text-green-400 active:text-green-600",
              {
                "text-gray-600 hover:text-gray-600 active:text-gray-600":
                  disabled,
              },
            )}
            onClick={runClick}
          >
            URUCHOM ALGORYTM <VscRunAll />
          </button>
          <i>
            <sup>*</sup>kliknij aby sprawdzić poprawność odpowiedzi
          </i>
        </div>
        <div className={classNames("relative", { hidden: !terminal })}>
          <button
            disabled={disabled}
            ref={runBtn}
            className={classNames(
              "absolute right-2 top-2 z-10 flex items-center gap-1 bg-black pl-2 text-white hover:text-green-400 active:text-green-600",
              {
                "text-gray-600 hover:text-gray-600 active:text-gray-600":
                  disabled,
              },
            )}
            onClick={runClick}
          >
            WYKONAJ <VscRunAll />
          </button>
          <div
            className={classNames("relative w-full overflow-x-scroll bg-black")}
          >
            <div
              className="font-['IBM Plex Mono'] min-h-12 w-max bg-black px-2 py-1 leading-snug text-white"
              ref={terminalRef}
              id={terminalId}
            ></div>
          </div>
        </div>
      </div>
      {show && (
        <div className="mx-auto my-2 w-56 text-center">
          {result ? (
            <div className="rounded bg-success p-2 text-success-content">
              {"Odpowiedź "}
              <u>POPRAWNA!</u>
            </div>
          ) : (
            <div className="rounded bg-error p-2 text-error-content">
              {"Odpowiedź "}
              <u>NIEPOPRAWNA!</u>
            </div>
          )}
        </div>
      )}
    </>
  );
};
