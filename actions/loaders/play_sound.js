export default (actionData) => {

	let sequence = [];

	if (actionData.sound) {
		sequence.push({ type: 'guiClick', slot: 10 });
		sequence.push({ type: 'selectOption', option: actionData.sound });
	}

	if (actionData.pitch) {
		sequence.push({ type: 'guiClick', slot: 11 });
		sequence.push({ type: 'inputAnvil', text: actionData.pitch });
	}

	return { addAction: { slot: 34, page: 0 }, sequence }

}