import Navigator from "./navigator";
import { Button } from "./components/components";
import Settings from "../utils/config";

let queue = [];
let fails = [];
let timeWithoutOperation = 0;
let startTime = 0;
let operationCount = 0;
let currentGuiContext = null;

register("tick", () => {
  if (queue.length > 0) timeWithoutOperation++;
  if (
    (timeWithoutOperation > Settings.guiTimeout) & (queue.length > 0) &&
    !Settings.useSafeMode
  ) {
    fails.push(`&cOperation timed out. &f(too long without GUI click)`);
    const doneOperation = queue.pop();
    doneLoading(doneOperation[1].actionName, doneOperation[1].actionAuthor);
  }
  if (queue.length === 0) return;
  updateRemainingTime();
  if (!Navigator.isReady) return;
  operationCount++;
  timeWithoutOperation = 0;
  if (Navigator.isReturning) return Navigator.returnToEditActions();
  if (Navigator.isSelecting) {
    const attemptResult = Navigator.selectOption(Navigator.optionBeingSelected);
    if (attemptResult === false)
      fails.push(
        `&cCouldn't find option &f${Navigator.optionBeingSelected} &cin &f${currentGuiContext}&c.`
      );
    return;
  }

  let [operationType, operationData] = queue.shift();
  if (operationType === "setGuiContext") {
    currentGuiContext = operationData.context; // for error messages
    if (queue.length === 0) return;
    [operationType, operationData] = queue.shift();
  }
  switch (operationType) {
    case "click":
      return Navigator.click(operationData.slot);
    case "anvil":
      return Navigator.inputAnvil(operationData.text);
    case "returnToEditActions":
      return Navigator.returnToEditActions();
    case "back":
      return Navigator.goBack();
    case "option":
      return Navigator.setSelecting(operationData.option);
    case "chat":
      return Navigator.inputChat(operationData.text);
    case "item":
      return Navigator.selectItem(operationData.item);
    case "done":
      return doneLoading(operationData.actionName, operationData.actionAuthor);
  }
});

function updateRemainingTime() {
  if (startTime === 0) startTime = Date.now();
  const averageOperationMs = (Date.now() - startTime) / operationCount;
  const timeRemaining = Math.round((averageOperationMs * queue.length) / 1000);
  timeRemainingButton.setText(`Time Remaining: ${timeRemaining}s`);
}

function doneLoading(actionName, actionAuthor) {
  timeWithoutOperation = startTime = operationCount = 0;
  Navigator.isWorking = false;
  const remainingOperations = queue.length;
  queue = [];
  Client.currentGui.close();

  if (fails.length > 0) {
    ChatLib.chat(
      `&cFailed to load: &r${actionName}&r &cby &b@${actionAuthor}&r &ccorrectly: &f(${
        fails.length
      } error${fails.length > 1 ? "s" : ""})`
    );
    fails.forEach((fail) => ChatLib.chat("   > " + fail));
    fails = [];
    ChatLib.chat(
      `&cfinished with &f${remainingOperations} &coperation${
        remainingOperations !== 1 ? "s" : ""
      } left in queue.`
    );
  } else {
    ChatLib.chat(
      `Loaded: &r${actionName}&r by &b@${actionAuthor}&r successfully!`
    );
  }
}

const timeRemainingButton = new Button(0, 0, 200, 20, "Time Remaining:");
const cancelButton = new Button(0, 100, 100, 20, "Cancel");

register("guiRender", (x, y) => {
  if (!Player.getContainer()) return;
  if (queue.length === 0) return;

  timeRemainingButton.setX(
    Renderer.screen.getWidth() / 2 - timeRemainingButton.getWidth() / 2
  );
  cancelButton.setX(
    Renderer.screen.getWidth() / 2 - (timeRemainingButton.getWidth() - 100) / 2
  );
  timeRemainingButton.setY(timeRemainingButton.getHeight() * 3);
  cancelButton.setY(timeRemainingButton.getHeight() * 3 + 20);
  timeRemainingButton.render(x, y);

  cancelButton.render(x, y);
});

register("guiMouseClick", (x, y, mouseButton) => {
  if (!Player.getContainer()) return;

  if (
    x > cancelButton.getX() &&
    x < cancelButton.getX() + cancelButton.getWidth() &&
    y > cancelButton.getY() &&
    y < cancelButton.getY() + cancelButton.getHeight()
  ) {
    fails.push(`&6Cancelled by user.`);
    queue.splice(0, queue.length - 1);
  }
});

export function addOperation(operation) {
  Navigator.isWorking = true;
  queue.push(operation);
  console.log(JSON.stringify(operation));
}
