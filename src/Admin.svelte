<script>
  import { isAdmin } from './user_store';

  const questions = ['boy', 'girl'];

  let isShowingEditQuestion = false;
  const addQuestion = () => {
    isShowingEditQuestion = true;
  };

  const save = () => {};
  const closeQuestion = () => {
    isShowingEditQuestion = false;
  };
</script>

{#if $isAdmin || true}
  <section class="section has-background-warning ">
    <p class="title has-text-white">Admin Area</p>
    <p class="subtitle has-text-white">Rating Questions</p>
  </section>

  <div class="box">
    <button class="mt-2 button is-warning is-fullwidth" on:click={addQuestion}
      >Add</button
    >

    <ul>
      {#each questions as q}
        <li>{q}</li>
      {/each}
    </ul>
  </div>

  <div class="modal" class:is-active={isShowingEditQuestion}>
    <div class="modal-background" on:click={closeQuestion} />
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Edit Question</p>
      </header>
      <section class="modal-card-body">
        <div class="field">
          <!-- svelte-ignore a11y-label-has-associated-control -->
          <label class="label">Question Body</label>
          <div class="control">
            <textarea class="textarea" />
          </div>
        </div>

        <div class="field">
          <!-- svelte-ignore a11y-label-has-associated-control -->
          <label class="label">Question Type</label>
          <div class="select">
            <select>
              <option value="scale">1-10 scale</option>
              <option value="yesno">Yes or No</option>
              <option value="openend">Open Ended</option>
            </select>
          </div>
          <br />
        </div>

        <div class="field">
          <label class="checkbox">
            <input type="checkbox" />
            Allow optional comment
          </label>
        </div>
      </section>

      <footer class="modal-card-foot">
        <button class="button is-success" on:click={save}>Save</button>
        <button class="button" on:click={closeQuestion}>Cancel</button>
      </footer>
    </div>
    <button
      class="modal-close is-large"
      aria-label="close"
      on:click={closeQuestion}
    />
  </div>
{:else}
  <div class="box"><p>Only admin allows here.</p></div>
{/if}
