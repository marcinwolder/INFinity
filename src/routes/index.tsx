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

const CodeDiv = styled.div.attrs(() => ({
	theme: useThemeBasedValue(
		'opacity: 0.05; --tw-text-opacity: 1; color: rgb(16 185 129 / var(--tw-text-opacity));',
		'opacity: 0.25; --tw-text-opacity: 1; color: rgb(2 6 23 / var(--tw-text-opacity));'
	),
}))`
	@keyframes pulse {
		50% {
			opacity: 0.1;
		}
	}
	animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
	z-index: -20;

	position: absolute;
	font-size: em;

	${(props) => props.theme}
`;
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
	border-top-left-radius: ${(props) => props.opacity}%;
	border-top-right-radius: ${(props) => props.opacity}%;
	filter: drop-shadow(0 0 10px hsla(var(--b3) / 0.5));
`;

const Main = () => {
	const easeInOutQuint = (x: number): number => {
		return x < 0.5 ? 16 * x * x * x * x * x : 1 - Math.pow(-2 * x + 2, 5) / 2;
	};
	const { scrollIntoView: scrollIntoInfo, targetRef: infoTargetRef } =
		useScrollIntoView<HTMLDivElement>({
			offset: 320,
			duration: 1500,
			easing: easeInOutQuint,
		});

	return (
		<div className='w-full'>
			<MainDiv className='sticky top-16 -z-20 mt-10 mb-36'>
				<CodeDiv className='left-10 -z-20'>
					<code>
						plik = open('Dane_2205/liczby.txt').readlines() <br />
						ilosc = 0 <br />
						pierwsza = -1 <br />
						for wiersz in plik: <br />
						<p className='indent-4'>
							wiersz = wiersz.strip() <br />
						</p>
						<p className='indent-4'>
							if wiersz[0] == wiersz[len(wiersz) -1]: <br />
						</p>
						<p className='indent-8'>
							if pierwsza == -1: <br />
						</p>
						<p className='indent-12'>
							pierwsza = wiersz <br />
						</p>
						<p className='indent-8'>
							ilosc += 1 <br />
						</p>
						<br />
						print('Zadanie 4.1') <br />
						print(ilosc, pierwsza)
					</code>
					<br />
					<br />
					<code>
						plik = open('Dane_2205/liczby.txt').readlines() <br />
						ilosc = 0 <br />
						pierwsza = -1 <br />
						for wiersz in plik: <br />
						<p className='indent-4'>
							wiersz = wiersz.strip() <br />
						</p>
						<p className='indent-4'>
							if wiersz[0] == wiersz[len(wiersz) -1]: <br />
						</p>
						<p className='indent-8'>
							if pierwsza == -1: <br />
						</p>
						<p className='indent-12'>
							pierwsza = wiersz <br />
						</p>
						<p className='indent-8'>
							ilosc += 1 <br />
						</p>
						<br />
						print('Zadanie 4.1') <br />
						print(ilosc, pierwsza)
					</code>
				</CodeDiv>
				<CodeDiv className='right-10 text-right'>
					<code>
						plik = open('Dane_2103/galerie.txt').readlines() <br />
						<br />
						galerie = dict()
						<br />
						for wiersz in plik:
						<br />
						<p className='mr-4'>wiersz = wiersz.strip().split(' ')</p>
						<p className='mr-4'>kraj = wiersz[0]</p>
						<p className='mr-4'>
							galerie[kraj] = 0<br />
						</p>
						<br />
						for wiersz in plik:
						<p className='mr-4'>wiersz = wiersz.strip().split(' ')</p>
						<p className='mr-4'>kraj = wiersz[0]</p>
						<p className='mr-4'>
							galerie[kraj] = galerie[kraj] + 1<br />
						</p>
						<br />
						print('Zadanie 4.1')
						<br />
						for x in galerie.keys():
						<br />
						<p className='mr-4'>print(x, galerie[x])</p>
						<br />
					</code>
					<br />
					<br />
					<code>
						plik = open('Dane_2103/galerie.txt').readlines() <br />
						<br />
						galerie = dict()
						<br />
						for wiersz in plik:
						<br />
						<p className='mr-4'>wiersz = wiersz.strip().split(' ')</p>
						<p className='mr-4'>kraj = wiersz[0]</p>
						<p className='mr-4'>
							galerie[kraj] = 0<br />
						</p>
						<br />
						for wiersz in plik:
						<p className='mr-4'>wiersz = wiersz.strip().split(' ')</p>
						<p className='mr-4'>kraj = wiersz[0]</p>
						<p className='mr-4'>
							galerie[kraj] = galerie[kraj] + 1<br />
						</p>
						<br />
						print('Zadanie 4.1')
						<br />
						for x in galerie.keys():
						<br />
						<p className='mr-4'>print(x, galerie[x])</p>
						<br />
					</code>
				</CodeDiv>
				<div className='flex gap-4 items-center text-6xl font-black mx-auto w-max mb-24 text-shadow text-shadow-blur-5 text-shadow-slate-600'>
					<p className='text-sky-500'>PROJEKT</p>
					<ThemeImg
						light={InfinitySmallDark}
						dark={InfinitySmall}
						className='h-80 drop-shadow-[0_0_10px_#47556980]'
					/>
					<p className='text-red-500'>INFINITY</p>
				</div>
				<div className='flex justify-center items-center flex-col text-shadow text-shadow-blur-5 text-shadow-y-3 text-shadow-[#47556980]'>
					<p className='text-3xl font-semibold'>
						Chcesz dobrze zdać{' '}
						<i className='text-secondary-focus'>maturę z informatyki</i> i
						dostać się na wymarzone studia?
					</p>
					<p className='text-2xl'>
						Trafiłeś w idealnie miejsce, z nami nauczysz się wszystkiego co Ci
						potrzebne!
					</p>
				</div>
			</MainDiv>

			<div className='flex flex-col items-center gap-2 bg-base-200 relative'>
				<BottomCurveDiv className='w-full h-32 bg-inherit absolute top-0 -translate-y-2/3 rounded-t-[100%] -z-10 border-t-8 border-base-300' />
				<BottomShadowDiv className='fixed bottom-0 w-full brightness-75 h-40 bg-gradient-to-t from-base-300' />
				<div className='btn-group -translate-y-1/2 shadow-lg'>
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
					className='bg-gradient-to-r from-info to-info text-info-content w-fit mx-36'
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
