import { request as axios } from "axios";
import { HOSTNAME } from './hostname.js';

const version = '1.0.0-alpha.2';

register('worldLoad', () => {
	checkVersion()
})

function checkVersion() {
	axios({
		url: HOSTNAME + '/version/' + version,
		method: 'GET',
	}).then(response => {
		const contentType = response.headers['Content-Type'];
		if (contentType.indexOf('application/json') > -1) {
			const json = response.data;
			if (!json.valid) {
				ChatLib.chat(json.message);
				new TextComponent('&e&l(&eClick for update guide&l)').setClick('open_url', json.updateGuide).chat();
			};
		} else {
			ChatLib.chat('&cError: ' + response.statusText);	
		};
	}).catch(error => {
		if (!error.response) return ChatLib.chat(error);
		ChatLib.chat('&cError checking Housing Editor version: ' + error.response.statusText);
	});
}