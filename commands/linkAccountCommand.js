import { request as axios } from "axios";
import { HOSTNAME } from '../api/hostname.js';

register('command', code => {
	linkAccount(code);
}).setName('link-account').setAliases(['linkaccount', '/linkaccount', '/link-account'])

function linkAccount(code) {
	axios({
		url: `${HOSTNAME}/users/verify-link-code`,
		method: 'POST',
		body: {
			code: code,
			uuid: Player.getUUID(),
			name: Player.getName()
		},
		parseBody: true
	}).then(response => {
		const json = response.data;
		ChatLib.chat(json.message);
	}).catch(error => {
		if (!error.response) return ChatLib.chat(error);
		const response = error.response;
		const contentType = response.headers['Content-Type'];
		if (contentType.indexOf('application/json') > -1) {
			ChatLib.chat('&cError: ' + response.data.message);
		} else {
			ChatLib.chat('&cError: ' + response.statusText);	
		};
	})
}