import { request as axios } from "axios";
import { HOSTNAME } from './hostname.js';

register('command', code => {
	linkAccount(code);
}).setName('link-account')

register('command', code => {
	linkAccount(code);	
}).setName('/link-account')

function linkAccount(code) {
	axios({
		url: `${HOSTNAME}/api/users/verify-link-code`,
		method: 'POST',
		body: {
			code: code,
			uuid: Player.getUUID(),
			name: Player.getName()
		},
		json: true
	}).then(response => {
		const contentType = response.headers['Content-Type'];
		if (contentType.indexOf('application/json') > -1) {
			const json = response.data;
			ChatLib.chat(json.message);
		} else {
			ChatLib.chat('&cError: ' + response.statusText);	
		};
	}).catch(error => {
		ChatLib.chat(error);
	})
}