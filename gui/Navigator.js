import utilInputAnvil from '../utils/inputAnvil.js';
import utilLoadItem from '../utils/loadItem.js';

const cooldown = 50; // 50 ms

register('guiOpened', () => {
	readyForNext();
	Navigator.guiIsLoading = true;
})

register('guiRender', () => {
	if (Player.getContainer().getClassName() === 'ContainerCreative') return // dont do stuff in creative menu
	if (Player.getContainer().getName() === 'Housing Menu') return // dont do stuff in housing menu
	if (Navigator.isReady) return;

	if (Date.now() - Navigator.itemsLoaded.lastItemAddedTimestamp < cooldown) return; // wait atleast cooldown ms after the last item in the GUI was added before safely saying that the GUI has loaded.

	if (Navigator.itemsLoaded.lastItemAddedTimestamp === 0) return; // no items loaded yet so wait for items to load

	Navigator.isReady = true;
	Navigator.guiIsLoading = false;
})


// wait for all items in gui to load before continuing
register('renderItemIntoGui', (item) => {
	if (Navigator.guiIsLoading) {
		if (Player.getContainer().getClassName() === 'ContainerPlayer') return;

		if (item.name in Navigator.itemsLoaded.items) return;
	
		if (item.name) {
			Navigator.itemsLoaded.items[item.name] = item;
			Navigator.itemsLoaded.lastItemAddedTimestamp = Date.now();
		}
	
	};
})


function click(slot) {
	Player.getContainer().click(slot);
	readyForNext();
}

function returnToEditActions() {
	if (Player.getContainer().getName() === 'Edit Actions') {
		Navigator.isReturningToEditActions = false;
		return;
	};

	goBack();
}

function selectOption(optionName) {

	const playerContainer = Player.getContainer();

	let index = -1;

	for (let item of playerContainer.getItems()) {
		index++;
		if (item === null) continue; // skip the empty slots
		if (ChatLib.removeFormatting(item.name) === optionName) {
			Navigator.selectingOption = false;
			return click(index);
		}
	}
	if (playerContainer.getStackInSlot(53)?.getID() === 262) {
		return click(53);
	}
	console.log('Could not find option: ' + optionName);
	goBack();
	Navigator.selectingOption = false;
}

function goBack() {
	click(Player.getContainer().getSize() - 5 - 36); // click the back button on all size guis
}

function loadItem(item, slot) {
	utilLoadItem(item, slot);
}

function inputAnvil(text) {
	utilInputAnvil(text);
	readyForNext();
}

function readyForNext() {
	Navigator.isReady = false;
	Navigator.itemsLoaded = { items: {}, lastItemAddedTimestamp: 0 };
}

// const S2FPacketSetSlot = Java.type("net.minecraft.network.play.server.S2FPacketSetSlot");
// https://wiki.vg/Protocol#Set_Slot

register('packetReceived', (packet) => {
	if (packet.class.getName() === 'net.minecraft.network.play.server.S2FPacketSetSlot') {
		let slotField = packet.class.getDeclaredField('field_149177_b');
		slotField.setAccessible(true);
		let slot = slotField.get(packet);

		if (slot === 36) { // if the slot is the first hotbar slot (slot that is used to load items)
			readyForNext();
		}
	}
})


let Navigator = {
	isReady: false,
	guiIsLoading: false,
	isReturningToEditActions: false,
	selectingOption: false,
	selectOption,
	click,
	goBack,
	returnToEditActions,
	loadItem,
	inputAnvil,
}

export default Navigator;