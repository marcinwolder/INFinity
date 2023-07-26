import { useState } from 'react';
import { Link } from 'react-router-dom';
import useYearDropdown from '../../components/YearDropdown';
import { useUrl } from '../../redux/slices/pathSlice';

export const Main: React.FC = () => {
	const url = useUrl();

	const [open, setOpen] = useState('2022');
	return (
		<>
			<h1 className='w-96'>Wybierz egzamin:</h1>
			<div className='join join-vertical w-96'>
				<div className='collapse collapse-arrow join-item border border-base-300'>
					<input type='radio' name='my-accordion-1' />
					<div className='collapse-title text-xl font-medium'>2023</div>
					<div className='collapse-content'>
						<Link to={url + '/2022/maj'}>Matura</Link>
					</div>
				</div>
				<div className='collapse collapse-arrow join-item border border-base-300'>
					<input type='radio' name='my-accordion-1' />
					<div className='collapse-title text-xl font-medium'>2022</div>
					<div className='collapse-content relative'>
						<Link className='flex btn btn-outline' to={url + '/2022/maj'}>
							<span className='badge badge-secondary absolute right-2 -top-2'>
								Pierwszy termin
							</span>
							Matura
						</Link>
					</div>
				</div>
				<div className='collapse collapse-arrow join-item border border-base-300'>
					<input type='radio' name='my-accordion-1' />
					<div className='collapse-title text-xl font-medium'>2021</div>
					<div className='collapse-content'>
						<p>hello</p>
					</div>
				</div>
			</div>
		</>
	);
};
