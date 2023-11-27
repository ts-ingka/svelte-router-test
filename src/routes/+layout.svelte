<script>
  import "../app.css";

  import { loadingStore } from "$store";
  import DevTools from "$components/DevTools.svelte";

  import { navigating } from "$app/stores";
</script>

<DevTools />
<h1>master</h1>
{#if $navigating}
  <h1>LOADING ...</h1>
  <pre>
      {$loadingStore.message}
    </pre>
{:else}
  <slot />
{/if}
