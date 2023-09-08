import { useWindowScroll } from "@mantine/hooks";
import classNames from "classnames";
import { motion, useAnimation, useInView } from "framer-motion";
import React, { useEffect, useRef } from "react";

const AnimatedPath: React.FC<
  {
    path: string;
    stroke: string;
  } & React.ComponentProps<"svg">
> = ({ path, stroke, className }) => {
  const control = useAnimation();
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref);
  const [scroll] = useWindowScroll();

  useEffect(() => {
    if (inView) control.start("visible");
  }, [control, inView]);
  useEffect(() => {
    if (scroll.y === 0) control.start("hidden");
  }, [control, scroll]);

  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { type: "spring", duration: 5, bounce: 0.2, delay: 0.5 },
        opacity: { duration: 0.01 },
      },
    },
  };

  return (
    <>
      <motion.svg
        className={classNames("absolute top-0 h-full w-full", className)}
        ref={ref}
        viewBox={`0 0 ${(ref.current?.height.baseVal.value || 0) * 6.5} ${
          (ref.current?.width.baseVal.value || 0) * 6.5
        }`}
      >
        <motion.path
          animate={control}
          variants={draw}
          fill="transparent"
          d={path}
          stroke={stroke}
          strokeWidth="20"
        />
      </motion.svg>
    </>
  );
};

export default AnimatedPath;
