import { create } from "mobx-persist";
import { isBrowser } from "bundlejs/dist/utils";
import { useStaticRendering } from "mobx-react";

if (!isBrowser) useStaticRendering(true);

function camelize(str) {
	return str
		.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
			return index === 0 ? word.toLowerCase() : word.toUpperCase();
		})
		.replace(/\s+/g, "");
}

const hydrate = isBrowser
	? create({ storage: localStorage })
	: () => ({ then: () => {} });

class RootStore {
	stores = {};
	staticContext = { app: {} };
	history;
	location;
	params;
	libs;
	state = {};
	globalStoreNames = [];
	constructor({
		libs = {},
		staticContext = { app: {}, data: {} },
		stores = {},
		history,
		location,
		params,
	}) {
		//this.staticContext = staticContext;
		this.libs = libs;
		this.history = history;
		this.location = location;
		this.params = params;
		this.stores = Object.keys(stores).reduce((result, name) => {
			this.globalStoreNames.push(camelize(name));
			result[camelize(name)] = new stores[name](this, staticContext, libs);
			return result;
		}, {});
		this.globalAppState = {};

		const storesToHydrate = Object.keys(stores)
			.map((name) => (stores[name].hydrate === true ? name : null))
			.filter((a) => a);
		this.hydrate(stores, storesToHydrate, staticContext)
			.then((response) => {
				//console.info('State hydrated.'); // eslint-disable-line no-console
			})
			.catch((e) => console.error("Error hydrating state:", e));
	}

	async hydrate(stores, names = [], staticContext = { app: {}, data: {} }) {
		const hydrationList = names.map((name) =>
			hydrate(
				name,
				this.stores[camelize(name)],
				stores[name].initialState(staticContext)
			)
		);
		return Promise.all(hydrationList);
	}

	setStores({
		stores = {},
		libs = {},
		staticContext = { app: {}, data: {} },
		force = false,
	}) {
		if (!stores) return;

		Object.assign(this.libs, libs);

		const globalStores = this.globalStoreNames.reduce(
			(result, name) => Object.assign(result, { [name]: this.stores[name] }),
			{}
		);
		this.stores = Object.assign(
			{},
			globalStores,
			Object.keys(stores).reduce((result, name) => {
				const fn = stores[name];
				result[camelize(name)] = force
					? new fn(this, staticContext, this.libs)
					: this.stores[camelize(name)] ||
					  new fn(this, staticContext, this.libs);
				return result;
			}, {})
		);

		const storesToHydrate = Object.keys(stores)
			.map((name) => (stores[name].hydrate === true ? name : null))
			.filter((a) => a);
		this.hydrate(stores, storesToHydrate, staticContext)
			.then((response) => {
				//console.info('State hydrated.'); // eslint-disable-line no-console
			})
			.catch((e) => console.error("Error hydrating state:", e));
	}

	addStores({
		stores = {},
		libs = {},
		staticContext = { app: {}, data: {} },
		force = false,
		setGlobal = false,
	}) {
		if (!stores) return;

		Object.assign(this.libs, libs);

		Object.assign(
			this.stores,
			Object.keys(stores).reduce((result, name) => {
				const fn = stores[name];
				if (setGlobal) this.globalStoreNames.push(camelize(name));
				result[camelize(name)] = force
					? new fn(this, staticContext, this.libs)
					: this.stores[camelize(name)] ||
					  new fn(this, staticContext, this.libs);
				return result;
			}, {})
		);

		const storesToHydrate = Object.keys(stores)
			.map((name) => (stores[name].hydrate === true ? name : null))
			.filter((a) => a);
		this.hydrate(stores, storesToHydrate, staticContext)
			.then((response) => {
				//console.info('State hydrated.'); // eslint-disable-line no-console
			})
			.catch((e) => console.error("Error hydrating state:", e));
	}

	clearStores() {
		this.stores = {};
	}
}

export default RootStore;
