import React from 'react';

import kursPython from './../img/kursy/kurs-python.png';
import kursExcel from './../img/kursy/kurs-excel.png';
import kursAccess from './../img/kursy/kurs-access.png';
import kursAlgo from './../img/kursy/kurs-algo.png';

const Kursy: React.FC = () => {
	return (
		<>
			<div className='px-4 flex flex-col lg:flex-row gap-4 items-center lg:items-end'>
				<div className='border border-base-300 bg-base-200 p-6 px-8 rounded-sm w-full lg:w-fit shrink-0'>
					<code className='text-primary uppercase font-black text-xl tracking-widest'>
						pojedynczy kurs
					</code>
					<div className='text-sm h-10'>Idealny aby uzupełnić braki.</div>
					<div className='divider' />
					<span className='text-4xl font-bold'>80</span>
					<span className='text-2xl'>,00 PLN</span>
					<div className='text-xs ml-4'>/ jednorazowa płatność</div>
					<div className='divider' />
					<div className='text-sm mb-2 h-10'>
						Zawiera jeden z dostępnych kursów:
					</div>
					<div className='flex items-center gap-1'>
						<img className='h-14' src={kursPython} alt='kursPython' />
						<div>/</div>
						<img className='h-14' src={kursExcel} alt='kursExcel' />
						<div>/</div>
						<img className='h-14' src={kursAccess} alt='kursAccess' />
						<div>/</div>
						<img className='h-14' src={kursAlgo} alt='kursAlgo' />
					</div>
					<button className='block btn-success hover:btn-neutral btn btn-sm w-24 ml-auto mt-16'>
						Kup
					</button>
				</div>
				<div className='relative rounded-sm outline outline-success outline-4 w-[calc(100%-theme(spacing.2))] lg:w-fit shrink-0'>
					<div className='text-center text-sm font-semibold py-1 bg-success text-success-content'>
						Najczęściej Kupowany
					</div>
					<div className='bg-base-200 p-6 px-8 rounded-sm outline-success'>
						<code className='text-primary uppercase font-black text-xl tracking-widest'>
							Pełen zestaw kursów
						</code>
						<div className='text-sm h-10'>Pełne przygotowanie do matury.</div>
						<div className='divider' />
						<span className='text-4xl font-bold'>200</span>
						<span className='text-2xl'>,00 PLN</span>
						<div className='text-xs ml-4'>/ jednorazowa płatność</div>
						<div className='divider' />
						<div className='text-sm mb-2 h-10'>
							Zawiera wszystkie dostępne kursy:
						</div>
						<div className='flex items-center [&>*]:-mr-6'>
							<img className='h-14' src={kursPython} alt='kursPython' />
							<img className='h-14' src={kursExcel} alt='kursExcel' />
							<img className='h-14' src={kursAccess} alt='kursAccess' />
							<img className='h-14' src={kursAlgo} alt='kursAlgo' />
						</div>
						<button className='block btn-success hover:btn-neutral btn btn-sm w-24 ml-auto mt-16'>
							Kup
						</button>
					</div>
					<div className='absolute -z-10 inset-0 bg-success' />
				</div>
				<div className='border border-base-300 bg-base-200 p-6 px-8 rounded-sm w-full lg:w-fit'>
					<code className='text-secondary uppercase font-black text-xl tracking-widest flex items-center gap-2'>
						zestaw 2in1{' '}
						<div className='badge badge-neutral text-xs uppercase font-sans font-semibold tracking-tighter'>
							Nowość
						</div>
					</code>
					<div className='text-sm h-10'>
						<span className='inline-block'>
							Kursy kierunkowe - <b>MS Office</b>
						</span>{' '}
						<span className='inline-block'>
							lub <b>Python + algorytmika</b>.
						</span>
					</div>
					<div className='divider' />
					<span className='text-4xl font-bold'>120</span>
					<span className='text-2xl'>,00 PLN</span>
					<div className='text-xs ml-4'>/ jednorazowa płatność</div>
					<div className='divider' />
					<div className='text-sm mb-2 h-10'>
						<span className='inline-block'>Zawiera jeden z dostępnych</span>{' '}
						<span className='inline-block'>pakietów (2 kursy):</span>
					</div>
					<div className='flex items-center gap-1 [&>*:nth-child(3n+2)]:-mr-8'>
						<img className='h-14' src={kursPython} alt='kursPython' />
						<span></span>
						<img className='h-14' src={kursAlgo} alt='kursAlgo' />
						<div>/</div>
						<img className='h-14' src={kursExcel} alt='kursExcel' />
						<span></span>
						<img className='h-14' src={kursAccess} alt='kursAccess' />
					</div>
					<button className='block btn-success hover:btn-neutral btn btn-sm w-24 ml-auto mt-16'>
						Kup
					</button>
				</div>
			</div>
		</>
	);
};

export default Kursy;
