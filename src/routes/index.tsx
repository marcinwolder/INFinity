import ThemeImg from '../components/ThemeImg';
import InfinitySmall from './../img/InfinitySmall.png';
import InfinitySmallDark from './../img/InfinitySmall-dark.png';
import { BiBookBookmark } from 'react-icons/bi';
import { BsChevronDoubleDown } from 'react-icons/bs';
import useThemeBasedValue from '../hooks/useThemeBasedValue';
import styled from 'styled-components';
import { useScrollIntoView, useWindowScroll } from '@mantine/hooks';
import _ from 'lodash';
import { StatsGroup } from '../components/StatsGroup';
import { useEffect, useRef } from 'react';
import CodeDiv1 from './components/CodeDiv1';
import CodeDiv2 from './components/CodeDiv2';

const MainDiv = styled.div.attrs(() => {
	const [scroll] = useWindowScroll();
	return {
		opacity: (
			100 - _.clamp((scroll.y / window.innerHeight) * 1.5 * 100, 0, 100)
		).toFixed(0),
		effect: _.clamp(
			(scroll.y / window.innerHeight) * 1.5 * 100,
			0,
			100
		).toFixed(0),
	};
})`
	opacity: ${(props) => props.opacity}%;
	scale: ${(props) => 1 - Number(props.effect) / 500};
	translate: 0 -${(props) => Number(props.effect) / 4}%;
`;
const BottomShadowDiv = styled.div.attrs(() => {
	const [scroll] = useWindowScroll();
	return {
		opacity: (
			100 - _.clamp((scroll.y / window.innerHeight) * 1000, 0, 100)
		).toFixed(0),
	};
})`
	opacity: ${(props) => props.opacity}%;
`;
const BottomCurveDiv = styled.div.attrs(() => {
	const [scroll] = useWindowScroll();
	return {
		opacity: (
			100 - _.clamp((scroll.y / window.innerHeight) * 200, 0, 100)
		).toFixed(0),
	};
})`
	border-radius: 0;
	@media (min-width: 768px) {
		border-top-left-radius: ${(props) => props.opacity}%;
		border-top-right-radius: ${(props) => props.opacity}%;
	}
	filter: drop-shadow(0 0 10px hsla(var(--b3) / 0.5));
`;

const Main = () => {
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

	const { scrollIntoView: scrollIntoInfo, targetRef: infoTargetRef } =
		useScrollIntoView<HTMLDivElement>({
			offset: 320,
			duration: 1500,
			easing: (x: number): number => {
				return x < 0.5
					? 16 * x * x * x * x * x
					: 1 - Math.pow(-2 * x + 2, 5) / 2;
			},
		});

	return (
		<div className='w-full'>
			<MainDiv className='sticky top-16 -z-20 mt-10 mb-36 px-2'>
				<CodeDiv1 className='block' />
				<CodeDiv2 className='hidden md:block' />
				<div className='flex flex-col lg:flex-row lg:gap-4 items-center text-5xl lg:text-6xl font-black mx-auto w-max mb-12 md:mb-24 text-shadow text-shadow-blur-5 text-shadow-slate-600'>
					<p className='text-sky-500'>PROJEKT</p>
					<ThemeImg
						options={{
							emerald: InfinitySmallDark,
							dark: InfinitySmall,
							halloween: InfinitySmall,
							valentine: InfinitySmallDark,
							default: InfinitySmall,
						}}
						className='h-40 md:h-60 lg:h-80 -my-4 lg:my-0 drop-shadow-[0_0_10px_#47556980]'
					/>
					<p className='text-red-500'>INFINITY</p>
				</div>
				<div className='flex justify-center lg:items-center flex-col text-shadow text-shadow-blur-5 text-shadow-y-1 text-shadow-[#cdcdce80]'>
					<p className=' text-[calc(theme(fontSize.3xl)-.1rem)] font-semibold'>
						Chcesz dobrze zdać{' '}
						<i className='text-secondary-focus'>maturę z informatyki</i> i
						dostać się na wymarzone studia?
					</p>
					<p className='text-2xl md:'>
						Trafiłeś w idealnie miejsce, z nami nauczysz się wszystkiego co Ci
						potrzebne!
					</p>
				</div>
			</MainDiv>

			<div className='flex flex-col items-center gap-2 bg-base-200 relative px-2 lg:px-0'>
				<BottomCurveDiv className='w-full h-32 bg-inherit absolute top-0 -translate-y-2/3 rounded-t-[100%] -z-10 border-t-8 border-base-300' />
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
							stats: '1x',
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
