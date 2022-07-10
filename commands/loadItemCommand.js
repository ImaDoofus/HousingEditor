import { request as axios } from "axios";
import { addOperation } from '../gui/Queue.js';
import Action from '../actions/Action.js';
import { HOSTNAME } from '../api/hostname.js';
import loadItemstack from "../utils/loadItemstack.js";

register('command', itemId => {
	loadItem(itemId);
}).setName('load-item').setAliases(['loaditem']);

const C10PacketCreativeInventoryAction = Java.type("net.minecraft.network.play.client.C10PacketCreativeInventoryAction");

let itemBeingLoaded = null;
let hotbarSlot = 0;

function loadItem(itemId) {
	if (Player.asPlayerMP().player.field_71075_bZ.field_75098_d === false) return ChatLib.chat('&cYou must be in creative mode to use this command.');
	hotbarSlot = Player.getHeldItemIndex() + 36;
	if (Player.getHeldItem()) return ChatLib.chat('&cPlease make sure your hand is empty.');
	axios({
		url: HOSTNAME + '/items/' + itemId,
		method: 'GET',
	}).then(response => {
		const json = response.data;
		itemBeingLoaded = json;
		const itemData = json.itemData;
		const item = new Item(itemData.item.type || 1);
		const itemstack = item.itemStack
		itemstack.func_77964_b(itemData.item.meta);
		item.setName(getItemName());
		item.setLore(getItemLore());
		loadItemstack(itemstack, hotbarSlot);
	}).catch(error => {
		if (!error.response) return ChatLib.chat('&cError: ' + error);
		const response  = error.response;
		const contentType = response.headers['Content-Type'];
		if (contentType.indexOf('application/json') > -1) {
			const json = response.data;
			ChatLib.chat('&cError: ' + json.message);
		} else {
			ChatLib.chat('&cError: ' + response.statusText);	
		};
	});
}

const getItemName = () => ChatLib.replaceFormatting(itemBeingLoaded.itemData.customName || itemBeingLoaded.itemData.item.name);
const getItemLore = () => itemBeingLoaded.itemData.customLore.map(line => ChatLib.replaceFormatting(line));

function loadRightClickActions(actionList, actionName, actionAuthor) {
	ChatLib.chat(`Loading item: ${actionName}&r by &b@${actionAuthor}`);
	if (actionList.length === 0) return;
	ChatLib.say('/item');
	addOperation(['click', { slot: 34 }]); // "Edit Actions"
	for (let i = 0; i < actionList.length; i++) {
		let actionType = actionList[i][0];
		let actionData = actionList[i][1];
		let action = new Action(actionType, actionData);
		action.load();
	}
	addOperation(['done', { actionName, actionAuthor }]);
}

register('packetReceived', (packet) => {
	if (packet.class.getName() === 'net.minecraft.network.play.server.S2FPacketSetSlot') {
		let slotField = packet.class.getDeclaredField('field_149177_b');
		// let itemField = packet.class.getDeclaredField('field_149178_c');
		slotField.setAccessible(true);
		// itemField.setAccessible(true);
		let slot = slotField.get(packet);
		// let item = itemField.get(packet);
		// if (!item) return;
		if (itemBeingLoaded && slot === 36 + hotbarSlot) {
			loadRightClickActions(itemBeingLoaded.rightClickActions, getItemName(), itemBeingLoaded.author?.name);
			itemBeingLoaded = null;
		}
	}
})