import loaders from './loaders/_import_all.js';
import { addOperation } from '../gui/Queue.js';

export default class Action {
	constructor(type, actionData) {
		this.loader = loaders[type]; // get the function that loads the action
		this.sequence = this.loader(actionData); // get the sequence of operations that loads the action ['Action Name', ['operation', data: 'operation specific' }]]
	}
	
	load() {
		addOperation(['click', { slot: 50 }]); // click "Add Action Button"
	
		addOperation(['option', { option: this.sequence[0] }]); // click the action type
	
		this.sequence[1].forEach(operation => {
			addOperation(operation);
		});

		addOperation(['returnToEditActions']);
	}
}