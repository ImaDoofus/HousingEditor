export default (actionData) => {

	let sequence = [];

	if (actionData.item) {
		sequence.push({ type: 'guiClick', slot: 10 });
		sequence.push({ type: 'loadItem', item: actionData.item, slot: 36 }); // slot 36 is the first slot in the hotbar
		sequence.push({ type: 'guiClick', slot: 63 }); // slot 63 is the first slot in the inventory when "Select an Item" gui is opened
	}

	return { addAction: { slot: 23, page: 0 }, sequence }

}