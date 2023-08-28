import styled from 'styled-components';
import _ from 'lodash';
import { useEffect, useRef } from 'react';
import { BiBookBookmark } from 'react-icons/bi';
import { BsChevronDoubleDown } from 'react-icons/bs';
import { useScrollIntoView, useWindowScroll } from '@mantine/hooks';
import { motion } from 'framer-motion';

import useThemeBasedValue from '../hooks/useThemeBasedValue';
import ThemeImg from '../components/ThemeImg';
import { Formula } from '../redux/slices/pathSlice';

import InfinitySmall from './../img/InfinitySmall.png';
import InfinitySmallDark from './../img/InfinitySmall-dark.png';
import CodeDiv1 from './components/CodeDiv1';
import CodeDiv2 from './components/CodeDiv2';
import examFile from './../JSON/exams.json';
import { StatsGroup } from '../components/StatsGroup';
import AnimatedImg from './components/SlideInDiv';

let scrollValue = 0;

const MainDiv = styled.div.attrs(() => {
	return {
		style: {
			opacity: `${(100 - _.clamp(scrollValue * 1.5, 0, 100)).toFixed(2)}%`,
			translate: `0 -${(_.clamp(scrollValue * 1.5, 0, 100) / 4).toFixed(1)}%`,
			scale: `${(1 - _.clamp(scrollValue * 1.5, 0, 100) / 500).toFixed(6)}`,
		},
	};
})``;
const BottomShadowDiv = styled.div.attrs(() => {
	return {
		style: {
			opacity: `${(100 - _.clamp(scrollValue * 10, 0, 100)).toFixed(0)}%`,
		},
	};
})``;
const BottomCurveDiv = styled.div.attrs(() => {
	return {
		style: {
			borderTopRightRadius: `${(100 - _.clamp(scrollValue * 2, 0, 100)).toFixed(
				0
			)}%`,
			borderTopLeftRadius: `${(100 - _.clamp(scrollValue * 2, 0, 100)).toFixed(
				0
			)}%`,
		},
	};
})`
	border-radius: 0;
	@media (max-width: 768px) {
		border-top-left-radius: 0 !important;
		border-top-right-radius: 0 !important;
	}
	filter: drop-shadow(0 0 10px hsla(var(--b3) / 0.5));
`;

const Main = () => {
	//Animation hooks

	//Counting exams
	let examCount = 0;
	for (const examKey in examFile) {
		examCount += examFile[examKey as Formula].length;
	}

	//Calculate scroll value
	const [{ y: scrollY }] = useWindowScroll();
	scrollValue = _.clamp((scrollY / window.innerHeight) * 100, 0, 100);

	//Menage code elements in bg
	const codeRef1 = useRef<HTMLDivElement>(null);
	const codeRef2 = useRef<HTMLDivElement>(null);

	const prevIcon = useRef('.');
	const icon = useThemeBasedValue({
		halloween: '🎃',
		valentine: '❤',
		default: '.',
	});

	useEffect(() => {
		if (codeRef1.current && codeRef2.current) {
			codeRef1.current.innerHTML = codeRef1.current.innerHTML.replaceAll(
				prevIcon.current,
				icon
			);
			codeRef2.current.innerHTML = codeRef2.current.innerHTML.replaceAll(
				prevIcon.current,
				icon
			);
			prevIcon.current = icon;
		}
	}, [icon]);

	//Create scroll into refs
	const { scrollIntoView: scrollIntoInfo, targetRef: infoTargetRef } =
		useScrollIntoView<HTMLDivElement>({
			offset: 320,
			duration: 1200,
		});

	return (
		<div className='w-full'>
			<MainDiv className='sticky top-16 md:top-12 -z-20 px-2 md:mb-24 lg:mb-40'>
				<CodeDiv1 className='block' />
				<CodeDiv2 className='hidden md:block' />
				<div className='flex flex-col lg:flex-row lg:gap-4 md:mb-8 lg:mb-0 lg:pt-16 items-center text-5xl lg:text-6xl font-black mx-auto w-max text-shadow text-shadow-blur-5 text-shadow-slate-600'>
					<p className='text-sky-500'>PROJEKT</p>
					<div className='overflow-hidden lg:h-60 px-2'>
						<ThemeImg
							options={{
								emerald: InfinitySmallDark,
								dark: InfinitySmall,
								halloween: InfinitySmall,
								valentine: InfinitySmallDark,
								default: InfinitySmall,
							}}
							className='h-40 md:h-60 lg:h-80 lg:-translate-y-[12%] drop-shadow-[0_0_10px_#47556980]'
						/>
					</div>
					<p className='text-red-500'>INFINITY</p>
				</div>
				<div className='flex justify-center py-8 md:py-0 lg:items-center flex-col text-shadow text-shadow-blur-5 text-shadow-y-1 text-shadow-[#cdcdce40]'>
					<p className='text-xl md:text-[calc(theme(fontSize.3xl)-.1rem)] font-semibold'>
						Chcesz dobrze zdać{' '}
						<i className='text-secondary-focus'>maturę z informatyki</i> i
						dostać się na wymarzone studia?
					</p>
					<p className='text-lg md:text-2xl md:'>
						Trafiłeś w idealnie miejsce, z nami nauczysz się wszystkiego co Ci
						potrzebne!
					</p>
				</div>
			</MainDiv>

			<div className='flex flex-col items-center gap-2 bg-base-200 relative mt-16 px-4'>
				<BottomCurveDiv className='w-full h-32 bg-inherit absolute -translate-y-16 rounded-t-[100%] -z-10 border-t-8 border-base-300' />
				<BottomShadowDiv className='fixed bottom-0 w-full brightness-75 h-40 bg-gradient-to-t from-base-300' />
				<div className='btn-group btn-group-vertical md:btn-group-horizontal -translate-y-1/2 drop-shadow-lg'>
					<button className='btn btn-primary font-bold'>
						<p>
							<BiBookBookmark />
						</p>{' '}
						sprawdź ofertę kursów
					</button>
					<button onClick={() => scrollIntoInfo()} className='btn btn-outline'>
						zobacz czego możesz się nauczyć{' '}
						<p className='relative top-px animate-bounce'>
							<BsChevronDoubleDown />
						</p>
					</button>
				</div>
				<div className='text-xl mb-4 font-semibold' ref={infoTargetRef}>
					W twojej drodze do wybitnego wyniku pomogą Ci:
				</div>
				<StatsGroup
					className='bg-gradient-to-r from-info to-info text-info-content w-fit lg:mx-24'
					data={[
						{
							title: 'Matura',
							description:
								'Maturę możesz rozwiązać w przeglądarce, zobaczyć sposób rozwiązania oraz poprawność swojej odpowiedzi.',
							stats: `${examCount}x`,
						},
						{
							title: 'Kurs',
							description:
								'Dzięki nim nauczysz się korzystać z programów z pakietu MS Office oraz programować w języku Python. (wiadomości zebrane specjalnie pod maturę - 0 niepotrzebnego zapamiętywania)',
							stats: '4x',
						},
						{
							title: 'Porada',
							description:
								'Podpowiemy Ci co zrobić przed maturą a czego unikać. Zahaczymy o tematy przygotowania sprzętu i porozmawiamy o ważnych datach.',
							stats: '5x',
						},
					]}
				/>
				<section className='my-16'>
					<AnimatedImg x={-100}>
						<div className='h-96 w-96 bg-red-500' />
					</AnimatedImg>
				</section>
				<div className='text-base-200'>
					TEST <br />
					TEST <br />
					TEST <br />
					TEST <br />
					TEST <br />
					TEST <br />
					TEST <br />
					TEST <br />
					TEST <br />
					TEST <br />
					TEST <br />
					TEST <br />
					TEST <br />
					TEST <br />
					TEST <br />
					TEST <br />
					TEST <br />
					TEST <br />
					TEST <br />
					TEST <br />
					TEST <br />
					TEST <br />
					TEST <br />
					TEST <br />
					TEST <br />
					TEST <br />
					TEST <br />
					TEST <br />
					TEST <br />
					TEST <br />
					TEST <br />
					TEST <br />
					TEST <br />
					TEST <br />
					TEST <br />
					TEST <br />
					TEST <br />
					TEST <br />
					TEST <br />
					TEST <br />
					TEST <br />
					TEST <br />
					TEST <br />
					TEST <br />
					TEST <br />
					TEST <br />
					TEST <br />
					TEST <br />
					TEST <br />
					TEST <br />
					TEST <br />
					TEST <br />
					TEST <br />
					TEST <br />
					TEST <br />
					TEST <br />
					TEST <br />
				</div>
			</div>
		</div>
	);
};

export default Main;
