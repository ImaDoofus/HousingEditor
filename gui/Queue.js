import Navigator from './Navigator.js';

let queue = [];
let operationTimes = { started: 0, total: 0 };

register('tick', () => {
	if (!Navigator.isReady) return;
	if (Navigator.isReturningToEditActions) {
		return Navigator.returnToEditActions();
	}
	if (Navigator.selectingOption) {
		return Navigator.selectOption(Navigator.selectingOption);
	}

	if (!queue.length > 0) return;
	
	if (operationTimes.started === 0) operationTimes.started = Date.now();
	operationTimes.total++;
	// timeRemaining.setString(`Time Remaining: ${Math.round(((Date.now() - operationTimes.started) / operationTimes.total) * queue.length / 1000)} seconds`);

	let operation = queue.shift();
	console.log(JSON.stringify(operation), queue.length);

	switch(operation.type) {
		case 'guiClick':
			Navigator.click(operation.slot);
			break;
		case 'inputAnvil':
			console.log('inputAnvil', operation.text);
			Navigator.inputAnvil(operation.text);
			break;
		case 'returnToEditActions':
			Navigator.isReturningToEditActions = true;
			break;
		case 'goBack':
			Navigator.goBack();
			break;
		case 'selectOption':
			Navigator.selectingOption = operation.option;
			break;
		case 'loadItem':
			Navigator.loadItem(operation.item, operation.slot);
			break;
	}
})

export default queue;

// register("renderOverlay", myRenderOverlay);

// var background = new Rectangle(Renderer.WHITE, 10, 10, 150, 50);
// var timeRemaining = new Text("Time Remaining: 0 seconds", 15, 25).setColor(Renderer.BLACK);

// function myRenderOverlay() {
// 	if (queue.length > 0) {
// 		background.draw();
// 		timeRemaining.draw();
// 	}
// }
// var gui = new Gui();

// gui.registerDraw(myGuiRenderFunction);


// function myGuiRenderFunction(mouseX, mouseY, partialTicks) {
// 	if (queue.length > 0) {
// 		Renderer.drawRect(Renderer.WHITE, Renderer.screen.getWidth() / 2 - 50, Renderer.screen.getHeight() / 2 - 50, 100, 100);
// 	}
// }
