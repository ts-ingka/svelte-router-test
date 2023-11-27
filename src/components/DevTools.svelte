<script>
  import { DevTools } from "$store";
  import { classes } from "$lib/utils";
  import { browser } from "$app/environment";

  import { onMount, onDestroy } from "svelte";

  const storeStates = DevTools.store;

  let show = true;
  let display = "block";
  const toggle = () => {
    show = !show;
  };

  $: display = show ? "block" : "hidden";

  onMount(() => {
    if (!browser) return;
    window.addEventListener("keydown", (e) => {
      if (e.key === "F9") {
        toggle();
      }
    });
  });

  onDestroy(() => {
    if (!browser) return;
    window.removeEventListener("keydown", (e) => {
      if (e.key === "F9") {
        toggle();
      }
    });
  });
</script>

<div
  class={classes([
    "fixed bottom-0 right-0 max-h-96 w-80 overflow-y-auto bg-orange-200 opacity-80 z-50 border border-orange-400 rounded-tl-xl p-4",
    display,
  ])}
>
  <h2>Store States</h2>
  {#each Object.entries($storeStates) as [key, value]}
    <div class="mb-3 p-1 border-b border-orange-950">
      <pre class="font-bold text-green-400">{key}</pre>
      <pre class="break-words mt-1">{JSON.stringify(value, null, 2)}</pre>
    </div>
  {/each}
</div>
