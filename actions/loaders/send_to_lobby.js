export default (actionData) => {

	let sequence = [];

	if (actionData.lobby) {
		sequence.push({ type: 'guiClick', slot: 10 });
		sequence.push({ type: 'selectOption', option: actionData.lobby });
	}

	return { addAction: { slot: 30, page: 0 }, sequence }

}