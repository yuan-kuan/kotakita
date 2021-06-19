<script>
  import { onMount } from 'svelte';
  import { isAdmin } from './user_store';
  import {
    addQuestion,
    allQuestions,
    editQuestion,
    prepareQuestion,
  } from './question_store';

  onMount(() => prepareQuestion());

  let isShowingEditQuestion = false;

  let questionId;
  let questionBody;
  let questionType;
  let questionAllowOptionalComment;
  let questionDisabled;

  const startAddingQuestion = () => {
    isShowingEditQuestion = true;
    questionId = 0;
    questionBody = '';
    questionType = 'scale';
    questionAllowOptionalComment = false;
    questionDisabled = false;
  };

  const startEditingQuestion = (question) => {
    isShowingEditQuestion = true;
    questionId = question.key;
    questionBody = question.body;
    questionType = question.type;
    questionAllowOptionalComment = question.aoc;
    questionDisabled = question.disabled;
  };

  const save = () => {
    const toSave = {
      body: questionBody,
      type: questionType,
      aoc: questionAllowOptionalComment,
      disabled: questionDisabled,
    };

    console.log('toSave :>> ', toSave);
    if (questionId == 0) {
      addQuestion(toSave);
    } else {
      editQuestion(questionId, toSave);
    }
    // questions = [...questions, toSave];
    isShowingEditQuestion = false;
  };

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
    <div class="block">
      <button
        class="mt-2 button is-warning is-fullwidth"
        on:click={startAddingQuestion}>Add</button
      >
    </div>

    <ul>
      {#each $allQuestions as q, i}
        <li class="block">
          <span class="mr-1">{i + 1}</span>
          <span
            class="mr-1 has-background-info has-text-white has-text-weight-semibold"
          >
            {q.type}
          </span>
          <!-- svelte-ignore a11y-missing-attribute -->
          <a on:click={startEditingQuestion(q)}>
            {q.body}
          </a>
        </li>
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
            <textarea class="textarea" bind:value={questionBody} />
          </div>
        </div>

        <div class="field">
          <!-- svelte-ignore a11y-label-has-associated-control -->
          <label class="label">Question Type</label>
          <div class="select">
            <select bind:value={questionType}>
              <option value="scale">1-10 scale</option>
              <option value="yesno">Yes or No</option>
              <option value="openend">Open Ended</option>
            </select>
          </div>
          <br />
        </div>

        <div class="field">
          <label class="checkbox">
            <input
              type="checkbox"
              bind:checked={questionAllowOptionalComment}
            />
            Allow optional comment
          </label>
        </div>
        <div class="field">
          <label class="checkbox has-text-danger">
            <input type="checkbox" bind:checked={questionDisabled} />
            DISABLE THIS QUESTION
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
