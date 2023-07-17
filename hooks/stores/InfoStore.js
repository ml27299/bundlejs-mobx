import { observable } from "mobx";
import React from "react";

import HookStoreExtension from "./HookExt";

class InfoStore extends HookStoreExtension {
	variant = "info";
	@observable processing = false;

	constructor(rootStore) {
		super(rootStore);
	}

	init(options = {}, _) {
		const { props } = options;
		const InfoTemplate = InfoStore.StaticTemplate;

		super.init(
			Object.assign(
				{
					show: false,
					trigger: this.onInfo,
					Template: () => <InfoTemplate store={this} {...props} />,
				},
				options
			),
			this
		);

		return [this._id, this.trigger, this.Template];
	}

	onInfo({
		message,
		processing = false,
		show = true,
		delay = { in: 0, out: 500 },
	}) {
		if (show === false) {
			message = "";
			processing = false;
		}
		setTimeout(
			() =>
				super.update({
					processing,
					message,
					show,
				}),
			show === false ? delay.out : delay.in
		);
	}
}

export default InfoStore;
