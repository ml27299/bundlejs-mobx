import { observable } from "mobx";
import { required } from "bundlejs/dist/libs";

class InstanceFactoryStoreManager {
	@observable instances = [];

	constructor(rootStore, staticContext) {
		this.rootStore = rootStore;
		this.staticContext = staticContext;
	}

	init(id = required`id`, Instance = required`Instance`) {
		this.instances.push({
			id,
			instance: new Instance(this.rootStore, this.staticContext),
		});
		const instance = this.findInstanceById(id);
		if (instance && instance.init) instance.init();
	}

	findInstanceById(id = required`id`) {
		return (this.instances.find((instance) => instance.id === id) || {})
			.instance;
	}

	reset() {
		this.instances = [];
	}

	removeInstanceById(id = required`id`) {
		this.instances = this.instances.filter((instance) => instance.id !== id);
	}
}

export default InstanceFactoryStoreManager;
