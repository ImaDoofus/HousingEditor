export default (actionData) => {
	let sequence = [];

	if (actionData.message) {
		sequence.push(['click', { slot: 10 }]);
		sequence.push(['anvil', { text: actionData.message }]);
	}

	return ['Send a Chat Message', sequence];
}