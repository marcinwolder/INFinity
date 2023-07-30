import { BsArrowReturnRight } from 'react-icons/bs';

const Main = () => {
	return (
		<div className='w-full'>
			<h1 className='font-bold text-3xl ml-2'>.Projekt INFinity</h1>
			<div className='flex items-center gap-2'>
				<BsArrowReturnRight />
				<span>
					To projekt, dzięki któremu raz na zawsze dowiesz się czego naprawdę
					potrzebujesz do idealnego zdania matury z informatyki.
				</span>
			</div>
			<div className='flex items-center justify-between relative'>
				<img
					className='aspect-square'
					src=''
					alt='zdjęcie wyników matury'
					height={200}
				/>
				<div className='flex flex-col gap-2 w-1/3'>
					<span>
						Matura z Informatyki <b>niestety</b> nie odzwierciedla rzeczywistych
						umiejętności informatycznych maturzysty.
					</span>
					<span>
						Ten egzamin to czysty <b>SCHEMAT</b>, a projekt INFinity pozwoli Ci
						na dobre przygotowanie się do jego zdania.
					</span>
				</div>
			</div>
		</div>
	);
};

export default Main;
