import getPotionEffect from "../../utils/getPotionEffect";
import LimitedAction from "../LimitedAction";

export default (actionData) => {
	
	let sequence = [];

	if (actionData.actions) {
		sequence.push({ type: 'guiClick', slot: 10 }); // select "Actions"
		actionData.actions.forEach(action => {
			let actionSequence = new LimitedAction(action[0], action[1]).getSequence()
			sequence.push(...actionSequence);
		})
	}

	return { addAction: { slot: 14, page: 1 }, sequence }

}