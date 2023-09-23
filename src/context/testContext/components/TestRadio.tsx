import { useEffect, useRef, useState } from "react";
import { TiTick, TiTimes } from "react-icons/ti";
import _ from "lodash";
import { useTestContext } from "./TestProvider";

interface IRadioProps {
  positive?: boolean;
}

export const TestRadio: React.FC<React.PropsWithChildren<IRadioProps>> = ({
  positive = false,
  children,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [num, setNum] = useState(0);
  const { show, setValues, values } = useTestContext();
  const checked = values[num] === true;
  const color = checked == positive ? "text-success" : "text-error";
  useEffect(() => {
    if (ref.current) setNum(Number(ref.current.getAttribute("data-input-id")));
  }, []);
  return show ? (
    <div data-input-id className="flex items-center justify-center gap-2">
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
