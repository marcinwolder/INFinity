import { useMaturaPath, usePath } from '../../../../redux/slices/pathSlice';

import PartSwitch from '../../../../components/PartSwitch';
import TabSwitch from '../../../../components/TabSwitch';

import Analiza from './Analiza';
import Test from './Test';
import Python from './Python';
import Excel from './Excel';
import Access from './Access';
import { lazy } from 'react';

const Maj2022 = () => {
	usePath('/2022/maj');
	const maturaPath = useMaturaPath();

	const Algorytm = lazy(() =>
		import(
			`/* @vite-ignore */ /src/routes/${maturaPath.formula}/${maturaPath.date}/Algorytm`
		).catch((err) => {
			console.log(err);
			return import('../../../../components/Error.tsx');
		})
	);

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
						tabs={[<Python />, <Excel />, <Access />]}
						headers={['Python', 'Excel', 'Access']}
					/>
				}
			/>
		</div>
	);
};

export default Maj2022;
