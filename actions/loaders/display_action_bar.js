export default (actionData) => {
	let sequence = [];

	if (actionData.message && actionData.message !== "Hello World!") {
		sequence.push(['click', { slot: 10 }]);
		sequence.push(['anvil', { text: actionData.message }]);
	}

	return ['Display Action Bar', sequence];
}