import React from "react";

interface props {
  year: string;
}

const useYearDropdown = (
  open: string,
  setOpen: React.Dispatch<React.SetStateAction<string>>,
): React.FC<React.PropsWithChildren<props>> => {
  const YearDropdown: React.FC<React.PropsWithChildren<props>> = ({
    year,
    children,
  }) => {
    if (open == year) {
      return (
        <div
          tabIndex={0}
          data-year={year}
          className="collapse-arrow collapse collapse-open rounded-box w-80 border border-base-300 bg-base-200"
          onClick={() => setOpen(year)}
        >
          <div className="collapse-title text-xl font-medium">{year}</div>
          <div className="collapse-content">
            <ul className="menu-compact menu">{children}</ul>
          </div>
        </div>
      );
    }
    return (
      <div
        tabIndex={0}
        data-year={year}
        className="collapse-arrow collapse rounded-box w-80 border border-base-300 bg-base-200"
        onClick={() => setOpen(year)}
      >
        <div className="collapse-title text-xl font-medium">{year}</div>
        <div className="collapse-content">
          <ul className="menu-compact menu">{children}</ul>
        </div>
      </div>
    );
  };
  return YearDropdown;
};

export default useYearDropdown;
