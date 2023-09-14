import { useStripe } from "@stripe/react-stripe-js";
import { httpsCallable } from "firebase/functions";
import { firebaseFunc } from "../main";
import { getUserToken } from "../redux/apis/userDataApi";

type Course = "kursPython" | "kursExcel" | "kursAccess" | "kursAlgo";
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
  kursPython: { [key in "80" | "60" | "40"]: string };
} = {
  kursPython: {
    "80": "price_1Npy8JCmcx2Vw4oFHRhyTPvN",
    "60": "price_1Npy8JCmcx2Vw4oFQujx32bF",
    "40": "price_1Npy8JCmcx2Vw4oFnRbJCLvU",
  },
};

const useHandleStripe = () => {
  const stripe = useStripe();
  const createSession = httpsCallable(firebaseFunc, "paymentsSession");
  if (!stripe) throw new Error("STRIPE IS NOT AVAILABLE");

  return async () => {
    const userToken = await getUserToken();

    if (!userToken) {
      //! USER IS NOT SIGNED IN
      console.log("notLoggedIn");
      return;
    }

    //* USER IS READY TO BUY

    const data: IPaymentsSession = {
      baseUrl: `${window.location.origin}/#/`,
      userID: userToken.user_id,
      products: [{ name: "kursPython", price: courseProducts.kursPython[80] }],
    };
    const res = await createSession(data).then(
      (res) => res.data as IPaymentsSessionResponse,
    );
    stripe.redirectToCheckout({ sessionId: res.sessionId });
  };
};

export default useHandleStripe;
