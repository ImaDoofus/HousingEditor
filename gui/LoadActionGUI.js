import { Input, Button } from "./components/components.js";
import loadAction from "../api/loadAction";

const button = new Button(0, 0, 0, 20, "Paste");

const input = new Input(0, 0, 0, 18);
input.setEnabled(false);
input.setText("Paste Action ID");
input.mcObject.func_146203_f(24); // set max length

register("guiRender", (x, y) => {
  if (!Player.getContainer()) return;
  if (!isInActionGui()) return;

  const guiTopField = net.minecraft.client.gui.inventory.GuiContainer.class.getDeclaredField("field_147009_r");
  const xSizeField = net.minecraft.client.gui.inventory.GuiContainer.class.getDeclaredField("field_146999_f");
  guiTopField.setAccessible(true);
  xSizeField.setAccessible(true);
  var chestGuiTop = guiTopField.get(Client.currentGui.get());
  var chestWidth = xSizeField.get(Client.currentGui.get());

  const margin = 5;
  const sizeDifference = 10;

  button.setWidth(chestWidth / 2 - sizeDifference);
  button.setX(Renderer.screen.getWidth() / 2 + sizeDifference);
  button.setY(chestGuiTop - button.getHeight() - margin + 1);

  input.setWidth(chestWidth / 2 + sizeDifference - margin);
  input.setX(Renderer.screen.getWidth() / 2 - input.getWidth() + sizeDifference - margin);
  input.setY(chestGuiTop - input.getHeight() - margin);

  button.render(x, y);
  input.render();
});

register("guiKey", (char, keyCode, gui, event) => {
  if (!Player.getContainer()) return;
  if (!isInActionGui()) return;

  input.mcObject.func_146195_b(true);
  if (input.mcObject.func_146206_l()) {
    input.mcObject.func_146201_a(char, keyCode);
    inputUpdate();
    if (keyCode !== 1) {
      // keycode for escape key
      cancel(event);
    }
  }
});

function inputUpdate() {
  if (input.getText() === "test") {
    button.setText("Test");
    button.setEnabled(true);
    return;
  }

  if (input.getText().match(/^[a-f\d]{24}$/i)) {
    button.setText("Import");
    button.setEnabled(true);
  } else if (input.getText().length === 0) {
    button.setText("Paste");
    button.setEnabled(true);
  } else {
    button.setText("Invalid ID");
    button.setEnabled(false);
  }
}

register("guiMouseClick", (x, y, mouseButton) => {
  if (!Player.getContainer()) return;
  if (!isInActionGui()) return;

  input.mcObject.func_146192_a(x, y, mouseButton);
  if (x > input.getX() && x < input.getX() + input.getWidth() && y > input.getY() && y < input.getY() + input.getHeight()) {
    if (input.getText() === "Paste Action ID") {
      input.setText("");
      input.setCursorPosition(0);
    }
    input.setEnabled(true);
  } else {
    input.setEnabled(false);
  }

  if (x > button.getX() && x < button.getX() + button.getWidth() && y > button.getY() && y < button.getY() + button.getHeight()) {
    if (button.getText() === "Paste") {
      try {
        input.setText(java.awt.Toolkit.getDefaultToolkit().getSystemClipboard().getData(java.awt.datatransfer.DataFlavor.stringFlavor));
        World.playSound("random.click", 1, 1);
        inputUpdate();
      } catch (e) {
        console.log(e);
      }
      return;
    }
    if (input.getText() === "Invalid ID") {
      ChatLib.chat("&cDouble-check your ID.");
      return;
    }
    if (!button.getEnabled()) {
      World.playSound("mob.villager.no", 1, 1);
      return;
    }

    World.playSound("random.click", 1, 1);
    button.setText("Getting Data...");
    button.setEnabled(false);

    loadAction(input.getText());

    input.setSelectionEnd(0);
    input.setCursorPosition(0);
    input.setLineScrollOffset(0);
    input.setIsFocused(false);
    input.setText("Paste Action ID");

    button.setText("Paste");
    button.setEnabled(true);
  }
});

function isInActionGui() {
  const containerName = Player.getContainer().getName();
  if (Client.currentGui.getClassName() === "GuiEditSign") return false;
  if (Player.getContainer().getClassName() !== "ContainerChest") return false;
  if (containerName.match(/Edit Actions|Actions: |Aktionen: |Modifier les Actions|Modifica Azioni|Azioni: |編輯動作|動作：|Editar ações|Ações: |Редактировать действия|Действия: |이벤트 편집|이벤트: |Zmień działania|Endre handlinger|Handlinger: |Rediger Handlinger|Muokkaa toimintoja|Toiminnot: /)) return true;
  return false;
}
