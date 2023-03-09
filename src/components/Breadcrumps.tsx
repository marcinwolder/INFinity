import { Link } from 'react-router-dom';
import { usePathElements } from '../redux/slices/path';

const createBreadcrumbs = () => {
	const path = usePathElements();

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

const Breadcrumps = () => {
	return (
		<div className='breadcrumbs self-start text-xs sm:text-base p-0'>
			<ul>{createBreadcrumbs()}</ul>
		</div>
	);
};

export default Breadcrumps;
