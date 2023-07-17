import HookStoreExtension from "./HookExt";
import React from "react";

class LoadingStore extends HookStoreExtension {
	constructor(rootStore) {
		super(rootStore);
	}

	init(options = {}, _) {
		const LoadingTemplate = LoadingStore.StaticTemplate;

		super.init(
			Object.assign(
				{
					show: true,
					trigger: this.onLoading,
					Template: ({ children, ...props }) => (
						<LoadingTemplate store={this} children={children} {...props} />
					),
				},
				options
			),
			this
		);
		return [this._id, this.trigger, this.Template];
	}

	onLoading(loading = false) {
		super.update({
			show: loading,
		});
	}
}

export default LoadingStore;
