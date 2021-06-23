<script>
  import Rating from './Rating.svelte';
  import { checkedIn, checkIn } from './route_store';
  import { keyToName } from './place_store';

  var isRating = false;
  var to, from;
  $: {
    from = $checkedIn.from;
    to = $checkedIn.to;
  }

  const rate = () => {
    isRating = true;
  };
  const stopRating = () => {
    isRating = false;
  };
</script>

{#if $checkedIn == 'checked-in'}
  <div
    class=" is-flex is-flex-direction-column is-align-items-center is-size-7 has-text-white has-background-grey-lighter round-flat-button"
  >
    <span class="mt-2 icon is-medium">
      <i class="fas fa-2x fa-check" />
    </span>
  </div>
{:else if $checkedIn == 'new-visit'}
  <div
    class=" is-flex is-flex-direction-column is-align-items-center is-size-7 has-text-white has-background-link round-button"
    on:click={checkIn}
  >
    <span class="mt-2 icon is-medium">
      <i class="fas fa-2x fa-sign-in-alt" />
    </span>
    <span> Check-in</span>
  </div>
{:else}
  <div
    class=" is-flex is-flex-direction-column is-align-items-center is-size-7 has-text-white has-background-danger round-button"
    on:click={rate}
  >
    <span class="mt-2 icon is-medium">
      <i class="fas fa-2x fa-star" />
    </span>
    <span> Rate </span>
  </div>
{/if}

<div
  class="is-flex is-flex-direction-row-reverse has-background-light"
  style="
  margin-top: -32px;
  padding-bottom: 20px;
  margin-bottom: -20px;
  border-radius: 6px;
  "
>
  <span class="is-flex-shrink-0" style="width: 96px;" />

  <div class="is-size-7 has-text-white has-text-right">
    {#if $checkedIn == 'checked-in'}
      Visit more checkpoints to rate the routes!
    {:else if $checkedIn == 'new-visit'}
      New checkpoint, check in now!
    {:else}
      You came from {keyToName(from[0])}, how was the route?
    {/if}
  </div>

  <div />
</div>

{#if isRating}
  <Rating {from} {to} on:click={stopRating} />
{/if}

<style>
  .round-button {
    margin-top: -54px;
    position: absolute;
    right: 16px;
    height: 72px;
    width: 72px;
    border-radius: 50%;
    box-shadow: rgb(0 0 0 / 50%) 2px 2px 5px;
  }

  .round-flat-button {
    margin-top: -54px;
    position: absolute;
    right: 16px;
    height: 72px;
    width: 72px;
    border-radius: 50%;
  }
</style>
