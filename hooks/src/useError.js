import React, { useContext, useState } from "react";

import ErrorStore from "../stores/ErrorStore";

function useError(options = {}) {
	const [state, setState] = useState({});

	const rootStore = useContext(this.rootStoreContext);
	const errorStore = new ErrorStore(rootStore);
	const [errorId, onError, ErrorTemplate] = errorStore.init(options);
	const Template = (props) => <ErrorTemplate {...props} />;

	if (options._id && !state[errorId])
		setState(
			Object.assign(state, {
				[errorId]: {
					onError,
					Template,
					errorStore,
				},
			})
		);

	return [
		state[errorId] ? state[errorId].Template : Template,
		(...args) => {
			try {
				state[errorId] ? state[errorId].onError(...args) : onError(...args);
			} catch (err) {
				throw err;
			}
		},
		state[errorId] ? state[errorId].errorStore : errorStore,
	];
}

export default ({ Template } = {}) => {
	ErrorStore.StaticTemplate = Template;
	return useError;
};
