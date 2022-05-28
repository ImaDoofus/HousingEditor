import loaders from './loaders/_import_all'
import queue from '../gui/Queue';

class Action {
	constructor(type, actionData) {
		this.type = type;
		this.data = actionData || {};
		this.loader = getActionLoader(type); // get the function that loads the action
		this.load = () => {
			queue.push({ type: 'guiClick', slot: 50 }); // click "Add Action Button"

			const actionLoaderData = this.loader(this.data);

			if (actionLoaderData.addAction.page) {
				for(let i = 0; i < actionLoaderData.addAction.page; i++) {
					queue.push({ type: 'guiClick', slot: 53 });
				}
			}

			queue.push({ type: 'guiClick', slot: actionLoaderData.addAction.slot });

			actionLoaderData.sequence.forEach(operation => {
				queue.push(operation);
			});


			// TEMP DISABLED
			queue.push({ type: 'returnToEditActions' });

		}; // this.load() will load the function by calling this.loader(actionData)
	}
}

function getActionLoader(type) {
	return loaders[type];
}

export default Action;