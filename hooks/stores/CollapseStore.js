import HookStoreExtension from "./HookExt";
import React from "react";
import { toJS } from "mobx";

class CollapseStore extends HookStoreExtension {
	constructor(rootStore) {
		super(rootStore);
	}

	generate(options = {}) {
		const CollapseTemplate = CollapseStore.StaticTemplate;
		super.init(
			Object.assign(
				{
					show: false,
					trigger: this.onCollapse,
					Template: ({ children, ...props }) => (
						<CollapseTemplate store={this} children={children} {...props} />
					),
				},
				options
			),
			this
		);
		return [this._id, this.trigger, this.Template];
	}

	onCollapse(collapse) {
		this.update({
			show: collapse === undefined ? !this.show : collapse,
		});
		return toJS(this.show);
	}
}

export default CollapseStore;
