const TestImg: React.FC<{ img: string; className?: string }> = ({
  img,
  className,
}) => {
  return (
    <img
      src={img}
      draggable={false}
      className={"select-none pt-2 " + className}
    />
  );
};

export default TestImg;
