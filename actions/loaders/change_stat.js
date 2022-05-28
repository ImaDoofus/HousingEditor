export default (actionData) => {

	let sequence = [];

	if (actionData.stat) {
		sequence.push({ type: 'guiClick', slot: 10 });
		sequence.push({ type: 'inputAnvil', text: actionData.stat });
	}

	if (actionData.mode) {
		if (actionData.mode !== 'increment') { // increment is the default mode, no need to set it
			sequence.push({ type: 'guiClick', slot: 11 });
			if (actionData.mode === 'decrement') {
				sequence.push({ type: 'guiClick', slot: 11 });
			}
			if (actionData.mode === 'set') {
				sequence.push({ type: 'guiClick', slot: 12 });
			}
		}
	}

	if (!isNaN(actionData.amount)) {
		sequence.push({ type: 'guiClick', slot: 12 });
		sequence.push({ type: 'inputAnvil', text: actionData.amount });
	}

	return { addAction: { slot: 31, page: 0 }, sequence }

}