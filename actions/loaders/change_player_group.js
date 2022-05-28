export default (actionData) => {

	let sequence = [];

	if (actionData.group) {
		sequence.push({ type: 'guiClick', slot: 10 });
		sequence.push({ type: 'selectOption', option: actionData.group });
	}

	if (actionData.demotionProtection) {
		sequence.push({ type: 'guiClick', slot: 11 });
	}

	return { addAction: { slot: 0, page: 11 }, sequence }

}