export default (actionData) => {
	let sequence = [];

	if (!isNaN(actionData.health)) {
		sequence.push(['click', { slot: 10 }]);
		sequence.push(['anvil', { text: actionData.health }]);
	}

	return ['Set Health', sequence];
}