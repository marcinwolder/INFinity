import { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

const SlideInDiv: React.FC<React.PropsWithChildren<{ x: number }>> = ({
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

	useEffect(() => {
		if (inView) control.start('visible');
	}, [control, inView]);

	return (
		<motion.div
			animate={control}
			transition={{ delay: 0.1, duration: 0.5 }}
			initial='hidden'
			variants={variant}
			ref={ref}>
			{children}
		</motion.div>
	);
};

export default SlideInDiv;
