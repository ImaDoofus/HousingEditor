export default (actionData) => {

	let sequence = [];

	if (actionData.levels) {
		sequence.push({ type: 'guiClick', slot: 10});
		sequence.push({ type: 'inputAnvil', text: actionData.levels });
	}

	return { addAction: { slot: 29, page: 0 }, sequence }

}