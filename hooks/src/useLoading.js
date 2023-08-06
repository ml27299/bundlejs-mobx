import React, { useContext, useState } from "react";

import LoadingStore from "../stores/LoadingStore";

const useLoading =
	(RootStoreContext) =>
	(options = {}) => {
		const [state, setState] = useState({});
		const rootStore = useContext(RootStoreContext);
		const loadingStore = new LoadingStore(rootStore);
		const [loadingId, onLoading, LoadingTemplate] = loadingStore.init(options);
		const Template = (props) => <LoadingTemplate {...props} />;

		if (options._id && !state[loadingId])
			setState(
				Object.assign(state, {
					[loadingId]: {
						loadingStore,
						onLoading,
						Template,
					},
				})
			);

		return [
			state[loadingId] ? state[loadingId].Template : Template,
			(...args) => {
				try {
					state[loadingId]
						? state[loadingId].onLoading(...args)
						: onLoading(...args);
				} catch (err) {
					throw err;
				}
			},
			state[loadingId] ? state[loadingId].loadingStore : loadingStore,
		];
	};

export default ({ Template, RootStoreContext } = {}) => {
	LoadingStore.Template = Template;
	return useLoading(RootStoreContext);
};
