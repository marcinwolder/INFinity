import { FC, ReactNode } from "react";
import { useSearchParams } from "react-router-dom";

interface PartSwitchProps {
  Part1: ReactNode;
  Part2: ReactNode;
}

const PartSwitch: FC<PartSwitchProps> = ({ Part1, Part2 }) => {
  const [urlParams, setUrlParams] = useSearchParams();
  return (
    <>
      <div className="tabs">
        <a
          onClick={() => {
            setUrlParams((params) => {
              params.set("part", "1");
              params.delete("tab");
              return params;
            });
          }}
          className={`tab tab-bordered ${
            urlParams.get("part") === "1" && "tab-active"
          }`}
        >
          Część 1
        </a>
        <a
          onClick={() => {
            setUrlParams((params) => {
              params.set("part", "2");
              params.delete("tab");
              return params;
            });
          }}
          className={`tab tab-bordered ${
            urlParams.get("part") === "2" && "tab-active"
          }`}
        >
          Część 2
        </a>
      </div>
      <div className="pt-4">
        {urlParams.get("part") === "1" ? (
          Part1
        ) : urlParams.get("part") === "2" ? (
          Part2
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default PartSwitch;
