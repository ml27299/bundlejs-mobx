import React, { useContext, useState } from "react";

import InfoStore from "../stores/InfoStore";

function useInfo(options = {}) {
	const [state, setState] = useState({});

	const rootStore = useContext(this.rootStoreContext);
	const infoStore = new InfoStore(rootStore);
	const [infoId, onInfo, InfoTemplate] = infoStore.init(options);
	const Template = (props) => <InfoTemplate {...props} />;

	if (options._id && !state[infoId])
		setState(
			Object.assign(state, {
				[infoId]: {
					onInfo,
					Template,
				},
			})
		);

	return [
		state[infoId] ? state[infoId].Template : Template,
		(...args) => {
			try {
				state[infoId] ? state[infoId].onInfo(...args) : onInfo(...args);
			} catch (err) {
				throw err;
			}
		},
	];
}

export default ({ Template } = {}) => {
	InfoStore.StaticTemplate = Template;
	return useInfo;
};
