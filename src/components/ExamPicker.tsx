import { Link, useOutlet } from "react-router-dom";
import { Suspense } from "react";
import { useUrl } from "../redux/slices/pathSlice";
import _ from "lodash";
import { useSelector } from "react-redux";
import { StateStore } from "../redux";
const ExamPicker: React.FC = () => {
  const url = useUrl();

  const exams = useSelector((state: StateStore) => state.exams);

  const outlet = useOutlet();
  if (outlet)
    return (
      <Suspense
        fallback={
          <div className="mt-8 flex justify-center ">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        }
      >
        {outlet}
      </Suspense>
    );

  if (_.isEmpty(exams))
    return (
      <h1 className="w-96">Brak egzaminów spełniających wymagania w bazie.</h1>
    );

  const examsComp = Object.keys(exams).map((year) => {
    const examsLinks = exams[year].map(({ month, title, info }) => {
      return (
        <Link
          key={month}
          className="btn btn-outline relative mb-4 flex"
          to={`${url}/${year}-${month}`}
        >
          {info ? (
            <span className="badge badge-secondary absolute -right-2 -top-3">
              {info}
            </span>
          ) : (
            <></>
          )}
          {title}
        </Link>
      );
    });
    return (
      <div
        key={year}
        className="collapse join-item collapse-arrow border border-primary-content"
      >
        <input type="radio" name="my-accordion-1" />
        <div className="collapse-title text-xl font-medium">{year}</div>
        <div className="collapse-content relative">{...examsLinks}</div>
      </div>
    );
  });

  return (
    <>
      <h1 className="w-96">Wybierz egzamin:</h1>
      <div className="join join-vertical w-96">{...examsComp}</div>
    </>
  );
};

export default ExamPicker;
