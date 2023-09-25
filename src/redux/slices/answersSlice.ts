import _ from "lodash";
import { Formula } from "./pathSlice";
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Answers } from "../../context/testContext/components/TestProvider";
import { StateStore } from "..";

export interface Matura {
  date: string;
  formula: Formula;
  answers: { [keys: number]: Answers & { points: number } };
}

export const answerSlice = createSlice({
  name: "answers",
  initialState: [] as Matura[],
  reducers: {
    changeAns(state, action: PayloadAction<Matura>) {
      const { date, formula, answers } = action.payload;
      const index = state.findIndex(
        (el) => el.date === date && el.formula === formula,
      );
      if (index === -1) {
        state.push({
          formula,
          date,
          answers,
        });
      } else {
        _.assign(state[index].answers, answers);
      }
    },
  },
});

const selAns = (store: StateStore) => store.answers;
export const selectAnswers = createSelector([selAns], (answers) => answers);
