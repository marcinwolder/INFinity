import React from 'react';

import kursPython from './../img/kursy/kurs-python.png';
import kursExcel from './../img/kursy/kurs-excel.png';
import kursAccess from './../img/kursy/kurs-access.png';
import kursAlgo from './../img/kursy/kurs-algo.png';

const Kursy: React.FC = () => {
	return (
		<>
			<div className='flex gap-4 items-end'>
				<div className='border border-base-300 bg-base-200 p-6 px-8 rounded-sm'>
					<code className='text-primary uppercase font-black text-xl tracking-widest'>
						pojedynczy kurs
					</code>
					<p className='text-sm'>Idealny aby uzupełnić braki.</p>
					<div className='divider' />
					<span className='text-4xl font-bold'>80</span>
					<span className='text-2xl'>,00zł</span>
					<span className='text-xs ml-4'>/ jednorazowa płatność</span>
					<div className='divider' />
					<p className='text-sm mb-2'>Zawiera jeden z dostępnych kursów:</p>
					<div className='flex items-center gap-1'>
						<img className='h-14' src={kursPython} alt='kursPython' />
						<div>/</div>
						<img className='h-14' src={kursExcel} alt='kursExcel' />
						<div>/</div>
						<img className='h-14' src={kursAccess} alt='kursAccess' />
						<div>/</div>
						<img className='h-14' src={kursAlgo} alt='kursAlgo' />
					</div>
				</div>
				<div className='relative rounded-sm outline outline-success outline-4'>
					<div className='text-center text-sm font-semibold py-1 bg-success text-success-content'>
						Najczęściej Kupowany
					</div>
					<div className='bg-base-200 p-6 px-8 rounded-sm outline-success'>
						<code className='text-primary uppercase font-black text-xl tracking-widest'>
							Pełen zestaw
						</code>
						<p className='text-sm'>Pełne przygotowanie do matury.</p>
						<div className='divider' />
						<span className='text-4xl font-bold'>200</span>
						<span className='text-2xl'>,00zł</span>
						<span className='text-xs ml-4'>/ jednorazowa płatność</span>
						<div className='divider' />
						<p className='text-sm mb-2'>Zawiera wszystkie dostępne kursy:</p>
						<div className='flex items-center [&>*]:-mr-6'>
							<img className='h-14' src={kursPython} alt='kursPython' />
							<img className='h-14' src={kursExcel} alt='kursExcel' />
							<img className='h-14' src={kursAccess} alt='kursAccess' />
							<img className='h-14' src={kursAlgo} alt='kursAlgo' />
						</div>
					</div>
					<div className='absolute -z-10 inset-0 bg-success' />
				</div>
				<div className='border border-base-300 bg-base-200 p-6 px-8 rounded-sm'>
					<code className='text-secondary uppercase font-black text-xl tracking-widest flex items-center gap-2'>
						zestaw 2in1{' '}
						<div className='badge badge-neutral text-xs uppercase font-sans font-semibold tracking-tighter'>
							Nowość
						</div>
					</code>
					<p className='text-sm'>
						Kursy kierunkowe - <b>MS Office</b> lub <b>Python + algorytmika</b>.
					</p>
					<div className='divider' />
					<span className='text-4xl font-bold'>120</span>
					<span className='text-2xl'>,00zł</span>
					<span className='text-xs ml-4'>/ jednorazowa płatność</span>
					<div className='divider' />
					<p className='text-sm mb-2'>
						Zawiera jeden z dostępnych pakietów (2 kursy):
					</p>
					<div className='flex items-center gap-1 [&>*:nth-child(3n+2)]:-mr-8'>
						<img className='h-14' src={kursPython} alt='kursPython' />
						<span></span>
						<img className='h-14' src={kursAlgo} alt='kursAlgo' />
						<div>/</div>
						<img className='h-14' src={kursExcel} alt='kursExcel' />
						<span></span>
						<img className='h-14' src={kursAccess} alt='kursAccess' />
					</div>
				</div>
			</div>
		</>
	);
};

export default Kursy;
