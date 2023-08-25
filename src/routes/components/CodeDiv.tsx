import styled from 'styled-components';
import useThemeBasedValue from '../../hooks/useThemeBasedValue';

export const CodeDiv = styled.div.attrs(() => ({
	theme: useThemeBasedValue({
		default: 'color: hsl(var(--pf)); opacity: 0.25;',
		emerald: 'color: #020617; opacity: 0.25;',
		dark: 'color: #10b981; opacity: 0.05;',
	}),
}))`
	@keyframes pulse {
		50% {
			opacity: 0.1;
		}
	}
	animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
	z-index: -20;

	position: absolute;
	font-size: 0.7em;
	@media (min-width: 1024px) {
		font-size: 1em;
	}

	${(p) => p.theme}
`;
