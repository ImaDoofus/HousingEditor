import loaders from './loaders/_import_limited'

class LimitedAction {
	constructor(type, actionData) {
		this.type = type;
		this.data = actionData || {};
		this.loader = getActionLoader(type); // get the function that loads the action
		this.getSequence = () => {
			var sequence = [];

			sequence.push({ type: 'guiClick', slot: 50 }); // click "Add Action Button"

			const actionLoaderData = this.loader(this.data);

			// sort of janky way to do this
			// everything is shifted down one slot because conditionals are removed in limited action menus
			if (actionLoaderData.addAction.slot === 19) {
				actionLoaderData.addAction.slot = 16;
			} else if (actionLoaderData.addAction.slot === 28) {
				actionLoaderData.addAction.slot = 25;
			} else if (actionLoaderData.addAction.page === 1 && actionLoaderData.addAction.slot === 10) {
				actionLoaderData.addAction.page = 0;
				actionLoaderData.addAction.slot = 34;
			} else {
				actionLoaderData.addAction.slot--;
			}

			if (actionLoaderData.addAction.page) {
				for(let i = 0; i < actionLoaderData.addAction.page; i++) {
					sequence.push({ type: 'guiClick', slot: 53 });
				}
			}

			sequence.push({ type: 'guiClick', slot: actionLoaderData.addAction.slot });

			actionLoaderData.sequence.forEach(operation => {
				sequence.push(operation);
			});

			sequence.push({ type: 'returnToEditActions' });

			return sequence;
		};
	}
}

function getActionLoader(type) {
	return loaders[type];
}

export default LimitedAction;