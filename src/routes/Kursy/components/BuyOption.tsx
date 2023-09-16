import { motion, AnimatePresence } from "framer-motion";
import { ReactNode, useRef, useState } from "react";
import { BiCartDownload, BiLoaderAlt } from "react-icons/bi";
import { AiFillCaretLeft } from "react-icons/ai";
import clsx from "clsx";
import useHandleStripe, { Course, Price } from "../../../hooks/useHandleStripe";
import { modals } from "@mantine/modals";

const BuyOption: React.FC<{
  options: {
    [name: string]: {
      element: ReactNode;
      products: { name: Course; price: Price }[];
    };
  };
  className: string;
}> = ({ options, className }) => {
  const handleStripe = useHandleStripe();

  const products = Object.keys(options);

  const [selected, setSelected] = useState("");
  const [hover, setHover] = useState("");
  const [buyBtnClicked, seyBuyBtnClicked] = useState(false);

  const dragParentRef = useRef<HTMLDivElement>(null);
  const cartRef = useRef<HTMLDivElement>(null);

  const [touchCartHovered, setTouchCartHovered] = useState(false);

  const calculateCartHovered = (itemEl: Element) => {
    if (!cartRef.current) return;

    const item = itemEl.getBoundingClientRect();
    const cart = cartRef.current.getBoundingClientRect();

    if (
      item.bottom >= cart.top - 10 &&
      item.top - 10 <= cart.bottom &&
      item.right >= cart.left - 10 &&
      item.left - 10 <= cart.right
    ) {
      setTouchCartHovered(true);
    } else setTouchCartHovered(false);
  };

  const items = products.map((product) => (
    <motion.div
      className={clsx({ "drop-shadow-xl": hover && hover === product })}
      layoutId={product}
      key={product}
      onTapStart={(e) => {
        setHover(product);
        calculateCartHovered(e.target as Element);
      }}
      drag
      dragConstraints={dragParentRef}
      dragElastic={0.1}
      dragSnapToOrigin
      exit={{
        y: -40,
        scale: 0.7,
        opacity: 0,
        transition: hover === product ? { duration: 0 } : {},
      }}
      initial={{
        y: -40,
        scale: 0.7,
        opacity: 0,
      }}
      animate={{
        y: 0,
        scale: hover ? (product === hover ? 1.1 : 0.9) : 1,
        opacity: 1,
        zIndex: product === hover ? 2 : 1,
      }}
      onDrag={(e) => {
        calculateCartHovered(e.target as Element);
      }}
      onDragEnd={() => {
        if (touchCartHovered) setSelected(product);
        else {
          setHover("");
        }
      }}
    >
      {options[product].element}
    </motion.div>
  ));
  return (
    <motion.div
      layout
      className={clsx(
        "relative mx-auto flex flex-col overflow-hidden",
        className,
      )}
      ref={dragParentRef}
    >
      <AnimatePresence presenceAffectsLayout mode="popLayout">
        {!selected && (
          <motion.div key={"choosePanel"} className="h-auto w-full pb-8">
            <motion.div
              layout
              className="grid grid-cols-2 justify-items-center gap-y-4 py-4"
            >
              <motion.p
                exit={{
                  y: -100,
                  scale: 0.7,
                  opacity: 0,
                }}
                initial={{
                  y: -100,
                  scale: 0.7,
                  opacity: 0,
                }}
                animate={{
                  y: 0,
                  scale: 1,
                  opacity: 1,
                }}
                className="col-span-2 mb-4 text-center font-semibold"
              >
                <span className="inline-block">Przeciągnij kurs</span>{" "}
                <span className="inline-block">
                  który chcesz kupić do koszyka
                </span>
              </motion.p>
              {items}
            </motion.div>
          </motion.div>
        )}
        {selected && (
          <motion.div
            layout
            key={"backBtn"}
            className="w-full"
            exit={{
              x: -40,
              scale: 0.7,
              opacity: 0,
            }}
            initial={{
              x: -40,
              scale: 0.7,
              opacity: 0,
            }}
            animate={{
              x: 0,
              scale: 1,
              opacity: 1,
            }}
          >
            <motion.button
              layout
              onClick={() => {
                setSelected("");
                setHover("");
              }}
              className="text-md flex items-center text-base-content transition-colors hover:text-error"
            >
              <span className="text-3xl">
                <AiFillCaretLeft />
              </span>{" "}
              powrót
            </motion.button>
          </motion.div>
        )}
        {selected && (
          <motion.div
            layout
            className="flex h-full flex-col items-center justify-center gap-2"
          >
            <motion.p
              exit={{
                y: -40,
                scale: 0.7,
                opacity: 0,
              }}
              initial={{
                y: -40,
                scale: 0.7,
                opacity: 0,
              }}
              animate={{
                y: 0,
                scale: 1,
                opacity: 1,
              }}
              className="mb-2 text-lg font-medium"
            >
              Wybrano poniższy kurs:
            </motion.p>
            <motion.div
              exit={{
                y: 80,
                scale: 0.7,
                opacity: 0,
              }}
              initial={{
                y: 80,
                scale: 0.7,
                opacity: 0,
              }}
              animate={{
                y: 0,
                scale: 1.5,
                opacity: 1,
                transition: {
                  duration: 0.3,
                },
              }}
              key={"product"}
              className="mt-auto"
            >
              {options[selected].element}
            </motion.div>
          </motion.div>
        )}
        <motion.div
          key={"cart"}
          animate={{
            opacity: 1,
            scale: selected ? 0.6 : hover && touchCartHovered ? 1 : 0.9,
          }}
          initial={{ opacity: 0 }}
          layout
          className={clsx(
            "z-10 flex h-fit w-full justify-center text-9xl transition-colors",
            {
              "text-success": !selected && hover && touchCartHovered,
            },
          )}
        >
          <div ref={cartRef}>
            <BiCartDownload />
          </div>
        </motion.div>
        {selected && (
          <motion.div
            layout
            key={"buyPanel"}
            exit={{
              y: 40,
              scale: 0.7,
              opacity: 0,
            }}
            initial={{
              y: 40,
              scale: 0.7,
              opacity: 0,
            }}
            animate={{
              y: 0,
              scale: 1,
              opacity: 1,
              transition: { delay: 0.2 },
            }}
            className="flex h-fit w-full flex-col items-center justify-center"
          >
            <button
              onClick={() => {
                handleStripe(options[selected].products, modals.closeAll);
                seyBuyBtnClicked(true);
              }}
              className={clsx(
                "btn btn-primary relative m-4 w-52 active:btn-outline",
                { "btn-disabled": buyBtnClicked },
              )}
            >
              {buyBtnClicked ? (
                <motion.span layout className="mx-auto animate-spin">
                  <BiLoaderAlt />
                </motion.span>
              ) : (
                "Przejdź do płatności"
              )}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default BuyOption;
