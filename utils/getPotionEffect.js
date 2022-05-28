export default (effect) => {
	switch (effect) {
		case 1:
		case 'speed':
			return { slot: 10 };
		case 2:
		case 'slowness':
			return { slot: 11 };
		case 3:
		case 'haste':
			return { slot: 12 };
		case 4:
		case 'mining_fatigue':
			return { slot: 13 };
		case 5:
		case 'strength':
			return { slot: 14 };
		case 6:
		case 'instant_health':
			return { slot: 15 };
		case 7:
		case 'instant_damage':
			return { slot: 16 };
		case 8:
		case 'jump_boost':
			return { slot: 19 };
		case 9:
		case 'nausea':
			return { slot: 20 };
		case 10:
		case 'regeneration':
			return { slot: 21 };
		case 11:
		case 'resistance':
			return { slot: 22 };
		case 12:
		case 'fire_resistance':
			return { slot: 23 };
		case 13:
		case 'water_breathing':
			return { slot: 24 };
		case 14:
		case 'invisibility':
			return { slot: 25 };
		case 15:
		case 'blindness':
			return { slot: 28 };
		case 16:
		case 'night_vision':
			return { slot: 29 };
		case 17:
		case 'hunger':
			return { slot: 30 };
		case 18:
		case 'weakness':
			return { slot: 31 };
		case 19:
		case 'poison':
			return { slot: 32 };
		case 20:
		case 'wither':
			return { slot: 33 };
		case 21:
		case 'health_boost':
			return { slot: 34 };
		case 22:
		case 'absorption':
			return { slot: 10, page: true }; // of course its the only one on the page 2
	}
}
