import { Skeleton } from "@mantine/core";
import { AiFillLock } from "react-icons/ai";
import { FaPlay } from "react-icons/fa";
import { TfiVideoClapper } from "react-icons/tfi";
import { useNavigate } from "react-router-dom";
import { useGetUserDocQuery } from "../../redux/apis/userDataApi";

const TestCourses = () => {
  return (
    <>
      <div className="group relative my-2 h-24 w-full select-none rounded border border-base-300 opacity-75 shadow-md">
        <span className="absolute inset-0 flex flex-col items-center justify-center text-xl">
          <span className="hidden group-hover:block">
            <FaPlay />
          </span>
        </span>
        <span className="absolute inset-0 flex flex-col items-center justify-center text-xl group-hover:cursor-pointer group-hover:opacity-60">
          <p>Python #1</p>
          <p className="text-sm italic">
            <span className="text-secondary">wykład:</span> dlaczego python?
          </p>
        </span>
      </div>
      <div className="relative my-2 h-max w-full select-none rounded border border-base-300 p-2 opacity-30 shadow-md">
        <p className="text-md font-semibold">Python #2</p>
        <p className="indent-2 text-sm italic">
          <span className="text-secondary">wykład: </span>typy danych
        </p>
        <span className="absolute inset-0 flex items-center justify-center text-2xl">
          <AiFillLock />
        </span>
      </div>
      <div className="stack -my-2 w-full opacity-30 ">
        <div className="relative my-2 h-max w-full select-none rounded border border-base-300 bg-base-200 p-2 opacity-30 shadow-md">
          <p className="text-md font-semibold">Python #3</p>
          <p className="indent-2 text-sm italic">
            <span className="text-accent">ćwiczenia: </span>typy danych
          </p>
          <span className="absolute inset-0 flex items-center justify-center text-2xl">
            <AiFillLock />
          </span>
        </div>
        <div className="relative top-4 my-2 h-max w-full select-none rounded border border-base-300 bg-base-200 p-2 opacity-30 shadow-md">
          <p className="text-md font-semibold">Python #4</p>
          <p className="indent-2 text-sm italic">
            <span className="text-secondary">wykład: </span>ważne metody
          </p>
          <span className="absolute inset-0 flex items-center justify-center text-2xl">
            <AiFillLock />
          </span>
        </div>
        <div className="relative top-8 my-2 h-max w-full select-none rounded border border-base-300 bg-base-200 p-2 opacity-30 shadow-md">
          <p className="text-md font-semibold">Python #3</p>
          <p className="indent-2 text-sm italic">
            <span className="text-primary">zadanie: </span>ważne metody
          </p>
          <span className="absolute inset-0 flex items-center justify-center text-2xl">
            <AiFillLock />
          </span>
        </div>
      </div>
    </>
  );
};

const Panel = () => {
  const navigate = useNavigate();

  const { isError, isSuccess, data } = useGetUserDocQuery({});

  if (isError) navigate("/");
  return (
    <div className="flex w-full items-center">
      <div className="h-[calc(100vh-15rem)] w-64 overflow-hidden rounded-lg rounded-l-none bg-base-200 p-4 ">
        <p className="font-mono font-semibold">Dostępne Kursy:</p>
        <div className="my-2 h-[calc(100%-2rem)] overflow-y-scroll pr-4">
          {isSuccess ? (
            data.courses[0] && data.courses[0] === "__test__" ? (
              <TestCourses />
            ) : (
              <></>
            )
          ) : (
            <div className="mx-auto flex items-center gap-4">
              Ładowanie{" "}
              <span className="loading loading-infinity loading-lg"></span>
            </div>
          )}
        </div>
      </div>
      <Skeleton
        style={{}}
        animate={false}
        className="mx-auto max-h-full w-[calc(100%-32rem)]"
      >
        <span className="absolute inset-0 z-20 flex animate-pulse items-center justify-center text-[12rem] text-neutral-500 opacity-25">
          <TfiVideoClapper />
        </span>
        <div style={{ position: "relative", paddingTop: "56.25%" }}>
          <iframe
            loading="lazy"
            style={{
              border: "0",
              position: "absolute",
              top: "0",
              height: "100%",
              width: "100%",
            }}
            allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;"
            allowFullScreen
          ></iframe>
        </div>
      </Skeleton>
    </div>
  );
};

export default Panel;
