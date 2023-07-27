import { Link, useOutlet, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { Formula, useUrl } from '../redux/slices/pathSlice';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { examsSlice } from '../redux/slices/examsSlice';
import { StateStore } from '../redux';
const ExamPicker: React.FC = () => {
	const url = useUrl();

	const { formula } = useParams() as { formula: Formula };
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(examsSlice.actions.loadExams(formula));
	}, [formula, dispatch]);

	const exams = useSelector((state: StateStore) => state.exams);

	const outlet = useOutlet();
	if (outlet) return outlet;

	if (_.isEmpty(exams))
		return (
			<h1 className='w-96'>Brak egzaminów spełniających wymagania w bazie.</h1>
		);

	const examsComp = Object.keys(exams).map((year) => {
		const examsLinks = exams[year].map(({ month, title, info }) => {
			return (
				<Link
					key={month}
					className='flex btn btn-outline mb-4 relative'
					to={`${url}/${year}-${month}`}>
					{info ? (
						<span className='badge badge-secondary absolute -right-2 -top-3'>
							{info}
						</span>
					) : (
						<></>
					)}
					{title}
				</Link>
			);
		});
		return (
			<div
				key={year}
				className='collapse collapse-arrow join-item border border-primary-content'>
				<input type='radio' name='my-accordion-1' />
				<div className='collapse-title text-xl font-medium'>{year}</div>
				<div className='collapse-content relative'>{...examsLinks}</div>
			</div>
		);
	});

	return (
		<>
			<h1 className='w-96'>Wybierz egzamin:</h1>
			<div className='join join-vertical w-96'>{...examsComp}</div>
		</>
	);
};

export default ExamPicker;
