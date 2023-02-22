import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Formula2023 from './routes/Formula2023';
import { MenuProvider } from './context/menuContext';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				path: '/formula2023',
				element: <Formula2023 />,
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
