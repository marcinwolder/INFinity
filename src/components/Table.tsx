import { FC } from 'react';
import styled from 'styled-components';

interface TableProps {
	headings?: string[];
	cols?: number;
	__manualSizes?: string;
	children: React.ReactNode[] | React.ReactNode;
	className?: string;
}

const GridDiv = styled.div<{
	cols: number;
	__manualSizes?: string;
	withHeaders: boolean;
}>`
	grid-template-columns: ${({ cols, __manualSizes }) => {
		return __manualSizes ? __manualSizes : `repeat(${cols}, 1fr)`;
	}};

	& > * {
		text-align: center;
	}
	& > .header:nth-child(1) {
		border-top-left-radius: 0.25em;
		border-bottom-left-radius: 0.25em;
	}
	& > .header:nth-child(${({ cols }) => cols}) {
		border-top-right-radius: 0.25em;
		border-bottom-right-radius: 0.25em;
	}
	& > .header {
		border: 0;
	}
	& > :nth-child(${(props) => props.cols}n + 1) {
		border-left: 0;
	}
	${({ cols, withHeaders }) => {
		let style = '';
		for (
			let i = withHeaders ? 1 + cols : 1;
			i < (withHeaders ? 2 * cols + 1 : cols + 1);
			i++
		) {
			style = style.concat(
				`
          & > :nth-child(${i}) {
            border-top: 0;
          }
        `
			);
		}
		return style;
	}}
`;

const Table: FC<TableProps> = ({
	headings,
	children,
	cols = headings?.length || 1,
	__manualSizes,
	className,
}) => {
	return (
		<GridDiv
			withHeaders={headings?.length ? true : false}
			cols={headings?.length || cols}
			__manualSizes={__manualSizes}
			className={`md:mx-8 mx-2 my-4 text-sm grid  divide-x divide-y [&>*]:px-3 [&>*]:p-1 ${className}`}>
			{headings &&
				headings.map((heading) => (
					<div className={`w-full font-bold header `} key={heading}>
						{heading.toUpperCase()}
					</div>
				))}
			{Array.isArray(children)
				? children.map((el, index) => (
						<div
							key={index}
							className={`col-${
								(index % cols) + 1
							} row-${1} flex items-center justify-center`}>
							{el}
						</div>
            )) 
        : children}
		</GridDiv>
	);
};

export default Table;
