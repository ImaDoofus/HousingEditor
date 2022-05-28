export default (actionData) => {

	let sequence = [];

	if (actionData.reason) {
		sequence.push({ type: 'guiClick', slot: 10 }); 
		sequence.push({ type: 'inputAnvil', text: actionData.reason }); 
	}

	return { addAction: { slot: 33, page: 0 }, sequence }

}
