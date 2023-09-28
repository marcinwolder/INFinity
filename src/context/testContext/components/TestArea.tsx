import { useEffect, useRef, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import _ from "lodash";
import { Modal } from "@mantine/core";
import { AiOutlineFormatPainter, AiOutlineInfoCircle } from "react-icons/ai";
import { TiTick, TiTimes } from "react-icons/ti";
import { useTestContext } from "./TestProvider";

interface ITestAreaProps {
  answer: Array<string | number>;
  passIfNotSorted?: boolean;
}

export const TestArea: React.FC<ITestAreaProps> = ({
  answer,
  passIfNotSorted,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [num, setNum] = useState(0);

  const { show, setValues, values } = useTestContext();
  const value = (values[num] as string) || "";
  const areaValues = value.trim().split("\n");
  const [opened, { open, close }] = useDisclosure();

  const compare = () => {
    if (passIfNotSorted) return _.isEqual(answer.sort(), areaValues.sort());
    return _.isEqual(answer, areaValues);
  };

  useEffect(() => {
    if (ref.current) setNum(Number(ref.current.getAttribute("data-input-id")));
  }, []);
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
      <div
        ref={ref}
        data-input-id
        className="relative mx-auto w-full rounded-md"
      >
        <div className="absolute right-0 flex -translate-y-[calc(100%+.2em)] items-baseline rounded-sm bg-white text-xl hover:text-secondary-focus">
          <button onClick={open}>
            <AiOutlineInfoCircle />
          </button>
        </div>
        {show ? (
          <div className="flex w-full items-center justify-center gap-2">
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
            onKeyDown={(e) => {
              if (e.key === "Tab") {
                e.preventDefault();
                setValues((v) => ({ ...v, [num]: value + "\t" }));
              }
            }}
          />
        )}
      </div>
    </>
  );
};
