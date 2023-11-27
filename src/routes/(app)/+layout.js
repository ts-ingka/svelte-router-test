import { selectionsStore, metadataStore, loadingStore } from "$store";
import { encodeStateToUrl, decodeUrlToState } from "$lib/utils";

export const ssr = false;

export const load = async ({ fetch, params }) => {
    console.log(params);
    console.log("loading start: ", new Date().toISOString());
    loadingStore.set({
        status: true,
        message: "configuring website ...",
        type: "metadata",
    });
    const metadata = await fetch("/api/metadata");
    const metadataJson = await metadata.json();
    metadataStore.set(metadataJson);
    loadingStore.set({ status: false, message: "", type: "" });
    console.log("loading end: ", new Date().toISOString());

    // function sync() {
    //     console.log("sync() start: ", new Date().toISOString());

    //     const url = new URL(window.location.href);
    //     const urlIsEmpty = url.search.length === 0;
    //     const selectionsIsEmpty = Object.keys(selectionsStore).length === 0;

    //     if (urlIsEmpty && selectionsIsEmpty) {
    //         console.log("urlIsEmpty && selectionsIsEmpty nothing to do returning");
    //         console.log("sync() end: ", new Date().toISOString());
    //         return;
    //     }

    //     if (!urlIsEmpty && selectionsIsEmpty) {
    //         const selection = decodeUrlToState(url.search, get(metadataStore).params);
    //         selectionsStore.set(selection);

    //         if (Object.keys(selection).length < Array.from(url.searchParams).length) {
    //             console.log("Removing incorect params from url");
    //             const encodedState = encodeStateToUrl(selectionsStore);
    //             const params = encodedState.length > 0 ? `?${encodedState}` : "";
    //             history.replaceState(null, "", params);
    //         }

    //         console.log("sync() end: ", new Date().toISOString());
    //         return;
    //     }
    //     console.log("syncing selections store to url");
    //     const encodedState = encodeStateToUrl(selectionsStore);
    //     const params = encodedState.length > 0 ? `?${encodedState}` : "";
    //     history.replaceState(null, "", params);
    //     console.log("sync() end: ", new Date().toISOString());
    //     return;
    // }

    // selectionsStore.subscribe(() => {
    //     sync();
    // });


};