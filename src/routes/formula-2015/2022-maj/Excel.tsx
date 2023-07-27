import DonwloadBtn from '../../../components/DownloadBtn';
import {
	TestProvider,
	AnswerBtn,
	TestInput,
	TestImg,
	InfoBox,
} from '../../../context/testContext';
import Table from '../../../components/Table';

import zadanie5 from './img/5.png';
import zadanie5instrukcja from './img/5-instrukcja.png';
import polecenie1 from './img/5-1.png';
import polecenie2 from './img/5-2.png';
import polecenie3 from './img/5-3.png';
import polecenie4 from './img/5-4.png';
import polecenie5 from './img/5-5.png';

const Excel = () => {
	return (
		<>
			<TestProvider taskNum={5} title='Sok'>
				<TestImg img={zadanie5} />
				<DonwloadBtn urls={['/formula-2015/2022/maj/soki.txt']} />
			</TestProvider>
			<TestProvider taskNum={5.1} pkt={1}>
				<TestImg img={polecenie1} />
				<Table headings={['Magazyn', 'Ilość zamówień']}>
					<>Gniezno</>
					<TestInput num={1} answer={152} />
					<>Malbork</>
					<TestInput num={2} answer={183} />
					<>Ogrodzieniec</>
					<TestInput num={3} answer={222} />
					<>Przemysl</>
					<TestInput num={4} answer={198} />
				</Table>
				<AnswerBtn />
			</TestProvider>
			<TestProvider taskNum={5.2} pkt={2}>
				<TestImg img={polecenie2} />
				<Table
					cols={2}
					__manualSizes='auto 1fr'
					className='[&>.col-1]:justify-end'>
					<>Liczba dni: </>
					<TestInput answer={8} num={1} />
					<>Data pierwszago dnia: </>
					<TestInput answer={'07.10.2021'} placeholder='(dd.mm.rrrr)' num={2} />
					<>Data ostatniego dnia: </>
					<TestInput answer={'14.10.2021'} placeholder='(dd.mm.rrrr)' num={3} />
				</Table>
				<AnswerBtn />
			</TestProvider>
			<TestProvider taskNum={5.3} pkt={3}>
				<TestImg img={polecenie3} />
				<Table headings={['Magazyn', 'Łączna wielkość zamówień']}>
					<>Gniezno</>
					<TestInput num={1} answer={819000} />
					<>Malbork</>
					<TestInput num={2} answer={944240} />
					<>Ogrodzieniec</>
					<TestInput num={3} answer={1115560} />
					<>Przemysl</>
					<TestInput num={4} answer={1062920} />
				</Table>
				<AnswerBtn />
			</TestProvider>
			<InfoBox taskNums={['5.4', '5.5']}>
				<TestImg img={zadanie5instrukcja} />
			</InfoBox>
			<TestProvider taskNum={5.4} pkt={4}>
				<TestImg img={polecenie4} />
				<Table
					cols={2}
					__manualSizes='auto 1fr'
					className='[&>.col-1]:justify-end'>
					<>Data: </>
					<TestInput answer={'19.03.2021'} placeholder='(dd.mm.rrrr)' num={1} />
					<>Numer zamówienia: </>
					<TestInput answer={154} num={2} />
					<>Liczba zamówień: </>
					<TestInput answer={37} num={3} />
					<>Łączna liczba butelek: </>
					<TestInput answer={285230} num={4} />
				</Table>
				<AnswerBtn />
			</TestProvider>
			<TestProvider taskNum={5.5} pkt={2}>
				<TestImg img={polecenie5} />
				<Table>
					Ilość: <TestInput answer={13179} num={1} />
				</Table>
				<AnswerBtn />
			</TestProvider>
		</>
	);
};

export default Excel;
