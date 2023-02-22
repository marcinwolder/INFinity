import React from 'react';
import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs';
import { AiOutlineCode } from 'react-icons/ai';
import { Link } from 'react-router-dom';

interface props {
	menuRef: React.RefObject<HTMLInputElement>;
}

const Navbar: React.FC<props> = ({ menuRef }) => {
	return (
		<div className='navbar bg-base-100'>
			<div className='flex-none'>
				<input id='my-drawer' type='checkbox' className='drawer-toggle' />
				<button
					onClick={() => {
						if (menuRef.current) menuRef.current.checked = true;
					}}
					className='btn btn-square btn-ghost drawer-button'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						className='inline-block w-5 h-5 stroke-current'>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth='2'
							d='M4 6h16M4 12h16M4 18h16'></path>
					</svg>
				</button>
			</div>
			<div className='flex-1'>
				<Link to={'/'} className='btn btn-ghost normal-case text-xl small-caps'>
					<AiOutlineCode className='mr-1 text-base' />
					<span className='text-sky-500 pr-2 mb-0.5'>[</span>INF
					<span className='text-red-500 px-2 mb-0.5'>{'}'}</span>
					<span className='mb-1.5'>ormator</span>
				</Link>
			</div>
			<div className='flex gap-2'>
				<button
					className='rounded-md p-1 h-6 w-6 ease-in-out transition-all flex justify-center items-center'
					data-set-theme='retro'
					data-act-class='theme-selected'>
					<BsFillSunFill />
				</button>
				<button
					className='rounded-md p-1 h-6 w-6 ease-in-out transition-all flex justify-center items-center'
					data-set-theme='dark'
					data-act-class='theme-selected'>
					<BsFillMoonFill />
				</button>
			</div>
		</div>
	);
};

export default Navbar;
