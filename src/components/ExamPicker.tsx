import { Link, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { Formula, useUrl } from '../redux/slices/pathSlice';
import examsJSON from '../JSON/exams.json';
import _ from 'lodash';

export const ExamPicker: React.FC = () => {
	const url = useUrl();
	const clickRef = useRef<HTMLInputElement>(null);

	const { formula } = useParams() as { formula: Formula };
	const [exams, setExams] = useState(examsJSON[formula]);

	useEffect(() => {
		clickRef.current?.click();
		setExams(examsJSON[formula]);
	}, [formula, exams]);

	if (_.isEmpty(exams))
		return (
			<h1 className='w-96'>Brak egzaminów spełniających wymagania w bazie.</h1>
		);

	return (
		<>
			<h1 className='w-96'>Wybierz egzamin:</h1>
			<div className='join join-vertical w-96'>
				<div className='collapse collapse-arrow join-item border border-primary-content'>
					<input type='radio' name='my-accordion-1' disabled />
					<div className='collapse-title text-xl font-medium'>2023</div>
					<div className='collapse-content'>
						<Link to={url + '/2022-maj'}>Matura</Link>
					</div>
				</div>
				<div className='collapse collapse-arrow join-item border border-primary-content'>
					<input ref={clickRef} type='radio' name='my-accordion-1' />
					<div className='collapse-title text-xl font-medium'>2022</div>
					<div className='collapse-content relative'>
						<Link className='flex btn btn-outline' to={url + '/2022-maj'}>
							<span className='badge badge-secondary absolute right-2 -top-2'>
								Pierwszy termin
							</span>
							Matura
						</Link>
					</div>
				</div>
				<div className='collapse collapse-arrow join-item border border-primary-content'>
					<input type='radio' name='my-accordion-1' disabled />
					<div className='collapse-title text-xl font-medium'>2021</div>
					<div className='collapse-content'>
						<p>hello</p>
					</div>
				</div>
			</div>
		</>
	);
};
