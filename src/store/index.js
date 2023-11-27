import { writable } from 'svelte/store';

class DevToolsClass {
    store = writable({});

    notifyChange(storeKey, value) {
        this.store.update((state) => {
            return { ...state, [storeKey]: value };
        });
    }
}

export const DevTools = new DevToolsClass();

export function createStore(storeName, initialValue) {
    const { subscribe, set: originalSet, update: originalUpdate } = writable(initialValue);

    function set(value) {
        localStorage.setItem(storeName, JSON.stringify(value));
        DevTools.notifyChange(storeName, value);
        originalSet(value);
    }

    function update(updater) {
        originalUpdate((current) => {
            const newValue = updater(current);
            localStorage.setItem(storeName, JSON.stringify(newValue));
            DevTools.notifyChange(storeName, newValue);
            return newValue;
        });
    }

    const snapshot = () => {
        const value = localStorage.getItem(storeName);
        return value ? JSON.parse(value) : null;
    };

    const reset = () => {
        localStorage.removeItem(storeName);
        set(initialValue);
    };

    return {
        reset,
        update,
        set,
        snapshot,
        subscribe
    };
}

const selectionsStore = createStore('selectionsStore', {});
const metadataStore = createStore('metadataStore', {});
const resultsStore = createStore('resultsStore', {});
const loadingStore = createStore('loadingStore', {
    status: true,
    type: '',
    message: ''
});

export { selectionsStore, metadataStore, resultsStore, loadingStore };