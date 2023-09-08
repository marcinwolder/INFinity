import waitForAuthInit from './waitForAuthInit';

const requireAuth = async () => {
	const user = await waitForAuthInit();
	if (user) return;
	else throw new Error('Musisz byc zalogowany aby miec dostęp do tej strony');
};

export default requireAuth;
