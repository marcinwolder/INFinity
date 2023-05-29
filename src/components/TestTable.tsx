import { FC, PropsWithChildren } from 'react';
import { useMaturaColor } from '../redux/slices/path';
import styled from 'styled-components';

interface TestTableProps {
	headings?: string[];
	cols?: number;
	__manualSizes?: string;
	children: React.ReactNode[];
	className?: string;
}

const GridDiv = styled.div<{ cols: number; __manualSizes?: string }>`
	grid-template-columns: ${({ cols, __manualSizes }) => {
		return __manualSizes ? __manualSizes : `repeat(${cols}, 1fr)`;
	}};

	& > * {
		text-align: center;
	}
	& > :nth-child(${(props) => props.cols}n + 1) {
		border-left: 0;
	}
	${(props) => {
		let style = '';
		for (let i = 1; i < props.cols + 1; i++) {
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

const TestTable: FC<TestTableProps> = ({
	headings,
	children,
	cols = headings?.length || 1,
	__manualSizes,
	className,
}) => {
	const maturaColor = useMaturaColor();
	return (
		<GridDiv
			cols={headings?.length || cols}
			__manualSizes={__manualSizes}
			className={`md:mx-8 mx-2 text-sm grid border-${maturaColor} divide-x divide-y [&>*]:px-3 [&>*]:p-1 ${className}`}>
			{headings &&
				headings.map((heading) => (
					<div className='w-full font-semibold' key={heading}>
						{heading}
					</div>
				))}
			{children.map((el, index) => (
				<div
					className={`col-${(index + 1) % cols ? (index + 1) % cols : cols}`}>
					{el}
				</div>
			))}
		</GridDiv>
	);
};

export default TestTable;
