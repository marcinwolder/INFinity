import { useLayoutEffect, useRef, useState } from "react";
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
  const [num, setNum] = useState<number | null>(null);
  const { show, setValues, values } = useTestContext();
  const checked = num !== null && values[num] === true;
  const color = checked == positive ? "text-success" : "text-error";
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const setFromAttr = () => {
      const attr = el.getAttribute("data-input-id");
      if (attr === null) return;
      const parsed = Number(attr);
      if (!Number.isNaN(parsed)) {
        setNum((prev) => (prev === parsed ? prev : parsed));
      }
    };

    setFromAttr();

    const observer = new MutationObserver((records) => {
      for (const record of records) {
        if (record.type === "attributes" && record.attributeName === "data-input-id") {
          setFromAttr();
          break;
        }
      }
    });

    observer.observe(el, {
      attributes: true,
      attributeFilter: ["data-input-id"],
    });

    return () => observer.disconnect();
  }, []);
  return show ? (
    <div
      ref={ref}
      data-input-id
      className="flex items-center justify-center gap-2"
    >
      {children}
      <label className="swap swap-rotate">
        <input
          type="checkbox"
          className="border-0"
          checked={checked}
          readOnly
        />
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
    <div
      ref={ref}
      data-input-id
      className="flex items-center justify-center gap-2"
    >
      {children}
      <label className="swap">
        <input
          type="checkbox"
          className="border-0"
          checked={checked}
          onChange={() => {
            if (num === null) return;
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
