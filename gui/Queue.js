import Navigator from './Navigator.js';
import { Button } from './GuiBuilder.js';
import config from '../api/config.js';

let queue = [];
let fails = [];
let timeWithoutOperation = 0;
let operationTimes = { started: 0, total: 0 };
let currentActionName = null;

register('tick', () => {
	if (queue.length > 0) timeWithoutOperation++;
	if (timeWithoutOperation > config.guiTimeout & queue.length > 0 && !config.useSafeMode) {
		fails.push(`&cOperation timed out. &f(too long without GUI click)`);
		const doneOperation = queue.pop();
		doneLoading(doneOperation[1].actionName, doneOperation[1].actionAuthor);
	}
	if (!Navigator.isReady) return;
	if (queue.length === 0) return;
	timeWithoutOperation = 0;
	if (Navigator.isReturning) return Navigator.returnToEditActions();
	if (Navigator.isSelecting) {
		const attemptResult = Navigator.selectOption(Navigator.optionBeingSelected);
		if (attemptResult === false) fails.push(`&cCouldn't find option &f${Navigator.optionBeingSelected} &cin &f${currentActionName}&c.`);
		return;
	}

	if (operationTimes.started === 0) operationTimes.started = Date.now();
	operationTimes.total++;
	timeRemainingButton.setText(`Time Remaining: ${Math.round(((Date.now() - operationTimes.started) / operationTimes.total) * queue.length / 1000)} seconds`);

	let [operationType, operationData] = queue.shift();

	switch(operationType) {
		case 'click': return Navigator.click(operationData.slot);
		case 'anvil': return Navigator.inputAnvil(operationData.text);
		case 'returnToEditActions': return Navigator.returnToEditActions();
		case 'back': return Navigator.goBack();
		case 'option': return Navigator.setSelecting(operationData.option);
		// case 'loadItem': return Navigator.loadItem(operationData.item, operationData.slot);
		case 'done': return doneLoading(operationData.actionName, operationData.actionAuthor);
		case 'setActionName': return currentActionName = operationData.actionName; // strictly for error reporting
	}
})

function doneLoading(actionName, actionAuthor) {
	console.log(`Done loading action: ${actionName}`);
	timeWithoutOperation = 0;
	queue = [];
	operationTimes = { started: 0, total: 0 };
	Client.currentGui.close();

	if (fails.length > 0) {
		ChatLib.chat(`&cFailed to load: &r${actionName}&r &cby &b@${actionAuthor}&r &ccorrectly: &f(${fails.length} error${fails.length > 1 ? 's' : ''})`);
		fails.forEach(fail => ChatLib.chat('   > ' + fail));
		fails = [];
	} else {
		ChatLib.chat(`Loaded: &r${actionName}&r by &b@${actionAuthor}&r successfully!`);
	}
}

const timeRemainingButton = new Button(0, 0, 0, 20, 'Time Remaining:');

register('guiRender', (x, y) => {
	if (!Player.getContainer()) return;
	if (queue.length === 0) return;

	timeRemainingButton.setWidth(200);
	timeRemainingButton.setX(Renderer.screen.getWidth() / 2 - timeRemainingButton.getWidth() / 2);
	timeRemainingButton.setY(timeRemainingButton.getHeight() * 3);

	timeRemainingButton.render(x,y);
})


export function addOperation(operation) {
	queue.push(operation);
}