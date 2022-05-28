export default (actionData) => {

	let sequence = [];

	if (actionData.text) {
		sequence.push({ type: 'guiClick', slot: 10 });
		sequence.push({ type: 'inputAnvil', text: actionData.text });
	}

	return { addAction: { slot: 16, page: 0 }, sequence }

}