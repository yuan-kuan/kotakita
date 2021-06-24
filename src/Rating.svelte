<script>
  import { onMount } from 'svelte';
  import {
    currentRating,
    rate,
    startRating,
    visitPrevious,
  } from './rating_store';
  import { keyToName } from './place_store';

  export let from;
  export let to;

  onMount(() => {
    startRating(from, to);
  });

  $: rateCompleted = $currentRating.rateCompleted;

  //let QuestionSection;
  $: questionKey = $currentRating.questionKey;
  $: questionSectionTitle = $currentRating.questionSectionTitle;
  $: questionSectionIndex = $currentRating.questionSectionIndex;
  $: questionType = $currentRating.questionType;
  $: questionBody = $currentRating.questionBody;
  $: currentIndex = $currentRating.currentIndex ?? 0;
  $: totalQuestion = $currentRating.totalQuestion ?? 0;

  let answer;
  let comment;

  $: isUpdatingRate =
    answer != $currentRating.value ||
    comment != $currentRating.comment ||
    answer == -1;

  currentRating.subscribe((rating) => {
    answer = rating.value;
    comment = rating.comment;
  });

  const tickScale = (value) => {
    answer = value;
  };

  const submit = () => {
    rate(questionKey, answer, comment);
  };

  $: isShowingBack = currentIndex > 0;
  const back = () => {
    visitPrevious();
  };

  let showCommentInput = false;
</script>

<div class="modal is-active">
  <div class="modal-background" on:click />
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title has-text-white has-text-weight-bold">
        Rate and Review
      </p>
      <button class="delete" aria-label="close" on:click />
    </header>

    <div class="modal-card-body">
      {#if rateCompleted}
        <p>Thank you for the rating!</p>
      {:else}
        <p class="mb-2 has-text-grey is-size-7">You are rating:</p>
        <ul class="steps is-vertical is-small is-short has-text-grey">
          <li class="steps-segment is-active ">
            <span href="#" class="steps-marker is-light" />
            <div class="steps-content">
              <p class="is-size-6">{keyToName(from[0])}</p>
            </div>
          </li>
          <li class="steps-segment">
            <span href="#" class="steps-marker is-light" />
            <div class="steps-content">
              <p class="is-size-6">{keyToName(to[0])}</p>
            </div>
          </li>
        </ul>

        <div class="is-flex">
          <progress
            class="progress is-primary is-small"
            value={currentIndex}
            max={totalQuestion - 1}
          />
          <span class="is-flex-shrink-0 has-text-grey is-size-7">
            {currentIndex + 1} of {totalQuestion}
          </span>
        </div>

        <p class="is-size-7 has-text-grey">Section {questionSectionIndex}</p>
        <p class="pt-2 is-size-4">{questionSectionTitle}</p>
        <p class="is-size-7 has-text-grey" style="margin-top: -0.6em">
          Rate the following on the scale of 1 to 10.
        </p>
        <!-- Rate the following on the scale of 1-10 -->

        <p class="pt-5 is-size-7">
          {questionBody}
          <!-- Footpath pavement condition (e.g. strolley/trolley friendly) -->
        </p>

        <div class="pt-2 buttons has-addons is-centered are-small ">
          {#each [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as n}
            <button
              class="button is-primary {answer == n ? '' : 'is-outlined'}"
              on:click={() => tickScale(n)}>{n}</button
            >
          {/each}
        </div>
      {/if}

      {#if showCommentInput}
        <p class="is-size-7 has-text-grey">Comments (Options)</p>
        <div class="control">
          <textarea class="textarea is-small" bind:value={comment} />
        </div>
      {:else}
        <button
          class="button is-small"
          on:click={() => {
            showCommentInput = true;
          }}
        >
          <span class="icon is-small">
            <i class="fas fa-plus" />
          </span>
          <span> Add comments </span>
        </button>
      {/if}

      <div class="block pt-6 is-flex is-justify-content-space-between">
        <button
          class="button is-small is-longer"
          class:is-invisible={!isShowingBack}
          on:click={back}>Back</button
        >
        {#if rateCompleted}
          <button class="button is-small is-longer is-link" on:click
            >Close</button
          >
        {:else}
          <button
            class="button is-small is-longer {isUpdatingRate ? 'is-link' : ''}"
            on:click={submit}>{isUpdatingRate ? 'Rate' : 'Next'}</button
          >
        {/if}
      </div>

      <div class="block is-flex is-flex-direction-row-reverse">
        <a class="is-size-7" on:click>Continuer later</a>
      </div>
    </div>
  </div>
</div>

<style>
  /* Direct hack onto steps content */
  .steps.is-vertical.is-short .steps-segment {
    min-height: 0em;
  }

  /* Direct hack onto steps content */
  .steps.is-small.is-vertical .steps-content {
    margin-top: -1.1rem;
  }

  /* Add a grey bottom line after steps */
  .steps {
    border-bottom: 1px solid #e4e3e3;
  }

  /* Thin progress */
  .progress.is-small {
    height: 0.4rem;
  }

  .button.is-longer {
    padding-left: 3em;
    padding-right: 3em;
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
