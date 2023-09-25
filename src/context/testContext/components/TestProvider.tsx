import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useMaturaPath } from "../../../redux/slices/pathSlice";
import { useSelector } from "react-redux";
import { StateStore } from "../../../redux";
import _ from "lodash";
import { useForceUpdate } from "@mantine/hooks";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { BsCameraVideoFill } from "react-icons/bs";

export interface Answers {
  [keys: number]: string | number | boolean;
  points: number;
}
interface Context {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  values: Answers;
  setValues: React.Dispatch<React.SetStateAction<Answers>>;
  taskNum: number;
  points: number;
}

const context = createContext<Context>({
  show: false,
  setShow: () => {
    return;
  },
  values: {
    points: 0,
  },
  setValues: () => {
    return;
  },
  taskNum: 0,
  points: 0,
});

export const useTestContext = () => {
  return useContext(context);
};

interface ITestProviderProps {
  showOnDefault?: boolean;
  taskNum: number;
  title?: string;
  pkt?: number;
  show?: boolean;
  videoAnswerUrl?: string;
  points: number;
}

export const TestProvider: React.FC<
  React.PropsWithChildren<ITestProviderProps>
> = ({
  taskNum,
  title = "",
  pkt = 0,
  children,
  showOnDefault,
  videoAnswerUrl = "",
}) => {
  const [show, setShow] = useState(showOnDefault || false);

  const ref = useRef<HTMLDivElement>(null);
  const forceRefresh = useForceUpdate();

  const maturaPath = useMaturaPath();

  const fullTaskNum = Number(
    `${taskNum}${
      ref.current?.getAttribute("data-task-id") !== "0"
        ? "." + ref.current?.getAttribute("data-task-id")
        : ".0"
    }`,
  );

  //Importing existing answers from redux
  let startingAnswers: Answers = { points: 0 };
  const answers = useSelector((state: StateStore) => state.answers);
  const correctTest = answers.find(
    (el) => el.formula === maturaPath.formula && el.date === maturaPath.date,
  );
  if (correctTest && correctTest.answers[fullTaskNum]) {
    startingAnswers = correctTest.answers[fullTaskNum];
  }
  const [values, setValues] = useState(startingAnswers);
  const STARTING_ANSWERS_EMPTY = _.isEmpty(_.omit(startingAnswers, "points"));

  useEffect(() => {
    if (ref.current) {
      if (ref.current.previousElementSibling) {
        const prev = ref.current.previousElementSibling.getAttribute(
          "data-task-id",
        ) as string;
        ref.current.setAttribute("data-task-id", `${Number(prev) + 1}`);

        // console.log(Number(prev) + 1);
        ref.current
          .querySelectorAll("*[data-input-id]")
          .forEach((el, index) => {
            el.setAttribute("data-input-id", index.toFixed(0));
            // console.log(el);
          });
      } else ref.current.setAttribute("data-task-id", "0");
      forceRefresh();
    }
  }, []);
  useEffect(() => {
    setValues(startingAnswers);
  }, [STARTING_ANSWERS_EMPTY]);
  return (
    <div
      ref={ref}
      className="my-7 select-none overflow-hidden rounded-lg bg-white p-3 shadow-md shadow-neutral-500"
    >
      <div
        className={classNames("flex justify-between rounded px-2", {
          "bg-stara": maturaPath.formula === "formula-stara",
          "bg-2015": maturaPath.formula === "formula-2015",
          "bg-2023": maturaPath.formula === "formula-2023",
        })}
      >
        <h1 className="text-md inline-block font-bold text-black">
          {"Zadanie "}
          {fullTaskNum}
          {title.length > 1 && `. ${title}`}
          {pkt > 0 && `. (0-${pkt})`}
        </h1>
        {videoAnswerUrl !== "" ? (
          <Link
            className="link inline-flex w-max items-center gap-2 text-black hover:link-secondary"
            to={videoAnswerUrl}
          >
            Rozwiązanie wideo
            <BsCameraVideoFill />
          </Link>
        ) : (
          <></>
        )}
      </div>
      <div className="relative my-2 w-full overflow-hidden px-1 text-black">
        <context.Provider
          value={{
            show,
            setShow,
            values,
            setValues,
            taskNum: fullTaskNum,
            points: pkt,
          }}
        >
          {children}
        </context.Provider>
      </div>
    </div>
  );
};
