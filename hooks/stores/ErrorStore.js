import React from "react";

import HookStoreExtension from "./HookExt";

class ErrorStore extends HookStoreExtension {
	variant = "error";

	constructor(rootStore) {
		super(rootStore);
	}

	get alertStore() {
		const { alertStore } = this.rootStore.stores;
		return alertStore;
	}

	get buttonStore() {
		const { buttonStore } = this.rootStore.stores;
		return buttonStore;
	}

	init(options = {}, _) {
		const ErrorTemplate = ErrorStore.StaticTemplate;
		super.init(
			Object.assign(
				{
					show: false,
					trigger: this.onError,
					Template: (props) => <ErrorTemplate store={this} {...props} />,
				},
				options
			),
			this
		);
		return [this._id, this.trigger, this.Template];
	}

	onError(err) {
		this.alertStore.infoStores.forEach((store) =>
			store.onInfo({ show: false })
		);
		this.alertStore.successStores.forEach((store) =>
			store.onSuccess({ show: false })
		);
		this.alertStore.warningStores.forEach((store) =>
			store.onWarning({ show: false })
		);
		super.update({
			message: err.message,
			stack: err.stack,
			show: true,
		});
	}
}

export default ErrorStore;
