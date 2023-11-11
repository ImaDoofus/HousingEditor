import getPotionEffect from '../../utils/getPotionEffect';
import LimitedAction from '../LimitedAction';

export default (actionData) => {
    let sequence = [];

    if (actionData.conditions) {
        sequence.push(['setGuiContext', { context: 'Conditional -> Conditions' }]);
        sequence.push(['click', { slot: 10 }]);
        actionData.conditions.forEach((condition) => {
            sequence.push(...loadCondition(condition));
        });
        sequence.push(['back']);
    }

    if (actionData.matchAnyCondition) sequence.push(['click', { slot: 11 }]);

    if (actionData.if && actionData.if.length > 0) {
        sequence.push(['setGuiContext', { context: 'Conditional -> If' }]);
        sequence.push(['click', { slot: 12 }]);
        actionData.if.forEach((action) => {
            let actionSequence = new LimitedAction(action[0], action[1]).getSequence();
            sequence.push(...actionSequence);
        });
        sequence.push(['back']);
    }

    if (actionData.else && actionData.else.length > 0) {
        sequence.push(['setGuiContext', { context: 'Conditional -> Else' }]);
        sequence.push(['click', { slot: 13 }]);
        actionData.else.forEach((action) => {
            let actionSequence = new LimitedAction(action[0], action[1]).getSequence();
            sequence.push(...actionSequence);
        });
        sequence.push(['back']);
    }

    return ['Conditional', sequence];
};

function loadCondition(condition) {
    let sequence = [];

    const [conditionType, conditionData] = condition;

    sequence.push(['click', { slot: 50 }]);
    switch (conditionType) {
        case 'has_potion_effect':
            sequence.push(['setGuiContext', { context: 'Condition -> Has Potion Effect' }]);
            sequence.push(['option', { option: 'Has Potion Effect' }]);
            if (conditionData.effect) {
                sequence.push(['click', { slot: 10 }]);
                let { slot, page } = getPotionEffect(conditionData.effect);
                if (page) {
                    sequence.push(['click', { slot: 53 }]);
                }
                sequence.push(['click', { slot }]);
            }
            sequence.push(['back']);
            break;

        case 'doing_parkour':
            sequence.push(['option', { option: 'Doing Parkour' }]);
            break;

        case 'has_item':
            sequence.push(['setGuiContext', { context: 'Condition -> Has Item' }]);
            sequence.push(['option', { option: 'Has Item' }]);
            if (conditionData.item) {
                sequence.push(['click', { slot: 10 }]);
                sequence.push(['item', { item: conditionData.item }]);
            }
            if (conditionData.whatToCheck === 'item_type') {
                sequence.push(['click', { slot: 11 }]);
                sequence.push(['click', { slot: 10 }]);
            }
            if (conditionData.whereToCheck && conditionData.whereToCheck !== 'anywhere') {
                sequence.push(['click', { slot: 12 }]);
                if (conditionData.whereToCheck === 'hand') sequence.push(['click', { slot: 10 }]);
                if (conditionData.whereToCheck === 'armor') sequence.push(['click', { slot: 11 }]);
                if (conditionData.whereToCheck === 'hotbar') sequence.push(['click', { slot: 12 }]);
                if (conditionData.whereToCheck === 'inventory') sequence.push(['click', { slot: 13 }]);
            }
            if (conditionData.requireAmount) {
                sequence.push(['click', { slot: 13 }]);
                sequence.push(['click', { slot: 11 }]);
            }
            sequence.push(['back']);
            break;

        case 'is_item':
            sequence.push(['setGuiContext', { context: 'Condition -> Is Item' }]);
            sequence.push(['option', { option: 'Is Item' }]);
            if (conditionData.item) {
                sequence.push(['click', { slot: 10 }]);
                sequence.push(['item', { item: conditionData.item }]);
            }
            if (conditionData.whatToCheck === 'item_type') {
                sequence.push(['click', { slot: 11 }]);
                sequence.push(['click', { slot: 10 }]);
            }
            if (conditionData.whereToCheck && conditionData.whereToCheck !== 'anywhere') {
                sequence.push(['click', { slot: 12 }]);
                if (conditionData.whereToCheck === 'hand') sequence.push(['click', { slot: 10 }]);
                if (conditionData.whereToCheck === 'armor') sequence.push(['click', { slot: 11 }]);
                if (conditionData.whereToCheck === 'hotbar') sequence.push(['click', { slot: 12 }]);
                if (conditionData.whereToCheck === 'inventory') sequence.push(['click', { slot: 13 }]);
            }
            if (conditionData.requireAmount) {
                sequence.push(['click', { slot: 13 }]);
                sequence.push(['click', { slot: 11 }]);
            }
            sequence.push(['back']);
            break;

        case 'within_region':
            sequence.push(['setGuiContext', { context: 'Condition -> Within Region' }]);
            sequence.push(['option', { option: 'Within Region' }]);
            if (conditionData.region) {
                sequence.push(['click', { slot: 10 }]);
                sequence.push(['option', { option: conditionData.region }]);
            }
            sequence.push(['back']);
            break;

        case 'required_permission':
            sequence.push(['setGuiContext', { context: 'Condition -> Required Permission' }]);
            sequence.push(['option', { option: 'Required Permission' }]);
            if (conditionData.permission) {
                sequence.push(['click', { slot: 10 }]);
                sequence.push(['option', { option: conditionData.permission }]);
            }
            sequence.push(['back']);
            break;

        case 'player_stat_requirement':
            sequence.push(['option', { option: 'Player Stat Requirement' }]);
            if (conditionData.stat && conditionData.stat !== 'Kills') {
                sequence.push(['click', { slot: 10 }]);
                sequence.push(['chat', { text: conditionData.stat }]);
            }
            if (conditionData.comparator && conditionData.comparator !== 'equal_to') {
                sequence.push(['click', { slot: 11 }]);
                if (conditionData.comparator === 'less_than') sequence.push(['click', { slot: 10 }]);
                if (conditionData.comparator === 'less_than_or_equal_to') sequence.push(['click', { slot: 11 }]);
                if (conditionData.comparator === 'greater_than_or_equal_to') sequence.push(['click', { slot: 13 }]);
                if (conditionData.comparator === 'greater_than') sequence.push(['click', { slot: 14 }]);
            }
            if (conditionData.compareValue) {
                sequence.push(['click', { slot: 12 }]);
                sequence.push(['anvil', { text: conditionData.compareValue }]);
            }
            sequence.push(['back']);
            break;

        case 'global_stat_requirement':
            sequence.push(['option', { option: 'Global Stat Requirement' }]);
            if (conditionData.stat && conditionData.stat !== 'Kills') {
                sequence.push(['click', { slot: 10 }]);
                sequence.push(['chat', { text: conditionData.stat }]);
            }
            if (conditionData.comparator && conditionData.comparator !== 'equal_to') {
                sequence.push(['click', { slot: 11 }]);
                if (conditionData.comparator === 'less_than') sequence.push(['click', { slot: 10 }]);
                if (conditionData.comparator === 'less_than_or_equal_to') sequence.push(['click', { slot: 11 }]);
                if (conditionData.comparator === 'greater_than_or_equal_to') sequence.push(['click', { slot: 13 }]);
                if (conditionData.comparator === 'greater_than') sequence.push(['click', { slot: 14 }]);
            }
            if (conditionData.compareValue) {
                sequence.push(['click', { slot: 12 }]);
                sequence.push(['anvil', { text: conditionData.compareValue }]);
            }
            sequence.push(['back']);
            break;

        case 'team_stat_requirement':
            sequence.push(['option', { option: 'Team Stat Requirement' }]);
            if (conditionData.stat && conditionData.stat !== 'Kills') {
                sequence.push(['click', { slot: 10 }]);
                sequence.push(['chat', { text: conditionData.stat }]);
            }
            if (conditionData.team) {
                sequence.push(['click', { slot: 11 }]);
                sequence.push(['option', { option: conditionData.team }]);
            }
            if (conditionData.comparator && conditionData.comparator !== 'equal_to') {
                sequence.push(['click', { slot: 12 }]);
                if (conditionData.comparator === 'less_than') sequence.push(['click', { slot: 10 }]);
                if (conditionData.comparator === 'less_than_or_equal_to') sequence.push(['click', { slot: 11 }]);
                if (conditionData.comparator === 'greater_than_or_equal_to') sequence.push(['click', { slot: 13 }]);
                if (conditionData.comparator === 'greater_than') sequence.push(['click', { slot: 14 }]);
            }
            if (conditionData.compareValue) {
                sequence.push(['click', { slot: 13 }]);
                sequence.push(['anvil', { text: conditionData.compareValue }]);
            }
            sequence.push(['back']);
            break;

        case 'required_group':
            sequence.push(['setGuiContext', { context: 'Condition -> Required Group' }]);
            sequence.push(['option', { option: 'Required Group' }]);
            if (conditionData.group) {
                sequence.push(['click', { slot: 10 }]);
                sequence.push(['option', { option: conditionData.group }]);
            }
            if (conditionData.includeHigherGroups) {
                sequence.push(['click', { slot: 11 }]);
            }
            sequence.push(['back']);
            break;

        case 'damage_cause':
            sequence.push(['setGuiContext', { context: 'Condition -> Damage Cause' }]);
            sequence.push(['option', { option: 'Damage Cause' }]);
            if (conditionData.damageCause) {
                sequence.push(['click', { slot: 10 }]);
                sequence.push(['option', { option: conditionData.damageCause }]);
            }
            sequence.push(['back']);
            break;

        case 'block_type':
            sequence.push(['setGuiContext', { context: 'Condition -> Block Type' }]);
            sequence.push(['option', { option: 'Block Type' }]);
            if (conditionData.blockType) {
                sequence.push(['click', { slot: 10 }]);
                sequence.push(['item', { item: conditionData.blockType }]);
            }
            if (conditionData.matchTypeOnly) {
                sequence.push(['click', { slot: 11 }]);
            }
            sequence.push(['back']);
            break;

        case 'portal_type':
            sequence.push(['setGuiContext', { context: 'Condition -> Portal Type' }]);
            sequence.push(['option', { option: 'Portal Type' }]);
            if (conditionData.portalType) {
                sequence.push(['click', { slot: 10 }]);
                if (conditionData.portalType === 'nether_portal') sequence.push(['click', { slot: 10 }]);
                if (conditionData.portalType === 'end_portal') sequence.push(['click', { slot: 11 }]);
            }
            sequence.push(['back']);
            break;

        case 'damage_amount':
            sequence.push(['setGuiContext', { context: 'Condition -> Damage Amount' }]);
            sequence.push(['option', { option: 'Damage Amount' }]);
            if (conditionData.comparator && conditionData.comparator !== 'equal_to') {
                sequence.push(['click', { slot: 10 }]);
                if (conditionData.comparator === 'less_than') sequence.push(['click', { slot: 10 }]);
                if (conditionData.comparator === 'less_than_or_equal_to') sequence.push(['click', { slot: 11 }]);
                if (conditionData.comparator === 'greater_than_or_equal_to') sequence.push(['click', { slot: 13 }]);
                if (conditionData.comparator === 'greater_than') sequence.push(['click', { slot: 14 }]);
            }
            if (conditionData.compareValue) {
                sequence.push(['click', { slot: 11 }]);
                sequence.push(['anvil', { text: conditionData.compareValue }]);
            }
            sequence.push(['back']);
            break;

        case 'fishing_environment':
            sequence.push(['setGuiContext', { context: 'Condition -> Fishing Environment' }]);
            sequence.push(['option', { option: 'Fishing Environment' }]);
            if (conditionData.environment) {
                sequence.push(['click', { slot: 10 }]);
                if (conditionData.environment === 'water') sequence.push(['click', { slot: 10 }]);
                if (conditionData.environment === 'lava') sequence.push(['click', { slot: 11 }]);
            }
            sequence.push(['back']);
            break;

        case 'placeholder_number_requirement':
            sequence.push(['setGuiContext', { context: 'Condition -> Placeholder Number Requirement' }]);
            sequence.push(['option', { option: 'Placeholder Number Requirement' }]);
            if (conditionData.placeholder) {
                sequence.push(['click', { slot: 10 }]);
                sequence.push(['anvil', { text: conditionData.placeholder }]);
            }
            if (conditionData.comparator && conditionData.comparator !== 'equal_to') {
                sequence.push(['click', { slot: 11 }]);
                if (conditionData.comparator === 'less_than') sequence.push(['click', { slot: 10 }]);
                if (conditionData.comparator === 'less_than_or_equal_to') sequence.push(['click', { slot: 11 }]);
                if (conditionData.comparator === 'greater_than_or_equal_to') sequence.push(['click', { slot: 13 }]);
                if (conditionData.comparator === 'greater_than') sequence.push(['click', { slot: 14 }]);
            }
            if (conditionData.compareValue) {
                sequence.push(['click', { slot: 12 }]);
                sequence.push(['anvil', { text: conditionData.compareValue }]);
            }
            sequence.push(['back']);
            break;

        case 'player_health':
            sequence.push(['setGuiContext', { context: 'Condition -> Player Health' }]);
            sequence.push(['option', { option: 'Player Health' }]);
            if (conditionData.comparator && conditionData.comparator !== 'equal_to') {
                sequence.push(['click', { slot: 10 }]);
                if (conditionData.comparator === 'less_than') sequence.push(['click', { slot: 10 }]);
                if (conditionData.comparator === 'less_than_or_equal_to') sequence.push(['click', { slot: 11 }]);
                if (conditionData.comparator === 'greater_than_or_equal_to') sequence.push(['click', { slot: 13 }]);
                if (conditionData.comparator === 'greater_than') sequence.push(['click', { slot: 14 }]);
            }
            if (conditionData.compareValue) {
                sequence.push(['click', { slot: 11 }]);
                sequence.push(['anvil', { text: conditionData.compareValue }]);
            }
            sequence.push(['back']);
            break;

        case 'player_hunger':
            sequence.push(['setGuiContext', { context: 'Condition -> Player Hunger' }]);
            sequence.push(['option', { option: 'Player Hunger' }]);
            if (conditionData.comparator && conditionData.comparator !== 'equal_to') {
                sequence.push(['click', { slot: 10 }]);
                if (conditionData.comparator === 'less_than') sequence.push(['click', { slot: 10 }]);
                if (conditionData.comparator === 'less_than_or_equal_to') sequence.push(['click', { slot: 11 }]);
                if (conditionData.comparator === 'greater_than_or_equal_to') sequence.push(['click', { slot: 13 }]);
                if (conditionData.comparator === 'greater_than') sequence.push(['click', { slot: 14 }]);
            }
            if (conditionData.compareValue) {
                sequence.push(['click', { slot: 11 }]);
                sequence.push(['anvil', { text: conditionData.compareValue }]);
            }
            sequence.push(['back']);
            break;

        case 'player_max_health':
            sequence.push(['setGuiContext', { context: 'Condition -> Max Player Health' }]);
            sequence.push(['option', { option: 'Max Player Health' }]);
            if (conditionData.comparator && conditionData.comparator !== 'equal_to') {
                sequence.push(['click', { slot: 10 }]);
                if (conditionData.comparator === 'less_than') sequence.push(['click', { slot: 10 }]);
                if (conditionData.comparator === 'less_than_or_equal_to') sequence.push(['click', { slot: 11 }]);
                if (conditionData.comparator === 'greater_than_or_equal_to') sequence.push(['click', { slot: 13 }]);
                if (conditionData.comparator === 'greater_than') sequence.push(['click', { slot: 14 }]);
            }
            if (conditionData.compareValue) {
                sequence.push(['click', { slot: 11 }]);
                sequence.push(['anvil', { text: conditionData.compareValue }]);
            }
            sequence.push(['back']);
            break;

        case 'required_team':
            sequence.push(['setGuiContext', { context: 'Condition -> Required Team' }]);
            sequence.push(['option', { option: 'Required Team' }]);
            if (conditionData.team) {
                sequence.push(['click', { slot: 10 }]);
                sequence.push(['option', { option: conditionData.team }]);
            }
            sequence.push(['back']);
            break;

        case 'player_sneaking':
            sequence.push(['setGuiContext', { context: 'Condition -> Player Sneaking' }]);
            sequence.push(['option', { option: 'Player Sneaking' }]);
            break;

        case 'player_flying':
            sequence.push(['setGuiContext', { context: 'Condition -> Player Flying' }]);
            sequence.push(['option', { option: 'Player Flying' }]);
            break;

        case 'pvp_enabled':
            sequence.push(['setGuiContext', { context: 'Condition -> PvP Enabled' }]);
            sequence.push(['option', { option: 'PvP Enabled' }]);
            break;

        case 'required_gamemode':
            sequence.push(['setGuiContext', { context: 'Condition -> Required Gamemode' }]);
            sequence.push(['option', { option: 'Required Gamemode' }]);
            if (conditionData.gamemode) {
                sequence.push(['click', { slot: 10 }]);
                if (conditionData.gamemode === 'adventure') sequence.push(['click', { slot: 10 }]);
                if (conditionData.gamemode === 'survival') sequence.push(['click', { slot: 11 }]);
                if (conditionData.gamemode === 'creative') sequence.push(['click', { slot: 12 }]);
            }
            sequence.push(['back']);
            break;
    }
    return sequence;
}
