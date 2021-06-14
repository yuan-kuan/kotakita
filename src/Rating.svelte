<script>
  import { now } from 'svelte/internal';
</script>

<div class="modal is-active">
  <div class="modal-background" on:click />
  <div class="modal-content">
    <div class="box">
      <ul class="steps is-vertical is-small">
        <li class="steps-segment">
          <span href="#" class="steps-marker" />
          <div class="steps-content pb-5">
            <p class="is-size-4">Gaya Street</p>
            <p class="is-size-7 has-text-weight-light">some dates</p>
          </div>
        </li>
        <li class="steps-segment">
          <span href="#" class="steps-marker" />
          <div class="steps-content pb-5">
            <p class="is-size-4">City park</p>
            <p class="is-size-7 has-text-weight-light">some dates</p>
          </div>
        </li>
      </ul>

      <div class="buttons is-centered">
        {#each [1, 2, 3, 4, 5] as n}
          <button class="button">{n}</button>
        {/each}
        <br />
        {#each [6, 7, 8, 9, 10] as n}
          <button class="button">{n}</button>
        {/each}
      </div>

      <button class="button is-success">Rate</button>
      <button class="button">Continue Later</button>
    </div>
  </div>
  <button class="modal-close is-large" aria-label="close" on:click />
</div>

<style>
  /* Direct hack onto steps content */
  .steps.is-small.is-vertical .steps-content {
    margin-top: -1.6rem;
  }
</style>
