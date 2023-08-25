import { forwardRef } from 'react';
import { CodeDiv } from './CodeDiv';

const CodeDiv1 = forwardRef<HTMLDivElement, React.ComponentProps<'div'>>(
	({ className, ...props }, codeRef) => {
		props;
		return (
			<CodeDiv
				{...props}
				className={'left-10 -z-20 -top-4 md:-top-10 ' + className}
				ref={codeRef}>
				<code>
					plik = open('Dane_2205/liczby.txt').readlines() <br />
					ilosc = 0 <br />
					pierwsza = -1 <br />
					for wiersz in plik: <br />
					<p className='indent-4'>
						wiersz = wiersz.strip() <br />
					</p>
					<p className='indent-4'>
						if wiersz[0] == wiersz[len(wiersz) -1]: <br />
					</p>
					<p className='indent-8'>
						if pierwsza == -1: <br />
					</p>
					<p className='indent-12'>
						pierwsza = wiersz <br />
					</p>
					<p className='indent-8'>
						ilosc += 1 <br />
					</p>
					<br />
					print('Zadanie 4.1') <br />
					print(ilosc, pierwsza)
				</code>
				<br />
				<br />
				<code>
					plik = open('Dane_2205/liczby.txt').readlines() <br />
					ilosc = 0 <br />
					pierwsza = -1 <br />
					for wiersz in plik: <br />
					<p className='indent-4'>
						wiersz = wiersz.strip() <br />
					</p>
					<p className='indent-4'>
						if wiersz[0] == wiersz[len(wiersz) -1]: <br />
					</p>
					<p className='indent-8'>
						if pierwsza == -1: <br />
					</p>
					<p className='indent-12'>
						pierwsza = wiersz <br />
					</p>
					<p className='indent-8'>
						ilosc += 1 <br />
					</p>
					<br />
					print('Zadanie 4.1') <br />
					print(ilosc, pierwsza)
				</code>
				<br />
				<br />
				<code>
					plik = open('Dane_2205/liczby.txt').readlines() <br />
					ilosc = 0 <br />
					pierwsza = -1 <br />
					for wiersz in plik: <br />
					<p className='indent-4'>
						wiersz = wiersz.strip() <br />
					</p>
					<p className='indent-4'>
						if wiersz[0] == wiersz[len(wiersz) -1]: <br />
					</p>
					<p className='indent-8'>
						if pierwsza == -1: <br />
					</p>
					<p className='indent-12'>
						pierwsza = wiersz <br />
					</p>
					<p className='indent-8'>
						ilosc += 1 <br />
					</p>
					<br />
					print('Zadanie 4.1') <br />
					print(ilosc, pierwsza)
				</code>
			</CodeDiv>
		);
	}
);

export default CodeDiv1;
