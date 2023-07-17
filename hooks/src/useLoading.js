import React, { useContext, useState } from "react";

import LoadingStore from "../stores/LoadingStore";

const useLoading =
	(RootStoreContext) =>
	(options = {}) => {
		console.log("LALALALALALALAL");
		const [state, setState] = useState({});
		console.log("YOYOYO");
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
	console.log("WTF");
	const r = useLoading(RootStoreContext);
	console.log("WTF2");
	return r;
};
