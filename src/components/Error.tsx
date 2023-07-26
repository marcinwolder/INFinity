import React from 'react';

const Error: React.FC = () => {
	return (
		<>
			<div className='chat chat-start'>
				<div className='chat-bubble'>
					<h1 className='text-orange-700 font-black text-3xl'>DEV info:</h1>
					<p>Brak komponentu zawierającego zadanie!</p>
				</div>
			</div>
			<div className='chat chat-end'>
				<div className='chat-bubble'>Dodaj go na ścieżce widocznej wyżej</div>
			</div>
			<div className='chat chat-end'>
				<div className='chat-bubble'>
					Nazwij go tak jak zakładkę, czyli na przykład "Python.tsx" albo
					"Excel.tsx"
				</div>
			</div>
			<div className='chat chat-end'>
				<div className='chat-bubble'>Dasz radę 😎</div>
			</div>
		</>
	);
};

export default Error;
