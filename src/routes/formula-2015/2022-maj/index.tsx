import { ComponentType, lazy } from 'react';

import { usePath } from '../../../redux/slices/pathSlice';
import { useMaturaPath } from '../../../redux/slices/pathSlice2';

import PartSwitch from '../../../components/PartSwitch';
import TabSwitch from '../../../components/TabSwitch';

import Error from '../../../components/Error';

const modules = import.meta.glob('/src/routes/*/*/*.tsx') as Record<
	string,
	() => Promise<{ default: ComponentType }>
>;

const handleImport = (url: string) =>
	lazy(() => {
		if (modules[url]) return modules[url]();
		else
			return Promise.reject().catch(() => ({
				default: Error,
			}));
	});

const Maj2022 = () => {
	usePath('/2022/maj');
	const maturaPath = useMaturaPath();

	const Algorytm = handleImport(
		`/src/routes/${maturaPath.formula}/${maturaPath.date}/Algorytm.tsx`
	);
	const Analiza = handleImport(
		`/src/routes/${maturaPath.formula}/${maturaPath.date}/Analiza.tsx`
	);
	const Test = handleImport(
		`/src/routes/${maturaPath.formula}/${maturaPath.date}/Test.tsx`
	);
	const Python = handleImport(
		`/src/routes/${maturaPath.formula}/${maturaPath.date}/Python.tsx`
	);
	const Excel = handleImport(
		`/src/routes/${maturaPath.formula}/${maturaPath.date}/Excel.tsx`
	);
	const Access = handleImport(
		`/src/routes/${maturaPath.formula}/${maturaPath.date}/Access.tsx`
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
