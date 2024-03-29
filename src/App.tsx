import Navbar from "./components/Navbar";
import { useEffect, useLayoutEffect } from "react";
import { themeChange } from "theme-change";
import { Outlet, useLocation } from "react-router-dom";

import { MenuCheckbox } from "./context/menuContext";
import Menu from "./components/Menu";
import { useDispatch } from "react-redux";
import { pathSlice } from "./redux/slices/pathSlice";
import Breadcrumps from "./components/Breadcrumps";

import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";
import { useWindowScroll } from "@mantine/hooks";
import JumpToStart from "./components/JumpToStart";
import { modals } from "@mantine/modals";
import { answerSlice } from "./redux/slices/answersSlice";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, scroll] = useWindowScroll();

  useEffect(() => {
    if (window.localStorage.answers) {
      dispatch(
        answerSlice.actions.changeAns(JSON.parse(window.localStorage.answers)),
      );
    }
  }, []);
  useEffect(() => {
    scroll({ y: 0 });
    themeChange(false);
  }, [scroll]);
  useEffect(() => {
    modals.closeAll();
    dispatch(pathSlice.actions.updatePath());
  }, [location, dispatch]);
  useLayoutEffect(() => {
    // const date = new Date('February 14, 08 12:34:51'); //valentine's day
    // const date = new Date('October 31, 08 21:34:51'); //halloween
    // const date = new Date('February 14, 08 21:34:51'); //halloween
    const date = new Date();

    const hour = date.getHours();
    const day = date.getDate();
    const month = date.getMonth();

    if (month === 1 && day >= 13 && day <= 15) {
      localStorage.setItem("theme", "valentine");
    } else if ((month === 9 && day >= 29) || (month === 10 && day <= 2)) {
      localStorage.setItem("theme", "halloween");
    } else if (
      !localStorage.getItem("theme") ||
      (localStorage.getItem("theme") !== "dark" &&
        localStorage.getItem("theme") !== "emerald")
    ) {
      if (hour < 8 || hour > 19) {
        localStorage.setItem("theme", "dark");
      } else {
        localStorage.setItem("theme", "emerald");
      }
    }
  }, []);

  return (
    <>
      <div className="drawer">
        <MenuCheckbox />
        <div className="drawer-content relative flex min-h-screen flex-col">
          <header className="sticky top-0 z-10 mt-1">
            <Navbar />
          </header>
          <main className="artboard relative flex flex-col items-center gap-4">
            <Breadcrumps />
            <JumpToStart />
            <Outlet />
          </main>
          <footer className="mt-auto">
            <Footer />
          </footer>
        </div>
        <div className="drawer-side z-20">
          <label htmlFor="my-drawer" className="drawer-overlay"></label>
          <Menu />
        </div>
      </div>
      <Toaster position="bottom-right" />
    </>
  );
}

export default App;
