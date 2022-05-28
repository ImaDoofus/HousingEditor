export default (actionData) => {

	let sequence = [];

	if (actionData.title) {
		sequence.push({ type: 'guiClick', slot: 10 });
		sequence.push({ type: 'inputAnvil', text: actionData.title });
	}

	if (actionData.subtitle) {
		sequence.push({ type: 'guiClick', slot: 11 });
		sequence.push({ type: 'inputAnvil', text: actionData.subtitle });
	}

	if (!isNaN(actionData.fadeIn)) {
		sequence.push({ type: 'guiClick', slot: 12 });
		sequence.push({ type: 'inputAnvil', text: actionData.fadeIn });
	}
	
	if (!isNaN(actionData.stay)) {
		sequence.push({ type: 'guiClick', slot: 13 });
		sequence.push({ type: 'inputAnvil', text: actionData.stay });
	}

	if (!isNaN(actionData.fadeOut)) {
		sequence.push({ type: 'guiClick', slot: 14 });
		sequence.push({ type: 'inputAnvil', text: actionData.fadeOut });
	}

	return { addAction: { slot: 15, page: 0 }, sequence }

}