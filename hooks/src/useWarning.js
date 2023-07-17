import React, { useContext, useState } from "react";

import WarningStore from "../stores/WarningStore";

function useWarning(options = {}) {
	const [state, setState] = useState({});

	const rootStore = useContext(this.rootStoreContext);
	const warningStore = new WarningStore(rootStore);
	const [warningId, onWarning, WarningTemplate] = warningStore.init(options);
	const Template = (props) => <WarningTemplate {...props} />;

	if (options._id && !state[warningId])
		setState(
			Object.assign(state, {
				[warningId]: {
					onWarning,
					Template,
				},
			})
		);

	return [
		state[warningId] ? state[warningId].Template : Template,
		(...args) => {
			try {
				state[warningId]
					? state[warningId].onWarning(...args)
					: onWarning(...args);
			} catch (err) {
				throw err;
			}
		},
	];
}

export default ({ Template } = {}) => {
	WarningStore.StaticTemplate = Template;
	return useWarning;
};
