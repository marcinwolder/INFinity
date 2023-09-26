import styled from "styled-components";
import _ from "lodash";
import { useEffect, useRef } from "react";
import { BiBookBookmark } from "react-icons/bi";
import { BsChevronDoubleDown } from "react-icons/bs";
import { useScrollIntoView, useWindowScroll } from "@mantine/hooks";

import useThemeBasedValue from "../hooks/useThemeBasedValue";
import ThemeImg from "../components/ThemeImg";
import { Formula } from "../redux/slices/pathSlice";

import InfinitySmall from "./../img/InfinitySmall.png";
import InfinitySmallDark from "./../img/InfinitySmall-dark.png";
import CodeDiv1 from "./components/CodeDiv1";
import CodeDiv2 from "./components/CodeDiv2";
import examFile from "./../JSON/exams.json";
import { StatsGroup } from "../components/StatsGroup";
import AnimatedImg from "./components/AnimatedDiv";

import kursPython from "./../img/kursy/kurs-python.png";
import kursExcel from "./../img/kursy/kurs-excel.png";
import kursAccess from "./../img/kursy/kurs-access.png";
import kursAlgo from "./../img/kursy/kurs-algo.png";
import { Link } from "react-router-dom";

import AnimatedPath from "./components/AnimatedPath";
import { Variants, motion } from "framer-motion";
import { Skeleton } from "@mantine/core";

let scrollValue = 0;

const pVariants: Variants = {
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  hidden: { opacity: 0.7, scale: 0.8 },
};

const MainDiv = styled.div.attrs(() => {
  return {
    style: {
      opacity: `${(100 - _.clamp(scrollValue * 1.5, 0, 100)).toFixed(2)}%`,
      translate: `0 -${(_.clamp(scrollValue * 1.5, 0, 100) / 4).toFixed(1)}%`,
      scale: `${(1 - _.clamp(scrollValue * 1.5, 0, 100) / 500).toFixed(6)}`,
    },
  };
})``;
const BottomShadowDiv = styled.div.attrs(() => {
  return {
    style: {
      opacity: `${(100 - _.clamp(scrollValue * 10, 0, 100)).toFixed(0)}%`,
      display: scrollValue < 10 ? "block" : "none",
    },
  };
})``;
const BottomCurveDiv = styled.div.attrs(() => {
  return {
    style: {
      borderTopRightRadius: `${(100 - _.clamp(scrollValue * 2, 0, 100)).toFixed(
        0,
      )}%`,
      borderTopLeftRadius: `${(100 - _.clamp(scrollValue * 2, 0, 100)).toFixed(
        0,
      )}%`,
    },
  };
})`
  border-radius: 0;
  @media (max-width: 768px) {
    border-top-left-radius: 0 !important;
    border-top-right-radius: 0 !important;
  }
  filter: drop-shadow(0 0 10px hsla(var(--b3) / 0.5));
`;

const Main = () => {
  //Counting exams
  let examCount = 0;
  for (const examKey in examFile) {
    examCount += examFile[examKey as Formula].length;
  }

  //Calculate scroll value
  const [{ y: scrollY }] = useWindowScroll();
  scrollValue = _.clamp((scrollY / window.innerHeight) * 100, 0, 100);

  //Menage code elements in bg
  const codeRef1 = useRef<HTMLDivElement>(null);
  const codeRef2 = useRef<HTMLDivElement>(null);

  //TODO: Icon change not working - fix
  const prevIcon = useRef(".");
  const icon = useThemeBasedValue({
    halloween: "🎃",
    valentine: "❤",
    default: ".",
  });

  useEffect(() => {
    if (codeRef1.current && codeRef2.current) {
      codeRef1.current.innerHTML = codeRef1.current.innerHTML.replaceAll(
        prevIcon.current,
        icon,
      );
      codeRef2.current.innerHTML = codeRef2.current.innerHTML.replaceAll(
        prevIcon.current,
        icon,
      );
      prevIcon.current = icon;
    }
  }, [icon]);

  //Create scroll into refs
  const [scroll, scrollTo] = useWindowScroll();
  scroll;
  const { scrollIntoView: scrollIntoInfo, targetRef: infoTargetRef } =
    useScrollIntoView<HTMLDivElement>({
      offset: 320,
      duration: 1200,
    });

  return (
    <div className="w-full">
      <MainDiv className="sticky top-16 -z-20 px-2 md:top-12 md:mb-24 lg:mb-40">
        <CodeDiv1 className="block" />
        <CodeDiv2 className="hidden md:block" />
        <div className="text-shadow mx-auto flex w-max flex-col items-center text-5xl font-black text-shadow-blur-5 text-shadow-slate-600 md:mb-8 lg:mb-0 lg:flex-row lg:gap-4 lg:pt-16 lg:text-6xl">
          <p className="text-sky-500">PROJEKT</p>
          <div className="overflow-hidden px-2 lg:h-60">
            <ThemeImg
              light={InfinitySmallDark}
              dark={InfinitySmall}
              className="h-40 drop-shadow-[0_0_10px_#47556980] md:h-60 lg:h-80 lg:-translate-y-[12%]"
            />
          </div>
          <p className="text-red-500">INFINITY</p>
        </div>
        <div className="text-shadow flex flex-col justify-center py-8 text-shadow-blur-5 text-shadow-y-1 text-shadow-[#cdcdce40] md:py-0 lg:items-center">
          <p className="text-xl font-semibold md:text-[calc(theme(fontSize.3xl)-.1rem)]">
            Chcesz dobrze zdać{" "}
            <i className="text-secondary-focus">maturę z informatyki</i> i
            dostać się na wymarzone studia?
          </p>
          <p className="md: text-lg md:text-2xl">
            Trafiłeś w idealnie miejsce, z nami nauczysz się wszystkiego co Ci
            potrzebne!
          </p>
        </div>
      </MainDiv>

      <div className="relative mt-16 flex flex-col items-center gap-2 border-b-8 border-base-300 bg-base-200 px-4 pb-16">
        <BottomCurveDiv className="absolute -z-10 h-32 w-full -translate-y-16 rounded-t-[100%] border-t-8 border-base-300 bg-inherit" />
        <BottomShadowDiv className="fixed bottom-0 h-40 w-full bg-gradient-to-t from-base-300 brightness-75" />
        <div className="btn-group btn-group-vertical -translate-y-1/2 drop-shadow-lg md:btn-group-horizontal">
          <Link
            onClick={() => scrollTo({ y: 0 })}
            to={"/kursy"}
            className="btn btn-primary font-bold"
          >
            <p>
              <BiBookBookmark />
            </p>{" "}
            sprawdź ofertę kursów
          </Link>
          <button onClick={() => scrollIntoInfo()} className="btn btn-outline">
            zobacz czego możesz się nauczyć{" "}
            <p className="relative top-px animate-bounce">
              <BsChevronDoubleDown />
            </p>
          </button>
        </div>
        <div className="mb-4 text-xl font-semibold" ref={infoTargetRef}>
          W twojej drodze do wybitnego wyniku pomogą Ci:
        </div>
        <StatsGroup
          className="w-fit bg-gradient-to-r from-info to-info text-info-content lg:mx-24"
          data={[
            {
              title: "Matura",
              description:
                "Przygotowane zadania możesz rozwiązywać w przeglądarce a następnie sprawdzic poprawność odpowiedzi lub obejrzeć wideo z rozwiązaniem.",
              stats: `${examCount}x`,
            },
            {
              title: "Kurs",
              description:
                "Dzięki nim nauczysz się korzystać z programów z pakietu MS Office oraz programować w języku Python. (wiadomości zebrane specjalnie pod maturę - 0 niepotrzebnego zapamiętywania)",
              stats: "4x",
            },
            {
              title: "Porada",
              description:
                "Podpowiemy Ci co zrobić przed maturą a czego unikać. Zahaczymy o tematy przygotowania sprzętu i porozmawiamy o ważnych datach.",
              stats: "5x",
            },
          ]}
        />
        <div className="w-full overflow-hidden">
          <AnimatedImg x={-100}>
            <section className="relative mx-auto mt-16 flex w-full min-w-min flex-col items-center md:flex-row md:items-start md:gap-6 lg:w-2/3">
              <div className="relative shrink-0">
                <img
                  src={kursPython}
                  alt="python"
                  className="h-64 w-64 drop-shadow-[0_0_10px_#47556980]"
                />
                <AnimatedPath
                  stroke="#f8ca01"
                  path="M90.5 28.5C167.333 78 306.5 191.5 248.5 249.5C176 322 57.5 304 90.5 227.5C123.5 151 360 9.00003 469.5 11C579 13 680 78.5 594.5 203.5C526.1 303.5 348.333 445.167 268 503.5C208.167 552.5 82.8 661 60 703C31.5 755.5 1.00002 856 14 902C27 948 55.5 992.5 152 990C248.5 987.5 281.5 1040.5 237.5 1152C193.5 1263.5 152 1377.5 152 1436.5C152 1483.7 160.667 1505.83 165 1511"
                />
              </div>
              <div className="p-8 text-lg">
                <motion.p variants={pVariants} className="my-2 text-3xl">
                  Kurs Python
                </motion.p>
                <motion.p variants={pVariants} className="my-2 indent-2">
                  Oprócz przyśpieszonego kursu składni języka nauczysz się
                  dobrego importu danych i poprawnego wypisywania odpowiedzi.
                </motion.p>
                <motion.p variants={pVariants} className="my-2 indent-2">
                  Dowiesz się jak rozwiązać schematyczne zadania oraz{" "}
                  <b>poznasz tok rozumowania</b> przy tych unikatowych.
                </motion.p>
              </div>
            </section>
          </AnimatedImg>
          <AnimatedImg x={100}>
            <section className="relative mx-auto flex w-full min-w-min flex-col-reverse items-center text-right md:flex-row md:items-start md:gap-6 lg:w-2/3">
              <div className="p-8 text-lg">
                <motion.p variants={pVariants} className="my-2 text-3xl">
                  Kurs Excel
                </motion.p>
                <motion.p variants={pVariants} className="my-2 indent-2">
                  Nauczysz się{" "}
                  <b>
                    formatowania danych, tworzenia wykresów oraz tabel
                    przestawnych
                  </b>
                  .
                </motion.p>
                <motion.p variants={pVariants} className="my-2 indent-2">
                  Poznasz potrzebne Ci formuły oraz przydatne sztuczki dzięki
                  którym wykonasz zadania maturalne jeszcze szybciej.
                </motion.p>
              </div>
              <div className="relative shrink-0">
                <img
                  src={kursExcel}
                  alt="excel"
                  className="h-64 w-64 drop-shadow-[0_0_10px_#47556980]"
                />
                <AnimatedPath
                  className="-right-8"
                  stroke="#5da559"
                  path="M5 9.5C103.667 60.6667 301 169.5 301 195.5C301 228 193 74.5 283 65.5C318.333 57.8333 456 105.5 650.5 228C719 275 465 168 533.5 65.5C567.5 26 780.5 80 995 228C1060 311 801 88.5 865.5 42C914 7.03489 1210.9 117.2 1274.5 228C1298 252.5 1321.9 340.5 1229.5 496.5C1137.1 652.5 1247.67 743.167 1314.5 769C1349.17 777.5 1404.1 842.8 1346.5 1036C1300 1151 1266 1210.5 1264 1272"
                />
              </div>
            </section>
          </AnimatedImg>
          <AnimatedImg x={-100}>
            <section className="mx-auto flex w-full min-w-min flex-col items-center md:flex-row md:items-start md:gap-6 lg:w-2/3">
              <div className="relative shrink-0">
                <img
                  src={kursAccess}
                  alt="access"
                  className="h-64 w-64 drop-shadow-[0_0_10px_#47556980]"
                />
                <AnimatedPath
                  stroke="#b62a29"
                  path="M767 173C747.833 118 730.5 38.5 619 13.5C530.5 1.99996 511 11.5 467 173C423 334.5 282.5 280.5 269 173C255.5 65.5 150.5 22.5 77.0001 92C3.50008 161.5 -1.49992 294 27.0001 357.5C55.5001 421 126.5 423 155.5 407.5C184.5 392 160 351.5 125 371C90 390.5 37.9999 529 57.5 600C77.0001 671 101.5 679 144 673C186.5 667 174.5 621 144 634.5C113.5 648 42 715 42 780.5C42 846 63 898 94 925C118.8 946.6 145.333 941.667 155.5 936.5C164.5 923.274 174.8 900.457 144 915C105.5 933.179 63 1007 94 1078.5C125 1150 227 1169.5 213.5 1236.5C200 1303.5 198.5 1336 27.0001 1390"
                />
              </div>
              <div className="p-8 text-lg">
                <motion.p variants={pVariants} className="my-2 text-3xl">
                  Kurs Access
                </motion.p>
                <motion.p variants={pVariants} className="my-2 indent-2">
                  W tym kursie poznasz składnię oraz{" "}
                  <b>zasady budowania zapytań SQL</b> (AccessSQL) oraz dowiesz
                  się ważnych rzeczy o bazach danych.
                </motion.p>
                <motion.p variants={pVariants} className="my-2 indent-2">
                  Nauczysz się także wynajdywać potrzebne do odpowiedzi krotki z
                  bazy danych a także jej formatowanie, sortowanie, filtrację i
                  inne.
                </motion.p>
              </div>
            </section>
          </AnimatedImg>
          <AnimatedImg x={100}>
            <section className="mx-auto flex w-full min-w-min flex-col-reverse items-center text-right md:flex-row md:items-start md:gap-6 lg:w-2/3">
              <div className="p-8 text-lg">
                <motion.p variants={pVariants} className="my-2 text-3xl">
                  Kurs Algorytmiki
                </motion.p>
                <motion.p variants={pVariants} className="my-2 indent-2">
                  Dzięki temu kursowi nauczysz się budowy algorytmów zawartych w
                  podstawie programowej.
                </motion.p>
                <motion.p variants={pVariants} className="my-2 indent-2">
                  Poznasz sposoby{" "}
                  <b>planowania oraz realizacji programowania algorytmów</b> a
                  także dowiesz się jak poprawnie analizować ich działanie.
                </motion.p>
              </div>
              <div className="relative shrink-0">
                <img
                  src={kursAlgo}
                  alt="algo"
                  className="h-64 w-64 drop-shadow-[0_0_10px_#47556980]"
                />
                <AnimatedPath
                  className="-right-4"
                  stroke="#4c4c4c"
                  path="M6.5 268C19.1667 277.167 66.5 283.5 154.5 235.5C264.5 175.5 437.5 89 447 66C456.5 43 408.5 35 374 66C339.5 97 318 145 360.5 168C403 191 597 197 687.5 168C778 139 972.5 80 989.5 47C1006.5 14 968 -3.00002 922 22C876 47 787 81.5 806.5 168C822.1 237.2 1049 263.5 1160.5 268C1247.17 266.833 1434.3 305.6 1489.5 470C1558.5 675.5 1511 749 1489.5 772C1468 795 1408 852 1343 848.5C1278 845 1239.5 793 1276 756.5C1312.5 720 1396.5 758 1443 848.5C1489.5 939 1568.5 1058 1539.5 1185C1510.5 1312 1498.5 1358 1379.5 1473.5C1284.3 1565.9 1079.83 1587.67 989.5 1587C899.167 1586.33 747.6 1558.4 626 1566C504.4 1573.6 420 1594.83 393 1604.5"
                />
              </div>
            </section>
          </AnimatedImg>
        </div>
      </div>
      <div className="relative flex flex-col items-center justify-center p-4">
        <div className="my-8">
          <p className="text-3xl">Nie wiesz czy spodoba Ci się kurs?</p>
          <p className="text-xl">
            Sprawdź <span className="text-secondary">darmowe odcinki</span>{" "}
            dostępne w panelu kursów.
          </p>
          <p className="text-xs opacity-50">
            * Panel z kursami dostępny jest po zalogowaniu na stronie.
          </p>
          <p className="text-xs opacity-50">
            ** Wyróżnione poniżej wykłady to jedynie pare darmowych filmów -
            zaloguj się po więcej.
          </p>
        </div>
        <Skeleton
          style={{ aspectRatio: "16 / 9" }}
          className="my-4 w-full drop-shadow-md lg:w-3/4"
          visible
          animate={false}
        ></Skeleton>
        <Skeleton
          style={{ aspectRatio: "16 / 9" }}
          className="my-4 w-full drop-shadow-md lg:w-3/4"
          visible
          animate={false}
        ></Skeleton>
      </div>
    </div>
  );
};

export default Main;
