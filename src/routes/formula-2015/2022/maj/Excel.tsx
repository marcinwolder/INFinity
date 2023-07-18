import DonwloadBtn from '../../../../components/DownloadBtn';
import { TestProvider } from '../../../../context/testContext';

import zadanie5 from './img/5.png';

const Excel = () => {
	return (
		<>
			<TestProvider taskNum={5} title='Sok'>
				<img src={zadanie5} draggable={false} className='pt-2 select-none' />
				<DonwloadBtn urls={['/formula-2015/2022/maj/soki.txt']} />
			</TestProvider>
		</>
	);
};

export default Excel;
