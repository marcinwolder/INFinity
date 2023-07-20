import DonwloadBtn from '../../../../components/DownloadBtn';
import { TestProvider } from '../../../../context/testContext';

import zadanie6 from './img/6.png';

const Access = () => {
	return (
		<>
			<TestProvider taskNum={6} title='System kontroli dostępu'>
				<img src={zadanie6} draggable={false} className='pt-2 select-none' />
				<DonwloadBtn
					urls={[
						'/formula-2015/2022/maj/klasa.txt',
						'/formula-2015/2022/maj/uczen.txt',
						'/formula-2015/2022/maj/ewidencja.txt',
					]}
				/>
			</TestProvider>
		</>
	);
};

export default Access;
