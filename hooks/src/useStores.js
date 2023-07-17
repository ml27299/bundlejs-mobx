import _, { useContext } from "react";

const useStores = (RootStoreContext) => () => {
	return useContext(RootStoreContext).stores;
};

export default ({ RootStoreContext }) => useStores(RootStoreContext);
