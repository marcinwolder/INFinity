import DonwloadBtn from '../../../../components/DownloadBtn';
import {
	TestProvider,
	TestImg,
	AnswerBtn,
	TestInput,
	TestArea,
} from '../../../../context/testContext';

import zadanie6 from './img/6.png';
import polecenie1 from './img/6-1.png';
import polecenie2 from './img/6-2.png';
import polecenie3 from './img/6-3.png';
import polecenie4 from './img/6-4.png';
import Table from '../../../../components/Table';

const Access = () => {
	return (
		<>
			<TestProvider taskNum={6} title='System kontroli dostępu'>
				<img src={zadanie6} draggable={false} className='pt-2 select-none' />
				<DonwloadBtn
					urls={[
						'/formula-2015/2022/maj/klasa.txt',
						'/formula-2015/2022/maj/uczen.txt',
						'/formula-2015/2022/maj/ewidencja.txt',
					]}
				/>
			</TestProvider>
			{/* ZADANIE 1 */}
			<TestProvider taskNum={6.1} pkt={2}>
				<TestImg img={polecenie1} />
				<Table>
					<>Ilość</>
					<TestInput answer={165} num={1} />
				</Table>
				<AnswerBtn />
			</TestProvider>
			{/* ZADANIE 2 */}
			<TestProvider taskNum={6.2} pkt={3}>
				<TestImg img={polecenie2} />
				<Table headings={['Data', 'Liczba uczniów']}>
					<>04.04.2022</>
					<TestInput answer={233} num={1} />
					<>05.04.2022</>
					<TestInput answer={303} num={2} />
					<>06.04.2022</>
					<TestInput answer={134} num={3} />
					<>07.04.2022</>
					<TestInput answer={280} num={4} />
					<>08.04.2022</>
					<TestInput answer={127} num={5} />
				</Table>
				<AnswerBtn />
			</TestProvider>
			{/* ZADANIE 3 */}
			<TestProvider taskNum={6.3} pkt={3}>
				<TestImg img={polecenie3} />
				<Table headings={['Identyfikator, Imię, Nazwisko']}>
					{[
						<TestArea
							passIfNotSorted
							answer={[
								'314\tSebastian\tRabaj',
								'172\tMonika\tKado',
								'299\tAlicja\tKronecka',
							]}
							num={1}
						/>,
					]}
				</Table>
				<AnswerBtn />
			</TestProvider>
			<TestProvider taskNum={6.4} pkt={3}>
				<TestImg img={polecenie4} />
				<Table headings={['Imię i Nazwisko']}>
					{[
						<TestArea
							passIfNotSorted
							answer={[
								'Mateusz\tKordas',
								'Krzysztof\tMichalak',
								'Oliwier\tZiolko',
							]}
							num={1}
						/>,
					]}
				</Table>
				<AnswerBtn />
			</TestProvider>
		</>
	);
};

export default Access;
