import React from "react";
import ReactDOM from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { ModalsProvider } from "@mantine/modals";
import _ from "lodash";

import { MenuProvider } from "./context/menuContext";
import App from "./App";
import NotFound from "./routes/PageError";
import Main from "./routes";

import ExamPicker from "./components/ExamPicker";
import ExamHub from "./components/ExamHub";

import store from "./redux";
import { ExamData, examsSlice } from "./redux/slices/examsSlice";
import { Formula } from "./redux/slices/pathSlice";

import "./index.css";
import Kursy from "./routes/Kursy";
import MantineProvider from "./components/MantineProvider";

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";

import Panel from "./routes/Panel";
import requireAuth from "./utils/requireAuth";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

window.sessionStorage.removeItem("python");

const stripePromise = loadStripe(
  String(import.meta.env.VITE_STRIPE_PUBLIC_KEY),
);

console.log(import.meta.env);

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "matura-infinity.firebaseapp.com",
  projectId: "matura-infinity",
  storageBucket: "matura-infinity.appspot.com",
  messagingSenderId: "848677244645",
  appId: "1:848677244645:web:6c4dd9feade52eba814e0c",
  measurementId: "G-96E0MGJE6E",
};

export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
export const firebaseFunc = getFunctions(firebaseApp, "europe-west2");
// connectFunctionsEmulator(firebaseFunc, "127.0.0.1", 5001);

declare global {
  const pyscript: {
    interpreter: {
      globals: {
        get(query: string): unknown;
      };
    };
  };
}
export interface ExamPageLoader {
  currentExam: ExamData;
}

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/:formula",
        element: <ExamPicker />,
        loader: async ({ params }) => {
          store.dispatch(
            examsSlice.actions.loadExams(params.formula as Formula),
          );
          return {};
        },
        children: [
          {
            path: "/:formula/:yearAndMonth",
            element: <ExamHub />,
            loader: async ({ params }) => {
              const { yearAndMonth } = params;
              const [year, month] = (yearAndMonth || "").split("-");
              const currentExam = store
                .getState()
                .exams[year].filter((exam) => exam.month === month);
              if (_.isEmpty(currentExam)) throw new Error();
              return { currentExam: _.head(currentExam) } as ExamPageLoader;
            },
          },
        ],
      },
      {
        path: "/panel",
        loader: async () => {
          await requireAuth();
          return {};
        },
        element: <Panel />,
      },
      {
        path: "/kursy",
        element: <Kursy />,
      },
      {
        path: "/",
        element: <Main />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <>
    <React.StrictMode>
      <Elements stripe={stripePromise}>
        <MantineProvider>
          <ModalsProvider>
            <Provider store={store}>
              <MenuProvider>
                <RouterProvider router={router} />
              </MenuProvider>
            </Provider>
          </ModalsProvider>
        </MantineProvider>
      </Elements>
    </React.StrictMode>
  </>,
);
