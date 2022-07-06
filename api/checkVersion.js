import request from 'requestV2';
import { HOSTNAME } from './hostname.js';

const version = '1.0.0-alpha.1';

register('worldLoad', () => {
	checkVersion()
})

function checkVersion() {
	request({
		url: HOSTNAME + '/api/version/' + version,
		method: 'GET',
	}).then(response => {
		const json = JSON.parse(response);
		if (!json.valid) {
			ChatLib.chat(json.message)
			new TextComponent('&e&l(&eClick for update guide&l)').setClick('open_url', json.updateGuide).chat();
		};
	}).catch(error => {
		console.log(error)
		ChatLib.chat('&cError checking HousingEditor version.');
	});
}