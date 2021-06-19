<script>
  import { onMount } from 'svelte';
  import { allQuestions, prepareQuestion } from './question_store';
  import { currentRating, rate, startRating } from './rating_store';

  export let from;
  export let to;

  onMount(async () => {
    await prepareQuestion();
    startRating(from, to);
  });

  let preparing = true;
  let rateCompleted = false;

  let index = 0;

  //let QuestionSection;
  let questionKey;
  let questionType;
  let questionBody;

  const findNextUnansweredQuestionKey = () => {
    const questionKeys = Object.keys($allQuestions).sort();
    const latestRatedQuestionKey =
      Object.keys($currentRating).sort().pop() ?? questionKeys[0];

    if (latestRatedQuestionKey) {
      const index = questionKeys.indexOf(latestRatedQuestionKey);
      if (index == questionKeys.length - 1) {
        rateCompleted = true;
      } else {
        rateCompleted = false;
        const question = $allQuestions[questionKeys[index]];

        console.log('question :>> ', question);
        questionKey = question?.key;
        questionType = question?.type;
        questionBody = question?.body;
      }
    }
  };

  $: {
    if ($allQuestions == undefined || $currentRating == undefined) {
      // Not ready yet;
      preparing = false;
    } else {
      const questionKeys = Object.keys($allQuestions).sort();
      const latestRatedQuestionKey =
        Object.keys($currentRating).sort().pop() ?? questionKeys[0];

      if (latestRatedQuestionKey) {
        const index = questionKeys.indexOf(latestRatedQuestionKey) + 1;
        if (index >= questionKeys.length - 1) {
          rateCompleted = true;
        } else {
          rateCompleted = false;
          const question = $allQuestions[questionKeys[index]];

          questionKey = question?.key;
          questionType = question?.type;
          questionBody = question?.body;
        }
      }
    }
  }

  let answer;
  let comment;
  const tickScale = (value) => {
    answer = value;
  };

  const submit = () => {
    rate(questionKey, answer, comment);
  };

  let showCommentInput = false;
</script>

<div class="modal is-active">
  <div class="modal-background" on:click />
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Rate and Review</p>
      <button class="delete" aria-label="close" on:click />
    </header>

    <div class="modal-card-body">
      {#if rateCompleted}
        <p>Thank you for the rating!</p>
      {:else}
        <p class="has-text-grey">You are rating:</p>
        <ul class="steps is-vertical is-small is-short has-text-grey">
          <li class="steps-segment is-active ">
            <span href="#" class="steps-marker is-light" />
            <div class="steps-content">
              <p class="is-size-5">{from}</p>
            </div>
          </li>
          <li class="steps-segment">
            <span href="#" class="steps-marker is-light" />
            <div class="steps-content">
              <p class="is-size-5">{to}</p>
            </div>
          </li>
        </ul>

        <div class="is-flex">
          <progress class="progress is-primary is-small" value="15" max="100"
            >15%</progress
          >
          <span class="is-flex-shrink-0 has-text-grey is-size-7">
            1 of 10
          </span>
        </div>

        <p class="is-size-7 has-text-grey">Section 1</p>
        <p class="pt-2 is-size-4">Environment</p>
        <p class="is-size-7 has-text-grey">
          {questionType}
        </p>
        <!-- Rate the following on the scale of 1-10 -->

        <p class="pt-5 is-size-7">
          {questionBody}
          <!-- Footpath pavement condition (e.g. strolley/trolley friendly) -->
        </p>

        <div class="pt-2 buttons has-addons is-centered are-small ">
          {#each [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as n}
            <button
              class="button is-primary is-outlined"
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
        <button class="button is-small is-longer">Back</button>
        <button class="button is-small is-longer is-link" on:click={submit}
          >Rate</button
        >
      </div>

      <div class="block is-flex is-flex-direction-row-reverse">
        <a class="is-size-7">Continuer later</a>
      </div>
    </div>
  </div>
</div>

<style>
  /* Direct hack onto steps content */
  .steps.is-small.is-vertical .steps-content {
    margin-top: -1.3rem;
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
