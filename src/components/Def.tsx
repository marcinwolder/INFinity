import React from 'react';

interface props {
	name: string;
}

const Def: React.FC<React.PropsWithChildren<props>> = ({ name, children }) => {
	return (
		<div className='flex gap-1'>
			<i>{name}</i>-<div>{children}</div>
		</div>
	);
};

export default Def;
