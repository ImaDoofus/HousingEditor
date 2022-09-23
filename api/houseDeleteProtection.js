import Settings from '../utils/config';

const C0EPacketClickWindow = Java.type('net.minecraft.network.play.client.C0EPacketClickWindow');
const clickedItemField = C0EPacketClickWindow.class.getDeclaredField('field_149551_e');
clickedItemField.setAccessible(true);

if (Settings.houseDeleteProtection) {
	register('packetSent', (packet, event) => {
		if (packet instanceof C0EPacketClickWindow) {
			const itemstack = clickedItemField.get(packet);
			if (!itemstack) return;
			const clickedItem = new Item(itemstack);
			if (clickedItem.getName() === '§aReset House' || clickedItem.getName() === '§cDelete House') {
				cancel(event)
				ChatLib.chat(`${config.chatPrefix} &cProtected your house from deletion. Change the config to disable this.`)
				Client.currentGui.close();
			}
		}
	})
}