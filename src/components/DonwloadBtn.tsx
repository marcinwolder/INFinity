import React from 'react';

const DonwloadBtn: React.FC<React.PropsWithChildren<{ url: string }>> = ({
	url,
	children,
}) => {
	return (
		<div className='btn btn-neutral mx-auto'>
			<a href={url} download>
				{children}
			</a>
		</div>
	);
};

export default DonwloadBtn;
