import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './redux';
import App from './App';
import NotFound from './routes/NotFound';
import { MenuProvider } from './context/menuContext';

import './index.css';

import Main from './routes/Main';
import Formula2015 from './routes/formula-2015';
import Formula2023 from './routes/Formula2023';

import Maj2022 from './routes/formula-2015/2022/maj';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <NotFound />,
		children: [
			{
				path: '/formula-2023',
				element: <Formula2023 />,
			},
			{
				path: '/formula-2015',
				element: <Formula2015 />,
				children: [{ path: '/formula-2015/2022/maj', element: <Maj2022 /> }],
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
			<Provider store={store}>
				<MenuProvider>
					<RouterProvider router={router} />
				</MenuProvider>
			</Provider>
		</React.StrictMode>
	</>
);
