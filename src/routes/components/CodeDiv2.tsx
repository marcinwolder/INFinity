import { forwardRef } from 'react';
import { CodeDiv } from './CodeDiv';

const CodeDiv2 = forwardRef<HTMLDivElement, React.ComponentProps<'div'>>(
	({ className, ...props }, codeRef) => {
		props;
		return (
			<CodeDiv
				{...props}
				className={'right-10 text-right -top-10 ' + className}
				ref={codeRef}>
				<code>
					plik = open('Dane_2103/galerie.txt').readlines() <br />
					<br />
					galerie = dict()
					<br />
					for wiersz in plik:
					<br />
					<p className='mr-4'>wiersz = wiersz.strip().split(' ')</p>
					<p className='mr-4'>kraj = wiersz[0]</p>
					<p className='mr-4'>
						galerie[kraj] = 0<br />
					</p>
					<br />
					for wiersz in plik:
					<p className='mr-4'>wiersz = wiersz.strip().split(' ')</p>
					<p className='mr-4'>kraj = wiersz[0]</p>
					<p className='mr-4'>
						galerie[kraj] = galerie[kraj] + 1<br />
					</p>
					<br />
					print('Zadanie 4.1')
					<br />
					for x in galerie.keys():
					<br />
					<p className='mr-4'>print(x, galerie[x])</p>
					<br />
				</code>
				<br />
				<br />
				<code>
					plik = open('Dane_2103/galerie.txt').readlines() <br />
					<br />
					galerie = dict()
					<br />
					for wiersz in plik:
					<br />
					<p className='mr-4'>wiersz = wiersz.strip().split(' ')</p>
					<p className='mr-4'>kraj = wiersz[0]</p>
					<p className='mr-4'>
						galerie[kraj] = 0<br />
					</p>
					<br />
					for wiersz in plik:
					<p className='mr-4'>wiersz = wiersz.strip().split(' ')</p>
					<p className='mr-4'>kraj = wiersz[0]</p>
					<p className='mr-4'>
						galerie[kraj] = galerie[kraj] + 1<br />
					</p>
					<br />
					print('Zadanie 4.1')
					<br />
					for x in galerie.keys():
					<br />
					<p className='mr-4'>print(x, galerie[x])</p>
					<br />
				</code>
			</CodeDiv>
		);
	}
);

export default CodeDiv2;
