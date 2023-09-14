import { useStripe } from "@stripe/react-stripe-js";
import { firebaseFunctions } from "../main";
import axios from "axios";

const useHandleStripe = () => {
  const stripe = useStripe();
  if (!stripe)
    return () => {
      return;
    };
  return () => {
    console.log(firebaseFunctions);
    const functionsApi = axios.create({
      baseURL: "http://127.0.0.1:5001/matura-infinity/europe-west2",
    });
    functionsApi.get("/helloWorld").then((res) => console.log(res));
  };
};

export default useHandleStripe;
