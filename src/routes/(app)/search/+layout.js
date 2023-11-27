import { selectionsStore, metadataStore, loadingStore } from "$store";

export const load = async ({ fetch, params, parent }) => {
    await parent();
    console.log(params);
    console.log("loading search start: ", new Date().toISOString());
    loadingStore.set({
        status: true,
        message: "searching ...",
        type: "search",
    });
    const search = await fetch("/api/search");
    const res = await search.json();
    console.log("res: ", res);
    loadingStore.set({ status: false, message: "", type: "" });
    console.log("loading search end: ", new Date().toISOString());
}