/* eslint-disable react-refresh/only-export-components */
import _ from "lodash";
import React, { FC, PropsWithChildren, useEffect, useRef } from "react";
import { createContext, useContext, useState } from "react";
import { TiTick, TiTimes } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { StateStore } from "../redux";
import { Matura, answerSlice } from "../redux/slices/answersSlice";
import { Formula, useMaturaPath } from "../redux/slices/pathSlice";
import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import classNames from "classnames";
import usePyRepl from "../components/PythonCompiler/usePyRepl";
import { useDisclosure, useId } from "@mantine/hooks";

import { AiOutlineInfoCircle, AiOutlineFormatPainter } from "react-icons/ai";
import { VscRunAll } from "react-icons/vsc";
import { ImPlay3 } from "react-icons/im";
import { Modal } from "@mantine/core";
import { Helmet } from "react-helmet";

export interface Answers {
  [keys: number]: string | number | boolean;
}
interface Context {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  values: Answers;
  setValues: React.Dispatch<React.SetStateAction<Answers>>;
  taskNum: number;
}
interface TestProviderProps {
  showOnDefault?: boolean;
  taskNum: number;
  title?: string;
  pkt?: number;
  show?: boolean;
}
interface TaskId {
  num: number;
}
interface testProps {
  answer: number | string | ((ans: string) => boolean);
  placeholder?: string;
}
interface radioProps {
  positive?: boolean;
}

const context = createContext<Context>({
  show: false,
  setShow: () => {
    return;
  },
  values: {},
  setValues: () => {
    return;
  },
  taskNum: 0,
});

const useTestContext = () => {
  return useContext(context);
};

const updateAnswer = (dispatch: Dispatch<AnyAction>, dane: Matura) => {
  dispatch(answerSlice.actions.changeAns(dane));
};

export const TestImg: React.FC<{ img: string; className?: string }> = ({
  img,
  className,
}) => {
  return (
    <img
      src={img}
      draggable={false}
      className={"select-none pt-2 " + className}
    />
  );
};

export const InfoBox: React.FC<
  React.PropsWithChildren<{ taskNums: string[] }>
> = ({ taskNums, children }) => {
  return (
    <div className="my-7 select-none rounded-lg bg-white p-3 shadow-md shadow-neutral-500">
      <h1 className={"text-md rounded bg-black pl-2 font-bold text-white"}>
        {`Informacje do zada${
          taskNums.length > 1 ? "ń" : "nia"
        } ${taskNums.join(", ")}.`}
      </h1>
      <div className="px-1 text-black">{children}</div>
    </div>
  );
};

export const TestProvider: FC<PropsWithChildren<TestProviderProps>> = ({
  taskNum,
  title = "",
  pkt = 0,
  children,
  showOnDefault,
}) => {
  const maturaPath = useMaturaPath();

  //Importing existing answers from redux
  let startingAnswers = {};
  const answers = useSelector((state: StateStore) => state.answers);
  const correctTest = answers.find(
    (el) => el.formula === maturaPath.formula && el.date === maturaPath.date,
  );
  if (correctTest && correctTest.answers[taskNum]) {
    startingAnswers = correctTest.answers[taskNum];
  }

  const [show, setShow] = useState(showOnDefault || false);
  const [values, setValues] = useState(startingAnswers);

  return (
    <div className="my-7 select-none rounded-lg bg-white p-3 shadow-md shadow-neutral-500">
      <h1
        className={classNames("text-md rounded pl-2 font-bold text-black", {
          "bg-stara": maturaPath.formula === "formula-stara",
          "bg-2015": maturaPath.formula === "formula-2015",
          "bg-2023": maturaPath.formula === "formula-2023",
        })}
      >
        {"Zadanie "}
        {taskNum}
        {title.length > 1 && `. ${title}`}
        {pkt > 0 && `. (0-${pkt})`}
      </h1>
      <div className="px-1 text-black">
        <context.Provider value={{ show, setShow, values, setValues, taskNum }}>
          {children}
        </context.Provider>
      </div>
    </div>
  );
};

export const _AnswerBtn: React.FC = () => {
  const dispatch = useDispatch();
  const maturaPath = useMaturaPath();

  const { show, setShow, values, taskNum } = useTestContext();
  if (show)
    return (
      <button
        className="btn btn-secondary bg-base-100"
        onClick={() => {
          setShow(false);
        }}
      >
        SPRÓBUJ PONOWNIE
      </button>
    );
  else
    return (
      <button
        className="btn btn-secondary"
        onClick={() => {
          setShow(true);
          updateAnswer(dispatch, {
            answers: { [taskNum]: values },
            formula: maturaPath.formula as Formula,
            date: maturaPath.date || "",
          });
        }}
      >
        SPRAWDŹ ODPOWIEDZI
      </button>
    );
};

export const AnswerBtn: React.FC = () => {
  return (
    <div className="flex w-full justify-center pt-2">
      <_AnswerBtn />
    </div>
  );
};

export const TestInput: React.FC<testProps & TaskId> = ({
  answer,
  num,
  placeholder,
}) => {
  const { show, setValues, values } = useTestContext();
  const value = values[num] as string;
  let compare;
  if (typeof answer === "string") compare = (str: string) => str === answer;
  else if (typeof answer === "number")
    compare = (str: string) => Number(str) === answer;
  else
    compare = (str: string) => {
      if (!str) return false;
      return answer(str);
    };
  return (
    <div className="mx-auto w-full rounded-md">
      {show ? (
        <div className="flex w-full items-center justify-center gap-2">
          {value || "--"}
          {compare(value) ? (
            <TiTick className="text-xl text-success" />
          ) : (
            <TiTimes className="text-xl text-error" />
          )}
        </div>
      ) : (
        <input
          className="h-5 w-full border-none bg-white px-2 py-0 text-center outline-none"
          type="text"
          placeholder={placeholder || "________"}
          value={value || ""}
          onChange={(e) => {
            const input = e.target.value;
            if (input === "") {
              setValues((v) => _.omit(v, num));
            } else setValues((v) => ({ ...v, [num]: input }));
          }}
        />
      )}
    </div>
  );
};

interface testAreaProps {
  answer: Array<string | number>;
  passIfNotSorted?: boolean;
}

export const TestArea: React.FC<testAreaProps & TaskId> = ({
  answer,
  num,
  passIfNotSorted,
}) => {
  const { show, setValues, values } = useTestContext();
  const value = (values[num] as string) || "";
  const areaValues = value.trim().split("\n");
  const [opened, { open, close }] = useDisclosure();

  const compare = () => {
    if (passIfNotSorted) return _.isEqual(answer.sort(), areaValues.sort());
    return _.isEqual(answer, areaValues);
  };

  return (
    <>
      <Modal opened={opened} onClose={close} centered withCloseButton={false}>
        <div className="flex">
          <p className="text-xl font-bold">
            Odpowiedzi muszą być dobrze sformatowane!
          </p>
          <p className="text-5xl">
            <AiOutlineFormatPainter />
          </p>
        </div>
        <p>Pomiędzy kolumnami powinny znajdować się tabulatory.</p>
        <p className="text-sm underline underline-offset-2">
          Dodają się one automatycznie przy kopiowaniu danych z programu MS
          Access.
        </p>
      </Modal>
      <div className="relative mx-auto w-full rounded-md">
        <div className="absolute right-0 -translate-y-full rounded-sm  text-xl hover:text-secondary-focus">
          <button onClick={open}>
            <AiOutlineInfoCircle />
          </button>
        </div>
        {show ? (
          <div className="flex w-full items-center justify-center gap-2">
            {value || "--"}
            {compare() ? (
              <TiTick className="text-xl text-success" />
            ) : (
              <TiTimes className="text-xl text-error" />
            )}
          </div>
        ) : (
          <textarea
            className="h-36 w-full border border-black bg-white px-2 py-0"
            value={value || ""}
            onChange={(e) => {
              const input = e.target.value;
              if (input === "") {
                setValues((v) => _.omit(v, num));
              } else setValues((v) => ({ ...v, [num]: input }));
            }}
          />
        )}
      </div>
    </>
  );
};

export const TestRadio: React.FC<
  React.PropsWithChildren<radioProps & TaskId>
> = ({ positive = false, children, num }) => {
  const { show, setValues, values } = useTestContext();
  const checked = values[num] === true;
  const color = checked == positive ? "text-success" : "text-error";
  return show ? (
    <div className="flex items-center justify-center gap-2">
      {children}
      <label className="swap swap-rotate">
        <input type="checkbox" className="border-0" checked={checked} />
        <div
          className={`swap-on flex items-center justify-center gap-2 ${color}`}
        >
          Prawda
          <TiTick />
        </div>
        <div
          className={`swap-off flex items-center justify-center gap-2 ${color}`}
        >
          Fałsz
          <TiTimes />
        </div>
      </label>
    </div>
  ) : (
    <div className="flex items-center justify-center gap-2">
      {children}
      <label className="swap">
        <input
          type="checkbox"
          className="border-0"
          checked={values[num] === true}
          onChange={() => {
            const input = !checked;
            if (input === false) {
              setValues((v) => _.omit(v, num));
            } else setValues((v) => ({ ...v, [num]: input }));
          }}
        />
        <div className="swap-on flex items-center justify-center gap-2">
          Prawda
        </div>
        <div className="swap-off flex items-center justify-center gap-2">
          Fałsz
        </div>
      </label>
    </div>
  );
};

type ReplElement = HTMLDivElement & { getPySrc: () => string };
// prettier-ignore
type Test = {input: string | number | boolean | Array<string | number | boolean | Array<string | number | boolean>>; output: string | number | boolean | Array<string | number | boolean>;}[] | string[]
interface PythonCompilerProps {
  tests: Test; //set of test that will check if algo is working
  parameters?: string[]; //parameters used in prepared func or print func (when with terminal)
  terminal?: boolean; //determines if terminal should be visible or not
  dataPath?: string; //data file path
  testPath?: string; //test data file path
}

export const TestPython: React.FC<
  React.PropsWithChildren<TaskId & PythonCompilerProps>
> = ({ children, num, tests, parameters, terminal, dataPath, testPath }) => {
  const [PyRepl, setReplSrc] = usePyRepl();
  const { show, taskNum, setValues, values } = useTestContext();
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
        [taskNum]: replContent,
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
      <div>
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
