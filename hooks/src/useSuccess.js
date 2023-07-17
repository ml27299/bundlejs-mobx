import React, { useContext, useState } from "react";

import SuccessStore from "../stores/SuccessStore";

function useSuccess(options = {}) {
	const [state, setState] = useState({});

	const rootStore = useContext(this.rootStoreContext);
	const successStore = new SuccessStore(rootStore);
	const [successId, onSuccess, SuccessTemplate] = successStore.init(options);
	const Template = (props) => <SuccessTemplate {...props} />;

	if (options._id && !state[successId])
		setState(
			Object.assign(state, {
				[successId]: {
					onSuccess,
					Template,
				},
			})
		);

	return [
		state[successId] ? state[successId].Template : Template,
		(...args) => {
			try {
				state[successId]
					? state[successId].onSuccess(...args)
					: onSuccess(...args);
			} catch (err) {
				throw err;
			}
		},
	];
}

export default ({ Template } = {}) => {
	LoadingStore.StaticTemplate = Template;
	return useLoading;
};
