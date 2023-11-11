// Credit @Arisings
// search function isnt really optimized, because it checks for searchQuery every postGuiRender loop instead of on guiKey, but it's okay
// because it's not actually laggy and only runs when that "Player Housing" GUI is open

import { Input } from "./components/components";
const input = new Input(0, 0, 0, 18);
const color = Renderer.color(100, 255, 0, 255);
let searchQuery;
input.setEnabled(false);
input.setText("Search House by Name");

register("guiRender", (x, y) => {
  if (!Player.getContainer()) return;
  if (Player.getContainer().getName() !== "Player Housing") return;

  const guiTopField =
    net.minecraft.client.gui.inventory.GuiContainer.class.getDeclaredField(
      "field_147009_r"
    );
  const xSizeField =
    net.minecraft.client.gui.inventory.GuiContainer.class.getDeclaredField(
      "field_146999_f"
    );
  guiTopField.setAccessible(true);
  xSizeField.setAccessible(true);
  var chestGuiTop = guiTopField.get(Client.currentGui.get());
  var chestWidth = xSizeField.get(Client.currentGui.get());

  const marginFromTop = 5;
  const sideMargin = 20;
  input.setWidth(chestWidth - sideMargin * 2);
  input.setX(Renderer.screen.getWidth() / 2 - input.getWidth() / 2);
  input.setY(chestGuiTop - input.getHeight() - marginFromTop);

  input.render();
});

register("guiKey", (char, keyCode, gui, event) => {
  if (!Player.getContainer()) return;
  if (Player.getContainer().getName() !== "Player Housing") return;
  input.mcObject.func_146195_b(true);
  if (input.mcObject.func_146206_l()) {
    input.mcObject.func_146201_a(char, keyCode);

    searchQuery = input.getText();

    if (keyCode !== 1) {
      // keycode for escape key
      cancel(event);
    }
  }
});

register("guiMouseClick", (x, y, mouseButton) => {
  if (!Player.getContainer()) return;
  if (Player.getContainer().getName() !== "Player Housing") return;

  input.mcObject.func_146192_a(x, y, mouseButton);
  if (
    x > input.getX() &&
    x < input.getX() + input.getWidth() &&
    y > input.getY() &&
    y < input.getY() + input.getHeight()
  ) {
    if (input.getText() === "Search House by Name") {
      input.setText("");
      input.setCursorPosition(0);
    }
    input.setEnabled(true);
  } else {
    input.setEnabled(false);
  }
});

register("postGuiRender", () => {
  if (!Player.getContainer()) return;
  if (Player.getContainer().getName() !== "Player Housing") return;
  if (!searchQuery || searchQuery === "") return;

  Player.getContainer()
    .getItems()
    .forEach((item, i) => {
      if (item && item.getLore().includes("§5§o§eClick to visit!")) {
        if (
          removeFormatting(item.getName()).includes(
            removeFormatting(searchQuery)
          )
        ) {
          highlightSlot(i);
        }
      }
    });
});

function highlightSlot(slot) {
  const x = slot % 9;
  const y = Math.floor(slot / 9);
  const renderX = Renderer.screen.getWidth() / 2 + (x - 4) * 18;
  const renderY =
    (Renderer.screen.getHeight() + 10) / 2 +
    (y - Player.getContainer().getSize() / 18) * 18;
  Tessellator.pushMatrix();
  Renderer.translate(0, 0, 400);
  Renderer.drawRect(color, renderX - 9, renderY - 9, 17, 17);
  Tessellator.popMatrix();
}

const removeFormatting = (str) =>
  removeFont(ChatLib.removeFormatting(str)).toLowerCase();

const fonts = [
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789~!@#$%^&*()-_+={}][|\\`,./?;:'\"<> ",
  'ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ０１２３４５６７８９~！＠＃＄％^＆＊（）－_＋＝{}][|\\`，．／？；：＇"<> ',
  "ⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ⓪①②③④⑤⑥⑦⑧⑨~!@#$%^&⊛()⊖_⊕⊜{}][⦶⦸`,⨀⊘?;:'\"⧀⧁ ",
  "ᴀʙᴄᴅᴇғɢʜɪᴊᴋʟᴍɴᴏᴘǫʀsᴛᴜᴠᴡxʏᴢABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789~!@#$%^&*()-_+={}][|\\`,./?;:'\"<> ",
  "ᵃᵇᶜᵈᵉᶠᵍʰᶦʲᵏˡᵐⁿᵒᵖᵠʳˢᵗᵘᵛʷˣʸᶻᴬᴮᶜᴰᴱᶠᴳᴴᴵᴶᴷᴸᴹᴺᴼᴾᵠᴿˢᵀᵁⱽᵂˣʸᶻ⁰¹²³⁴⁵⁶⁷⁸⁹~ᵎ@#$%^&*⁽⁾⁻_⁺⁼{}][|\\`,./ˀ;:'\"<> ",
  "ɐqɔpǝɟɓɥıɾʞlɯuodbɹsʇnʌʍxʎz∀ᙠƆᗡƎℲ⅁HIſ⋊˥WNOԀΌᴚS⊥∩ΛMX⅄Z0⇂ᄅƐㄣގ9ㄥ86~¡@#$%ˇ⅋*)(-¯+=}{[]|\\̖ '˙/¿؛:,„>< ",
];

function removeFont(text) {
  let newText = "";
  for (let i = 0; i < text.length; i++) {
    let char = text[i];
    let newChar = char;
    for (let j = 0; j < fonts.length; j++) {
      let font = fonts[j];
      if (font.indexOf(char) !== -1) {
        newChar = fonts[0][font.indexOf(char)];
        break;
      }
    }
    newText += newChar;
  }
  return newText;
}
