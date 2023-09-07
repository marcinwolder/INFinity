import { Skeleton } from '@mantine/core';
import { AiFillLock } from 'react-icons/ai';
import { TfiVideoClapper } from 'react-icons/tfi';
import { FaPlay } from 'react-icons/fa';
import { useLoaderData } from 'react-router-dom';

const TestCourses = () => {
	return (
		<>
			<div className='w-full h-24 relative my-2 opacity-75 rounded border border-base-300 shadow-md group select-none'>
				<span className='absolute flex flex-col justify-center items-center inset-0 text-xl'>
					<span className='hidden group-hover:block'>
						<FaPlay />
					</span>
				</span>
				<span className='absolute flex flex-col justify-center items-center inset-0 text-xl group-hover:opacity-60 group-hover:cursor-pointer'>
					<p>Python #1</p>
					<p className='italic text-sm'>
						<span className='text-secondary'>wykład:</span> dlaczego python?
					</p>
				</span>
			</div>
			<div className='relative my-2 rounded border border-base-300 shadow-md w-full h-max p-2 opacity-30 select-none'>
				<p className='text-md font-semibold'>Python #2</p>
				<p className='text-sm italic indent-2'>
					<span className='text-secondary'>wykład: </span>typy danych
				</p>
				<span className='absolute flex justify-center items-center inset-0 text-2xl'>
					<AiFillLock />
				</span>
			</div>
			<div className='stack w-full -my-2 opacity-30 '>
				<div className='bg-base-200 relative my-2 rounded border border-base-300 shadow-md w-full h-max p-2 opacity-30 select-none'>
					<p className='text-md font-semibold'>Python #3</p>
					<p className='text-sm italic indent-2'>
						<span className='text-accent'>ćwiczenia: </span>typy danych
					</p>
					<span className='absolute flex justify-center items-center inset-0 text-2xl'>
						<AiFillLock />
					</span>
				</div>
				<div className='bg-base-200 relative top-4 my-2 rounded border border-base-300 shadow-md w-full h-max p-2 opacity-30 select-none'>
					<p className='text-md font-semibold'>Python #4</p>
					<p className='text-sm italic indent-2'>
						<span className='text-secondary'>wykład: </span>ważne metody
					</p>
					<span className='absolute flex justify-center items-center inset-0 text-2xl'>
						<AiFillLock />
					</span>
				</div>
				<div className='bg-base-200 relative top-8 my-2 rounded border border-base-300 shadow-md w-full h-max p-2 opacity-30 select-none'>
					<p className='text-md font-semibold'>Python #3</p>
					<p className='text-sm italic indent-2'>
						<span className='text-primary'>zadanie: </span>ważne metody
					</p>
					<span className='absolute flex justify-center items-center inset-0 text-2xl'>
						<AiFillLock />
					</span>
				</div>
			</div>
		</>
	);
};

const Panel = () => {
	const { courses } = useLoaderData() as { courses: string[] };
	return (
		<div className='flex w-full items-center'>
			<div className='w-64 h-[calc(100vh-15rem)] bg-base-200 rounded-lg rounded-l-none p-4 overflow-hidden'>
				<p className='font-semibold font-mono'>Dostępne Kursy:</p>
				<div className='overflow-y-scroll h-[calc(100%-2rem)] my-2 pr-4'>
					{courses.length === 1 && courses[0] === '__test__' ? (
						<TestCourses />
					) : (
						<></>
					)}
				</div>
			</div>
			<Skeleton
				style={{ aspectRatio: '16 / 9' }}
				animate={false}
				className='w-[calc(100%-32rem)] max-h-full mx-auto'
				visible={true}>
				<span className='flex justify-center items-center inset-0 absolute z-20 text-neutral-500 opacity-25 text-[12rem] animate-pulse'>
					<TfiVideoClapper />
				</span>
				<video
					style={{ aspectRatio: '16 / 9' }}
					controls
					src=''
					className='w-full bg-black rounded-md'></video>
			</Skeleton>
		</div>
	);
};

export default Panel;
