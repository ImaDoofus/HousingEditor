const C10PacketCreativeInventoryAction = Java.type("net.minecraft.network.play.client.C10PacketCreativeInventoryAction");
// https://wiki.vg/Protocol#Creative_Inventory_Action

function loadItem(itemData, slot) {

	const item = new Item(itemData.id || 1);
	item.setStackSize(itemData.amount || 1);
	item.setDamage(itemData.damage || 0);
	item.setName(itemData.name || '');
	item.setLore(itemData.lore || '');

	Client.sendPacket(
		new C10PacketCreativeInventoryAction(
			slot || 0, // slot, 36=hotbar slot 1
			item.itemStack // item to get as a minecraft item stack object
		)
	);
}

export default loadItem;