import React from 'react';
import ReactDOM from 'react-dom/client';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { MantineProvider } from '@mantine/core';

import store from './redux';
import App from './App';
import NotFound from './routes/NotFound';
import { MenuProvider } from './context/menuContext';

import './index.css';

import Main from './routes/Main';

import { ExamPicker } from './components/ExamPicker';
import Maj2022 from './routes/formula-2015/2022-maj';

declare global {
	const pyscript: {
		interpreter: {
			globals: {
				get(query: string): unknown;
			};
		};
	};
}

const router = createHashRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <NotFound />,
		children: [
			{ path: '/formula-2015/2022-maj', element: <Maj2022 /> },
			{
				path: '/:formula',
				element: <ExamPicker />,
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
