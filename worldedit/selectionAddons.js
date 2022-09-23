import Settings from '../utils/config';

let positions = [[], []] // offset positions of the protool selection

if (Settings.useBetterWorldedit) {
	// replace normal selection message with a custom one
	register('chat', event => {
		const message = ChatLib.getChatMessage(event);
		const posMatch = message.match(/^Position ([AB]) set to (-?\d+), (-?\d+), (-?\d+).$/);
		if (posMatch) {
			cancel(event);
			let [, posLetter, x, y, z] = posMatch;
			const text = new TextComponent(`&aPosition ${posLetter} = &e${x}&a, &e${y}&a, &e${z}&a.`).setClick('suggest_command', `${x} ${y} ${z}`).setHoverValue('Click to paste in chat');
			ChatLib.simulateChat(text);
			const posNum = posLetter === 'A' ? 0 : 1;
			positions[posNum] = [parseInt(x), parseInt(y), parseInt(z)];
		}
	})

	register('worldLoad', () => {
		positions[0] = [];
		positions[1] = [];
	})
}

export { positions };