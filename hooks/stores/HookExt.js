import { action, observable } from "mobx";
import shortid from "shortid";

class HookStoreExtension {
	_id = shortid.generate();
	Template;
	StaticTemplate;
	trigger;

	@observable message = "";
	@observable show = false;

	constructor(rootStore) {
		this.rootStore = rootStore;
	}

	@action
	update(params = {}) {
		Object.assign(this, params);
	}

	@action
	init({ trigger, ...options } = {}, parent) {
		this.update(options);
		this.trigger = trigger.bind(Object.assign(parent || this));
	}

	onClose() {
		this.update({ show: false });
	}
}

export default HookStoreExtension;
