import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';
import Formula2023 from './routes/Formula2023';
import Main from './routes/Main';
import { MenuProvider } from './context/menuContext';

import './index.css';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				path: '/formula-2023',
				element: <Formula2023 />,
			},
			{
				path: '/',
				element: <Main />,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<MenuProvider>
			<RouterProvider router={router} />
		</MenuProvider>
	</React.StrictMode>
);
