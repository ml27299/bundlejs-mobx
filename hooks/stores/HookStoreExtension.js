import { action, computed, observable, toJS } from "mobx";
import shortid from "shortid";

class HookStoreExtension {
	@observable items = [];

	@computed get findById() {
		return (id) => toJS(this.items.find((item) => item._id === id));
	}

	@action updateItem(_id, params = {}) {
		const item = this.items.find((item) => item._id === _id);
		Object.assign(item, params);
	}

	@action generate(options = {}, parent) {
		const { tag } = options;
		const itemsWithTag = this.items.filter((item) => item.tag === tag);

		for (let i = 0; i < itemsWithTag.length; i++) {
			this.clear(itemsWithTag[i]._id);
		}

		const _id = shortid.generate();
		const item = Object.assign(
			{
				_id,
			},
			options
		);

		if (this.findById(item._id)) return item;
		if (item.func) {
			item.func = item.func.bind(
				Object.assign(parent || this, { _id: item._id })
			);
		}

		this.items.push(item);
		return item;
	}

	@action clear(_id) {
		if (!_id) {
			this.items = [];
			return;
		}
		const index = this.items.findIndex((item) => item._id === _id);
		this.items.splice(index, 1);
	}

	onClose(_id) {
		const item = this.findById(_id);
		if (!item) console.error(`Couldn't find item with id ${_id}`);
		this.updateItem(_id, { show: false });
	}
}

export default HookStoreExtension;
