import ThemeImg from '../components/ThemeImg';
import InfinitySmall from './../img/InfinitySmall.png';
import InfinitySmallDark from './../img/InfinitySmall-dark.png';

const Main = () => {
	return (
		<div className='w-full'>
			<div className='sticky top-32 -z-20 mt-10 mb-52'>
				<div className='flex gap-4 items-center text-6xl mx-auto w-max mb-24'>
					<p>PROJEKT</p>
					<ThemeImg
						light={InfinitySmallDark}
						dark={InfinitySmall}
						className='h-80'
					/>
					<p>INFINITY</p>
				</div>
				<div className='flex justify-center items-center flex-col'>
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
			</div>

			<div className='flex flex-col items-center gap-2 bg-base-200 relative'>
				<div className='w-full h-32 bg-inherit absolute top-0 -translate-y-2/3 rounded-t-[100%] -z-10 border-t-8 border-base-300' />
				<div className='btn-group -translate-y-1/2'>
					<button className='btn btn-primary'>sprawdź ofertę kursów</button>
					<button className='btn btn-outline'>
						zobacz czego możesz się nauczyć
					</button>
				</div>
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
				TEST <br />
				TEST <br />
			</div>
		</div>
	);
};

export default Main;
