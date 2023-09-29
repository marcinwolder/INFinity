import { useEffect, useRef, useState } from "react";
import { TiTick, TiTimes } from "react-icons/ti";
import _ from "lodash";
import { useTestContext } from "./TestProvider";
import { useMaturaPath } from "../../../redux/slices/pathSlice";
import { useSearchParams } from "react-router-dom";

interface ITestProps {
  answer: number | string | ((ans: string) => boolean);
  placeholder?: string;
}

export const TestInput: React.FC<ITestProps> = ({ answer, placeholder }) => {
  const func = import.meta.glob(
    ["/public/{formula-2015,formula-2023,formula-stara}/*/*/*/*/*.ts"],
    { import: "default", eager: true },
  );

  const ref = useRef<HTMLDivElement>(null);
  const [num, setNum] = useState(0);
  const { show, setValues, values, taskNum } = useTestContext();
  const { date, formula } = useMaturaPath();
  const [year, month] = (date || "").split("-");
  const [urlParams] = useSearchParams();

  let compare;
  if (typeof answer === "string") compare = (str: string) => str === answer;
  else if (typeof answer === "object")
    compare = (str: string) => (answer as Array<string>).includes(str);
  else {
    const buf = func[
      `${`/public/${formula}/${year}/${month}/${urlParams.get("tab")}/${taskNum
        .toString()
        .replace(".", "-")}/${num}.ts`}`
    ] as Function | undefined;
    compare = buf ? buf : () => false;
  }

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
