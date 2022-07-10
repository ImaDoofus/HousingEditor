import { request as axios } from "axios";
import { HOSTNAME } from './hostname.js';
import { addOperation } from "../gui/Queue.js";
import Action from "../actions/Action.js";

export default (actionId) => {
	axios({
		url: `${HOSTNAME}/actions/${actionId}`,
		method: 'GET',
	}).then(response => {
		const json = response.data;
		loadResponse(json.actionData, json.post?.title, json.author?.name);
	}).catch(error => {
		if (!error.response) return ChatLib.chat('&cError: ' + error);
		const response  = error.response;
		const contentType = response.headers['Content-Type'];
		if (contentType.indexOf('application/json') > -1) {
			const json = response.data;
			ChatLib.chat('&cError: ' + json.message);
		} else {
			ChatLib.chat('&cError: ' + response.statusText);	
		};
		Client.currentGui.close();
	})
}

function loadResponse(actionList, actionName, actionAuthor) {
	ChatLib.chat(`Loading action: ${actionName}&r by &b@${actionAuthor}`);
	for (let i = 0; i < actionList.length; i++) {
		let actionType = actionList[i][0];
		let actionData = actionList[i][1];
		let action = new Action(actionType, actionData);
		action.load();
	}
	addOperation(['done', { actionName, actionAuthor }]);
}
