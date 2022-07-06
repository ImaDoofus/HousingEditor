import request from 'requestV2';
import { HOSTNAME } from './hostname.js';

register('command', code => {
	linkAccount(code);
}).setName('link-account')

register('command', code => {
	linkAccount(code);	
}).setName('/link-account')

function linkAccount(code) {
	request({
		url: `${HOSTNAME}/api/users/verify-link-code`,
		method: 'POST',
		body: {
			code: code,
			uuid: Player.getUUID(),
			name: Player.getName()
		}
	}).then(response => {
		const json = JSON.parse(response);
		ChatLib.chat(json.message);
	}).catch(error => {
		const json = JSON.parse(error);
		ChatLib.chat(json.message);
	})
}