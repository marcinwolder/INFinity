import React from 'react';

const Table: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
	return (
		<div className='relative text-primary-content px-0 overflow-x-auto md:px-8 pt-2'>
			<table className='table table-compact w-full text-center'>
				<colgroup>
					<col style={{ width: '3em' }} />
				</colgroup>
				{children}
			</table>
		</div>
	);
};

export default Table;
