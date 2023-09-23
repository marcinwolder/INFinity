import { useEffect, useRef, useState } from "react";
import { TiTick, TiTimes } from "react-icons/ti";
import _ from "lodash";
import { useTestContext } from "./TestProvider";

interface ITestProps {
  answer: number | string | ((ans: string) => boolean);
  placeholder?: string;
}

export const TestInput: React.FC<ITestProps> = ({ answer, placeholder }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [num, setNum] = useState(0);
  const { show, setValues, values } = useTestContext();
  let compare;
  if (typeof answer === "string") compare = (str: string) => str === answer;
  else if (typeof answer === "number")
    compare = (str: string) => Number(str) === answer;
  else
    compare = (str: string) => {
      if (!str) return false;
      return answer(str);
    };

  const value = values[num] as string;
  useEffect(() => {
    if (ref.current) setNum(Number(ref.current.getAttribute("data-input-id")));
  }, []);
  return (
    <div ref={ref} data-input-id className="mx-auto w-full rounded-md">
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
