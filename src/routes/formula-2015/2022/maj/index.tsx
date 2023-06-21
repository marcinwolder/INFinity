import { usePath } from '../../../../redux/slices/path';

import PartSwitch from '../../../../components/PartSwitch';
import TabSwitch from '../../../../components/TabSwitch';

import Algorytm from './Algorytm';
import Analiza from './Analiza';
import Test from './Test';
import Python from './Python';

const Maj2022 = () => {
	usePath('/2022/maj');
	return (
		<div className='sm:px-0 md:px-6 max-w-screen-md w-full'>
			<PartSwitch
				Part1={
					<TabSwitch
						tabs={[<Algorytm />, <Analiza />, <Test />]}
						headers={['Algorytm', 'Analiza', 'Test']}
					/>
				}
				Part2={
					<TabSwitch
						tabs={[<Python />, 'Excel', 'Access']}
						headers={['Python', 'Excel', 'Access']}
					/>
				}
			/>
		</div>
	);
};

export default Maj2022;
