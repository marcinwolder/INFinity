import { ComponentType, lazy } from 'react';
import PartSwitch from './PartSwitch';
import TabSwitch from './TabSwitch';
import Error from './Error';
import { useLoaderData, useParams } from 'react-router-dom';
import { ExamPageLoader } from '../main';

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

const Index: React.FC = () => {
	const { formula, yearAndMonth } = useParams();

	const { currentExam } = useLoaderData() as ExamPageLoader;
	console.log('🚀 ~ file: ExamHub.tsx:37 ~ currentExam:', currentExam);

	const Algorytm = handleImport(
		`/src/routes/${formula}/${yearAndMonth}/Algorytm.tsx`
	);
	const Analiza = handleImport(
		`/src/routes/${formula}/${yearAndMonth}/Analiza.tsx`
	);
	const Test = handleImport(`/src/routes/${formula}/${yearAndMonth}/Test.tsx`);
	const Python = handleImport(
		`/src/routes/${formula}/${yearAndMonth}/Python.tsx`
	);
	const Excel = handleImport(
		`/src/routes/${formula}/${yearAndMonth}/Excel.tsx`
	);
	const Access = handleImport(
		`/src/routes/${formula}/${yearAndMonth}/Access.tsx`
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

export default Index;
