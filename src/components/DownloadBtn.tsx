import React, { useRef } from 'react';

const DownloadBtn: React.FC<{ urls: string[] }> = ({ urls }) => {
	const btnsRef = useRef<HTMLDivElement>(null);
	return (
		<div className='w-full flex justify-center'>
			<div ref={btnsRef}>
				{...urls.map((url, index) => {
					return <a href={url} key={index} download></a>;
				})}
			</div>
			<div
				className='btn btn-neutral'
				onClick={() => {
					btnsRef.current?.childNodes.forEach((el) => {
						const btn = el as HTMLAnchorElement;
						btn.click();
					});
				}}>
				Pobierz pliki potrzebne do zadania
			</div>
		</div>
	);
};

export default DownloadBtn;
