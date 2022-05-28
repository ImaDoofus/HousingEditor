export default (actionData) => {

	let sequence = [];

	if (actionData.gamemode) {
		sequence.push({ type: 'guiClick', slot: 10 });
		switch (actionData.gamemode) {
			case 'adventure':
				sequence.push( { type: 'guiClick', slot: 10 } );
				break;
			case 'survival':
				sequence.push( { type: 'guiClick', slot: 11 } );
				break;	
			case 'creative':
				sequence.push( { type: 'guiClick', slot: 12 } );
				break;
		}
	}

	return { addAction: { slot: 11, page: 1 }, sequence }

}