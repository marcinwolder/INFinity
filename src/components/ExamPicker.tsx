import { Link, useOutlet, useParams } from "react-router-dom";
import { Suspense } from "react";
import { Formula } from "../redux/slices/pathSlice";
import _, { map, reduce } from "lodash";
import { useSelector } from "react-redux";
import store, { StateStore } from "../redux";
import { ExamData } from "../redux/slices/examsSlice";
import clsx from "clsx";
import { selectAnswers } from "../redux/slices/answersSlice";
import useLocalStorageMatura from "../hooks/useLocalStorageMatura";

const ExamPicker: React.FC = () => {
  const currentMatura = useLocalStorageMatura();
  const { formula } = useParams();
  const exams = useSelector(
    (state: StateStore) => state.exams[formula as Formula],
  );
  const answers = selectAnswers(store.getState());
  const sortedExams: { [key: string]: ExamData[] } = {};

  exams.forEach((exam) => {
    if (sortedExams[exam.year]) sortedExams[exam.year].push(exam);
    else sortedExams[exam.year] = [exam];
  });

  const examsComp = map(sortedExams, (exams, year) => {
    const examsLinks = exams.map((exam, index) => {
      const { maxPoints } = exam;
      const examAnswers =
        answers.find(
          (examAns) =>
            examAns.formula === exam.formula &&
            examAns.date === `${exam.year}-${exam.month}`,
        )?.answers || {};
      const examPoints = reduce(
        examAnswers,
        (sum, answers) => sum + answers.points,
        0,
      );
      const MATURA_PERCENT = Number((examPoints / maxPoints) * 100);
      const CURRENT_MATURA =
        currentMatura.formula === exam.formula &&
        currentMatura.date === `${exam.year}-${exam.month}`;
      return (
        <div className="flex items-center">
          <div
            className={clsx("mr-2 h-2 w-2 rounded-full bg-success", {
              invisible: !CURRENT_MATURA,
              "animate-ping": CURRENT_MATURA,
            })}
          />
          <Link
            to={`/${exam.formula}/${exam.year}-${exam.month}`}
            className="link-hover w-full"
            key={index}
          >
            <span className="capitalize">{exam.month}</span> - {exam.title}
            {exam.info ? (
              <div className="badge badge-primary badge-sm relative -top-2 left-2">
                {exam.info}
              </div>
            ) : (
              <></>
            )}
          </Link>
          <div className="group indicator">
            <div className="badge indicator-item badge-xs -translate-x-0 -translate-y-3 select-none opacity-0 group-hover:opacity-100">
              Rozwiązano {MATURA_PERCENT}%
            </div>
            <progress
              className="progress progress-success ml-auto w-24 opacity-40"
              value={MATURA_PERCENT}
              max="100"
            ></progress>
          </div>
        </div>
      );
    });

    return (
      <div
        key={exams[0].formula + "" + exams[0].year}
        className="collapse collapse-arrow bg-base-200"
      >
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title text-xl font-medium">Rok {year}</div>
        <div className="collapse-content">{...examsLinks}</div>
      </div>
    );
  });

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
    <div className="flex w-1/2 flex-col items-center gap-2">
      <h1 className="mb-2">Wybierz egzamin:</h1>
      {...examsComp}
    </div>
  );
};

export default ExamPicker;
