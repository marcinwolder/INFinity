import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { useWindowScroll } from "@mantine/hooks";

const AnimatedDiv: React.FC<React.PropsWithChildren<{ x: number }>> = ({
  children,
  x,
}) => {
  const variant = {
    visible: { x: 0, opacity: 1, scale: 1 },
    hidden: { x, opacity: 0, scale: 0.7 },
  };
  const control = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref);
  const [scroll] = useWindowScroll();

  useEffect(() => {
    if (inView) control.start("visible");
  }, [control, inView]);
  useEffect(() => {
    if (scroll.y === 0) control.start("hidden");
  }, [control, scroll]);

  return (
    <motion.div
      animate={control}
      transition={{
        delay: 0.1,
        duration: 0.5,
        staggerChildren: 0.15,
        delayChildren: 0.2,
      }}
      initial="hidden"
      variants={variant}
      ref={ref}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedDiv;
