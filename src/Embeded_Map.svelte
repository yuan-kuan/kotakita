<script>
  export let mapUrl;

  let isShowing = false;
</script>

<button
  class="button is-small is-info is-rounded is-outlined"
  on:click={() => (isShowing = true)}
>
  <span class="icon">
    <i class="fas fa-lg fa-directions" />
  </span>
  <span> direction </span>
</button>

<div class="modal" class:is-active={isShowing}>
  <div class="modal-background" on:click={() => (isShowing = false)} />
  <div class="modal-content">
    <!-- svelte-ignore a11y-missing-attribute -->
    {#if isShowing && mapUrl}
      <iframe
        src={mapUrl}
        width="400"
        height="300"
        style="border:0;"
        allowfullscreen=""
        loading="lazy"
      />
    {/if}
  </div>
  <button
    class="modal-close is-large"
    aria-label="close"
    on:click={() => (isShowing = false)}
  />
</div>
