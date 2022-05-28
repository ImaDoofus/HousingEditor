export default (actionData) => {

	let sequence = [];

	if (actionData.health) {
		sequence.push({ type: 'guiClick', slot: 10 });
		sequence.push({ type: 'inputAnvil', text: actionData.health });
	}

	return { addAction: { slot: 20, page: 0 }, sequence }

}