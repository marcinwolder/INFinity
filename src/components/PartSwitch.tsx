import { FC, ReactNode, useState } from "react";

interface PartSwitchProps {
  Part1: ReactNode;
  Part2: ReactNode;
}

const PartSwitch: FC<PartSwitchProps> = ({ Part1, Part2 }) => {
  const [tab, setTab] = useState(1);
  return (
    <>
      <div className="tabs">
        <a
          onClick={() => setTab(1)}
          className={`tab tab-bordered ${tab === 1 && "tab-active"}`}
        >
          Część 1
        </a>
        <a
          onClick={() => setTab(2)}
          className={`tab tab-bordered ${tab === 2 && "tab-active"}`}
        >
          Część 2
        </a>
      </div>
      <div className="pt-4">{tab === 1 ? Part1 : Part2}</div>
    </>
  );
};

export default PartSwitch;
