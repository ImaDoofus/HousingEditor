import getPotionEffect from "../../utils/getPotionEffect";

export default (actionData) => {

	let sequence = [];

	if (actionData.effect) {
		sequence.push({ type: 'guiClick', slot: 10 });
		let { slot, page } = getPotionEffect(actionData.effect);
		if (page) {
			sequence.push({ type: 'guiClick', slot: 53 });
		}
		sequence.push({ type: 'guiClick', slot: slot }); 
	}

	if (actionData.duration) {
		sequence.push({ type: 'guiClick', slot: 11 });
		sequence.push({ type: 'inputAnvil', text: actionData.duration });
	}

	if (actionData.level) {
		sequence.push({ type: 'guiClick', slot: 12 })
		sequence.push({ type: 'inputAnvil', text: actionData.level });
	}

	if (actionData.overrideExistingEffects) {
		sequence.push({ type: 'guiClick', slot: 13 });
	}

	return { addAction: { slot: 25, page: 0 }, sequence }

}