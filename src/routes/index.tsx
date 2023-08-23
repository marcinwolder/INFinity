import ThemeImg from '../components/ThemeImg';
import InfinitySmall from './../img/InfinitySmall.png';
import InfinitySmallDark from './../img/InfinitySmall-dark.png';
import { BiBookBookmark } from 'react-icons/bi';
import { BsChevronDoubleDown } from 'react-icons/bs';
import useThemeBasedValue from '../hooks/useThemeBasedValue';
import styled from 'styled-components';
import { useScrollIntoView, useWindowScroll } from '@mantine/hooks';
import _ from 'lodash';

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

const Main = () => {
	const { scrollIntoView: scrollIntoInfo, targetRef: infoTargetRef } =
		useScrollIntoView<HTMLDivElement>({
			offset: 80,
		});

	return (
		<div className='w-full'>
			<MainDiv className='sticky top-32 -z-20 mt-10 mb-52'>
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
				<div className='flex gap-4 items-center text-6xl mx-auto w-max mb-24 text-shadow text-shadow-blur-6 text-shadow-slate-600 text-shadow-y-2'>
					<p>PROJEKT</p>
					<ThemeImg
						light={InfinitySmallDark}
						dark={InfinitySmall}
						className='h-80 drop-shadow-[0_0_10px_#475569]'
					/>
					<p>INFINITY</p>
				</div>
				<div className='flex justify-center items-center flex-col text-shadow text-shadow-blur-5 text-shadow-slate-600 text-shadow-y-2'>
					<p className='text-3xl font-semibold'>
						Chcesz dobrze zdać{' '}
						<i className='text-secondary-focus'>maturę z informatyki</i> i
						dostać się na wymarzone studia?
					</p>
					<p className='text-2xl'>
						trafiłeś w idealnie miejsce, z nami nauczysz się wszystkiego co Ci
						potrzebne!
					</p>
				</div>
			</MainDiv>

			<div className='flex flex-col items-center gap-2 bg-base-200 relative'>
				<div className='w-full h-32 bg-inherit absolute top-0 -translate-y-2/3 rounded-t-[100%] -z-10 border-t-8 border-base-300' />
				<div className='btn-group -translate-y-1/2'>
					<button className='btn btn-primary font-bold'>
						<p>
							<BiBookBookmark />
						</p>{' '}
						sprawdź ofertę kursów
					</button>
					<button onClick={() => scrollIntoInfo()} className='btn btn-outline'>
						zobacz czego możesz się nauczyć{' '}
						<p className='animate-bounce'>
							<BsChevronDoubleDown />
						</p>
					</button>
				</div>
				<div ref={infoTargetRef}>TEST</div>
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
	);
};

export default Main;
