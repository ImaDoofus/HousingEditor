import Settings from '../utils/config';
const C08PacketPlayerBlockPlacement = Java.type('net.minecraft.network.play.client.C08PacketPlayerBlockPlacement');
const stackField = C08PacketPlayerBlockPlacement.class.getDeclaredField('field_149580_e');
stackField.setAccessible(true);
let lastClickTime = 0;

if (Settings.cookieGiveProtection) {
	register('packetSent', (packet, event) => {
		if (packet instanceof C08PacketPlayerBlockPlacement) {
			const itemstack = stackField.get(packet);
			if (!itemstack) return;
			const clickedItem = new Item(itemstack);
			if (clickedItem.getName().includes('Cookies§7 (Right Click)')) {
				if (Date.now() - 5000 > lastClickTime) {
					ChatLib.chat(`${Settings.chatPrefix} &aClick again to confirm giving cookies`);
					lastClickTime = Date.now();
					cancel(event)
				}
			}
		}
	})
}
