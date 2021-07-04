<script>
  import { onMount } from 'svelte';
  import {
    addQuestion,
    allQuestions,
    editQuestion,
    prepareQuestion,
  } from './question_store';
  import { keyToName } from './place_store';

  onMount(() => prepareQuestion());

  let isShowingEditQuestion = false;

  let questionId;
  let questionSectionIndex;
  let questionSectionTitle;
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
    questionSectionIndex = question.index;
    questionSectionTitle = question.title;
    questionBody = question.body;
    questionType = question.type;
    questionAllowOptionalComment = question.aoc;
    questionDisabled = question.disabled;
  };

  const save = () => {
    const toSave = {
      index: questionSectionIndex,
      title: questionSectionTitle,
      body: questionBody,
      type: questionType,
      aoc: questionAllowOptionalComment,
      disabled: questionDisabled,
    };

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

  const report = async () => {
    try {
      let respond = await fetch('/report');
      const ratings = await respond.json();

      const csv = [];

      // Header
      const headRow = [];
      headRow.push('from', 'to', 'time', 'age', 'gender', 'oku', 'name');
      headRow.push(
        ...Object.keys($allQuestions).map((qIndex) => [
          `Question ${qIndex}`,
          'commnent',
        ])
      );
      csv.push(headRow);

      // Body
      for (const key in ratings) {
        const rating = ratings[key];

        const destinations = key.split('_');

        for (const rates of rating) {
          const row = [];

          row.push(...destinations.map((d) => keyToName(d)));

          const [time, profile] = rates.key.split('_');
          const d = new Date(parseInt(time, 36));

          // Time
          row.push(
            `${d.getFullYear()}-${d.getMonth()}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
          );

          // Profiles
          row.push(...profile.split('-'));

          row.push(
            ...Object.keys($allQuestions).map((qIndex) => rates[qIndex])
          );

          csv.push(row);
        }
      }
      console.log('csv :>> ', csv);

      let csvContent =
        'data:text/csv;charset=utf-8,' + csv.map((e) => e.join(',')).join('\n');

      var hiddenElement = document.createElement('a');
      hiddenElement.href = encodeURI(csvContent);
      hiddenElement.target = '_blank';
      hiddenElement.download = 'kk.csv';
      hiddenElement.click();
    } catch (error) {
      console.error(error);
    }
  };
</script>

<div class="box">
  <div class="block">
    <button
      class="mt-2 button is-warning is-fullwidth"
      on:click={startAddingQuestion}>Add</button
    >
  </div>

  <ul>
    {#each Object.values($allQuestions) as q, i}
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

<section class="section has-background-warning ">
  <p class="subtitle has-text-white">Rating</p>
</section>

<div class="box">
  <button class="button" on:click={report}>download report</button>
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
        <label class="label">Section Index</label>
        <div class="control">
          <input
            class="input"
            type="number"
            bind:value={questionSectionIndex}
          />
        </div>
      </div>

      <div class="field">
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label class="label">Section Title</label>
        <div class="control">
          <input class="input" type="text" bind:value={questionSectionTitle} />
        </div>
      </div>

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
          <input type="checkbox" bind:checked={questionAllowOptionalComment} />
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
