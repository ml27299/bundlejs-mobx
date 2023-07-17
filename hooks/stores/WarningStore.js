import React from "react";

import HookStoreExtension from "./HookExt";

class WarningStore extends HookStoreExtension {
	variant = "warning";

	constructor(rootStore) {
		super(rootStore);
	}

	init(options = {}, _) {
		const WarningTemplate = WarningStore.StaticTemplate;

		super.init(
			Object.assign(
				{
					show: false,
					trigger: this.onWarning,
					Template: (props) => <WarningTemplate store={this} {...props} />,
				},
				options
			),
			this
		);
		return [this._id, this.trigger, this.Template];
	}

	onWarning({ message, show = true } = {}) {
		super.update({
			message,
			show,
		});
	}
}

export default WarningStore;
