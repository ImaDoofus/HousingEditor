export default (actionData) => {
	let sequence = [];

	if (actionData.stat) {
		sequence.push(['click', { slot: 10 }]);
		sequence.push(['anvil', { text: actionData.stat }]);
	}

	if (actionData.mode) {
		if (actionData.mode !== 'increment') { // increment is the default mode, no need to set it
			sequence.push(['click', { slot: 11 }]);
			if (actionData.mode === 'decrement') {
				sequence.push(['click', { slot: 11 }]);
			}
			if (actionData.mode === 'set') {
				sequence.push(['click', { slot: 12 }]);
			}
		}
	}

	if (!isNaN(actionData.value) && actionData.value !== 1) {
		sequence.push(['click', { slot: 12 }]);
		sequence.push(['anvil', { text: actionData.value }]);
	}

	return ['Change Stat', sequence];
}