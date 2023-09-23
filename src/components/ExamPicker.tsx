import { Link, useLoaderData, useOutlet, useParams } from "react-router-dom";
import { Suspense } from "react";
import { Formula, useUrl } from "../redux/slices/pathSlice";
import _ from "lodash";
import { useSelector } from "react-redux";
import { StateStore } from "../redux";
const ExamPicker: React.FC = () => {
  const url = useUrl();
  const { formula } = useParams();
  const exams = useSelector(
    (state: StateStore) => state.exams[formula as Formula],
  );

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

  return (
    <>
      <h1 className="w-96">Wybierz egzamin:</h1>
      <div className="join join-vertical w-96">
        {exams.map((exam) => {
          return (
            <Link
              key={exam.year + " " + exam.month}
              to={`${exam.year}-${exam.month}`}
            >
              {exam.title} {exam.info}
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default ExamPicker;
