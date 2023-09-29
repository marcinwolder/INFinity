import React, { useRef } from "react";
import { useMaturaPath } from "../redux/slices/pathSlice";

const DownloadBtn: React.FC<{ urls: string[] }> = ({ urls }) => {
  const btnsRef = useRef<HTMLDivElement>(null);
  const { date, formula } = useMaturaPath();
  const [year, month] = (date || "").split("-");
  return (
    <div className="mt-4 flex w-full justify-center">
      <div ref={btnsRef}>
        {...urls.map((url, index) => {
          return (
            <a
              href={`/${formula}/${year}/${month}/download/` + url}
              key={index}
              download
            ></a>
          );
        })}
      </div>
      <div
        className="btn btn-neutral"
        onClick={() => {
          btnsRef.current?.childNodes.forEach((el) => {
            const btn = el as HTMLAnchorElement;
            btn.click();
          });
        }}
      >
        Pobierz pliki potrzebne do zadania
      </div>
    </div>
  );
};

export default DownloadBtn;
