import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';
import Formula2023 from './routes/Formula2023';
import Formula2015 from './routes/Formula2015';
import Main from './routes/Main';
import NotFound from './routes/NotFound';
import { MenuProvider } from './context/menuContext';

import './index.css';
import Maj2022 from './routes/formula-2015/2022/maj';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <NotFound />,
		children: [
			{
				path: '/formula-2015/2022/maj',
				element: <Maj2022 />,
			},
			{
				path: '/formula-2023',
				element: <Formula2023 />,
			},
			{
				path: '/formula-2015',
				element: <Formula2015 />,
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
			<MenuProvider>
				<RouterProvider router={router} />
			</MenuProvider>
		</React.StrictMode>
	</>
);
