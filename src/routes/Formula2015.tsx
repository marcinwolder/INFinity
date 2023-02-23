import { Link } from 'react-router-dom';
import { usePath } from '../context/menuContext';

const Main = () => {
	const url = usePath('/formula-2015');
	// TODO: onClick zmiana state otwartej sekcji - funkcja nadająca klasy collapse-open / collapse-close
	return (
		<div className='artboard gap-4 flex flex-col items-center relative'>
			<h1 className='text-2xl small-caps self-start p-2 pr-4 rounded-tr-xl rounded-br-md bg-secondary-focus text-secondary-content'>
				Formuła 2015
			</h1>
			<div
				tabIndex={0}
				className='collapse collapse-open collapse-arrow border border-base-300 bg-base-200 rounded-box w-80'>
				<div className='collapse-title text-xl font-medium'>2022</div>
				<div className='collapse-content'>
					<ul className='menu menu-compact'>
						<li className='flex'>
							<Link to={url + '/2022/maj'} className='text-lg'>
								Maj
								<span className='badge badge-primary rounded-badge ml-auto'>
									MATURA
								</span>
							</Link>
						</li>
						<li className='flex'>
							<a className='text-lg'>
								Czerwiec
								<div className='badge badge-outline rounded-badge ml-auto'>
									DODATKOWA
								</div>
							</a>
						</li>
					</ul>
				</div>
			</div>
			<div
				tabIndex={0}
				className='collapse collapse-close collapse-arrow border border-base-300 bg-base-200 rounded-box w-80'>
				<div className='collapse-title text-xl font-medium'>2021</div>
				<div className='collapse-content'>
					<ul className='menu menu-compact'>
						<li className='flex'>
							<a className='text-lg'>
								Marzec
								<div className='badge badge-ghost rounded-badge ml-auto bg-base-300'>
									PRÓBNA
								</div>
							</a>
						</li>
						<li className='flex'>
							<a className='text-lg'>
								Maj
								<div className='badge badge-primary rounded-badge ml-auto'>
									MATURA
								</div>
							</a>
						</li>
						<li className='flex'>
							<a className='text-lg'>
								Czerwiec
								<div className='badge badge-outline rounded-badge ml-auto'>
									DODATKOWA
								</div>
							</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Main;
