import { modals } from "@mantine/modals";

import SignUp from "./SignUp";
import InfinitySmall from "./../img/InfinitySmall.png";
import InfinitySmallDark from "./../img/InfinitySmall-dark.png";
import SignIn from "./SignIn";
import { firebaseAuth } from "../main";
import { Auth } from "firebase/auth";
import { useEffect, useRef, useState } from "react";
import { BiBook, BiExit, BiUser } from "react-icons/bi";
import { useForceUpdate } from "@mantine/hooks";
import ThemeImg from "./ThemeImg";
import { Link } from "react-router-dom";

const AuthComp = () => {
  const forceUpdate = useForceUpdate();

  //Dropdown ref
  const ref = useRef<HTMLDivElement>(null);
  const [auth, setAuth] = useState<Auth | null>(null);

  useEffect(() => {
    firebaseAuth.onAuthStateChanged(() => {
      setAuth(firebaseAuth);
      forceUpdate();
    });
  }, [forceUpdate, auth]);

  const openSignUpModal = () =>
    modals.open({
      modalId: "signUpModal",
      title: (
        <div className="flex items-center gap-4">
          <ThemeImg
            className="h-8"
            light={InfinitySmall}
            dark={InfinitySmallDark}
          />
          <div className="flex flex-col gap-1">
            <div
              className="text-base-content underline underline-offset-2 hover:cursor-pointer hover:text-info hover:no-underline"
              onClick={() => {
                modals.close("signUpModal");
                openSignInModal();
              }}
            >
              Zaloguj się
            </div>
            <p className="font-mono font-bold uppercase">/ Zarejestruj się</p>
          </div>
        </div>
      ),
      children: <SignUp />,
    });
  const openSignInModal = () =>
    modals.open({
      modalId: "signInModal",
      title: (
        <div className="flex items-center gap-4">
          <ThemeImg
            className="h-8"
            light={InfinitySmall}
            dark={InfinitySmallDark}
          />
          <div className="flex flex-col gap-1">
            <p className="font-mono font-bold uppercase">Zaloguj się</p>
            <div
              className="text-base-content underline underline-offset-2 hover:cursor-pointer hover:text-info hover:no-underline"
              onClick={() => {
                modals.close("signInModal");
                openSignUpModal();
              }}
            >
              / Zarejestruj się
            </div>
          </div>
        </div>
      ),
      children: <SignIn />,
    });

  return auth?.currentUser ? (
    <div ref={ref} className="test dropdown dropdown-end">
      <label
        tabIndex={0}
        className="btn relative flex max-w-[7rem] flex-nowrap items-center justify-start gap-2 overflow-hidden px-2 md:max-w-none"
      >
        <span className="text-lg">
          <BiUser />
        </span>
        {auth.currentUser.displayName}
        <div className="absolute bottom-0 right-0 top-0 w-8 bg-gradient-to-l from-base-200 via-base-200 via-20% md:bg-none" />
      </label>
      <ul
        tabIndex={0}
        className="menu  dropdown-content rounded-box w-52 bg-base-100 p-2 shadow"
      >
        <li>
          <Link
            to={"/panel"}
            onClick={(e) => e.currentTarget.blur()}
            className="flex justify-between"
          >
            Panel kursów
            <span>
              <BiBook />
            </span>
          </Link>
        </li>
        <li>
          <Link
            to={"/"}
            onClick={(e) => {
              e.currentTarget.blur();
              auth.signOut();
            }}
            className="flex justify-between"
          >
            Wyloguj
            <span>
              <BiExit />
            </span>
          </Link>
        </li>
      </ul>
    </div>
  ) : (
    <div
      className="btn w-min gap-0 px-2 text-xs md:w-fit"
      onClick={openSignInModal}
    >
      <div className="m-2">
        <span className="inline-block">ZALOGUJ</span>{" "}
        <span className="hidden md:inline">/</span>{" "}
        <span className="inline-block">ZAREJESTRUJ</span>
      </div>
    </div>
  );
};

export default AuthComp;
