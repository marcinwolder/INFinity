import DonwloadBtn from '../../../../components/DonwloadBtn';
import { TestProvider } from '../../../../context/testContext';

import zadanie5 from './img/5.png';

const Excel = () => {
	return (
		<>
			<TestProvider taskNum={5} title='Sok'>
				<img src={zadanie5} draggable={false} className='pt-2 select-none' />
				<DonwloadBtn url={'/public/formula-2015/2022/maj/soki.txt'}>
					Pobierz pliki potrzebne do zadania
				</DonwloadBtn>
			</TestProvider>
		</>
	);
};

export default Excel;
