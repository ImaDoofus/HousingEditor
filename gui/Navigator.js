import utilInputAnvil from '../utils/inputAnvil.js';
import utilLoadItem from '../utils/loadItem.js';

const lastItemAddedMargin = 20; // wait certain amount of ms after the last item in the GUI was added before safely saying that the GUI has loaded.

register('guiOpened', () => {
	setNotReady();
	Navigator.guiIsLoading = true;
})

register('guiRender', () => {
	if (Navigator.isReady) return;
	if (!Player.getContainer()) return;
	if (Player.getContainer().getClassName() === 'ContainerCreative') return;
	if (Player.getContainer().getName() === 'Housing Menu') return;
	if (Navigator.itemsLoaded.lastItemAddedTimestamp === 0) return; // no items loaded yet so wait for items to load
	if (Date.now() - Navigator.itemsLoaded.lastItemAddedTimestamp < lastItemAddedMargin) return; 
	Navigator.isReady = true;
	Navigator.guiIsLoading = false;
})

// wait for all items in gui to load before continuing
register('renderItemIntoGui', (item) => {
	if (Navigator.guiIsLoading) {
		if (item.name in Navigator.itemsLoaded.items) return;
		Navigator.itemsLoaded.items[item.name] = item;
		Navigator.itemsLoaded.lastItemAddedTimestamp = Date.now();
	};
})

// register('packetReceived', (packet) => {
// 	if (packet.class.getName() === 'net.minecraft.network.play.server.S2FPacketSetSlot') {
// 		let slotField = packet.class.getDeclaredField('field_149177_b');
// 		slotField.setAccessible(true);
// 		let slot = slotField.get(packet);

// 		if (slot === 36) { // if the slot is the first hotbar slot (slot that is used to load items)
// 			setNotReady();
// 		}
// 	}
// })

function click(slot) {
	Player.getContainer().click(slot);
	setNotReady()
}

function returnToEditActions() {
	Navigator.isReturning = true;
	if (Player.getContainer().getName() === 'Edit Actions') return Navigator.isReturning = false;
	goBack();
}

function setSelecting(option) {
	Navigator.isSelecting = true;
	Navigator.optionBeingSelected = option;
}

function selectOption(optionName) {
	const playerContainer = Player.getContainer();

	let index = -1;

	for (let item of playerContainer.getItems()) {
		index++;
		if (item === null) continue; // skip the empty slots
		if (ChatLib.removeFormatting(item.name) === optionName) {
			click(index);
			Navigator.isSelecting = false;
			return;
		}
	}
	if (playerContainer.getStackInSlot(53)?.getID() === 262) {
		click(53);
		return;
	}
	goBack();
	Navigator.isSelecting = false;
	return false;
}

const goBack = () => click(Player.getContainer().getSize() - 5 - 36); // click the back button on all size guis

// const loadItem = (item, slot) => utilLoadItem(item, slot);

function inputAnvil(text) {
	utilInputAnvil(text);
	setNotReady();
}

function setNotReady() {
	Navigator.itemsLoaded = { items: {}, lastItemAddedTimestamp: 0 };
	Navigator.isReady = false;
}

let Navigator = {
	isReady: false,
	isSelecting: false,
	isReturning: false,
	guiIsLoading: true,
	itemsLoaded: { items: {}, lastItemAddedTimestamp: 0 },
	selectOption,
	setSelecting,
	click,
	goBack,
	returnToEditActions,
	// loadItem,
	inputAnvil,
}

export default Navigator;