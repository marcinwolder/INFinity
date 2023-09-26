import { useForceUpdate } from "@mantine/hooks";
import { useEffect, useRef } from "react";

const InfoBox: React.FC<React.PropsWithChildren<{ taskNums: string[] }>> = ({
  taskNums,
  children,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const forceRefresh = useForceUpdate();
  useEffect(() => {
    if (ref.current) {
      if (ref.current.previousElementSibling) {
        const prev = ref.current.previousElementSibling.getAttribute(
          "data-task-id",
        ) as string;
        ref.current.setAttribute("data-task-id", `${Number(prev)}`);
      } else ref.current.setAttribute("data-task-id", "0");
      forceRefresh();
    }
  }, []);
  return (
    <div
      ref={ref}
      className="my-7 select-none rounded-lg bg-white p-3 shadow-md shadow-neutral-500"
    >
      <h1 className={"text-md rounded bg-black pl-2 font-bold text-white"}>
        {`Informacje do zada${
          taskNums.length > 1 ? "ń" : "nia"
        } ${taskNums.join(", ")}.`}
      </h1>
      <div className="px-1 text-black">{children}</div>
    </div>
  );
};

export default InfoBox;
