import store from "../redux";
import { selectAnswers } from "../redux/slices/answersSlice";
import { Formula } from "../redux/slices/pathSlice";

const getMaturaAnswers = (formula: Formula, date: string) => {
  return selectAnswers(store.getState()).filter(
    (e) => e.formula === formula && e.date === date,
  )[0];
};

export default getMaturaAnswers;
