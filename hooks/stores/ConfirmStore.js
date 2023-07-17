import React from "react";

import HookStoreExtension from "./HookExt";

class ConfirmStore extends HookStoreExtension {
	constructor(rootStore) {
		super(rootStore);
	}

	init(options = {}, _) {
		const ConfirmTemplate = ConfirmStore.StaticTemplate;
		super.init(
			Object.assign(
				{
					show: false,
					trigger: this.onConfirm,
					Template: (props) => <ConfirmTemplate store={this} {...props} />,
				},
				options
			),
			this
		);
		return [this._id, this.trigger, this.Template];
	}

	onConfirm({ message, show = true, callback = () => {} } = {}) {
		super.update({
			message,
			show,
			callback,
		});
	}
}

export default ConfirmStore;
