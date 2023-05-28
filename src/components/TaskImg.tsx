import React from 'react';

const TaskImg: React.FC<{ img: string; className?: string }> = ({
	img,
	className,
}) => {
	return (
		<img
			src={img}
			draggable={false}
			className={'pt-2 select-none ' + className}
		/>
	);
};

export default TaskImg;
