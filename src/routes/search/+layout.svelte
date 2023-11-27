<script>
  import { onMount } from "svelte";
  import { selectionsStore, loadingStore, resultsStore } from "$store";

  $: hasSelections = Object.keys($selectionsStore).length > 0;
  $: hashResults = Object.keys($resultsStore).length > 0;
  $: shouldSearch = hasSelections && !hashResults;

  onMount(async () => {
    console.log("searchLayout onMount() start: ", new Date().toISOString());
    console.log(
      "has selections=",
      hasSelections,
      "has results=",
      hashResults,
      "should search=",
      shouldSearch
    );
    if (!shouldSearch) return;

    loadingStore.set({ status: true, message: "Loading...", type: "results" });

    const api = await fetch("/api/search", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const results = await api.json();
    resultsStore.set(results);
    loadingStore.set({ status: false, message: "", type: "" });

    console.log("searchLayout onMount() end: ", new Date().toISOString());
  });
</script>

<slot />
