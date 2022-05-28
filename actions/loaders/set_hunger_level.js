export default (actionData) => {

	let sequence = [];

	if (actionData.level) {
		sequence.push({ type: 'guiClick', slot: 10 });
		sequence.push({ type: 'inputAnvil', text: actionData.level });
	}

	return { addAction: { slot: 13, page: 1 }, sequence }

}