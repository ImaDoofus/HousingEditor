import getPotionEffect from "../../utils/getPotionEffect";
import LimitedAction from "../LimitedAction";

export default (actionData) => {
	
	let sequence = [];

	if (actionData.conditions) {
		sequence.push({ type: 'guiClick', slot: 10 }); // select conditions tab
		actionData.conditions.forEach(condition => {
			sequence.push(...loadCondition(condition))
		})
		sequence.push({ type: 'goBack' }); // go back to conditional main tab
	}

	if (actionData.ifActions) {
		sequence.push({ type: 'guiClick', slot: 11 }); // select if actions tab
		actionData.ifActions.forEach(action => {
			let actionSequence = new LimitedAction(action[0], action[1]).getSequence()
			sequence.push(...actionSequence);
		})
		sequence.push({ type: 'goBack' }); // go back to conditional main tab
	}

	if (actionData.elseActions) {
		sequence.push({ type: 'guiClick', slot: 12 }); // select else actions tab
		actionData.elseActions.forEach(action => {
			let actionSequence = new LimitedAction(action[0], action[1]).getSequence()
			sequence.push(...actionSequence);
		})
		sequence.push({ type: 'goBack' }); // go back to conditional main tab
	}

	return { addAction: { slot: 10, page: 0 }, sequence }

}

function loadCondition(condition) {

	let sequence = [];

	const [conditionType, conditionData] = condition;

	sequence.push({ type: 'guiClick', slot: 50 }); // add conditional
	switch (conditionType) {
		case "has_potion_effect":
			sequence.push({ type: 'guiClick', slot: 16 }); // select "Has Potion Effect"
			if (conditionData.effect) {
				sequence.push({ type: 'guiClick', slot: 10}); // select "Effect"
				let { slot, page } = getPotionEffect(conditionData.effect);
				if (page) {
					sequence.push({ type: 'guiClick', slot: 53 });
				}
				sequence.push({ type: 'guiClick', slot: slot });
			}
			sequence.push({ type: 'goBack' }); // go back to edit conditionals tab 
			break;
		
		case "doing_parkour":
			sequence.push({ type: 'guiClick', slot: 15 }); // select "Doing Parkour"
			break;

		case "has_item":
			sequence.push({ type: 'guiClick', slot: 14 }); // select "Has Item"
			if (conditionData.item) {
				sequence.push({ type: 'guiClick', slot: 10 }); // select "Item"
				sequence.push({ type: 'loadItem', item: conditionData.item, slot: 36 }); // slot 36 is the first slot in the hotbar
				sequence.push({ type: 'guiClick', slot: 63 }); // slot 63 is the first slot in the inventory when "Select an Item" gui is opened
			}
			if (conditionData.whatToCheck === "item_type") { // item metadata is default
				sequence.push({ type: 'guiClick', slot: 11 }); // select "What to Check"
				sequence.push({ type: 'guiClick', slot: 10 }); // select "Item Type"
			}
			if (conditionData.whereToCheck) {
				sequence.push({ type: 'guiClick', slot: 12 }); // select "Where to Check"
				switch (conditionData.whereToCheck) { // the default is "Anywhere" that is why there is no case for it
					case "hand":
						sequence.push({ type: 'guiClick', slot: 10 }); // select "Hand"
						break;
					case "armor":
						sequence.push({ type: 'guiClick', slot: 11 }); // select "Armor"
						break;
					case "hotbar":
						sequence.push({ type: 'guiClick', slot: 12 }); // select "Hotbar"
						break;
					case "inventory":
						sequence.push({ type: 'guiClick', slot: 13 }); // select "Inventory"
						break;
					default: // if the condition.whereToCheck is not one of the above, click go back
						sequence.push({ type: 'goBack' });
						break;
				}
			}
			if (conditionData.requiredAmount) {	// Any Amount is the default here
				sequence.push({ type: 'guiClick', slot: 13 }); // select "Required Amount"
				sequence.push({ type: 'guiClick', slot: 11 }); // select "Equal or Greater Amount"
			}
			sequence.push({ type: 'goBack' }); // go back to edit conditionals tab 
			break;
		
		case 'within_region':
			sequence.push({ type: 'guiClick', slot: 13 }); // select "Within Region"
			if (conditionData.region) {
				sequence.push({ type: 'guiClick', slot: 10 }); // select "Region"
				sequence.push({ type: 'selectOption', option: conditionData.region });
			}
			sequence.push({ type: 'goBack' }); // go back to edit conditionals tab
			break;

		case 'required_permission':
			sequence.push({ type: 'guiClick', slot: 12 }); // select "Required Permission"
			if (conditionData.permission) {
				sequence.push({ type: 'guiClick', slot: 10 }); // select "Permission"
				sequence.push({ type: 'selectOption', option: conditionData.permission });
			}
			sequence.push({ type: 'goBack' }); // go back to edit conditionals tab
			break;

		case 'stat_requirement':
			sequence.push({ type: 'guiClick', slot: 11 }); // select "Stat Requirement"
			if (conditionData.stat) {
				sequence.push({ type: 'guiClick', slot: 10 }); // select "Stat"
				sequence.push({ type: 'inputAnvil', text: conditionData.stat });
			}
			if (conditionData.comparator) { // default is "Equal"
				sequence.push({ type: 'guiClick', slot: 11 }); // select "Comparator"
				switch (conditionData.comparator) {
					case "less_than":
						sequence.push({ type: 'guiClick', slot: 10 }); // select "Less Than"
						break;
					case "less_than_or_equal":
						sequence.push({ type: 'guiClick', slot: 11 }); // select "Less Than or Equal"
						break;
					case "greater_than_or_equal":
						sequence.push({ type: 'guiClick', slot: 13 }); // select "Greater Than or Equal"
						break;
					case "greater_than":
						sequence.push({ type: 'guiClick', slot: 14 }); // select "Greater Than"
						break;
					default: // if none go back
						sequence.push({ type: 'goBack' });
						break;
				}
			}
			if (!isNaN(conditionData.compareValue)) {
				sequence.push({ type: 'guiClick', slot: 12 }); // select "Compare Value"
				sequence.push({ type: 'inputAnvil', text: condition.compareValue });
			}
			sequence.push({ type: 'goBack' }); // go back to edit conditionals tab
			break;

		case 'required_group':
			sequence.push({ type: 'guiClick', slot: 10 }); // select "Required Group"
			if (conditionData.group) {
				sequence.push({ type: 'guiClick', slot: 10 }); // select "Group"
				sequence.push({ type: 'selectOption', option: condition.group });
			}
			if (conditionData.includeHigherGroups) {
				sequence.push({ type: 'guiClick', slot: 11 }); // select "Include Higher Groups"
			}
			sequence.push({ type: 'goBack' }); // go back to edit conditionals tab
			break;

	}
	return sequence;
}