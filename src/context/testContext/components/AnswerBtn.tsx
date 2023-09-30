import { useDispatch } from "react-redux";
import { Formula, useMaturaPath } from "../../../redux/slices/pathSlice";
import { updateAnswer } from "..";
import { useTestContext } from "./TestProvider";
import { useState } from "react";
import { Loader } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import clsx from "clsx";
import _ from "lodash";
import store from "../../../redux";
import { selectAnswers } from "../../../redux/slices/answersSlice";
import useCurrentMatura from "../../../hooks/useCurrentMatura";
import { modals } from "@mantine/modals";
import { useNavigate } from "react-router-dom";

const getCurrentAnswers = (formula: string, date: string) =>
  selectAnswers(store.getState()).filter(
    (e) => e.formula === formula && e.date === date,
  )[0];

export const AnswerBtn: React.FC = () => {
  const navigate = useNavigate();
  const currentMatura = useCurrentMatura();
  const [saveMode, setSaveMode] = useState(false);
  const dispatch = useDispatch();
  const { date, formula } = useMaturaPath();
  const { values, taskNum, points, setShow } = useTestContext();

  const answersStore = getCurrentAnswers(formula as string, date as string);

  let ANSWERS_SAVED = false;
  if (answersStore && answersStore.answers[taskNum]) ANSWERS_SAVED = true;
  const onSaveClick = () => {
    setShow((show) => !show);
    setSaveMode(true);
    if (
      _.isEmpty(currentMatura) ||
      (currentMatura.formula === formula && currentMatura.date === date)
    )
      saveAnswersLocally();
    else
      modals.openConfirmModal({
        title: <p className="text-lg font-bold">🤔 Hmm, zaczekaj chwilkę...</p>,
        children:
          "Próbujesz zapisac odpowiedzi w nowej maturze bez zakończenia poprzedniej. \n Zapisanie odpowiedzi będzie skutkowało usunięciem postępu rozwiązywania poprzedniego egzaminu po odświeżeniu strony.",
        onConfirm() {
          saveAnswersLocally();
        },
        onCancel() {
          navigate(`/${currentMatura.formula}/${currentMatura.date}`);
        },
        onClose() {
          setSaveMode(false);
        },
      });
  };
  const saveAnswersLocally = () => {
    if (!_.isEmpty(_.omit(values, "points"))) {
      updateAnswer(dispatch, {
        answers: { [taskNum]: { ...values, points: Number(points) } },
        formula: formula as Formula,
        date: date || "",
      });
    }
    setTimeout(() => {
      setSaveMode(false);
      if (!_.isEmpty(_.omit(values, "points"))) {
        window.localStorage.answers = JSON.stringify(
          getCurrentAnswers(formula as string, date as string),
        );
        notifications.show({
          title: "Rozwiązania zapisane!",
          message:
            "Twoje odpowiedź zostały bezpiecznie zapisane na pamięci urządzenia 😃.",
          color: "green",
        });
      } else
        notifications.show({
          title: "Nie zapisano rozwiązania.",
          message: "Aby zapisać odpowiedź, musisz najpierw je podać 🤓.",
          color: "red",
        });
    }, 700);
  };
  return (
    <div className="mt-4 flex w-full justify-center pt-2">
      <button
        className={clsx("btn btn-wide mb-2", {
          "btn-secondary": !ANSWERS_SAVED,
          "btn-neutral": ANSWERS_SAVED,
          "btn-disabled": saveMode,
        })}
        onClick={onSaveClick}
      >
        {saveMode ? (
          <Loader color="gray" size="sm" opacity={0.5} />
        ) : !ANSWERS_SAVED ? (
          "ZAPISZ ODPOWIEDŹ"
        ) : (
          "ZAPISZ ODPOWIEDŹ PONOWNIE"
        )}
      </button>
    </div>
  );
};
