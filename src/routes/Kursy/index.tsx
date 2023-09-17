import React, { useState } from "react";

import kursPython from "../../img/kursy/kurs-python.png";
import kursExcel from "../../img/kursy/kurs-excel.png";
import kursAccess from "../../img/kursy/kurs-access.png";
import kursAlgo from "../../img/kursy/kurs-algo.png";
import { BsArrowBarRight, BsArrowReturnRight } from "react-icons/bs";
import useHandleStripe from "../../hooks/useHandleStripe";
import { modals } from "@mantine/modals";
import BuyOption from "./components/BuyOption";
import styled from "styled-components";
import { BiLoaderAlt } from "react-icons/bi";
import clsx from "clsx";

const AfterDiv = styled.div`
  &:after {
    content: "";
    inset: 0;
    position: absolute;
    background: transparent;
  }
`;
const Item: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <AfterDiv className="relative flex w-full cursor-pointer items-center justify-center">
      {children}
    </AfterDiv>
  );
};

const Fallback: React.FC = () => {
  return <div>Stripe is loading</div>;
};

const Kursy: React.FC = () => {
  const [buyBtn, setBuyBtn] = useState(false);

  const handleStripe = useHandleStripe();

  return (
    <React.Suspense fallback={<Fallback />}>
      <div className="mb-16 flex flex-col items-center gap-4 px-4 lg:flex-row lg:items-stretch">
        <div className="mt-7 flex w-full shrink-0 flex-col rounded-sm border border-base-300 bg-base-200 p-6 px-8 lg:w-fit">
          <code className="text-xl font-black uppercase tracking-widest text-primary">
            pojedynczy kurs
          </code>
          <div className="h-10 text-sm">Idealny aby uzupełnić braki.</div>
          <div className="divider" />
          <div>
            <span className="text-4xl font-bold">80</span>
            <span className="text-2xl">,00 PLN</span>
          </div>
          <div className="ml-4 text-xs">/ jednorazowa płatność</div>
          <div className="divider" />
          <div className="mb-2 h-10 text-sm">
            Zawiera jeden z dostępnych kursów:
          </div>
          <div className="mb-16 flex items-center gap-1">
            <img className="h-14" src={kursPython} alt="kursPython" />
            <div>/</div>
            <img className="h-14" src={kursExcel} alt="kursExcel" />
            <div>/</div>
            <img className="h-14" src={kursAccess} alt="kursAccess" />
            <div>/</div>
            <img className="h-14" src={kursAlgo} alt="kursAlgo" />
          </div>
          <button
            onClick={() =>
              modals.open({
                title: (
                  <p className="text-xs">
                    *Ten zakup wymaga dodatkowego wyboru
                  </p>
                ),
                children: (
                  <BuyOption
                    className="h-[30rem]"
                    options={{
                      kursPython: {
                        element: (
                          <Item>
                            <img
                              className="h-24"
                              src={kursPython}
                              alt="kursPython"
                            />
                          </Item>
                        ),
                        products: [{ name: "kursPython", price: "full" }],
                      },
                      kursAlgo: {
                        element: (
                          <Item>
                            <img
                              className="h-24"
                              src={kursAlgo}
                              alt="kursAlgo"
                            />
                          </Item>
                        ),
                        products: [{ name: "kursAlgo", price: "full" }],
                      },
                      kursExcel: {
                        element: (
                          <Item>
                            <img
                              className="h-24"
                              src={kursExcel}
                              alt="kursExcel"
                            />
                          </Item>
                        ),
                        products: [{ name: "kursExcel", price: "full" }],
                      },
                      kursAccess: {
                        element: (
                          <Item>
                            <img
                              className="h-24"
                              src={kursAccess}
                              alt="kursAccess"
                            />
                          </Item>
                        ),
                        products: [{ name: "kursAccess", price: "full" }],
                      },
                    }}
                  />
                ),
              })
            }
            className="btn btn-success btn-outline btn-sm ml-auto mt-auto block w-fit hover:btn-active"
          >
            Wybierz kurs
          </button>
        </div>
        <div className="relative mt-8 w-[calc(100%-theme(spacing.2))] shrink-0 rounded-sm outline outline-4 outline-success lg:mt-0 lg:w-fit">
          <div className="bg-success py-1 text-center text-sm font-semibold text-success-content">
            Najczęściej Kupowany
          </div>
          <div className="rounded-sm bg-base-200 p-6 px-8 outline-success">
            <code className="text-xl font-black uppercase tracking-widest text-primary">
              Pełen zestaw kursów
            </code>
            <div className="h-10 text-sm">Pełne przygotowanie do matury.</div>
            <div className="divider" />
            <span className="text-4xl font-bold">200</span>
            <span className="text-2xl">,00 PLN</span>
            <div className="ml-4 text-xs">/ jednorazowa płatność</div>
            <div className="divider" />
            <div className="mb-2 h-10 text-sm">
              Zawiera wszystkie dostępne kursy:
            </div>
            <div className="flex items-center [&>*]:-mr-6">
              <img className="h-14" src={kursPython} alt="kursPython" />
              <img className="h-14" src={kursExcel} alt="kursExcel" />
              <img className="h-14" src={kursAccess} alt="kursAccess" />
              <img className="h-14" src={kursAlgo} alt="kursAlgo" />
            </div>
            <p className="text-sm">Dodatkowo:</p>
            <div className="text-xs">
              <p className="flex items-center gap-2">
                <span className="text-success">
                  <BsArrowBarRight />
                </span>{" "}
                Notatki z podsumowaniem
              </p>
              <p className="flex items-center gap-2">
                <span className="text-success">
                  <BsArrowBarRight />
                </span>
                Cheatsheet z każdego etapu egzaminu
              </p>
              <p className="ml-px flex gap-2">
                <span className="mt-px text-success">
                  <BsArrowReturnRight />
                </span>{" "}
                <span>
                  Zapis odpowiedzi i śledzenie <br />
                  postępu rozwiązywania matur
                </span>
              </p>
            </div>
            <button
              onClick={() => {
                handleStripe(
                  [
                    { name: "kursPython", price: "second" },
                    { name: "kursAlgo", price: "second" },
                    { name: "kursExcel", price: "second" },
                    { name: "kursAccess", price: "second" },
                    { name: "dodatki", price: "full" },
                  ],
                  () => setBuyBtn(false),
                );
                setBuyBtn(true);
              }}
              className={clsx(
                "btn btn-success btn-sm ml-auto mt-16 block w-24 hover:btn-neutral",
                { "btn-disabled": buyBtn },
              )}
            >
              {buyBtn ? (
                <span className="mx-auto flex animate-spin justify-center">
                  <BiLoaderAlt />
                </span>
              ) : (
                "KUP"
              )}
            </button>
          </div>
          <div className="absolute inset-0 -z-10 bg-success" />
        </div>
        <div className="mt-7 flex w-full flex-col rounded-sm border border-base-300 bg-base-200 p-6 px-8 lg:w-fit">
          <code className="flex items-center gap-2 text-xl font-black uppercase tracking-widest text-secondary">
            zestaw 2in1{" "}
            <div className="badge badge-neutral font-sans text-xs font-semibold uppercase tracking-tighter">
              Nowość
            </div>
          </code>
          <div className="h-10 text-sm">
            <span className="inline-block">
              Kursy kierunkowe - <b>MS Office</b>
            </span>{" "}
            <span className="inline-block">
              lub <b>Python + algorytmika</b>.
            </span>
          </div>
          <div className="divider" />
          <div>
            <span className="text-4xl font-bold">120</span>
            <span className="text-2xl">,00 PLN</span>
          </div>
          <div className="ml-4 text-xs">/ jednorazowa płatność</div>
          <div className="divider" />
          <div className="mb-2 h-10 text-sm">
            <span className="inline-block">Zawiera jeden z dostępnych</span>{" "}
            <span className="inline-block">pakietów (2 kursy):</span>
          </div>
          <div className="mb-16 flex items-center gap-1 [&>*:nth-child(3n+2)]:-mr-8">
            <img className="h-14" src={kursPython} alt="kursPython" />
            <span></span>
            <img className="h-14" src={kursAlgo} alt="kursAlgo" />
            <div>/</div>
            <img className="h-14" src={kursExcel} alt="kursExcel" />
            <span></span>
            <img className="h-14" src={kursAccess} alt="kursAccess" />
          </div>
          <button
            onClick={() =>
              modals.open({
                title: (
                  <p className="text-xs">
                    *Ten zakup wymaga dodatkowego wyboru
                  </p>
                ),
                children: (
                  <BuyOption
                    className="h-96"
                    options={{
                      zestawProgramowania: {
                        element: (
                          <Item>
                            <img
                              className="h-24 translate-x-5"
                              src={kursPython}
                              alt="kursPython"
                            />
                            <img
                              className="h-24 -translate-x-5"
                              src={kursAlgo}
                              alt="kursAlgo"
                            />
                          </Item>
                        ),
                        products: [
                          { name: "kursPython", price: "first" },
                          { name: "kursAlgo", price: "first" },
                        ],
                      },
                      zestawOffice: {
                        element: (
                          <Item>
                            <img
                              className="h-24 translate-x-5"
                              src={kursExcel}
                              alt="kursExcel"
                            />
                            <img
                              className="h-24 -translate-x-5"
                              src={kursAccess}
                              alt="kursAccess"
                            />
                          </Item>
                        ),
                        products: [
                          { name: "kursExcel", price: "first" },
                          { name: "kursAccess", price: "first" },
                        ],
                      },
                    }}
                  />
                ),
              })
            }
            className="btn btn-success btn-outline btn-sm ml-auto mt-auto block w-fit hover:btn-active"
          >
            Wybierz kurs
          </button>
        </div>
      </div>
      <p className="px-4 text-xs opacity-60">
        *Wykupiony dostęp do kursów przyznawany jest na jeden sezon maturalny
        (od momentu zakupu aż do końca matur - łącznie z sesją dodatkową oraz
        poprawkową)
      </p>
    </React.Suspense>
  );
};

export default Kursy;
