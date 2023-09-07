import { useRef, useState } from 'react';

import Infinity from '../img/Infinity.png';
import InfinityDark from '../img/Infinity-dark.png';

import { PiFileDoc } from 'react-icons/pi';
import ThemeImg from './ThemeImg';
import classNames from 'classnames';
import { usePathElements } from '../redux/slices/pathSlice';
import { last } from 'lodash';

const Footer = () => {
	const ref = useRef<HTMLDivElement>(null);
	const [base300, setBase300] = useState('');
	const observer = new MutationObserver((mut) => {
		if (mut.length) {
			const mut2 = mut.at(-1) as MutationRecord;
			if (mut2.type === 'attributes' && mut2.attributeName === 'data-theme') {
				if (ref.current) {
					setBase300(window.getComputedStyle(ref.current).backgroundColor);
				}
			}
		}
	});
	observer.observe(document.documentElement, { attributes: true });

	const path = usePathElements();
	const smallFooter = last(path) === '/panel';

	return (
		<div>
			<div className={classNames({ hidden: smallFooter })}>
				<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'>
					<path
						fill={base300}
						fillOpacity='1'
						d='M0,256L30,256C60,256,120,256,180,234.7C240,213,300,171,360,149.3C420,128,480,128,540,154.7C600,181,660,235,720,218.7C780,203,840,117,900,85.3C960,53,1020,75,1080,90.7C1140,107,1200,117,1260,144C1320,171,1380,213,1410,234.7L1440,256L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z'
						className='drop-shadow-2xl'></path>
				</svg>
			</div>
			<div
				ref={ref}
				className='flex flex-col md:flex-row items-center md:justify-between bg-base-300'>
				<div className='m-4 ml-8'>
					<p className='text-lg font-semibold'>Przydatne linki:</p>
					<ul className='list-disc list-inside'>
						<li>
							<a
								target='_blank'
								href='./regulamin-matura-infinity.docx'
								className='link link-hover inline-flex items-center gap-2'>
								Regulamin <PiFileDoc />
							</a>
						</li>
					</ul>
				</div>
				<div className='flex items-center gap-2 place-self-center p-4'>
					<div className='text-sm'>
						<p className='font-semibold'>Kontakt (pon-pt, 8:00-18:00)</p>
						<p className='text-xs'>email: matura-infinity@gmail.com</p>
					</div>
					<ThemeImg className='w-36 ' dark={Infinity} light={InfinityDark} />
				</div>
			</div>
		</div>
	);
};
export default Footer;
