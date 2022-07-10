export default (actionData) => {
	let sequence = [];
	console.log(JSON.stringify(actionData));
	if (actionData.message && actionData.message !== "Hello!") {
		sequence.push(['click', { slot: 10 }]);
		sequence.push(['anvil', { text: actionData.message }]);
	}

	return ['Send a Chat Message', sequence];
}