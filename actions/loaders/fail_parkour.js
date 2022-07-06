export default (actionData) => {
	let sequence = [];

	if (actionData.reason) {
		sequence.push(['click', { slot: 10 }]); 
		sequence.push(['anvil', { text: actionData.reason }]); 
	}

	return ['Fail Parkour', sequence];
}
