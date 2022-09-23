import { request as axios } from "axios";
import { HOSTNAME } from './hostname';

const metadata = FileLib.read('HousingEditor', './metadata.json');
export const version = JSON.parse(metadata).version;

let versionWasChecked = false;

register('worldLoad', () => {
	if (!versionWasChecked) {
		checkVersion()
		versionWasChecked = true;
	}
})

function checkVersion() {
	axios({
		url: HOSTNAME + '/version/' + version,
		method: 'GET',
	}).then(response => {
		const contentType = response.headers['Content-Type'];
		if (contentType.indexOf('application/json') > -1) {
			const json = response.data;
			if (json.valid) {
				ChatLib.chat(json.message);
			} else {
				ChatLib.chat(json.message);
				new TextComponent('&e&l(&eClick for update guide&l)').setClick('open_url', json.updateGuide).chat();
			}
		} else {
			ChatLib.chat('&cError: ' + response.statusText);	
		};
	}).catch(error => {
		if (!error.response) return ChatLib.chat(error);
		ChatLib.chat('&cError checking Housing Editor version: ' + error.response.statusText);
	});
}