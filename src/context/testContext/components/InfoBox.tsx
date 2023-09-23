const InfoBox: React.FC<React.PropsWithChildren<{ taskNums: string[] }>> = ({
  taskNums,
  children,
}) => {
  return (
    <div className="my-7 select-none rounded-lg bg-white p-3 shadow-md shadow-neutral-500">
      <h1 className={"text-md rounded bg-black pl-2 font-bold text-white"}>
        {`Informacje do zada${
          taskNums.length > 1 ? "ń" : "nia"
        } ${taskNums.join(", ")}.`}
      </h1>
      <div className="px-1 text-black">{children}</div>
    </div>
  );
};

export default InfoBox;
