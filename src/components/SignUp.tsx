import {
  PasswordInput,
  TextInput,
  Notification,
  Checkbox,
} from "@mantine/core";
import {
  useForm,
  hasLength,
  matchesField,
  isEmail,
  matches,
  isNotEmpty,
} from "@mantine/form";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useDisclosure } from "@mantine/hooks";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { modals } from "@mantine/modals";
import { toast } from "react-hot-toast";

import { firebaseApp, firebaseAuth } from "../main";
import AnimatedToast from "./AnimatedToast";

import InfinitySmallDark from "./../img/InfinitySmall-dark.png";
import InfinitySmall from "./../img/InfinitySmall.png";
import ThemeImg from "./ThemeImg";

const SignUp = () => {
  const auth = getAuth(firebaseApp);
  const [disabled, { open: disableBtn, close: enableBtn }] = useDisclosure();

  const formEl = useForm({
    validateInputOnBlur: true,
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      rules: false,
    },
    validate: {
      username: (value) =>
        isNotEmpty("Uzupełnij to pole.")(value) ||
        hasLength(
          { min: 6 },
          "Nazwa użytkownika musi mieć min. 6 znaków.",
        )(value) ||
        hasLength(
          { max: 24 },
          "Nazwa użytkownika moze mieć max. 24 znaki.",
        )(value) ||
        null,
      email: (value) =>
        isNotEmpty("Uzupełnij to pole.")(value) ||
        isEmail("Nieprawidłowy email")(value),
      password: (value) =>
        isNotEmpty("Uzupełnij to pole.")(value) ||
        hasLength({ min: 8 }, "Hasło musi miec min. 8 znaków.")(value) ||
        matches(
          /[~`!@#$%^&*()_\-+=|\\[{\]};:'",<.>/?]+/g,
          "Hasło musi zawierać min. 1 znak specjalny.",
        )(value) ||
        matches(/\d+/g, "Hasło musi zawierać min. 1 cyfrę.")(value) ||
        matches(
          /[A-Z]+/g,
          "Hasło musi zawierac min. 1 wielką literę.",
        )(value) ||
        matches(/[a-z]+/g, "Hasło musi zawierac min. 1 małą literę.")(value) ||
        null,
      confirmPassword: (value, values) =>
        isNotEmpty("Uzupełnij to pole.")(value) ||
        matchesField("password", "Hasła muszą być takie same.")(value, values),
      rules: (value) => (!value ? "Musisz zaakceptować regulamin." : null),
    },
  });

  const onConfirm = () => {
    if (!disabled) {
      if (formEl.isValid()) {
        disableBtn();
        createUserWithEmailAndPassword(
          auth,
          formEl.values.email,
          formEl.values.password,
        )
          .then((userCredential) => {
            updateProfile(userCredential.user, {
              displayName: formEl.values.username,
            });
          })
          .then(() => {
            modals.close("signUpModal");
            toast.custom(
              <AnimatedToast>
                <Notification
                  withCloseButton={false}
                  withBorder
                  color="green"
                  radius="md"
                  title="Rejestracja przebiegła pomyślnie!"
                >
                  Teraz możesz korzystać z funkcji wymagających logowania.
                </Notification>
              </AnimatedToast>,
            );
          })
          .then(() => {
            firebaseAuth.signOut();
            signInWithEmailAndPassword(
              firebaseAuth,
              formEl.values.email,
              formEl.values.password,
            );
          })
          .catch((e) => {
            if (e.code === "auth/email-already-in-use")
              formEl.setFieldError(
                "email",
                "Podany email został przypisany do innego konta.",
              );
          })
          .finally(enableBtn);
      } else {
        formEl.validate();
      }
    }
  };

  return (
    <>
      <form
        className="mb-2"
        onKeyDown={(e) => {
          if (e.key === "Enter") onConfirm();
        }}
      >
        <TextInput
          disabled={disabled}
          label="Nazwa użytkownika: "
          {...formEl.getInputProps("username")}
        />
        <TextInput
          disabled={disabled}
          label="Email: "
          placeholder="email@test.pl"
          {...formEl.getInputProps("email")}
        />
        <PasswordInput
          disabled={disabled}
          label="Hasło:"
          {...formEl.getInputProps("password")}
        />
        <PasswordInput
          disabled={disabled}
          label="Potwierdź hasło:"
          {...formEl.getInputProps("confirmPassword")}
        />
        <Checkbox
          className="mt-2"
          disabled={disabled}
          label={
            <>
              Akceptuję{" "}
              <a
                target="_blank"
                href="./regulamin-matura-infinity.docx"
                className="link"
              >
                Regulamin
              </a>
            </>
          }
          {...formEl.getInputProps("rules")}
        />
      </form>
      <div className="flex">
        <div className="h-20 w-40 place-self-end overflow-hidden rounded-bl-lg border-b-2 border-l-2 border-dashed border-base-content ">
          {/* TODO: ANIMATED DRAWING LOGO HERE */}
          <ThemeImg
            className="relative -left-8 -top-4 h-40 w-48"
            light={InfinitySmall}
            dark={InfinitySmallDark}
          />
        </div>
        <button
          disabled={disabled}
          className="btn btn-primary mb-4 ml-auto mr-4 mt-8 block w-max md:w-36"
          onClick={onConfirm}
        >
          {!disabled ? (
            "Zarejestruj"
          ) : (
            <div className="flex justify-center">
              <span className="animate-spin">
                <AiOutlineLoading3Quarters />
              </span>
            </div>
          )}
        </button>
      </div>
    </>
  );
};

export default SignUp;
