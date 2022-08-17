import getPotionEffect from "../../utils/getPotionEffect.js";
import LimitedAction from "../LimitedAction.js";

export default (actionData) => {
	let sequence = [];

	if (actionData.conditions) {
		sequence.push(['click', { slot: 10 }]); // select conditions tab
		actionData.conditions.forEach(condition => {
			sequence.push(...loadCondition(condition))
		})
		sequence.push(['back']); // go back to conditional main tab
	}

	if (actionData.if) {
		sequence.push(['click', { slot: 11 }]); // select if actions tab
		actionData.if.forEach(action => {
			let actionSequence = new LimitedAction(action[0], action[1]).getSequence()
			sequence.push(...actionSequence);
		})
		sequence.push(['back']); // go back to conditional main tab
	}

	if (actionData.else) {
		sequence.push(['click', { slot: 12 }]); // select else actions tab
		actionData.else.forEach(action => {
			let actionSequence = new LimitedAction(action[0], action[1]).getSequence()
			sequence.push(...actionSequence);
		})
		sequence.push(['back']); // go back to conditional main tab
	}

	return ['Conditional', sequence];
}

function loadCondition(condition) {
	let sequence = [];

	const [conditionType, conditionData] = condition;

	sequence.push(['click', { slot: 50 }]); // add conditional
	switch (conditionType) {
		case "has_potion_effect":
			sequence.push(['click', { slot: 16 }]); // select "Has Potion Effect"
			if (conditionData.effect) {
				sequence.push(['click', { slot: 10}]); // select "Effect"
				let { slot, page } = getPotionEffect(conditionData.effect);
				if (page) {
					sequence.push(['click', { slot: 53 }]);
				}
				sequence.push(['click', { slot: slot }]);
			}
			sequence.push(['back']); // go back to edit conditionals tab 
			break;
		
		case "doing_parkour":
			sequence.push(['click', { slot: 15 }]); // select "Doing Parkour"
			break;

		case "has_item":
			sequence.push(['click', { slot: 14 }]); // select "Has Item"
			if (conditionData.item) {
				sequence.push(['click', { slot: 10 }]); // select "Item"
				sequence.push(['item', { item: conditionData.item, slot: 36 }]); // slot 36 is the first slot in the hotbar
				sequence.push(['click', { slot: 63 }]); // slot 63 is the first slot in the inventory when "Select an Item" gui is opened
			}
			if (conditionData.whatToCheck === "item_type") { // item metadata is default
				sequence.push(['click', { slot: 11 }]); // select "What to Check"
				sequence.push(['click', { slot: 10 }]); // select "Item Type"
			}
			if (conditionData.whereToCheck && conditionData.whereToCheck !== 'anywhere') {
				sequence.push(['click', { slot: 12 }]); // select "Where to Check"
				switch (conditionData.whereToCheck) { // the default is "Anywhere" that is why there is no case for it
					case "hand":
						sequence.push(['click', { slot: 10 }]); // select "Hand"
						break;
					case "armor":
						sequence.push(['click', { slot: 11 }]); // select "Armor"
						break;
					case "hotbar":
						sequence.push(['click', { slot: 12 }]); // select "Hotbar"
						break;
					case "inventory":
						sequence.push(['click', { slot: 13 }]); // select "Inventory"
						break;
				}
			}
			if (conditionData.requiredAmount) {	// Any Amount is the default here
				sequence.push(['click', { slot: 13 }]); // select "Required Amount"
				sequence.push(['click', { slot: 11 }]); // select "Equal or Greater Amount"
			}
			sequence.push(['back']); // go back to edit conditionals tab 
			break;
		
		case 'within_region':
			sequence.push(['click', { slot: 13 }]); // select "Within Region"
			if (conditionData.region) {
				sequence.push(['click', { slot: 10 }]); // select "Region"
				sequence.push(['option', { option: conditionData.region }]);
			}
			sequence.push(['back']); // go back to edit conditionals tab
			break;

		case 'required_permission':
			sequence.push(['click', { slot: 12 }]); // select "Required Permission"
			if (conditionData.permission) {
				sequence.push(['click', { slot: 10 }]); // select "Permission"
				sequence.push(['option', { option: conditionData.permission }]);
			}
			sequence.push(['back']); // go back to edit conditionals tab
			break;

		case 'stat_requirement':
			sequence.push(['click', { slot: 11 }]); // select "Stat Requirement"
			if (conditionData.stat && conditionData.stat !== 'Kills') {
				sequence.push(['click', { slot: 10 }]); // select "Stat"
				sequence.push(['anvil', { text: conditionData.stat }]);
			}
			if (conditionData.comparator && conditionData.comparator !== 'equal_to') { // default is "Equal"
				console.log(conditionData.comparator);
				sequence.push(['click', { slot: 11 }]); // select "Comparator"
				switch (conditionData.comparator) {
					case "less_than":
						sequence.push(['click', { slot: 10 }]); // select "Less Than"
						break;
					case "less_than_or_equal_to":
						sequence.push(['click', { slot: 11 }]); // select "Less Than or Equal"
						break;
					case "greater_than_or_equal_to":
						sequence.push(['click', { slot: 13 }]); // select "Greater Than or Equal"
						break;
					case "greater_than":
						sequence.push(['click', { slot: 14 }]); // select "Greater Than"
						break;
				}
			}
			if (!isNaN(conditionData.compareValue)) {
				sequence.push(['click', { slot: 12 }]); // select "Compare Value"
				sequence.push(['anvil', { text: conditionData.compareValue }]);
			}
			sequence.push(['back']); // go back to edit conditionals tab
			break;

		case 'required_group':
			sequence.push(['click', { slot: 10 }]); // select "Required Group"
			if (conditionData.group) {
				sequence.push(['click', { slot: 10 }]); // select "Group"
				sequence.push(['option', { option: conditionData.group }]);
			}
			if (conditionData.includeHigherGroups) {
				sequence.push(['click', { slot: 11 }]); // select "Include Higher Groups"
			}
			sequence.push(['back']); // go back to edit conditionals tab
			break;

	}
	return sequence;
}