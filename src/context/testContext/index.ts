import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { Matura, answerSlice } from "../../redux/slices/answersSlice";

export const updateAnswer = (dispatch: Dispatch<AnyAction>, dane: Matura) => {
  dispatch(answerSlice.actions.changeAns(dane));
};

export * from "./components/TestImg";
export * from "./components/InfoBox";
export * from "./components/AnswerBtn";
export * from "./components/TestInput";
export * from "./components/TestArea";
export * from "./components/TestRadio";
export * from "./components/TestPython";
export { TestProvider } from "./components/TestProvider";
