export default (actionData) => {

	let sequence = [];

	sequence.push({ type: 'guiClick', slot: 10 });

	switch(actionData.location) {
		case 'house_spawn':
			sequence.push({ type: 'guiClick', slot: 10 });
			break;
		case 'current_location':
			sequence.push({ type: 'guiClick', slot: 11 });
			break;
		case 'custom_coordinates':
			sequence.push({ type: 'guiClick', slot: 12 });
			sequence.push({ type: 'inputAnvil', text: actionData.coordinates.join(' ') });
			break;
	}

	return { addAction: { slot: 10, page: 1 }, sequence }

}