import { useOutlet } from 'react-router-dom';
import Breadcrumps from '../../components/Breadcrumps';

import { Main } from './Main';

const Formula2015 = () => {
	return (
		<div className='artboard gap-4 flex flex-col items-center relative'>
			<Breadcrumps />
			{useOutlet() ?? <Main />}
		</div>
	);
};

export default Formula2015;
