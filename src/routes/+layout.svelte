<script>
  import "../app.css";
  import { encodeStateToUrl, decodeUrlToState } from "$lib/utils";

  import { browser } from "$app/environment";
  import { selectionsStore, metadataStore, loadingStore } from "$store";
  import { get } from "svelte/store";
  import DevTools from "$components/DevTools.svelte";

  async function downloadMetadata() {
    loadingStore.set({
      status: true,
      message: "configuring website ...",
      type: "metadata",
    });
    const metadata = await fetch("/api/metadata");
    const metadataJson = await metadata.json();
    metadataStore.set(metadataJson);
    loadingStore.set({ status: false, message: "", type: "" });
  }

  async function sequence() {
    console.log("downloadMetadata() start: ", new Date().toISOString());
    await downloadMetadata();
    console.log("downloadMetadata() end: ", new Date().toISOString());

    selectionsStore.subscribe(() => {
      sync();
    });
  }

  function sync() {
    console.log("sync() start: ", new Date().toISOString());

    const url = new URL(window.location.href);
    const urlIsEmpty = url.search.length === 0;
    const selectionsIsEmpty = Object.keys($selectionsStore).length === 0;

    if (urlIsEmpty && selectionsIsEmpty) {
      console.log("urlIsEmpty && selectionsIsEmpty nothing to do returning");
      console.log("sync() end: ", new Date().toISOString());
      return;
    }

    if (!urlIsEmpty && selectionsIsEmpty) {
      const selection = decodeUrlToState(url.search, get(metadataStore).params);
      selectionsStore.set(selection);

      if (Object.keys(selection).length < Array.from(url.searchParams).length) {
        console.log("Removing incorect params from url");
        const encodedState = encodeStateToUrl($selectionsStore);
        const params = encodedState.length > 0 ? `?${encodedState}` : "";
        history.replaceState(null, "", params);
      }

      console.log("sync() end: ", new Date().toISOString());
      return;
    }
    console.log("syncing selections store to url");
    const encodedState = encodeStateToUrl($selectionsStore);
    const params = encodedState.length > 0 ? `?${encodedState}` : "";
    history.replaceState(null, "", params);
    console.log("sync() end: ", new Date().toISOString());
    return;
  }

  if (browser) {
    sequence();
  }
</script>

<DevTools />

{#if $loadingStore.status}
  <h1>LOADING ...</h1>
{:else}
  <slot />
{/if}
