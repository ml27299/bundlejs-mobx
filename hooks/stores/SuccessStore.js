import React from "react";

import HookStoreExtension from "./HookExt";

class SuccessStore extends HookStoreExtension {
	variant = "success";

	constructor(rootStore) {
		super(rootStore);
	}

	init(options = {}, _) {
		const SuccessTemplate = SuccessStore.StaticTemplate;

		super.init(
			Object.assign(
				{
					show: false,
					trigger: this.onSuccess,
					Template: (props) => <SuccessTemplate store={this} {...props} />,
				},
				options
			),
			this
		);
		return [this._id, this.trigger, this.Template];
	}

	onSuccess({ message, show = true } = {}) {
		super.update({
			message,
			show,
		});
	}
}

export default SuccessStore;
