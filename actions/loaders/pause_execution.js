export default (actionData) => {
    let sequence = [];

    if (!isNaN(actionData.ticks)) {
        sequence.push(['click', { slot: 10 }]);
        sequence.push(['anvil', { text: actionData.ticks }]);
    }

    return ['Pause Execution', sequence];
};
