const GuiTextField = net.minecraft.client.gui.GuiTextField;

const isEnabledField = GuiTextField.class.getDeclaredField("field_146226_p");
isEnabledField.setAccessible(true);
const textField = GuiTextField.class.getDeclaredField("field_146216_j");
textField.setAccessible(true);
const selectionEndField = GuiTextField.class.getDeclaredField("field_146223_s");
selectionEndField.setAccessible(true);
const cursorPositionField =
  GuiTextField.class.getDeclaredField("field_146224_r");
cursorPositionField.setAccessible(true);
const lineScrollOffsetField =
  GuiTextField.class.getDeclaredField("field_146225_q");
lineScrollOffsetField.setAccessible(true);
const isFocusedField = GuiTextField.class.getDeclaredField("field_146213_o");
isFocusedField.setAccessible(true);

export default class Input {
  constructor(x, y, width, height) {
    this.mcObject = new GuiTextField(
      0,
      Client.getMinecraft().field_71466_p,
      x,
      y,
      width,
      height
    );
  }

  getX() {
    return this.mcObject.field_146209_f;
  }

  getY() {
    return this.mcObject.field_146210_g;
  }

  getWidth() {
    return this.mcObject.field_146218_h;
  }

  getHeight() {
    return this.mcObject.field_146219_i;
  }

  setX(x) {
    this.mcObject.field_146209_f = x;
  }

  setY(y) {
    this.mcObject.field_146210_g = y;
  }

  setWidth(width) {
    this.mcObject.field_146218_h = width;
  }

  setHeight(height) {
    this.mcObject.field_146219_i = height;
  }

  setEnabled(enabled) {
    isEnabledField.set(this.mcObject, enabled);
  }

  setText(text) {
    textField.set(this.mcObject, text);
  }

  getText() {
    return textField.get(this.mcObject);
  }

  setSelectionEnd(position) {
    selectionEndField.setInt(this.mcObject, position);
  }

  setCursorPosition(position) {
    cursorPositionField.setInt(this.mcObject, position);
  }

  setLineScrollOffset(offset) {
    lineScrollOffsetField.setInt(this.mcObject, offset);
  }

  setIsFocused(isFocused) {
    isFocusedField.set(this.mcObject, isFocused);
  }

  render() {
    this.mcObject.func_146194_f();
  }
}
