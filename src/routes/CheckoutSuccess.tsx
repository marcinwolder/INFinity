import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsCheckCircleFill } from "react-icons/bs";

const REDIRECT_DELAY = 5;

const CheckoutSuccess = () => {
  const navigate = useNavigate();
  const [secondsLeft, setSecondsLeft] = useState(REDIRECT_DELAY);

  useEffect(() => {
    if (secondsLeft <= 0) {
      navigate("/", { replace: true });
      return;
    }

    const timerId = window.setTimeout(() => {
      setSecondsLeft((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => window.clearTimeout(timerId);
  }, [secondsLeft, navigate]);

  return (
    <section className="flex w-full max-w-3xl flex-col items-center gap-6 px-4 pb-24 pt-12 text-center">
      <div className="flex flex-col items-center gap-6 rounded-3xl border border-success/40 bg-base-200 p-8 shadow-lg shadow-success/20">
        <BsCheckCircleFill className="text-6xl text-success" aria-hidden="true" />
        <div className="space-y-2">
          <h1 className="text-3xl font-bold md:text-4xl">Zakup zakończony sukcesem!</h1>
          <p className="text-base md:text-lg">
            Dziękujemy za zaufanie i dołączenie do kursu. Zostaniesz przekierowany
            na stronę główną za
            <span className="font-semibold"> {secondsLeft} sekund</span>.
          </p>
        </div>
        <button
          className="btn btn-success"
          onClick={() => navigate("/", { replace: true })}
        >
          Przejdź na stronę główną teraz
        </button>
      </div>
    </section>
  );
};

export default CheckoutSuccess;
