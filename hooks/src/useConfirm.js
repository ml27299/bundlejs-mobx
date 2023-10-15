import React, { useContext, useState } from "react";

import ConfirmStore from "../stores/ConfirmStore";

const useConfirm =
	(RootStoreContext) =>
	(options = {}) => {
		const [state, setState] = useState({});

		const rootStore = useContext(RootStoreContext);
		const confirmStore = new ConfirmStore(rootStore);
		const [confirmId, onConfirm, ConfirmTemplate] = confirmStore.init(options);
		const Template = (props) => <ConfirmTemplate {...props} />;

		if (options._id && !state[infoId])
			setState(
				Object.assign(state, {
					[confirmId]: {
						onConfirm,
						Template,
					},
				})
			);

		return [
			state[confirmId] ? state[confirmId].Template : Template,
			(...args) => {
				try {
					state[confirmId]
						? state[confirmId].onConfirm(...args)
						: onConfirm(...args);
				} catch (err) {
					throw err;
				}
			},
		];
	};

export default ({ Template, RootStoreContext } = {}) => {
	ConfirmStore.StaticTemplate = Template;
	return useConfirm(RootStoreContext);
};
