import { useOutlet } from 'react-router-dom';
import Breadcrumps from '../../components/Breadcrumps';

import { usePath } from '../../redux/slices/path';
import { Main } from './Main';

const Formula2015 = () => {
	usePath('/formula-2015');

	return (
		<div className='artboard gap-4 flex flex-col items-center relative'>
			<Breadcrumps />
			{useOutlet() ?? <Main />}
		</div>
	);
};

export default Formula2015;
