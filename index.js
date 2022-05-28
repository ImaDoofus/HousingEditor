/// <reference path="C:/Users/imado/curseforge/minecraft/Instances/jhsdka/config/ChatTriggers/modules/CTAutocomplete-2.0.4/index.d.ts" />
/// <reference lib="es2015" />

import Action from './actions/Action.js';

const cookieType = 'Cookie Crumb'
const cookieAmount = 1;
const cookieBonus = 1; // bonus cookie given on last bite

let giveItem = new Action('give_item', { item: { id: 1 }, allowMultiple: true });

let conditional1 = new Action('conditional', {
	conditions: [
		['stat_requirement', { stat: 'cookie_progress', compareValue: 0 }]
	],
	ifActions: [
		['display_title', { title: '&6&l●', subtitle: `&6&l+${cookieAmount}&e ${cookieType}`, fadeIn: 0, fadeOut: 0, stay: 1 }],
		['play_sound', { sound: 'Eat' }]
	],
})

let conditional2 = new Action('conditional', {
	conditions: [
		['stat_requirement', { stat: 'cookie_progress', compareValue: 1 }]
	],
	ifActions: [
		['display_title', { title: '&6&l◕', subtitle: `&6&l+${cookieAmount}&e ${cookieType}`, fadeIn: 0, fadeOut: 0, stay: 1 }],
		['play_sound', { sound: 'Eat' }]
	],
})

let conditional3 = new Action('conditional', {
	conditions: [
		['stat_requirement', { stat: 'cookie_progress', compareValue: 2 }]
	],
	ifActions: [
		['display_title', { title: '&6&l◑', subtitle: `&6&l+${cookieAmount}&e ${cookieType}`, fadeIn: 0, fadeOut: 0, stay: 1 }],
		['play_sound', { sound: 'Eat' }]
	],
})

let conditional4 = new Action('conditional', {
	conditions: [
		['stat_requirement', { stat: 'cookie_progress', compareValue: 3 }]
	],
	ifActions: [
		['display_title', { title: '&6&l◔', subtitle: `&6&l+${cookieAmount}&e ${cookieType}`, fadeIn: 0, fadeOut: 0, stay: 1 }],
		['play_sound', { sound: 'Eat' }]
	],
})

let conditional5 = new Action('conditional', {
	conditions: [
		['stat_requirement', { stat: 'cookie_progress', compareValue: 4 }]
	],
	ifActions: [
		['display_title', { title: '&6&l○', subtitle: `&6&l+${cookieAmount+cookieBonus}&e ${cookieType}s`, fadeIn: 0, fadeOut: 0, stay: 1 }],
		['play_sound', { sound: 'Burp' }],
		['give_item', { item: { id: 1 } }],
		['change_stat', { stat: 'cookie_progress', value: 0, mode: 'set' }]
	],
})

let changeStat = new Action('change_stat', {
	stat: 'cookie_progress',
	value: 1,
})

giveItem.load();
conditional1.load();
conditional2.load();
conditional3.load();
conditional4.load();
conditional5.load();
changeStat.load();