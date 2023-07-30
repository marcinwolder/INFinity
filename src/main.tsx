import React from 'react';
import ReactDOM from 'react-dom/client';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { MantineProvider } from '@mantine/core';
import _ from 'lodash';

import { MenuProvider } from './context/menuContext';
import App from './App';
import NotFound from './routes/NotFound';
import Main from './routes';

import ExamPicker from './components/ExamPicker';
import ExamHub from './components/ExamHub';

import store from './redux';
import { ExamData, examsSlice } from './redux/slices/examsSlice';
import { Formula } from './redux/slices/pathSlice';

import './index.css';

declare global {
	const pyscript: {
		interpreter: {
			globals: {
				get(query: string): unknown;
			};
		};
	};
}

export interface ExamPageLoader {
	currentExam: ExamData;
}

const router = createHashRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <NotFound />,
		children: [
			{
				path: '/:formula',
				element: <ExamPicker />,
				loader: async ({ params }) => {
					store.dispatch(
						examsSlice.actions.loadExams(params.formula as Formula)
					);
					return {};
				},
				children: [
					{
						path: '/:formula/:yearAndMonth',
						element: <ExamHub />,
						loader: async ({ params }) => {
							const { yearAndMonth } = params;
							const [year, month] = (yearAndMonth || '').split('-');
							const currentExam = store
								.getState()
								.exams[year].filter((exam) => exam.month === month);
							if (_.isEmpty(currentExam)) throw new Error();
							return { currentExam: _.head(currentExam) } as ExamPageLoader;
						},
					},
				],
			},
			{
				path: '/',
				element: <Main />,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<>
		<React.StrictMode>
			<MantineProvider>
				<Provider store={store}>
					<MenuProvider>
						<RouterProvider router={router} />
					</MenuProvider>
				</Provider>
			</MantineProvider>
		</React.StrictMode>
	</>
);
