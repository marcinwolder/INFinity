import { useWindowScroll } from '@mantine/hooks';
import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import { BsArrow90DegLeft } from 'react-icons/bs';
import { usePathElements } from '../redux/slices/pathSlice';
import _ from 'lodash';

const JumpToStart = () => {
	const [scrollVal, scroll] = useWindowScroll();

	const control = useAnimation();

	const shouldAnimate = scrollVal.y >= 200;

	useEffect(() => {
		if (shouldAnimate) control.start('visible');
		else control.start('hidden');
	}, [control, shouldAnimate]);

	const path = usePathElements();

	if (_.last(path) === '/') return <></>;

	return (
		<motion.div
			onClick={() => {
				scroll({ y: 0 });
			}}
			variants={{
				hidden: {
					translate: '-110%',
				},
				visible: {
					translate: 0,
				},
			}}
			initial='hidden'
			animate={control}
			className='z-10 fixed left-0 bottom-32 btn border border-l-0 border-base-content rounded-l-none hover:cursor-pointer'>
			<span className='hidden md:block'>Wróć do góry </span>
			<span className='rotate-90'>
				<BsArrow90DegLeft />
			</span>
		</motion.div>
	);
};

export default JumpToStart;
