<script>
  import { now } from 'svelte/internal';
</script>

<div class="modal is-active">
  <div class="modal-background" on:click />
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Rate and Review</p>
      <button class="delete" aria-label="close" on:click />
    </header>

    <div class="modal-card-body">
      <p class="has-text-light">You are rating:</p>
      <ul class="steps is-vertical is-small is-short has-text-light">
        <li class="steps-segment is-active ">
          <span href="#" class="steps-marker is-light" />
          <div class="steps-content pb-4">
            <p class="is-size-5">Gaya Street</p>
          </div>
        </li>
        <li class="steps-segment">
          <span href="#" class="steps-marker is-light" />
          <div class="steps-content pb-4">
            <p class="is-size-5">City park</p>
          </div>
        </li>
      </ul>

      <!-- <div class="block">
       {#each [1, 2, 3, 4, 5] as n}
          <div class="rate-button">{n}</div>
        {/each}
        <br />
        {#each [6, 7, 8, 9, 10] as n}
          <div class="rate-button">{n}</div>
        {/each}
      </div> -->

      <div class="buttons has-addons is-centered are-small ">
        {#each [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as n}
          <button class="button is-primary is-outlined">{n}</button>
        {/each}
      </div>

      <button class="button is-success">Rate</button>
      <button class="button">Continue Later</button>
    </div>
  </div>
</div>

<style>
  /* Direct hack onto steps content */
  .steps.is-small.is-vertical .steps-content {
    margin-top: -1.3rem;
  }

  .rate-button {
    height: 32px;
    width: 32px;
    border: 1px solid #77cdfe;
    display: inline-block;
    border-radius: 50%;
    text-align: center;
    margin: 2px;
    margin-right: 4px;
    color: #77cdfe;
    font-size: 0.85em;
    padding-top: 4px;
  }
</style>
