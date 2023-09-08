import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

const AnimatedToast: React.FC<React.PropsWithChildren> = ({ children }) => {
  const variant = {
    visible: { opacity: 1, scale: 1, translateX: 0 },
    hidden: { opacity: 0, scale: 0.6, translateX: "10rem" },
  };
  const control = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref);

  useEffect(() => {
    if (inView) {
      control.start("visible");
      setTimeout(() => control.start("hidden"), 4000);
    }
  }, [control, inView]);

  return (
    <motion.div
      animate={control}
      transition={{ duration: 0.3, ease: "circIn" }}
      initial="hidden"
      variants={variant}
      ref={ref}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedToast;
