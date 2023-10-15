import React, { useContext, useState } from "react";

import CollapseStore from "../stores/CollapseStore";

const useCollapse =
	(RootStoreContext) =>
	(options = {}) => {
		const [state, setState] = useState({});

		const rootStore = useContext(RootStoreContext);
		const collapseStore = new CollapseStore(rootStore);
		const [collapseId, onCollapse, CollapseTemplate] =
			collapseStore.init(options);
		const Template = (props) => <CollapseTemplate {...props} />;

		if (options._id && !state[collapseId])
			setState(
				Object.assign(state, {
					[collapseId]: {
						onCollapse,
						Template,
					},
				})
			);

		return [
			state[collapseId] ? state[collapseId].Template : Template,
			(...args) => {
				try {
					state[collapseId]
						? state[collapseId].onCollapse(...args)
						: onCollapse(...args);
				} catch (err) {
					throw err;
				}
			},
		];
	};

export default ({ Template, RootStoreContext } = {}) => {
	CollapseStore.StaticTemplate = Template;
	return useCollapse(RootStoreContext);
};
