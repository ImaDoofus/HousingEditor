import getPotionEffect from "../../utils/getPotionEffect.js";

export default (actionData) => {
	let sequence = [];

	if (actionData.effect) {
		sequence.push(['click', { slot: 10 }]);
		let { slot, page } = getPotionEffect(actionData.effect);
		if (page) {
			sequence.push(['click', { slot: 53 }]);
		}
		sequence.push(['click', { slot }]); 
	}

	if (actionData.duration) {
		sequence.push(['click', { slot: 11 }]);
		sequence.push(['anvil', { text: actionData.duration }]);
	}

	if (actionData.amplifier) {
		sequence.push(['click', { slot: 12 }]);
		sequence.push(['anvil', { text: actionData.amplifier }]);
	}

	if (actionData.overrideExistingEffects) {
		sequence.push(['click', { slot: 13 }]);
	}

	return ['Apply Potion Effect', sequence];
}