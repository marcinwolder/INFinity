import { useState } from 'react';
import { Link } from 'react-router-dom';
import useYearDropdown from '../../components/YearDropdown';
import { useUrl } from '../../redux/slices/path';

export const Main: React.FC = () => {
	const url = useUrl();

	const [open, setOpen] = useState('2022');
	const YearDropdown = useYearDropdown(open, setOpen);
	return (
		<>
			<YearDropdown year='2022'>
				<li>
					<Link to={url + '/2022/maj'} className='text-lg'>
						Maj
						<span className='badge badge-primary rounded-badge ml-auto'>
							MATURA
						</span>
					</Link>
				</li>
				<li>
					<a className='text-lg'>
						Czerwiec
						<div className='badge badge-outline rounded-badge ml-auto'>
							DODATKOWA
						</div>
					</a>
				</li>
			</YearDropdown>
			<YearDropdown year='2021'>
				<li>
					<a className='text-lg'>
						Marzec
						<div className='badge badge-ghost rounded-badge ml-auto bg-base-300'>
							PRÓBNA
						</div>
					</a>
				</li>
				<li>
					<a className='text-lg'>
						Maj
						<div className='badge badge-primary rounded-badge ml-auto'>
							MATURA
						</div>
					</a>
				</li>
				<li>
					<a className='text-lg'>
						Czerwiec
						<div className='badge badge-outline rounded-badge ml-auto'>
							DODATKOWA
						</div>
					</a>
				</li>
			</YearDropdown>
		</>
	);
};
