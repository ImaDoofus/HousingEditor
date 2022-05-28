export default (actionData) => {

	let sequence = [];

	if (actionData.message) {
		sequence.push({ type: 'guiClick', slot: 10 });
		sequence.push({ type: 'inputAnvil', text: actionData.message });
	}

	return { addAction: { slot: 24, page: 0 }, sequence }

}