import { useStripe } from "@stripe/react-stripe-js";
import { Course } from "../redux/apis/userDataApi";
import { PaymentRequestItem } from "@stripe/stripe-js";

const useHandleStripe = () => {
  const stripe = useStripe();
  return (
    totalPrice: number,
    label: string,
    itemsWithPrices?: { courseType: Course; name: string; price: number }[],
  ) => {
    itemsWithPrices;
    if (!stripe) return Error("Stripe module error");

    const total: PaymentRequestItem = { amount: totalPrice * 100, label };

    const paymentRequest = stripe.paymentRequest({
      country: "PL",
      currency: "pln",
      total,
    });
    paymentRequest;
  };
};

export default useHandleStripe;
