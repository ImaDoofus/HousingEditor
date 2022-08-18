export default (actionData) => {
	let sequence = [];

	if (actionData.stat && actionData.stat !== "Kills") {
		sequence.push(['click', { slot: 10 }]);
		sequence.push(['anvil', { text: actionData.stat }]);
	}

	if (actionData.mode && actionData.mode !== "increment") {
		sequence.push(['click', { slot: 11 }]);
		if (actionData.mode === 'decrement') {
			sequence.push(['click', { slot: 11 }]);
		}
		if (actionData.mode === 'set') {
			sequence.push(['click', { slot: 12 }]);
		}
	}

	if (!isNaN(actionData.value) && actionData.value !== 1) {
		sequence.push(['click', { slot: 12 }]);
		sequence.push(['anvil', { text: actionData.value }]);
	}

	return ['Change Player Stat', sequence];
}
