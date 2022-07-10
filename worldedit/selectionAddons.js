import config from '../api/config.js';
	
const seperation = config.particleSeperation;

let positions = [[], []] // offset positions of the protool selection
let realPositions = [[], []] // actual positions of the protool selection
let selectionVolume = 0;
let particleScale = 0;
let particleSpeed = 0;
let particleColor = [0, 0, 0];
let timeSinceSelection = Date.now();

if (config.useBetterWorldedit) {
	// replace normal selection message with a custom one
	register('chat', event => {
		const message = ChatLib.getChatMessage(event);
		const pos = message.match(/^Position ([AB]) set to (-?\d+), (-?\d+), (-?\d+).$/);
		if (pos) {
			cancel(event);
			let [, posLetter, x, y, z] = pos;
			const text = new TextComponent(`&aPosition ${posLetter} = &e${x}&a, &e${y}&a, &e${z}&a.`).setClick('suggest_command', `${x} ${y} ${z}`).setHoverValue('Click to paste in chat');
			ChatLib.simulateChat(text);
			onSelection(posLetter, parseInt(x), parseInt(y), parseInt(z));
		}
	})
	
	register('worldLoad', () => {
		positions[0] = [];
		positions[1] = [];
	})
	
	function onSelection(posLetter, x, y, z) {
		// set without offset
		const pos = posLetter === 'A' ? 0 : 1;
		realPositions[pos] = [x, y, z];
	
		// make sure the other position is set
		if (realPositions[0].length === 0 || realPositions[1].length === 0) return;
	
		// reset with offset
		let [x1, y1, z1] = realPositions[0];
		let [x2, y2, z2] = realPositions[1];
	
		if (x1 > x2) [x1, x2] = [x2, x1];
		if (y1 > y2) [y1, y2] = [y2, y1];
		if (z1 > z2) [z1, z2] = [z2, z1];
	
		// 1 block offset to encapsulate entire selection
		x2++;
		y2++;
		z2++;
	
		positions[0] = [x1, y1, z1];
		positions[1] = [x2, y2, z2];
	
		// calculate volume
		selectionVolume = (x2 - x1) * (y2 - y1) * (z2 - z1);
		if (config.showSelectionVolume) ChatLib.chat(`&aSelection size: &e${selectionVolume}&a blocks.`);
	
		// set particle scale and speed
		particleScale = Math.sqrt(selectionVolume / 10000) + 1;
		// particleSpeed = Math.sqrt(selectionVolume / 10000) / 20;
		particleSpeed = 0;
		particleColor = [Math.random(), Math.random(), Math.random()];

		timeSinceSelection = Date.now();
	}
	
	let ticks = 0;
	register('tick', () => {
		if (positions[0].length === 0 || positions[1].length === 0) return;
		if (Date.now() - timeSinceSelection > 5000) return;
		if (ticks++ % 5 === 0 && seperation > 0) drawSelectionCube();
	})
	
	function drawSelectionCube() {
		let [x1, y1, z1] = positions[0];
		let [x2, y2, z2] = positions[1];
		if (x1 > x2) [x1, x2] = [x2, x1];
		if (y1 > y2) [y1, y2] = [y2, y1];
		if (z1 > z2) [z1, z2] = [z2, z1];
	
		const [px, py, pz] = [Player.getX(), Player.getY(), Player.getZ()];
	
		for (let x = x1; x <= x2; x+=seperation) {
			spawnParticle(x, y1, z1, -particleSpeed, 0, 0, px, py, pz);
			spawnParticle(x, y2, z1, -particleSpeed, 0, 0, px, py, pz);
			spawnParticle(x, y1, z2, particleSpeed, 0, 0, px, py, pz);
			spawnParticle(x, y2, z2, particleSpeed, 0, 0, px, py, pz);
		}
	
		for (let y = y1; y <= y2; y+=seperation) {
			spawnParticle(x1, y, z1, 0, -particleSpeed, 0, px, py, pz);
			spawnParticle(x2, y, z1, 0, -particleSpeed, 0, px, py, pz);
			spawnParticle(x1, y, z2, 0, particleSpeed, 0, px, py, pz);
			spawnParticle(x2, y, z2, 0, particleSpeed, 0, px, py, pz);
		}
	
		for (let z = z1; z <= z2; z+=seperation) {
			spawnParticle(x1, y1, z, 0, 0, -particleSpeed, px, py, pz);
			spawnParticle(x2, y1, z, 0, 0, -particleSpeed, px, py, pz);
			spawnParticle(x1, y2, z, 0, 0, particleSpeed, px, py, pz);
			spawnParticle(x2, y2, z, 0, 0, particleSpeed, px, py, pz);
		}
	}
	
	const EnumParticleTypes = Java.type('net.minecraft.util.EnumParticleTypes');
	let particleType = EnumParticleTypes.valueOf('CLOUD');
	let idField = particleType.getClass().getDeclaredField('field_179372_R');
	idField.setAccessible(true);
	let particleId = idField.get(particleType);
	
	function spawnParticle(x, y, z, sx, sy, sz, px, py, pz) {
		const dist = Math.sqrt(Math.pow(x - px, 2) + Math.pow(y - py, 2) + Math.pow(z - pz, 2));
		const fx = Client.getMinecraft().field_71438_f.func_174974_b(
			particleId, // particleID
			true, // shouldIgnoreRange
			x,
			y,
			z,
			sx,
			sy,
			sz,
		);
		
		new Particle(fx).setColor(...particleColor).scale(particleScale);
	}
}

export { realPositions, positions };
