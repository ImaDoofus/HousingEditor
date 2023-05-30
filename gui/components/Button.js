const GuiButton = net.minecraft.client.gui.GuiButton;

const isEnabledField = GuiButton.class.getDeclaredField('field_146124_l');
isEnabledField.setAccessible(true);
const textField = GuiButton.class.getDeclaredField('field_146126_j');
textField.setAccessible(true);

export default class Button {
	constructor(x, y, width, height, text) {
		this.mcObject = new GuiButton(0, x, y, width, height, text);
    }

    getX() {
        return this.mcObject.field_146128_h;
    }

    getY() {
        return this.mcObject.field_146129_i;
    }

    getWidth() {
        return this.mcObject.field_146120_f;
    }

    getHeight() {
        return this.mcObject.field_146121_g;
    }

    setX(x) {
        this.mcObject.field_146128_h = x;
    }

    setY(y) {
        this.mcObject.field_146129_i = y;
    }

    setWidth(width) {
        this.mcObject.field_146120_f = width;
    }

    setHeight(height) {
        this.mcObject.field_146121_g = height;
    }

    setEnabled(enabled) {
        isEnabledField.set(this.mcObject, enabled);
    }

    getEnabled() {
        return isEnabledField.get(this.mcObject);
    }

    setText(text) {
        textField.set(this.mcObject, text);
    }

    getText() {
        return textField.get(this.mcObject);
    }

    render(x,y) {
        this.mcObject.func_146112_a(Client.getMinecraft(), x, y);
    }
}
