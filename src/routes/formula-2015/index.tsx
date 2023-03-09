import _ from 'lodash';
import { useSelector } from 'react-redux';
import { Link, useOutlet } from 'react-router-dom';

import { Store } from '../../redux';
import { usePath, usePathElements } from '../../redux/slices/path';
import { Main } from './Main';

const Formula2015 = () => {
	usePath('/formula-2015');

	const createBreadcrumbs = () => {
		const path = usePathElements();
		const rootPath = path.pop();
		path.unshift(rootPath!);
		return path.map((pathBlock, index) => {
			if (index < 1) {
				return (
					<li key={index}>
						<Link to={'/'}>
							<code>{pathBlock}</code>
						</Link>
					</li>
				);
			} else if (index === path.length - 1) {
				return (
					<li key={index}>
						<code>{pathBlock}</code>
					</li>
				);
			}
			return (
				<li key={index}>
					<Link to={path.slice(1, index + 1).join('')}>
						<code>{path[index]}</code>
					</Link>
				</li>
			);
		});
	};

	return (
		<div className='artboard gap-4 flex flex-col items-center relative'>
			<div className='breadcrumbs self-start pl-2'>
				<ul>{createBreadcrumbs()}</ul>
			</div>
			{useOutlet() ?? <Main />}
		</div>
	);
};

export default Formula2015;
