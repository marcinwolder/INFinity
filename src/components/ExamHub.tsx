import { ComponentType, lazy } from 'react';
import PartSwitch from './PartSwitch';
import TabSwitch from './TabSwitch';
import Error from './Error';
import { useLoaderData } from 'react-router-dom';
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
	const {
		currentExam: { formula, year, month, tasks, splitParts },
	} = useLoaderData() as ExamPageLoader;

	const comps: React.ReactNode[] = [];

	tasks.forEach((task) => {
		const Comp = handleImport(
			`/src/routes/${formula}/${year}-${month}/${task}.tsx`
		);
		comps.push(<Comp />);
	});

	if (splitParts) {
		return (
			<div className='sm:px-0 md:px-6 max-w-screen-md w-full'>
				<PartSwitch
					Part1={
						<TabSwitch tabs={comps.slice(0, 3)} headers={tasks.slice(0, 3)} />
					}
					Part2={<TabSwitch tabs={comps.slice(3)} headers={tasks.slice(3)} />}
				/>
			</div>
		);
	}

	return (
		<div className='sm:px-0 md:px-6 max-w-screen-md w-full'>
			<TabSwitch tabs={comps} headers={tasks} />
		</div>
	);
};

export default Index;
