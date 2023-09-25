import { createSlice } from "@reduxjs/toolkit";
import examsJSON from "../../JSON/exams.json";
import { Formula } from "./pathSlice";
import _, { forEach } from "lodash";

export interface ExamData {
  formula: Formula;
  year: string;
  month: string;
  tasks: string[];
  splitParts?: boolean;
  title: string;
  info?: string;
  maxPoints: number;
}

const initialState: {
  [formula in Formula]: ExamData[];
} = { "formula-2015": [], "formula-2023": [], "formula-stara": [] };

export const examsSlice = createSlice({
  name: "exams",
  initialState,
  reducers: {
    loadExams: (state) => {
      const exams = examsJSON;

      forEach(exams, (formulaExams, formula) => {
        forEach(formulaExams, (exam) => {
          const buf = exam as ExamData;
          buf.formula = formula as Formula;
          state[formula as Formula]?.push(buf);
        });
      });
    },
  },
});
