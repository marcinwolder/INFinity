import { useStripe } from "@stripe/react-stripe-js";
import { httpsCallable } from "firebase/functions";
import { firebaseFunc } from "../main";
import { getUserToken } from "../redux/apis/userDataApi";
import toast from "react-hot-toast";
import AnimatedToast from "../components/AnimatedToast";
import { Notification } from "@mantine/core";

export type Course =
  | "kursPython"
  | "kursExcel"
  | "kursAccess"
  | "kursAlgo"
  | "dodatki";
export type Price = "full" | "first" | "second";
export interface IPaymentsSession {
  userID: string;
  products: { name: Course; price: string }[];
  baseUrl: string;
}
export interface IPaymentsSessionResponse {
  sessionId: string;
}

// [key in Course]
export const courseProducts: {
  [key in Course]: { [key in Price]: string };
} = {
  kursPython: {
    full: import.meta.env.VITE_KURS_PYTHON_FULL,
    first: import.meta.env.VITE_KURS_PYTHON_FIRST,
    second: import.meta.env.VITE_KURS_PYTHON_SECOND,
  },
  kursAlgo: {
    full: import.meta.env.VITE_KURS_ALGO_FULL,
    first: import.meta.env.VITE_KURS_ALGO_FIRST,
    second: import.meta.env.VITE_KURS_ALGO_SECOND,
  },
  kursAccess: {
    full: import.meta.env.VITE_KURS_ACCESS_FULL,
    first: import.meta.env.VITE_KURS_ACCESS_FIRST,
    second: import.meta.env.VITE_KURS_ACCESS_SECOND,
  },
  kursExcel: {
    full: import.meta.env.VITE_KURS_EXCEL_FULL,
    first: import.meta.env.VITE_KURS_EXCEL_FIRST,
    second: import.meta.env.VITE_KURS_EXCEL_SECOND,
  },
  dodatki: {
    full: import.meta.env.VITE_KURS_DODATKI,
    first: import.meta.env.VITE_KURS_DODATKI,
    second: import.meta.env.VITE_KURS_DODATKI,
  },
} as const;

const useHandleStripe = () => {
  const stripe = useStripe();
  const createSession = httpsCallable(firebaseFunc, "paymentsSession");

  return async function (
    products: { name: Course; price: Price }[],
    failCb: () => void,
  ) {
    await new Promise<void>((res) => {
      const id = setInterval(() => {
        if (stripe) {
          clearInterval(id);
          res();
        }
      });
    });
    if (!stripe) throw new Error("STRIPE IS NOT AVAILABLE");

    const userToken = await getUserToken();

    if (!userToken) {
      //! USER IS NOT SIGNED IN
      failCb();
      toast.custom(
        <AnimatedToast>
          <Notification
            withCloseButton={false}
            withBorder
            color="red"
            title="Nie jesteś zalogowany."
          >
            Nie zrozum nas źle... ale MUSISZ się zalogować 😭
          </Notification>
        </AnimatedToast>,
      );
      console.log("notLoggedIn");
      return;
    }

    //* USER IS READY TO BUY

    const data: IPaymentsSession = {
      baseUrl: `${window.location.origin}/#/`,
      userID: userToken.user_id,
      products: products.map(({ name, price }) => ({
        name: name,
        price: courseProducts[name][price],
      })),
    };
    const res = await createSession(data).then(
      (res) => res.data as IPaymentsSessionResponse,
    );
    stripe.redirectToCheckout({ sessionId: res.sessionId });
  };
};

export default useHandleStripe;
